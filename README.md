# DocMee Open Platform Docs V2

基于 `Next.js 15` 与 `Nextra 4` 构建的中文开放平台文档站点，面向 DocMee AI PPT 的 UI 接入、API 接入与专项开放能力说明。

<center>
<img src="https://oss.docmee.cn/static/open/open-platform-logo.png" style="width:90px;height:90px"></img>

[🌐 文多多AiPPT](https://wenduoduo.com) | [🤖 文多多开放平台](https://open.docmee.cn)
</center>





## Why This Project

这个项目用于承载 DocMee Open Platform 的新版文档中心，统一组织以下内容：

- 能力总览，帮助团队快速判断采用 `UI 接入`、`API 接入` 还是 `开放能力`
- 基于 `@docmee/sdk-ui` 的 iframe 嵌入式接入文档
- 围绕 V2 任务链路的快速开始与 API 参考
- `HTML 转 PPTX` 等专项能力的独立说明
- 面向搜索与 LLM/RAG 的聚合文档输出

## Features

- 基于 `App Router` + `Nextra` 的多页文档站点
- 中文导航结构，按接入方式与能力域拆分内容
- 构建后自动生成 `pagefind` 静态搜索索引
- 生成 `llm-all.md` 聚合文档，便于归档和模型摄取
- 通过 `Vitest` 校验文档结构、导航元信息和关键页面约束
- 支持共享 MDX 组件，用于统一 API 文档展示样式

## Tech Stack

- `Next.js 15`
- `React 19`
- `Nextra 4`
- `Tailwind CSS 4`
- `Vitest`
- `pagefind`

## Documentation Scope

当前仓库中的文档主要分为以下板块：

- `能力总览`：从平台边界出发，帮助选择合适接入路径
- `UI 接入`：讲解 `@docmee/sdk-ui` 的初始化参数、事件回调与实例方法
- `快速开始`：说明推荐的 V2 API 主链路
- `API 参考`：按鉴权、生成、模板、PPT、记录等域拆分接口
- `开放能力`：当前重点包含 `HTML 转 PPTX`
- `定价`：补充积分和能力计费信息

## Project Structure

```text
.
├── app/                    # Next.js App Router 入口与页面壳层
├── components/             # 布局、MDX 与通用 UI 组件
├── content/                # 所有文档内容及 _meta 导航配置
├── public/                 # 静态资源与 pagefind 搜索索引
├── scripts/                # 文档聚合等辅助脚本
├── styles/                 # 站点样式补充
├── tests/                  # 文档结构测试
├── llm-all.md              # 聚合后的全文档输出
└── README.md
```

## Local Development

建议使用项目根目录 `.nvmrc` 对应的 Node.js 版本。

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

开发模式会先执行文档聚合脚本，再启动本地站点。

## Available Scripts

```bash
npm run dev               # 生成 llm-all 并启动本地开发服务器
npm run build             # 生成 llm-all，构建站点，并生成 pagefind 搜索索引
npm run start             # 启动生产模式服务
npm run test              # 运行 Vitest 测试
npm run generate:llm-all  # 聚合 content 下所有 md/mdx 文档
```

## LLM Bundle Generation

项目内置 `scripts/generate-llm-all.mjs`，会递归扫描 `content/` 目录下的 `.md` 与 `.mdx` 文件，并生成一份聚合输出。

生成结果包括：

- `llm-all.md`
- `public/llm-all.md`

每篇文档会保留：

- 源文件路径
- 页面路由路径
- 文档格式
- 原始正文边界

这份聚合文件适合用于：

- 离线归档
- 全量内容审阅
- LLM / RAG 数据摄取

> [!NOTE]
> `llm-all.md` 为生成产物，不应手工编辑。

## Search

生产构建完成后会自动执行：

```bash
pagefind --site .next/server/app --output-path public/_pagefind
```

用于生成静态站内搜索索引。

## Testing

测试位于 `tests/docs-structure.test.ts`，主要覆盖：

- 站点基础路径是否为 `/docs-v2`
- App Router 与 MDX 页面入口是否完整
- 文档目录与导航配置是否存在且顺序正确
- `UI 接入`、`开放能力`、`API 参考` 等关键板块是否按预期组织
- API 共享 MDX 组件是否已注册

运行测试：

```bash
npm run test
```

## Key Files

- `next.config.mjs`：Nextra、代码高亮、`basePath` 与图片域配置
- `app/layout.tsx`：全局布局、导航、页脚、搜索入口与品牌信息
- `app/[[...mdxPath]]/page.tsx`：MDX 页面渲染入口
- `content/_meta.tsx`：顶层导航定义
- `mdx-components.tsx`：共享 MDX 组件注册
- `scripts/generate-llm-all.mjs`：全文档聚合脚本

## Maintenance Notes

- 新增文档时同步维护对应目录下的 `_meta.ts` 或 `_meta.tsx`
- 调整导航或页面结构后优先执行 `npm run test`
- 修改内容后如需更新聚合产物，执行 `npm run generate:llm-all`
- 若部署路径变更，需同步检查 `next.config.mjs` 中的 `basePath`
