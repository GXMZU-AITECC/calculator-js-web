# calculator-js-web

## 项目简介

简易计算器（Web 版）——科技社研发部**协作训练场**：页面骨架已就绪（显示区 + 键盘容器），按键与计算功能不预先实现，全部由成员的 PR 逐步"长出来"。

原型为 Python 桌面版 [demo-simple-calculator](https://github.com/GXMZU-AITECC/demo-simple-calculator)（MVC 架构），本项目将其移植为纯 HTML/CSS/JS，文件一一对应，方便对照阅读。

## 设备依赖

无。任何能运行浏览器的电脑即可。

## 环境配置

无需安装任何依赖（无第三方库、无构建工具）。可选：VS Code + Live Server 插件（边改边看）。

## 使用方法

双击 `index.html` 用浏览器打开即可。

## 项目结构（MVC，与 Python 版一一对应）

| 文件 | 职责 | 对应 Python 版 |
| ---- | ---- | -------------- |
| `js/model.js` | 运算逻辑（**待实现**） | `model.py` |
| `js/view.js` | 页面显示（显示区已就绪，键盘渲染待实现） | `view.py` |
| `js/controller.js` | 按键事件处理（**待实现**） | `controller.py` |
| `js/formatter.js` | 结果格式化（**待实现**） | `formatter.py` |
| `js/main.js` | 装配入口 | `main.py` |
| `index.html` + `css/style.css` | 页面结构与样式（显示区/键盘容器就绪，按键样式类已预留） | `view.py` 界面部分 |

## 维护人员

科技社技术部·研发部（负责人：陈自超）

## 参与贡献（新成员必读）

1. **先读组织规范**：[guidelines](https://github.com/GXMZU-AITECC/guidelines)（开发规范 / PR 规范 / Repo 规范）
2. **认领任务**：在仓库 Issue 列表认领一个任务
3. **开发**：fork 本仓库 → 从 `develop` 拉取 `feature/...` 分支 → 开发（函数写清楚注释：功能、参数、返回值）
4. **提 PR**：向 `develop` 提交，标题用 `feat:` / `fix:` 前缀，描述按「目的 / 改动 / 测试」三段写
5. **评审**：@至少 2 名评审人，至少 1 人批准后由项目负责人合并
