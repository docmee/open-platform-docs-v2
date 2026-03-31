# API Reference 文档统一改造 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为所有 `content/api-reference` 接口详情页补齐统一的接口结构、完整路径、字段级请求/响应说明、默认 `cURL` 示例，并新增可复制行内代码和方法高亮组件。

**Architecture:** 继续沿用现有 `Nextra 4 + MDX` 文档体系，不引入数据驱动 schema。通过在 `mdx-components.tsx` 注册少量通用 MDX 组件，在 `app/global.css` 中补齐文档样式，再按统一模板逐页改造接口详情页。内容层保持 MDX 直写，视觉和交互由统一组件承担。

**Tech Stack:** `Next.js 15`, `React 19`, `Nextra 4`, `MDX`, `TypeScript`, `Vitest`

---

## File Map

**Create:**
- `components/mdx/InlineCode.tsx` - 可复制的行内代码组件
- `components/mdx/HttpMethodBadge.tsx` - HTTP 方法高亮组件
- `components/mdx/ImportantNote.tsx` - 重要信息高亮提示组件

**Modify:**
- `mdx-components.tsx` - 注册新增 MDX 组件
- `app/global.css` - 补充 API 文档组件和表格/提示样式
- `tests/docs-structure.test.ts` - 增加新增组件与 API 页面结构约束测试
- `content/api-reference/**/*.mdx` - 所有接口详情页按统一版式迁移

**Do not modify:**
- `content/api-reference/index.mdx`
- `content/api-reference/all-api.mdx`

## Task 1: Add Failing Tests for the New MDX Components and API Doc Standards

**Files:**
- Modify: `tests/docs-structure.test.ts`
- Test: `tests/docs-structure.test.ts`

- [ ] **Step 1: Extend the structure test with the new MDX component expectations**

Add assertions for:

```ts
expect(existsSync('components/mdx/InlineCode.tsx')).toBe(true)
expect(existsSync('components/mdx/HttpMethodBadge.tsx')).toBe(true)
expect(existsSync('components/mdx/ImportantNote.tsx')).toBe(true)
expect(readFileSync('mdx-components.tsx', 'utf8')).toContain('InlineCode')
expect(readFileSync('mdx-components.tsx', 'utf8')).toContain('HttpMethodBadge')
expect(readFileSync('mdx-components.tsx', 'utf8')).toContain('ImportantNote')
```

Add API detail page expectations against representative files such as:

```ts
expect(readFileSync('content/api-reference/v2/create-task.mdx', 'utf8')).toContain('https://open.docmee.cn')
expect(readFileSync('content/api-reference/v2/create-task.mdx', 'utf8')).toContain('<HttpMethodBadge')
expect(readFileSync('content/api-reference/v2/create-task.mdx', 'utf8')).toContain('<InlineCode')
expect(readFileSync('content/api-reference/v2/create-task.mdx', 'utf8')).toContain('## 请求示例')
expect(readFileSync('content/api-reference/v2/create-task.mdx', 'utf8')).toContain('```bash')
expect(readFileSync('content/api-reference/v2/create-task.mdx', 'utf8')).toContain('## 响应字段说明')
```

Do the same pattern for a representative `GET` endpoint and a representative `multipart/form-data` endpoint.

- [ ] **Step 2: Run tests to verify they fail for the expected reason**

Run: `npm test`
Expected: FAIL because the new components are not registered yet and representative API pages are not migrated.

- [ ] **Step 3: Commit the red test change**

```bash
git add tests/docs-structure.test.ts
git commit -m "test: cover api reference doc standards"
```

## Task 2: Implement Reusable MDX Components and Global Styles

**Files:**
- Create: `components/mdx/InlineCode.tsx`
- Create: `components/mdx/HttpMethodBadge.tsx`
- Create: `components/mdx/ImportantNote.tsx`
- Modify: `mdx-components.tsx`
- Modify: `app/global.css`

- [ ] **Step 1: Implement `InlineCode` as a client component with copy support**

Create a focused component API:

```tsx
'use client'

export function InlineCode({
  children,
  value,
  copyable = true
}: {
  children: React.ReactNode
  value?: string
  copyable?: boolean
}) {
  // copy `value ?? textContent`
}
```

Behavior requirements:
- render inline, compact, and readable in paragraphs and tables
- support click-to-copy for short text
- show a small copied state without affecting layout
- keep keyboard accessibility via `button`

- [ ] **Step 2: Implement `HttpMethodBadge`**

Create a simple API:

```tsx
export function HttpMethodBadge({ method }: { method: 'GET' | 'POST' | 'PUT' | 'DELETE' | string }) {
  return <span className={`api-method api-method-${method.toLowerCase()}`}>{method}</span>
}
```

- [ ] **Step 3: Implement `ImportantNote`**

Create a wrapper component for emphasized doc callouts:

```tsx
export function ImportantNote({ title = '重要信息', children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="api-important-note">
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  )
}
```

- [ ] **Step 4: Register the new components in `mdx-components.tsx`**

Export them so MDX pages can use them directly.

- [ ] **Step 5: Add minimal global styles**

Add styles for:
- `.api-method`
- `.api-method-get`
- `.api-method-post`
- `.api-inline-code`
- `.api-inline-code[data-copied="true"]`
- `.api-important-note`
- parameter/response tables if needed for better readability

- [ ] **Step 6: Run tests to verify the component assertions now pass**

Run: `npm test`
Expected: representative API page assertions still fail, but component existence and registration assertions pass.

- [ ] **Step 7: Commit the reusable component layer**

```bash
git add components/mdx/InlineCode.tsx components/mdx/HttpMethodBadge.tsx components/mdx/ImportantNote.tsx mdx-components.tsx app/global.css
git commit -m "feat: add api reference mdx components"
```

## Task 3: Migrate Representative API Pages First

**Files:**
- Modify: `content/api-reference/v2/create-task.mdx`
- Modify: `content/api-reference/ppts/load-pptx.mdx`
- Modify: `content/api-reference/portable/create-task.mdx`
- Modify: `tests/docs-structure.test.ts`

- [ ] **Step 1: Rewrite `v2/create-task` to the new structure**

Ensure it includes:
- `<HttpMethodBadge method="POST" />`
- full URL with `https://open.docmee.cn`
- `## 请求示例` with a `cURL` block
- existing `Node.js` example preserved or simplified
- request parameter table with columns `参数名 | 类型 | 必填 | 示例 | 说明`
- `## 响应示例`
- `## 响应字段说明`
- `ImportantNote` for task creation constraints

- [ ] **Step 2: Rewrite `ppts/load-pptx` as a representative `GET` endpoint**

Ensure query parameters, headers, response example, and response field table are explicit.

- [ ] **Step 3: Rewrite `portable/create-task` as a representative multipart endpoint**

Ensure multipart request examples and parameter table clearly separate file/form semantics if needed.

- [ ] **Step 4: Run tests to verify representative pages now satisfy the new structure checks**

Run: `npm test`
Expected: PASS for the representative page assertions.

- [ ] **Step 5: Commit the representative page migrations**

```bash
git add content/api-reference/v2/create-task.mdx content/api-reference/ppts/load-pptx.mdx content/api-reference/portable/create-task.mdx
git commit -m "docs: standardize representative api reference pages"
```

## Task 4: Batch-Migrate All Remaining API Detail Pages

**Files:**
- Modify: every `content/api-reference/**/*.mdx` detail page except `index.mdx` and `all-api.mdx`

- [ ] **Step 1: Update all remaining detail pages to use the shared structure**

For every page:
- replace method text with `<HttpMethodBadge ... />`
- replace relative path with full `https://open.docmee.cn/...`
- use `<InlineCode>` for paths, headers, field names, enums, and important short literals where it improves readability
- add `## 请求示例` with default `cURL`
- keep or normalize existing `Node.js` examples where already present
- add or complete request parameter tables
- add or complete `## 响应示例`
- add or complete `## 响应字段说明`
- add `ImportantNote` where the interface has critical sequencing or constraints

- [ ] **Step 2: Run a repository-wide search to verify there are no relative API paths left in detail pages**

Run:

```bash
rg -n "路径：`/" content/api-reference
```

Expected: no matches in detail pages.

- [ ] **Step 3: Run a repository-wide search to spot pages still missing the new required sections**

Run searches such as:

```bash
rg -L "## 请求示例" content/api-reference
rg -L "## 响应字段说明" content/api-reference
```

Expected: only the excluded overview pages may remain unmatched.

- [ ] **Step 4: Commit the bulk API reference migration**

```bash
git add content/api-reference
git commit -m "docs: standardize api reference detail pages"
```

## Task 5: Full Verification

**Files:**
- Verify: `tests/docs-structure.test.ts`
- Verify: build output

- [ ] **Step 1: Run the test suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 2: Run the build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Spot-check generated pages and content conventions**

Check:
- representative `GET` page
- representative `POST` page
- representative `multipart/form-data` page
- one V1 stream-style page
- one download page

Verify:
- method badges render
- inline copy component compiles
- required sections exist
- no obviously fabricated unsupported fields

- [ ] **Step 4: Report results with evidence**

Include:
- exact verification commands run
- pass/fail outcome
- any remaining documentation ambiguity or intentionally conservative wording
