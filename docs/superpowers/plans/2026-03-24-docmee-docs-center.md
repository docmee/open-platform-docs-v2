# DocMee Docs Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有 DocMee 文档站重设计为接近 `langfuse docs` 的产品化文档风格，同时保持现有路由、内容结构和 `Nextra` 维护方式。

**Architecture:** 改版继续基于现有 `Nextra 4` 文档主题，不重写路由或内容体系。实现集中在 `app/layout.tsx` 的站点骨架、`app/global.css` 的视觉变量和全局样式，以及首页 MDX 与少量展示组件的结构化升级，确保首页和文档内页使用同一套冷紫视觉语言。

**Tech Stack:** `Next.js 15`, `React 19`, `Nextra 4`, `nextra-theme-docs`, `TypeScript`, `MDX`, `Tailwind CSS 4`, `Vitest`

---

## File Map

**Modify:**
- `app/layout.tsx` - 调整导航、页脚、外层容器和主题入口，挂接新的品牌化布局
- `app/global.css` - 定义冷紫配色变量、页面背景、导航、侧栏、正文、代码块、表格和首页模块样式
- `content/index.mdx` - 将首页重组为 Hero、入口卡片、接入流程、推荐阅读四个模块
- `tests/docs-structure.test.ts` - 扩展首页结构和设计文件的基础断言

**Create:**
- `components/mdx/HomeHero.tsx` - 首页 Hero 区块组件
- `components/mdx/HomeCardGrid.tsx` - 首页核心入口卡片组件
- `components/mdx/HomeFlow.tsx` - 首页接入流程组件
- `components/mdx/HomeReadingPaths.tsx` - 首页推荐阅读组件

**Verify existing compatibility with:**
- `content/_meta.ts` - 根导航顺序与首页入口文案是否一致
- `content/api-reference/**/*.mdx` - 新的全局样式不能破坏接口文档阅读

## Task 1: Add Structure Tests for the Redesigned Homepage

**Files:**
- Modify: `tests/docs-structure.test.ts`
- Test: `tests/docs-structure.test.ts`

- [ ] **Step 1: Extend the failing test with homepage redesign expectations**

Add assertions that verify:

```ts
expect(readFileSync('content/index.mdx', 'utf8')).toContain('HomeHero')
expect(readFileSync('content/index.mdx', 'utf8')).toContain('HomeCardGrid')
expect(readFileSync('content/index.mdx', 'utf8')).toContain('HomeFlow')
expect(readFileSync('content/index.mdx', 'utf8')).toContain('HomeReadingPaths')
expect(existsSync('components/mdx/HomeHero.tsx')).toBe(true)
expect(existsSync('components/mdx/HomeCardGrid.tsx')).toBe(true)
expect(existsSync('components/mdx/HomeFlow.tsx')).toBe(true)
expect(existsSync('components/mdx/HomeReadingPaths.tsx')).toBe(true)
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test`
Expected: FAIL because the homepage redesign components and MDX references do not exist yet

- [ ] **Step 3: Commit the red test change**

```bash
git add tests/docs-structure.test.ts
git commit -m "test: cover redesigned homepage structure"
```

## Task 2: Build Reusable Homepage Sections

**Files:**
- Create: `components/mdx/HomeHero.tsx`
- Create: `components/mdx/HomeCardGrid.tsx`
- Create: `components/mdx/HomeFlow.tsx`
- Create: `components/mdx/HomeReadingPaths.tsx`
- Modify: `tests/docs-structure.test.ts`

- [ ] **Step 1: Implement the minimal homepage components**

Create `components/mdx/HomeHero.tsx` with a focused API:

```tsx
type Action = { href: string; label: string; kind?: 'primary' | 'secondary' }

export function HomeHero({
  eyebrow,
  title,
  description,
  actions
}: {
  eyebrow: string
  title: string
  description: string
  actions: Action[]
}) {
  return (
    <section className="home-hero">
      <p className="home-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="home-lead">{description}</p>
      <div className="home-actions">
        {actions.map((action) => (
          <a
            key={action.href}
            className={action.kind === 'secondary' ? 'home-button secondary' : 'home-button primary'}
            href={action.href}
          >
            {action.label}
          </a>
        ))}
      </div>
    </section>
  )
}
```

Create `components/mdx/HomeCardGrid.tsx`:

```tsx
type CardItem = { href: string; title: string; description: string; badge: string }

export function HomeCardGrid({ items }: { items: CardItem[] }) {
  return (
    <section className="home-section">
      <div className="home-section-heading">
        <h2>核心入口</h2>
        <p>从最常用的路径进入文档。</p>
      </div>
      <div className="home-card-grid">
        {items.map((item) => (
          <a key={item.href} href={item.href} className="home-card">
            <span className="home-card-badge">{item.badge}</span>
            <strong>{item.title}</strong>
            <span>{item.description}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
```

Create `components/mdx/HomeFlow.tsx`:

```tsx
type FlowStep = { title: string; description: string }

export function HomeFlow({ steps }: { steps: FlowStep[] }) {
  return (
    <section className="home-section">
      <div className="home-section-heading">
        <h2>接入流程</h2>
        <p>按顺序完成平台接入和联调。</p>
      </div>
      <div className="home-flow">
        {steps.map((step, index) => (
          <div key={step.title} className="home-flow-step">
            <span className="home-flow-index">{String(index + 1).padStart(2, '0')}</span>
            <strong>{step.title}</strong>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

Create `components/mdx/HomeReadingPaths.tsx`:

```tsx
type ReadingPath = { href: string; title: string; description: string }

export function HomeReadingPaths({ items }: { items: ReadingPath[] }) {
  return (
    <section className="home-section">
      <div className="home-section-heading">
        <h2>推荐阅读</h2>
        <p>按任务快速找到合适的阅读路径。</p>
      </div>
      <div className="home-reading-paths">
        {items.map((item) => (
          <a key={item.href} href={item.href} className="home-reading-card">
            <strong>{item.title}</strong>
            <span>{item.description}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Run tests to verify the file-existence assertions pass**

Run: `pnpm test`
Expected: FAIL or PASS depending on whether `content/index.mdx` is already updated; file existence checks should now pass

- [ ] **Step 3: Commit the new homepage components**

```bash
git add components/mdx/HomeHero.tsx components/mdx/HomeCardGrid.tsx components/mdx/HomeFlow.tsx components/mdx/HomeReadingPaths.tsx
git commit -m "feat: add homepage redesign sections"
```

## Task 3: Rebuild the Homepage MDX Around the New Sections

**Files:**
- Modify: `content/index.mdx`
- Modify: `tests/docs-structure.test.ts`
- Verify: `content/_meta.ts`

- [ ] **Step 1: Rewrite the homepage to use the new section components**

Update `content/index.mdx` to import the new components and replace the previous plain-link layout with:

```mdx
import { HomeHero } from '../components/mdx/HomeHero'
import { HomeCardGrid } from '../components/mdx/HomeCardGrid'
import { HomeFlow } from '../components/mdx/HomeFlow'
import { HomeReadingPaths } from '../components/mdx/HomeReadingPaths'

<HomeHero
  eyebrow="DocMee Open Platform"
  title="面向 AI PPT 与演示内容生成的开放平台文档"
  description="从快速开始到 API 参考，在统一的文档入口中完成接入、调试和上线。"
  actions={[
    { href: '/getting-started', label: '快速开始' },
    { href: '/api-reference', label: '查看 API', kind: 'secondary' }
  ]}
/>
```

Add one `HomeCardGrid`, one `HomeFlow`, and one `HomeReadingPaths` with DocMee-relevant Chinese copy that points to existing routes only.

If MDX import resolution requires aliasing instead of relative paths, use the existing project convention consistently and update the test expectation accordingly.

- [ ] **Step 2: Run the structure test to verify the homepage is wired correctly**

Run: `pnpm test`
Expected: PASS for the homepage structure assertions

- [ ] **Step 3: Commit the homepage rewrite**

```bash
git add content/index.mdx tests/docs-structure.test.ts
git commit -m "feat: redesign docs homepage content"
```

## Task 4: Re-theme the Site Shell and Documentation Surfaces

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/global.css`
- Verify: `app/[[...mdxPath]]/page.tsx`

- [ ] **Step 1: Adjust the layout shell for the redesigned docs frame**

Update `app/layout.tsx` so that:

- the navbar logo area feels more product-like and less default-theme
- the footer is visually lighter and aligned with the new tone
- the page wrapper can accept custom class hooks for global styling
- the layout still uses `getPageMap('')` and existing `Layout` integration

Use a metadata baseline like:

```tsx
export const metadata = {
  title: {
    default: 'DocMee 开放平台文档',
    template: '%s | DocMee 开放平台文档'
  },
  description: 'DocMee 开放平台文档中心，涵盖快速开始、开发指南与 API 参考。'
}
```

Keep the existing remote logo image if it remains visually compatible; otherwise replace it with a text-led mark inside the navbar without changing the product name.

- [ ] **Step 2: Rewrite `app/global.css` around the new visual system**

Replace the current minimal helpers with a full theme layer that covers:

- root color variables for background, foreground, border, card, accent, muted, code surfaces
- page background gradients or subtle glow for homepage and shell
- navbar, sidebar, TOC, content width, footer
- prose typography: headings, paragraphs, lists, blockquotes, inline code, links
- code blocks and tables
- homepage classes used by the new components

The CSS should explicitly include classes such as:

```css
.home-hero {}
.home-eyebrow {}
.home-lead {}
.home-actions {}
.home-button {}
.home-button.secondary {}
.home-card-grid {}
.home-card {}
.home-flow {}
.home-flow-step {}
.home-reading-paths {}
.home-reading-card {}
```

It should also include global selectors targeting Nextra-rendered surfaces, for example:

```css
html, body {}
body {}
.nextra-nav-container {}
.nextra-sidebar-container {}
.nextra-toc {}
.nextra-content {}
.nextra-code-block {}
```

Use the actual rendered class names present in Nextra 4 where available; if class names differ, inspect the app locally and adapt selectors without changing the plan intent.

- [ ] **Step 3: Run the build to surface styling or MDX integration issues**

Run: `pnpm build`
Expected: Either PASS or fail with specific integration errors from imports or selectors, not with unrelated project bootstrap errors

- [ ] **Step 4: Run the dev server and visually inspect key routes**

Run: `pnpm dev`
Expected: local server starts successfully

Inspect:
- `/`
- `/getting-started`
- `/api-reference`
- one deep API page such as `/api-reference/v2/create-task`

Validate:
- homepage modules render in the right order
- navbar and sidebar no longer feel like the default Nextra theme
- code blocks and tables remain readable
- cold-purple accents are visible but restrained

- [ ] **Step 5: Commit the shell and theme changes**

```bash
git add app/layout.tsx app/global.css
git commit -m "feat: apply docs redesign theme"
```

## Task 5: Verify the Redesign End-to-End

**Files:**
- Verify: `app/layout.tsx`
- Verify: `app/global.css`
- Verify: `content/index.mdx`
- Verify: `components/mdx/HomeHero.tsx`
- Verify: `components/mdx/HomeCardGrid.tsx`
- Verify: `components/mdx/HomeFlow.tsx`
- Verify: `components/mdx/HomeReadingPaths.tsx`

- [ ] **Step 1: Run the automated checks**

Run: `pnpm test`
Expected: PASS

Run: `pnpm build`
Expected: PASS

- [ ] **Step 2: Confirm the redesign acceptance criteria manually**

Check:
- the homepage clearly differs from default Nextra
- the four homepage modules exist and are visually distinct
- the accent color reads as restrained cold purple
- navigation, sidebar, TOC, prose, code blocks, and tables feel visually unified
- existing routes continue to render

- [ ] **Step 3: Commit the final verification state**

```bash
git add app/layout.tsx app/global.css content/index.mdx components/mdx/HomeHero.tsx components/mdx/HomeCardGrid.tsx components/mdx/HomeFlow.tsx components/mdx/HomeReadingPaths.tsx tests/docs-structure.test.ts
git commit -m "test: verify docs redesign"
```
