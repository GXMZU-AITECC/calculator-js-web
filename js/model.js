/**
 * 模型层（Model）：纯运算逻辑，不接触任何页面元素。
 * 对应 Python 桌面版 model.py —— 实现思路可直接参考它。
 *
 * 待实现：四则运算 evaluate() —— 见仓库 Issue 任务池。
 */
const model = {
  /**
   * 计算数学表达式并返回结果（对应 Python 版 evaluate）。
   *
   * TODO(feat): 先支持 + - * / 四则运算；
   * 后续任务（括号、小数、取模等）会按 Issue 任务池逐步加入，
   * 一切等着慢慢长出来。
   *
   * @param {string} expression 要计算的数学表达式字符串，如 "1+2*3"
   * @returns {number} 计算结果
   * @throws {Error} 表达式为空或语法错误时抛出
   */
  evaluate(expression) {
    // 等待你的 PR
    throw new Error('model.evaluate 尚未实现，等待 PR');
  },
};
