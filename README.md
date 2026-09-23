# calculator-js-web · AITECC

> 科技社研发部 **招新面试考核项目** —— 简易计算器（Web 版）
> 页面骨架已就绪（显示区 + 键盘容器），按键与计算功能不预先实现，由面试者的 PR 逐步「长出来」；考核衡量的是协作规范的执行，而非功能多少。
> ⚠️ 本仓库内容属**社团内部资产**，请勿外传（见 guidelines [D3](https://github.com/GXMZU-AITECC/guidelines)）。

## ✨ 特性

- **零依赖**：纯 HTML/CSS/JS，无构建工具，双击 `index.html` 即可运行
- **MVC 架构**：model / view / controller / formatter / main 五层，职责清晰
- **任务驱动**：考核以协作流程为准；功能按 Issue 任务池的 PR 逐步实现，选题不限

## 🚀 快速开始

1. 双击 `index.html` 用浏览器打开（可选：VS Code + Live Server 插件，边改边看）
2. 先读组织规范 [guidelines](https://github.com/GXMZU-AITECC/guidelines)
3. 在 [Issue 列表](https://github.com/GXMZU-AITECC/calculator-js-web/issues) 认领任务（**面试考核从 [#1](https://github.com/GXMZU-AITECC/calculator-js-web/issues/1) 开始**）

## 🛠️ 项目结构（MVC）

| 文件 | 职责 | 状态 |
| ---- | ---- | ---- |
| `index.html` + `css/style.css` | 页面结构与样式（显示区 / 键盘容器） | ✅ 已就绪 |
| `js/view.js` | 页面显示与读取 | 显示区就绪，键盘渲染待实现 |
| `js/model.js` | 运算逻辑 | ⏳ 待实现 |
| `js/controller.js` | 按键事件处理 | ⏳ 待实现 |
| `js/formatter.js` | 结果格式化 | ⏳ 待实现 |
| `js/main.js` | 装配入口 | ✅ 已就绪 |

## 🤝 参与贡献

1. **先读组织规范**：[guidelines](https://github.com/GXMZU-AITECC/guidelines)（开发规范 / PR 规范 / Repo 规范）
2. **认领任务**：在 [Issue 列表](https://github.com/GXMZU-AITECC/calculator-js-web/issues) 认领一个任务（面试考核从 #1 开始）
3. **开发**：fork 本仓库 → 从 `develop` 拉取 `feature/...` 分支 → 开发（函数注释写清功能、参数、返回值，见 guidelines B3）
4. **提 PR**：向 `develop` 提交，标题用 `feat:` / `fix:` 前缀（见 guidelines C2），描述按「目的 / 改动 / 测试」三段写（见 guidelines C3）
5. **评审**：@至少 2 名评审人，至少 1 人批准后由项目负责人合并（见 guidelines C5）

### 💡 面试选题没有思路？

- 功能**不限方向**：标准 / 科学 / 程序员（进制转换、位运算）/ 时间换算……参考市面上的计算器即可，做出自己的花样
- **界面与动效同样是合格的 PR**：改 CSS 样式、加按键动画，一样计入考核
- 组织早期桌面版（Python）已实现进制转换、位运算、时间换算等，源码收录在 [reference/py-demo/](reference/py-demo/)，欢迎参考借鉴

## 📄 许可证

本项目采用 [MIT License](LICENSE) 许可。
