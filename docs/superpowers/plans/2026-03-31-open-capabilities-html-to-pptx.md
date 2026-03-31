# Open Capabilities HTML to PPTX Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在文档站中新增顶层“开放能力”导航，并上线“HTML 转 PPTX”单页，完整说明能力边界、请求参数、响应设计、部分失败处理和错误码规则。

**Architecture:** 沿用现有 `Nextra 4 + MDX` 文档结构，不引入新的组件或数据源。通过更新根级 `content/_meta.tsx` 增加顶层导航，在 `content/open-capabilities/` 下新增栏目元信息和单页 MDX 内容，页面直接复用现有 `InlineCode`、`HttpMethodBadge`、`ImportantNote` 和 `ApiCodeTabs` 组件。

**Tech Stack:** `Next.js 15`, `Nextra 4`, `MDX`, `TypeScript`, `Vitest`

---

## File Map

**Create:**
- `content/open-capabilities/_meta.ts` - 定义“开放能力”栏目下的页面导航
- `content/open-capabilities/html-to-pptx.mdx` - HTML 转 PPTX 能力页与接口文档

**Modify:**
- `content/_meta.tsx` - 增加顶层“开放能力”导航入口
- `tests/docs-structure.test.ts` - 增加新导航与页面结构约束测试

## Task 1: Add Failing Structure Tests for the New Open Capabilities Section

**Files:**
- Modify: `tests/docs-structure.test.ts`
- Test: `tests/docs-structure.test.ts`

- [ ] **Step 1: Add assertions for the new top-level navigation and page files**

Extend the existing structure tests with assertions like:

```ts
expect(existsSync('content/open-capabilities/_meta.ts')).toBe(true)
expect(existsSync('content/open-capabilities/html-to-pptx.mdx')).toBe(true)

const rootMetaText = readFileSync('content/_meta.tsx', 'utf8')
expect(rootMetaText).toContain("'open-capabilities':")
expect(rootMetaText).toContain("title: '开放能力'")

const openCapabilitiesMetaText = readFileSync('content/open-capabilities/_meta.ts', 'utf8')
expect(openCapabilitiesMetaText).toContain("'html-to-pptx': 'HTML 转 PPTX'")

const pageText = readFileSync('content/open-capabilities/html-to-pptx.mdx', 'utf8')
expect(pageText).toContain('# HTML 转 PPTX')
expect(pageText).toContain('/v2/api/htmljson-bridge/convert-html-to-json')
expect(pageText).toContain('pageErrorMode')
expect(pageText).toContain('40010')
expect(pageText).toContain('50103')
```

- [ ] **Step 2: Run the targeted test to verify it fails for the expected reason**

Run: `npm test -- tests/docs-structure.test.ts`
Expected: FAIL because the new section files and nav entry do not exist yet.

## Task 2: Add the Open Capabilities Navigation Files

**Files:**
- Modify: `content/_meta.tsx`
- Create: `content/open-capabilities/_meta.ts`

- [ ] **Step 1: Add the root navigation entry**

Update `content/_meta.tsx` to include:

```ts
'open-capabilities': {
  title: '开放能力',
  type: 'page',
}
```

Place it near the existing top-level doc sections so the navbar order remains predictable.

- [ ] **Step 2: Create the section meta file**

Create `content/open-capabilities/_meta.ts` with:

```ts
import { MetaRecord } from 'nextra'

const meta: MetaRecord = {
  'html-to-pptx': 'HTML 转 PPTX'
}

export default meta
```

- [ ] **Step 3: Run the targeted test to confirm the nav structure assertions now pass**

Run: `npm test -- tests/docs-structure.test.ts`
Expected: the nav-file existence assertions pass, while the page-content assertions still fail.

## Task 3: Write the HTML to PPTX Capability Page

**Files:**
- Create: `content/open-capabilities/html-to-pptx.mdx`
- Test: `tests/docs-structure.test.ts`

- [ ] **Step 1: Create the page skeleton with the approved section order**

The page must include these major sections:
- `# HTML 转 PPTX`
- `## 能力说明`
- `## 适用场景`
- `## 重要说明`
- `## 输入要求`
- `## 接口信息`
- `## 请求示例`
- `## 请求参数`
- `## 响应设计`
- `## 错误码说明`
- `## 接入建议`

Use existing MDX components:
- `<ImportantNote>` for download-link expiry and storage guidance
- `<HttpMethodBadge method="POST" />` for the method
- `<InlineCode>` for the full URL and literal field values
- `<ApiCodeTabs>` only if a second language example is kept useful; otherwise a single `bash` example is sufficient

- [ ] **Step 2: Write the request contract exactly as approved**

Document:
- endpoint: `/v2/api/htmljson-bridge/convert-html-to-json`
- request body with `htmls: string[]` and `pageErrorMode`
- `.slide` root requirement
- same-size requirement for all HTML pages in one request
- `pageErrorMode` values `blank` and `skip`
- default `pageErrorMode` is `blank`

- [ ] **Step 3: Write the response contract exactly as approved**

Include:
- full success example with `fileUrl`, `expireAt`, page counts, and `failedPageDetails`
- partial-success explanation with `code = 0`
- `failedPageDetails[].index` documented as 1-based
- overall-failure example using `40010`
- overall-failure examples using `50103` and `50199`
- clear statement that `50101` and `50102` are page-level failure classifications by default

- [ ] **Step 4: Add response-field and error-code tables**

Ensure the page explicitly explains:
- how to identify downloadable success vs partial success vs total failure
- that the OSS URL is temporary and must be downloaded promptly
- that the platform does not retain files long-term
- under `## 接入建议`, instruct developers to download/transfer immediately, inspect `failedPageDetails`, and record failed page indexes and reasons for retry or alerting

- [ ] **Step 5: Run the targeted test to verify the new page assertions pass**

Run: `npm test -- tests/docs-structure.test.ts`
Expected: PASS

## Task 4: Full Verification

**Files:**
- Verify: `tests/docs-structure.test.ts`
- Verify: `content/_meta.tsx`
- Verify: `content/open-capabilities/_meta.ts`
- Verify: `content/open-capabilities/html-to-pptx.mdx`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: PASS with the new top-level navigation and page rendered successfully.

- [ ] **Step 3: Manually inspect the changed content for wording drift**

Confirm the page still matches the approved spec at:
- `docs/superpowers/specs/2026-03-31-open-capabilities-html-to-pptx-design.md`

Specifically verify:
- error-code split remains `40010` vs `501xx`
- `.slide` and same-size rules are present
- temporary OSS download warning is prominent
