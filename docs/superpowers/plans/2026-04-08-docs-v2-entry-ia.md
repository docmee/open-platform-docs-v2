# DocMee `/docs-v2` Entry IA Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将站点首页 `/docs-v2` 重构为能力优先的独立入口层，并通过顶层导航体现新的信息架构，同时复用现有正文页面。

**Architecture:** 继续使用现有 `Nextra 4` 文档框架，不增加新的数据源或重写深层路由。实现集中在根级导航元数据、首页 MDX 内容、`how-to-use` 能力总览页以及少量通用首页组件的轻量扩展。

**Tech Stack:** `Next.js 15`, `React 19`, `Nextra 4`, `nextra-theme-docs`, `MDX`, `TypeScript`, `Vitest`

---

## File Map

**Modify:**
- `content/_meta.tsx` - 新增并调整顶层导航顺序，暴露 `能力总览`
- `content/index.mdx` - 重写首页模块，改为能力边界 + 接入决策 + 典型路径
- `content/how-to-use/index.mdx` - 升级为 `能力总览` 页面
- `components/mdx/HomeCardGrid.tsx` - 支持自定义 section 标题和说明
- `components/mdx/HomeFlow.tsx` - 支持承载接入方式 / 决策模块文案
- `components/mdx/HomeReadingPaths.tsx` - 支持自定义 section 标题和说明
- `tests/docs-structure.test.ts` - 锁定新的导航与首页结构

**Verify:**
- `next.config.mjs` - 确认站点 basePath 仍是 `/docs-v2`
- `content/ui-integration/index.mdx`
- `content/getting-started/index.mdx`
- `content/api-reference/index.mdx`
- `content/open-capabilities/html-to-pptx/introduction.mdx`

## Task 1: Write the Failing IA Tests

**Files:**
- Modify: `tests/docs-structure.test.ts`

- [ ] **Step 1: Add assertions for the new top-level IA**

Add assertions for:

```ts
const metaText = readFileSync('content/_meta.tsx', 'utf8')
expect(metaText).toContain("'how-to-use':")
expect(metaText).toContain('能力总览')
expect(metaText.indexOf("'how-to-use':")).toBeLessThan(metaText.indexOf("'ui-integration':"))
```

- [ ] **Step 2: Add assertions for the new homepage structure**

Add assertions for:

```ts
const homeText = readFileSync('content/index.mdx', 'utf8')
expect(homeText).toContain('能力地图')
expect(homeText).toContain('选择接入方式')
expect(homeText).toContain('/how-to-use')
expect(homeText).toContain('/ui-integration')
expect(homeText).toContain('/getting-started')
expect(homeText).toContain('/open-capabilities/html-to-pptx/introduction')
```

- [ ] **Step 3: Add assertions for the upgraded overview page**

Add assertions for:

```ts
const overviewText = readFileSync('content/how-to-use/index.mdx', 'utf8')
expect(overviewText).toContain('能力总览')
expect(overviewText).toContain('能力边界')
expect(overviewText).toContain('UI 接入')
expect(overviewText).toContain('API 接入')
expect(overviewText).toContain('开放能力')
```

- [ ] **Step 4: Run tests to verify the new expectations fail**

Run: `pnpm test`
Expected: FAIL because the current IA does not yet contain the new homepage and overview structure

## Task 2: Extend the Reusable Homepage Components

**Files:**
- Modify: `components/mdx/HomeCardGrid.tsx`
- Modify: `components/mdx/HomeFlow.tsx`
- Modify: `components/mdx/HomeReadingPaths.tsx`

- [ ] **Step 1: Add optional heading props to `HomeCardGrid`**

Allow callers to pass:

```tsx
title?: string
description?: string
```

Default to the current strings so existing behavior is preserved.

- [ ] **Step 2: Add optional heading props to `HomeFlow`**

Allow callers to pass:

```tsx
title?: string
description?: string
```

- [ ] **Step 3: Add optional heading props to `HomeReadingPaths`**

Allow callers to pass:

```tsx
title?: string
description?: string
```

- [ ] **Step 4: Run tests to confirm no existing structure assertions regress**

Run: `pnpm test`
Expected: still FAIL overall because content changes are not implemented yet, but component-related assertions remain valid

## Task 3: Rebuild the Root IA

**Files:**
- Modify: `content/_meta.tsx`
- Modify: `content/index.mdx`
- Modify: `content/how-to-use/index.mdx`

- [ ] **Step 1: Expose `how-to-use` as a first-class top-level nav item**

Update `content/_meta.tsx` so:
- `how-to-use` is present
- title is `能力总览`
- it appears before `ui-integration`

- [ ] **Step 2: Rewrite `content/index.mdx` as the new entry layer**

Update the homepage to include:
- Hero focused on platform capability boundaries
- a capability map section
- a “选择接入方式” decision section
- a typical paths section
- a final document entry section

All links must point to existing content pages.

- [ ] **Step 3: Rewrite `content/how-to-use/index.mdx` as the overview page**

Make it the durable “能力总览” page that explains:
- platform capability boundaries
- when to choose `UI 接入`
- when to choose `API 接入`
- when to choose `开放能力`

- [ ] **Step 4: Run tests to confirm the new IA is wired**

Run: `pnpm test`
Expected: PASS

## Task 4: Verify Runtime Integrity

**Files:**
- Verify: `app/layout.tsx`
- Verify: `next.config.mjs`

- [ ] **Step 1: Run production build**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 2: Spot-check the homepage and top nav locally**

Run: `pnpm dev`
Check:
- `/docs-v2` renders the new homepage
- top nav exposes `能力总览`
- homepage links land on existing sections

- [ ] **Step 3: Summarize any residual risks**

Capture:
- whether top nav naming is sufficient or still too technical
- whether `能力总览` and homepage still overlap too much
