# Squad Map Manager WebUI

一款面向《战术小队》（Squad）服务器管理的离线地图预设命令生成器。通过图形界面选择地图、图层、阵营与编制，生成可直接复制的 `AdminSetNextLayer` 或 `AdminChangeLayer` 命令；也可以按难度、地图大小、模式和平衡阈值随机生成图池。

当前界面版本：**v3.2**  
作者：**[POST]MirageStar**

## 功能

- 按名称、图层、生态和地图类型搜索或筛选地图
- 生成预设下一张地图与立即换图命令
- 根据地图生态、地图类型和图层大小筛选可用阵营及编制
- 支持限制同联盟阵营对战，也可开启内战组合
- 根据图层和双方编制计算平衡值，并提示优势过大的组合
- 按难度、大小、游戏模式、平衡阈值和数量随机生成图池
- 一键复制单条命令或整个图池
- 支持简体中文和英文界面
- 纯 HTML、CSS、JavaScript 实现，无需安装依赖，可离线运行

## 快速开始

### 直接运行

使用现代浏览器打开项目根目录下的 `index.html` 即可。

> 浏览器如果限制本地页面访问剪贴板，程序会自动尝试使用兼容的复制方式。

### 构建单文件版本

运行：

```powershell
.\build-single-html.cmd
```

或直接执行 PowerShell 脚本：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\build-single-html.ps1
```

构建脚本会把样式、配置、翻译和应用脚本内联，并生成：

```text
dist/
├── SquadMapManager.html
└── start.cmd
```

将 `dist` 目录整体分发即可；双击 `start.cmd` 或直接打开 `SquadMapManager.html` 均可运行。

## 使用说明

### 生成地图命令

1. 在左侧搜索或筛选并选择地图。
2. 选择该地图下的游戏模式（图层）。
3. 选择“预设”或“换图”操作。
4. 选择双方阵营及编制；需要同联盟对战时开启“允许内战”。
5. 查看平衡值，确认后复制命令。

命令格式如下：

```text
AdminSetNextLayer <Layer> <Faction1>+<Formation1> <Faction2>+<Formation2>
AdminChangeLayer  <Layer> <Faction1>+<Formation1> <Faction2>+<Formation2>
```

`AdminChangeLayer` 会立即切换服务器当前地图，使用前请确认命令内容。

### 生成随机图池

切换到“随机图池”页签后，可以设置：

- 图层难度：简单、进阶、困难
- 地图大小：小型、中型、大型
- 游戏模式：AAS、RAAS、INV、INS、DES、SKR、TC、SEED
- 平衡阈值：仅保留平衡值绝对值不超过阈值的组合
- 生成数量：1 至 50 条

图池会从所有符合条件的地图、图层、阵营和编制组合中随机抽取，输出 `AdminSetNextLayer` 命令。随机结果不会包含相同阵营的双方组合，并遵循当前的内战设置。

## 项目结构

```text
.
├── index.html                    # 页面结构及脚本加载顺序
├── styles.css                    # 页面样式与响应式布局
├── app.js                        # 界面状态、渲染、命令和图池逻辑
├── config.js                     # 汇总并导出完整运行时配置
├── config/
│   ├── core.js                   # 公共枚举、标签、平衡警戒值和数据助手
│   ├── maps.js                   # 地图及图层数据
│   ├── factions.js               # 阵营、联盟、生态和编制数据
│   ├── mapRules.js               # 地图搜索与筛选规则
│   └── factionRules.js           # 阵营对战及编制可用性规则
├── i18n/
│   ├── index.js                  # 国际化运行时与默认语言
│   ├── zh-CN.js                  # 简体中文文案
│   └── en-US.js                  # 英文文案
├── tools/
│   └── build-single-html.ps1     # 单文件构建脚本
├── webview/
│   └── launch-webview.ps1        # WebView2 / Edge 应用窗口启动脚本
└── build-single-html.cmd         # Windows 构建入口
```

## 配置维护

### 地图与图层

地图数据位于 `config/maps.js`。每张地图包含：

- `id`：内部唯一标识，同时用于国际化映射
- `name`：默认显示名称
- `ecosystem`：所属生态，决定哪些阵营可用
- `mapType`：地图类型，用于筛选及两栖阵营限制
- `modes`：图层列表，包含图层名、模式、大小、难度和阵营 1 的基础优势值

新增生态、地图类型、难度、大小或模式枚举时，还需同步维护 `config/core.js` 以及对应的国际化标签。

### 阵营与编制

阵营数据位于 `config/factions.js`。每个阵营包含：

- `name`：命令中使用的阵营代码
- `alliance`：联盟归属，用于限制内战
- `ecosystems`：允许出现的地图生态
- `formations`：可选编制及其优势值
- `amphibiousOnly`：是否仅允许用于大型两栖地图

当前规则会将小型图层的可选编制限制为 `CombinedArms`。规则实现位于 `config/factionRules.js`，如需改变判断方式应在该文件中维护。

### 平衡值

命令的平衡值计算方式为：

```text
图层的阵营1基础优势 + 阵营1编制优势 - 阵营2编制优势
```

绝对值越小表示双方越接近平衡。界面的警戒值定义在 `config/core.js` 的 `BALANCE_WARNING`；随机图池则使用用户设置的平衡阈值过滤组合。

### 国际化

新增或修改界面文案时，请同步维护 `i18n/zh-CN.js` 和 `i18n/en-US.js`。新增地图、阵营或编制时，也应补充相应语言文件中的名称映射。

页面脚本存在依赖顺序。如果在 `index.html` 中调整加载项，应保持以下顺序：核心配置与数据 → 规则 → 语言包与国际化运行时 → `config.js` → `app.js`。

## 运行环境

- 推荐使用最新版本的 Microsoft Edge、Google Chrome 或 Firefox
- 独立窗口模式需要 Windows，以及 Microsoft Edge WebView2 Runtime 或 Microsoft Edge
- 构建单文件版本需要 Windows PowerShell 5.1 或 PowerShell 7+

项目运行和构建均不依赖 Node.js、npm 或外部网络服务。
