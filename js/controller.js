/**
 * 控制器（Controller）：响应按键事件，协调 view 与 model。
 * 对应 Python 桌面版 controller.py。
 *
 * 按键点击由 handleButtonClick() 处理。
 */
const controller = {
  /** @type {string} 当前算式。函数调用始终带成对括号，例如 lg(100)。 */
  expression: "",

  /** @type {boolean} 为真时，接下来的数字写进最后一个括号里。 */
  editingFn: false,

  /** @type {boolean} 刚按过等号。下一次数字从新算式开始。 */
  justEvaluated: false,

  /**
   * 处理按键点击（对应 Python 版 handle_button_click）。
   *
   * 函数键不会只留下左括号。已有完整数字时直接包成 lg(100)；
   * 还没有数字时放上 lg()，随后输入的数字填进括号里。
   *
   * @param {string} char 被点击按键的字符，如 "7"、"lg"、"÷"
   * @returns {void}
   */
  handleButtonClick(char) {
    const functions = { lg: "lg", ln: "ln", sin: "sin", cos: "cos", tan: "tan", "√": "√" };
    if (functions[char]) this.applyFunction(functions[char]);
    else if (/^[0-9.]$/.test(char)) this.inputChar(char);
    else if ("+−×÷".includes(char)) this.inputOperator(char);
    else if (char === "=") {
      this.equals();
      return;
    } else if (char === "C") {
      this.clear();
      return;
    } else if (char === "⌫") this.backspace();
    this.refresh();
  },

  /**
   * 放入一个始终成对的函数调用。
   *
   * @param {string} name 函数名，如 "lg"
   * @returns {void}
   */
  applyFunction(name) {
    this.justEvaluated = false;
    if (this.editingFn && this.expression.endsWith("()")) {
      this.expression = `${this.expression.slice(0, -1)}${name}())`;
      return;
    }
    if (this.expression && this.isComplete()) {
      this.expression = `${name}(${this.expression})`;
      this.editingFn = false;
      return;
    }
    this.expression += `${name}()`;
    this.editingFn = true;
  },

  /**
   * 追加数字或小数点。正在编辑函数时写进括号，不另补右括号。
   *
   * @param {string} char 一个数字或小数点
   * @returns {void}
   */
  inputChar(char) {
    if (this.fillFunction(char)) return;
    if (this.justEvaluated) {
      this.justEvaluated = false;
      this.expression = "";
    }
    if (char === ".") {
      if (/(?:\d+\.\d*|\.\d*)$/.test(this.expression) || this.expression.endsWith(".")) return;
      if (!/\d$/.test(this.expression)) this.expression += "0";
    } else if (/(^|[^\d.])0$/.test(this.expression)) {
      this.expression = this.expression.slice(0, -1);
    }
    this.expression += char;
  },

  /**
   * 追加四则运算符。括号里正在写数字时，运算符放在整个函数外面。
   *
   * @param {string} operator + − × ÷ 之一
   * @returns {void}
   */
  inputOperator(operator) {
    if (this.editingFn && /\(\)$/.test(this.expression)) return;
    if (this.editingFn) this.editingFn = false;
    this.justEvaluated = false;
    if (!this.expression) this.expression = "0";
    if (/[+−×÷]$/.test(this.expression)) this.expression = this.expression.slice(0, -1);
    this.expression += operator;
  },

  /**
   * 用等号冻结当前结果，显示区改为结果。
   *
   * @returns {void}
   */
  equals() {
    this.editingFn = false;
    try {
      const value = model.evaluate(this.expression);
      this.expression = formatter.formatResult(value);
      this.justEvaluated = true;
      view.renderDisplay(this.expression, "");
    } catch (error) {
      view.renderDisplay(this.expression || "0", error.message === "未完成" ? "式子还没写完" : error.message);
    }
  },

  /**
   * 清空算式和显示区。
   *
   * @returns {void}
   */
  clear() {
    this.expression = "";
    this.editingFn = false;
    this.justEvaluated = false;
    view.renderDisplay("0", "");
  },

  /**
   * 删除一个字符。删除函数里的数字时保留外面的括号。
   *
   * @returns {void}
   */
  backspace() {
    if (this.justEvaluated) {
      this.clear();
      return;
    }
    if (this.editingFn && /\([^()]*\)$/.test(this.expression)) {
      const close = this.expression.lastIndexOf(")");
      const open = this.expression.lastIndexOf("(", close);
      const inner = this.expression.slice(open + 1, close);
      if (inner) {
        this.expression = this.expression.slice(0, open + 1) + inner.slice(0, -1) + this.expression.slice(close);
      } else {
        const head = this.expression.slice(0, open);
        const token = head.match(/(?:sqrt|sin|cos|tan|lg|ln|√)$/);
        this.expression = head.slice(0, token ? -token[0].length : 0) + this.expression.slice(close + 1);
        this.editingFn = false;
      }
      return;
    }
    this.expression = this.expression.slice(0, -1);
  },

  /**
   * 把当前算式画到显示区。主屏是算式，副屏是能算出来的结果。
   *
   * @returns {void}
   */
  refresh() {
    if (this.justEvaluated) return;
    if (!this.expression) {
      view.renderDisplay("0", "");
      return;
    }
    try {
      const value = model.evaluate(this.expression);
      view.renderDisplay(this.expression, formatter.formatResult(value));
    } catch (error) {
      view.renderDisplay(this.expression, error.message === "未完成" ? "" : error.message);
    }
  },

  /**
   * 判断当前算式能不能被函数包起来。
   *
   * @returns {boolean} 算式已经能求出一个数时返回 true
   */
  isComplete() {
    try {
      model.evaluate(this.expression);
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * 把数字写进末尾那对括号。不是数字时不处理。
   *
   * @param {string} text 本次输入
   * @returns {boolean} 已经写进括号时返回 true
   */
  fillFunction(text) {
    if (!(this.editingFn && /\([^()]*\)$/.test(this.expression))) return false;
    if (!/^[0-9.]$/.test(text)) return false;
    const close = this.expression.lastIndexOf(")");
    const open = this.expression.lastIndexOf("(", close);
    let inner = this.expression.slice(open + 1, close);
    if (text === ".") {
      if (inner.includes(".")) return true;
      inner = inner ? `${inner}.` : "0.";
    } else if (inner === "0") {
      inner = text;
    } else {
      inner += text;
    }
    this.expression = this.expression.slice(0, open + 1) + inner + this.expression.slice(close);
    return true;
  },
};
