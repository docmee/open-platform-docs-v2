# DocMee `/docs-v2` Entry Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 新增一个 `/docs-v2` 独立文档入口页面，用现有内容重组出能力导览与接入分流层。

**Architecture:** 实现基于现有 `Nextra 4` 内容系统完成，在 `content/docs-v2/` 下增加新的入口页，并通过根 `_meta` 注册为顶层入口。页面本身使用少量新的 MDX 展示组件与局部样式构建，所有深层正文继续沿用现有 URL。

**Tech Stack:** `Next.js 15`, `Nextra 4`, `React 19`, `TypeScript`, `MDX`, `SCSS`, `Vitest`

---

## File Map

**Create:**
- `content/docs-v2/index.mdx`
- `content/docs-v2/_meta.ts`
- `components/mdx/DocsV2Hero.tsx`
- `components/mdx/DocsV2SectionNav.tsx`
- `components/mdx/DocsV2CapabilityGrid.tsx`
- `components/mdx/DocsV2DecisionCards.tsx`
- `components/mdx/DocsV2Pathways.tsx`
- `components/mdx/DocsV2DocLinks.tsx`

**Modify:**
- `content/_meta.tsx`
- `mdx-components.tsx`
- `styles/nextra.scss`
- `tests/docs-structure.test.ts`

## Task 1: Lock `/docs-v2` Structure With Failing Tests

**Files:**
- Modify: `tests/docs-structure.test.ts`

- [ ] **Step 1: Add a failing test for the new docs-v2 entry**
Assert:
  - `content/docs-v2/index.mdx` exists
  - `content/docs-v2/_meta.ts` exists
  - `content/_meta.tsx` contains a `docs-v2` top-level entry
  - `/docs-v2` content references capability overview, integration choice, and existing destination routes

- [ ] **Step 2: Run the targeted test and verify it fails**
Run: `pnpm test`
Expected: FAIL because the `docs-v2` files and navigation entry do not exist yet

## Task 2: Build the Minimal `/docs-v2` MDX Components

**Files:**
- Create: `components/mdx/DocsV2Hero.tsx`
- Create: `components/mdx/DocsV2SectionNav.tsx`
- Create: `components/mdx/DocsV2CapabilityGrid.tsx`
- Create: `components/mdx/DocsV2DecisionCards.tsx`
- Create: `components/mdx/DocsV2Pathways.tsx`
- Create: `components/mdx/DocsV2DocLinks.tsx`
- Modify: `mdx-components.tsx`

- [ ] **Step 1: Implement the smallest set of reusable docs-v2 components**
Each component should only render structured content for the new entry page and accept plain serializable props.

- [ ] **Step 2: Run tests again**
Run: `pnpm test`
Expected: file-existence assertions improve, while content assertions still fail until the MDX page is written

## Task 3: Author the `/docs-v2` Page and Register Navigation

**Files:**
- Create: `content/docs-v2/index.mdx`
- Create: `content/docs-v2/_meta.ts`
- Modify: `content/_meta.tsx`

- [ ] **Step 1: Register `docs-v2` as a top-level `page` entry**
Place it before the existing technical sections so the new entry is easy to discover.

- [ ] **Step 2: Write the `/docs-v2` page**
Include:
  - Hero
  - Section navigation
  - Capability overview
  - Integration choice
  - Typical pathways
  - Docs entry links

All outbound links must point to existing routes.

- [ ] **Step 3: Use page-level theme settings to minimize default docs chrome**
Disable or weaken sidebar / toc on `/docs-v2` so it behaves like an entry layer, not a deep article page.

- [ ] **Step 4: Run tests and verify the new structure passes**
Run: `pnpm test`
Expected: PASS for the new `/docs-v2` assertions

## Task 4: Style the New Entry Layer Without Breaking Existing Docs

**Files:**
- Modify: `styles/nextra.scss`

- [ ] **Step 1: Add scoped styles for docs-v2**
Style only the new components and container classes needed by `/docs-v2`.

- [ ] **Step 2: Verify existing homepage and docs surfaces are not regressed**
Prefer reusing current tokens and card patterns instead of inventing a parallel design system.

## Task 5: Run Verification

**Files:**
- Verify: whole project

- [ ] **Step 1: Run unit checks**
Run: `pnpm test`
Expected: PASS

- [ ] **Step 2: Run production build**
Run: `pnpm build`
Expected: PASS

- [ ] **Step 3: Review the rendered `/docs-v2` page manually if the local server is available**
Check:
  - section order
  - link targets
  - mobile wrapping
  - no obvious layout collision with the global docs shell
