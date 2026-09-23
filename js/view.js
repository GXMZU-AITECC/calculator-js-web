/**
 * 视图层（View）：只负责页面显示与读取，不做任何运算。
 * 对应 Python 桌面版 view.py。
 *
 * 已就绪：显示区更新/读取、键盘容器引用。
 * 待实现：renderKeyboard() —— 见仓库 Issue 任务池。
 */
const view = {
  /** 主显示屏元素（index.html 中的 #display-main） */
  displayMain: document.getElementById('display-main'),

  /** 副显示屏元素（index.html 中的 #display-sub），用于展示提示信息 */
  displaySub: document.getElementById('display-sub'),

  /** 键盘容器元素（index.html 中的 #keyboard），按键将渲染在这里 */
  keyboard: document.getElementById('keyboard'),

  /**
   * 更新显示屏内容（对应 Python 版 update_display）。
   *
   * @param {string} mainText 主屏文本（当前输入或计算结果）
   * @param {string} [subText=''] 副屏文本（提示信息），不传则清空
   * @returns {void}
   */
  renderDisplay(mainText, subText = '') {
    this.displayMain.textContent = mainText;
    this.displaySub.textContent = subText;
  },

  /**
   * 读取主屏当前文本（对应 Python 版 get_display_text）。
   *
   * @returns {string} 主屏文本
   */
  getDisplayText() {
    return this.displayMain.textContent;
  },

  /**
   * 渲染键盘按键（对应 Python 版 setup_standard_buttons）。
   *
   * TODO(feat): 第一个任务是渲染数字按键 0-9，见仓库 Issue 任务池。
   * 按键样式类已在 css/style.css 预留：
   *   .key--normal 数字 | .key--action 运算符
   *   .key--danger CLEAR | .key--success 等号
   *   .key--wide 占两列（如 0 键）
   *
   * 实现方式二选一（PR 时说明你选了哪种即可）：
   *   a) 直接在 index.html 的键盘容器里写静态 HTML；
   *   b) 在这里用 JS 动态生成按键元素。
   *
   * @returns {void}
   */
  renderKeyboard() {
    // 等待你的 PR
  },
};
