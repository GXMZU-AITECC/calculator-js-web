/**
 * 程序入口：装配各层（对应 Python 桌面版 main.py）。
 *
 * Python 版的装配顺序：model -> view -> controller -> mainloop
 * 本版的装配顺序：初始化显示 -> 渲染键盘 -> 把按键点击接到控制器
 */

// 1. 初始化显示区
view.renderDisplay('0');

// 2. 渲染键盘
view.renderKeyboard();

// 3. 按键点击交给 controller.handleButtonClick
view.keyboard.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button || !button.dataset.char) return;
  controller.handleButtonClick(button.dataset.char);
});
