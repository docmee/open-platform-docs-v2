# DocMee `/docs-v2` 入口层与信息架构重组设计

## 背景
当前仓库是一个基于 `Next.js 15`、`Nextra 4` 和 `nextra-theme-docs` 的文档站。站点本身通过 [next.config.mjs](/Users/micahfang/Developer/work/docmee-open-platform-docs-v2/next.config.mjs) 配置了 `basePath: '/docs-v2'`，因此用户所说的 `http://localhost:3000/docs-v2` 实际上是站点首页，而不是一个额外的子路由。

现有内容已经覆盖：

- `UI 接入`
- `快速开始`
- `API 参考`
- `开放能力`
- `定价`
- `使用指南`

但首页与顶层信息架构仍然更像“文档目录”，对首次进入的产品 / 方案角色不够友好。

## 目标
- 将站点首页重构为新的独立入口层
- 先解释平台能力边界，再帮助用户选择接入方式
- 复用现有正文页面，不重写深层内容
- 通过首页和顶层导航体现新的信息架构

## 非目标
- 不新增新的内容源或 CMS
- 不整体迁移深层文档 URL
- 不重写现有 API 详情页
- 不把文档站改成营销官网

## 目标用户
优先用户是产品 / 方案角色，其首要诉求是：

1. 先理解平台能做什么、边界在哪里
2. 再判断应该走 `UI 接入`、`API 接入` 还是 `开放能力`

## 核心结论
`/docs-v2` 应该承担“入口层”职责，而不是继续承担“文档目录首页”职责。

它的工作只有三件事：

1. 解释平台能力边界
2. 帮用户完成接入方式判断
3. 把用户导向现有正文页

## 信息架构

### 顶层结构
顶层信息架构调整为：

1. `能力总览`
2. `UI 接入`
3. `快速开始`
4. `开放能力`
5. `API 参考`
6. `定价`

其中：

- `能力总览` 由现有 [content/how-to-use/index.mdx](/Users/micahfang/Developer/work/docmee-open-platform-docs-v2/content/how-to-use/index.mdx) 升级承载
- 其余栏目继续复用现有正文页

### 首页结构
首页 [content/index.mdx](/Users/micahfang/Developer/work/docmee-open-platform-docs-v2/content/index.mdx) 重组为以下模块：

1. `Hero`
   - 回答平台能做什么
   - 给出两个首屏 CTA：理解能力、选择接入方式
2. `能力地图`
   - 用卡片解释核心能力分层
   - 卡片分别导向 `能力总览`、`UI 接入`、`快速开始`、`开放能力`
3. `接入方式选择`
   - 用步骤或决策式模块帮助判断 `UI / API / 开放能力`
4. `典型路径`
   - 提供三条任务型阅读路径：
     - 嵌入完整工作台
     - 从后端跑通 PPT 生成
     - 接入 HTML 转 PPTX
5. `文档入口总览`
   - 收口现有关键栏目和资源页

## 内容映射

### 被吸收进入口层的内容
- [content/index.mdx](/Users/micahfang/Developer/work/docmee-open-platform-docs-v2/content/index.mdx) 的现有入口卡和阅读路径
- [content/how-to-use/index.mdx](/Users/micahfang/Developer/work/docmee-open-platform-docs-v2/content/how-to-use/index.mdx) 的“平台可以做什么”和“如何选择接入方式”
- [content/getting-started/index.mdx](/Users/micahfang/Developer/work/docmee-open-platform-docs-v2/content/getting-started/index.mdx) 的推荐接入链路
- [content/api-reference/index.mdx](/Users/micahfang/Developer/work/docmee-open-platform-docs-v2/content/api-reference/index.mdx) 的接口分层说明

### 保留为正文承载层的内容
- [content/ui-integration/index.mdx](/Users/micahfang/Developer/work/docmee-open-platform-docs-v2/content/ui-integration/index.mdx)
- [content/getting-started/index.mdx](/Users/micahfang/Developer/work/docmee-open-platform-docs-v2/content/getting-started/index.mdx)
- [content/api-reference/index.mdx](/Users/micahfang/Developer/work/docmee-open-platform-docs-v2/content/api-reference/index.mdx)
- [content/open-capabilities/html-to-pptx/introduction.mdx](/Users/micahfang/Developer/work/docmee-open-platform-docs-v2/content/open-capabilities/html-to-pptx/introduction.mdx)
- [content/pricing/index.mdx](/Users/micahfang/Developer/work/docmee-open-platform-docs-v2/content/pricing/index.mdx)

## 实现边界
- 继续使用现有 `Nextra` 文档骨架
- 不增加新的路由系统
- 优先通过修改首页、根级 `_meta` 和少量可复用 MDX 组件完成入口层升级
- 如需新增展示组件，优先做小而通用的组件，不增加状态复杂度

## 验收标准
- 访问 `/docs-v2` 时，首页首先呈现能力边界和接入分流，而不是文档目录
- 顶层导航出现 `能力总览`
- 首页显式提供三类典型路径：`UI 接入`、`API 接入`、`开放能力`
- 现有深层正文 URL 保持可用
- `vitest`、`next build` 通过

## 风险与取舍

### 风险 1：信息架构调整不足，只改了首页文案
取舍：必须同步调整根级 `_meta`，让新入口心智在顶层导航可见。

### 风险 2：增加过多新页面，反而形成第二套文档树
取舍：优先升级现有 `how-to-use` 页面承载 `能力总览`，避免新增一套内容资产。

### 风险 3：入口层和正文层文案重复
取舍：入口层只负责概括、选择和导流，不复制深层实现细节。
