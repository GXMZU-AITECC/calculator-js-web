/**
 * 模型层（Model）：纯运算逻辑，不接触任何页面元素。
 * 对应 Python 桌面版 model.py —— 实现思路可直接参考它。
 *
 * 四则运算与 lg / ln / sin / cos / tan / √ 由 evaluate() 计算。
 */
const model = {
  /**
   * 计算数学表达式并返回结果（对应 Python 版 evaluate）。
   *
   * 已支持四则运算，以及 lg / ln / sin / cos / tan / √。
   * 三角函数按角度制计算。空括号 `lg()` 视为还没写完，由界面继续接收数字。
   *
   * @param {string} expression 要计算的数学表达式字符串，如 "lg(100)"、"1+2*3"
   * @returns {number} 计算结果
   * @throws {Error} 表达式为空、尚未写完或超出定义域时抛出
   */
  evaluate(expression) {
    const source = String(expression || "").replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/\s+/g, "");
    if (!source) throw new Error("表达式为空");
    const parser = createParser(source);
    const value = parser.parseExpression();
    if (parser.rest()) throw new Error("表达式有误");
    if (!Number.isFinite(value)) throw new Error("数字太大");
    return Number(value.toPrecision(12));
  },
};

/**
 * 为一条表达式建立从左到右的解析器。
 *
 * @param {string} source 已去掉空白并替换好运算符的表达式
 * @returns {{parseExpression: function(): number, rest: function(): string}}
 */
function createParser(source) {
  let index = 0;

  /**
   * 解析加减表达式。
   *
   * @returns {number} 当前表达式的值
   */
  function parseExpression() {
    let left = parseTerm();
    while (source[index] === "+" || source[index] === "-") {
      const operator = source[index];
      index += 1;
      const right = parseTerm();
      left = operator === "+" ? left + right : left - right;
    }
    return left;
  }

  /**
   * 解析乘除表达式。
   *
   * @returns {number} 当前项的值
   * @throws {Error} 除数为 0 时抛出
   */
  function parseTerm() {
    let left = parseUnary();
    while (source[index] === "*" || source[index] === "/") {
      const operator = source[index];
      index += 1;
      const right = parseUnary();
      if (operator === "/" && right === 0) throw new Error("除数不能为 0");
      left = operator === "*" ? left * right : left / right;
    }
    return left;
  }

  /**
   * 解析正负号。
   *
   * @returns {number} 带符号的值
   */
  function parseUnary() {
    if (source[index] === "+") {
      index += 1;
      return parseUnary();
    }
    if (source[index] === "-") {
      index += 1;
      return -parseUnary();
    }
    return parsePrimary();
  }

  /**
   * 解析数字、括号或函数调用。
   *
   * @returns {number} 一个基本值
   * @throws {Error} 括号没写完或出现非法字符时抛出
   */
  function parsePrimary() {
    const fn = readFunction();
    if (fn) {
      if (source[index] !== "(") throw new Error("未完成");
      index += 1;
      if (source[index] === ")") throw new Error("未完成");
      const argument = parseExpression();
      if (source[index] !== ")") throw new Error("表达式有误");
      index += 1;
      return applyFunction(fn, argument);
    }
    if (source[index] === "(") {
      index += 1;
      if (source[index] === ")") throw new Error("未完成");
      const value = parseExpression();
      if (source[index] !== ")") throw new Error("表达式有误");
      index += 1;
      return value;
    }
    return readNumber();
  }

  /**
   * 读取当前位置的函数名。
   *
   * @returns {string} 函数名；当前位置不是函数时返回空字符串
   */
  function readFunction() {
    const names = ["sqrt", "sin", "cos", "tan", "lg", "ln", "√"];
    for (const name of names) {
      if (source.startsWith(name, index)) {
        index += name.length;
        return name === "√" ? "sqrt" : name;
      }
    }
    return "";
  }

  /**
   * 读取一个十进制数字。
   *
   * @returns {number} 读到的数字
   * @throws {Error} 当前位置不是数字时抛出
   */
  function readNumber() {
    const start = index;
    while (index < source.length && /[0-9.]/.test(source[index])) index += 1;
    if (start === index) throw new Error(source[index] ? "表达式有误" : "未完成");
    const value = Number(source.slice(start, index));
    if (!Number.isFinite(value)) throw new Error("数字有误");
    return value;
  }

  return {
    parseExpression,
    rest() {
      return source.slice(index);
    },
  };
}

/**
 * 计算单个科学函数。
 *
 * @param {string} name 函数名，sqrt / sin / cos / tan / lg / ln
 * @param {number} value 自变量
 * @returns {number} 函数值
 * @throws {Error} 自变量不在定义域内时抛出
 */
function applyFunction(name, value) {
  if (name === "lg" || name === "ln") {
    if (value <= 0) throw new Error("对数只接受正数");
    return name === "lg" ? Math.log10(value) : Math.log(value);
  }
  if (name === "sqrt") {
    if (value < 0) throw new Error("不能对负数开平方");
    return Math.sqrt(value);
  }
  const radians = (value * Math.PI) / 180;
  if (name === "tan") {
    const folded = ((radians / Math.PI) % 1 + 1) % 1;
    if (Math.abs(folded - 0.5) < 1e-9) throw new Error("正切在这里没有定义");
  }
  const result = Math[name](radians);
  if (!Number.isFinite(result)) throw new Error("超出定义域");
  return result;
}
