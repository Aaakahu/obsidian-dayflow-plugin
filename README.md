# 🌊 DayFlow — Obsidian 日程流插件

> 闪念记录 · 日程管理 · 行动打卡 · 心绪追踪 · 悬浮球快速入口

DayFlow 是一款专为 Obsidian 设计的日程与心绪管理插件，将碎片化的灵感捕捉、结构化的日程规划、可视化的行动追踪融为一体，并通过悬浮球提供无处不在的快速入口。

---

## ✨ 功能特性

### 📝 闪念记录（Captures）
- 随时记录脑海中一闪而过的想法
- 自动归档到指定文件夹 `DayFlow/Captures`
- 支持 AI 辅助反馈，即时获得建议与启发

### 📅 日程管理（Schedules）
- 日度/时间线视图管理日程
- 自动打开昨日日程，延续工作流
- 自定义时间线默认展示天数

### ✅ 行动打卡（Habits）
- 自定义习惯项目与打卡模板
- 支持复杂多层级打卡清单
- 模板化习惯追踪（如"前额叶训练"等专业模板）

### 💭 心绪闪念（Journals）
- 快速记录情绪与心理状态
- 独立归档到 `DayFlow/Journals`

### 🔮 悬浮球（Orb）
- 可拖拽的悬浮快捷入口
- 支持固定位置或自由摆放
- 一键直达核心功能

### 🤖 AI 集成
- 支持 **DeepSeek**、**OpenAI**、**Claude** 及本地模型（Ollama）
- 可调节 Temperature 参数控制回复风格
- 知识库文件夹关联，让 AI 基于你的笔记作答

---

## 📦 安装方式

### 方式一：Obsidian 社区插件（推荐，等待上架中）
1. 打开 Obsidian → 设置 → 第三方插件
2. 关闭安全模式
3. 浏览社区插件市场，搜索 "DayFlow"
4. 点击安装并启用

### 方式二：手动安装（Beta）
1. 下载本仓库最新 [Release](https://github.com/Aaakahu/obsidian-dayflow-plugin/releases) 中的 `main.js`、`manifest.json`、`styles.css`
2. 在你的 Obsidian 仓库目录下创建文件夹：`.obsidian/plugins/dayflow/`
3. 将三个文件放入该文件夹
4. 重启 Obsidian，在设置 → 第三方插件中启用 DayFlow

### 方式三：BRAT 安装
1. 安装 [BRAT](https://github.com/TfTHacker/obsidian42-brat) 插件
2. 添加 Beta 插件地址：`Aaakahu/obsidian-dayflow-plugin`

---

## ⚙️ 配置说明

首次启用插件后，Obsidian 会自动生成 `data.json` 配置文件。你可以参考仓库中的 [`data.example.json`](./data.example.json) 了解所有可配置项：

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `capturesFolder` | 闪念笔记保存路径 | `DayFlow/Captures` |
| `schedulesFolder` | 日程笔记保存路径 | `DayFlow/Schedules` |
| `journalsFolder` | 心绪笔记保存路径 | `DayFlow/Journals` |
| `aiProvider` | AI 服务提供商 | `deepseek` |
| `deepseekApiKey` | DeepSeek API 密钥 | — |
| `customBaseUrl` | 自定义 API 基础地址 | OpenAI 官方地址 |
| `floatingButtonEnabled` | 是否启用悬浮按钮 | `true` |
| `orbEnabled` | 是否启用悬浮球 | `true` |
| `habits` | 习惯打卡项目列表 | `[]` |
| `habitTemplates` | 习惯模板对象 | `{}` |
| `timelineDefaultDays` | 时间线默认展示天数 | `10` |

> ⚠️ **隐私提醒**：`data.json` 包含你的 API 密钥等敏感信息，不会被上传到 GitHub（已加入 `.gitignore`）。请妥善保管你的个人配置文件。

---

## 🚀 使用指南

### 快速开始
1. 启用插件后，在 Obsidian 左侧 ribbon 栏找到 DayFlow 图标
2. 点击即可打开今日日程面板
3. 通过悬浮球（orb）随时唤出核心功能

### 设置 AI 助手
1. 进入插件设置
2. 选择 AI 提供商（DeepSeek / OpenAI / Claude / Local）
3. 填入对应的 API 密钥
4. （可选）指定知识库文件夹，让 AI 基于你的笔记作答

### 自定义习惯模板
在设置中添加习惯名称和对应的 Markdown 模板，即可生成结构化的打卡页面。

---

## 🛠️ 开发相关

本插件采用原生 JavaScript + CSS 开发，无额外构建依赖。

```
.
├── main.js          # 主逻辑（已编译）
├── styles.css       # 样式文件
├── manifest.json    # 插件清单
├── data.example.json # 配置示例（供参考）
└── README.md        # 本文件
```

---

## 📄 License

MIT © [Aaakahu](https://github.com/Aaakahu)

---

> 如果 DayFlow 对你的工作流有所帮助，欢迎给本仓库点个 ⭐ Star！
