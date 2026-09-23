/**
 * 程序入口：装配各层（对应 Python 桌面版 main.py）。
 *
 * Python 版的装配顺序：model -> view -> controller -> mainloop
 * 本版的装配顺序：初始化显示 -> 渲染键盘 -> （事件绑定由后续 PR 接通）
 */

// 1. 初始化显示区
view.renderDisplay('0');

// 2. 渲染键盘（当前为空容器，等按键 PR 长出来）
view.renderKeyboard();

// TODO(feat): 按键渲染完成后，在这里把按键点击事件接到
//             controller.handleButtonClick（见 Issue 任务池）
