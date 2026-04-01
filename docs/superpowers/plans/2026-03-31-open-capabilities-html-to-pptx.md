# Open Capabilities HTML to PPTX Multi-Page Docs Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `开放能力 / HTML 转 PPTX` 从单页文档改造成 7 个子页面的多页结构，按“能力介绍、接入须知、快速开始、完整 API 文档、错误码说明、最佳实践、能力计费”组织内容。

**Architecture:** 继续沿用现有 `Nextra 4 + MDX` 文档体系，不新增新的渲染机制。通过把 `content/open-capabilities/html-to-pptx.mdx` 迁移为 `content/open-capabilities/html-to-pptx/` 目录，新增 `_meta.ts` 作为子导航定义，再将原有单页内容拆分到 7 个聚焦页面中。结构测试同步从“单页存在”改成“目录结构与关键内容存在”。

**Tech Stack:** `Next.js 15`, `Nextra 4`, `MDX`, `TypeScript`, `Vitest`

---

## File Map

**Create:**
- `content/open-capabilities/html-to-pptx/_meta.ts` - `HTML 转 PPTX` 子导航定义
- `content/open-capabilities/html-to-pptx/introduction.mdx` - 能力介绍
- `content/open-capabilities/html-to-pptx/integration-notes.mdx` - 接入须知
- `content/open-capabilities/html-to-pptx/quickstart.mdx` - 快速开始
- `content/open-capabilities/html-to-pptx/api-reference.mdx` - 完整 API 文档
- `content/open-capabilities/html-to-pptx/error-codes.mdx` - 错误码说明
- `content/open-capabilities/html-to-pptx/best-practices.mdx` - 最佳实践
- `content/open-capabilities/html-to-pptx/pricing.mdx` - 能力计费占位页

**Modify:**
- `content/open-capabilities/_meta.ts` - 把 `html-to-pptx` 定义成目录节点
- `tests/docs-structure.test.ts` - 更新为多页结构与关键内容约束

**Delete:**
- `content/open-capabilities/html-to-pptx.mdx` - 废弃原单页

## Task 1: Add Failing Tests for the Multi-Page HTML to PPTX Structure

**Files:**
- Modify: `tests/docs-structure.test.ts`
- Test: `tests/docs-structure.test.ts`

- [ ] **Step 1: Replace the old single-page assertions with multi-page structure assertions**

Update tests to assert:

```ts
expect(existsSync('content/open-capabilities/html-to-pptx/_meta.ts')).toBe(true)
expect(existsSync('content/open-capabilities/html-to-pptx/introduction.mdx')).toBe(true)
expect(existsSync('content/open-capabilities/html-to-pptx/integration-notes.mdx')).toBe(true)
expect(existsSync('content/open-capabilities/html-to-pptx/quickstart.mdx')).toBe(true)
expect(existsSync('content/open-capabilities/html-to-pptx/api-reference.mdx')).toBe(true)
expect(existsSync('content/open-capabilities/html-to-pptx/error-codes.mdx')).toBe(true)
expect(existsSync('content/open-capabilities/html-to-pptx/best-practices.mdx')).toBe(true)
expect(existsSync('content/open-capabilities/html-to-pptx/pricing.mdx')).toBe(true)
expect(existsSync('content/open-capabilities/html-to-pptx.mdx')).toBe(false)
```

Also assert:

```ts
const sectionMetaText = readFileSync('content/open-capabilities/_meta.ts', 'utf8')
expect(sectionMetaText).toContain("html-to-pptx")

const htmlToPptxMetaText = readFileSync('content/open-capabilities/html-to-pptx/_meta.ts', 'utf8')
expect(htmlToPptxMetaText).toContain("'introduction': '能力介绍'")
expect(htmlToPptxMetaText).toContain("'integration-notes': '接入须知'")
expect(htmlToPptxMetaText).toContain("'quickstart': '快速开始'")
expect(htmlToPptxMetaText).toContain("'api-reference': '完整 API 文档'")
expect(htmlToPptxMetaText).toContain("'error-codes': '错误码说明'")
expect(htmlToPptxMetaText).toContain("'best-practices': '最佳实践'")
expect(htmlToPptxMetaText).toContain("'pricing': '能力计费'")
```

Add focused content checks:

```ts
expect(readFileSync('content/open-capabilities/html-to-pptx/integration-notes.mdx', 'utf8')).toContain('.slide')
expect(readFileSync('content/open-capabilities/html-to-pptx/integration-notes.mdx', 'utf8')).toContain('同一尺寸')
expect(readFileSync('content/open-capabilities/html-to-pptx/api-reference.mdx', 'utf8')).toContain('/v2/api/htmljson-bridge/convert-html-to-json')
expect(readFileSync('content/open-capabilities/html-to-pptx/error-codes.mdx', 'utf8')).toContain('40010')
expect(readFileSync('content/open-capabilities/html-to-pptx/error-codes.mdx', 'utf8')).toContain('50199')
expect(readFileSync('content/open-capabilities/html-to-pptx/pricing.mdx', 'utf8')).toContain('能力计费信息即将上线')
```

- [ ] **Step 2: Run the targeted test to verify it fails for the expected reason**

Run: `npm test -- tests/docs-structure.test.ts`
Expected: FAIL because the new directory structure and child pages do not exist yet, while the legacy single-page assertion flips to expect deletion.

## Task 2: Add the Nested HTML to PPTX Navigation Structure

**Files:**
- Modify: `content/open-capabilities/_meta.ts`
- Create: `content/open-capabilities/html-to-pptx/_meta.ts`

- [ ] **Step 1: Update the section meta to point to the nested directory**

Ensure `content/open-capabilities/_meta.ts` still exposes `HTML 转 PPTX` as a navigation item, now backed by the `html-to-pptx/` directory.

- [ ] **Step 2: Create the nested meta file**

Create:

```ts
import { MetaRecord } from 'nextra'

const meta: MetaRecord = {
  'introduction': '能力介绍',
  'integration-notes': '接入须知',
  'quickstart': '快速开始',
  'api-reference': '完整 API 文档',
  'error-codes': '错误码说明',
  'best-practices': '最佳实践',
  'pricing': '能力计费',
}

export default meta
```

- [ ] **Step 3: Run the targeted test to confirm the nested meta assertions now pass**

Run: `npm test -- tests/docs-structure.test.ts`
Expected: meta assertions pass while page existence/content assertions still fail.

## Task 3: Split the Legacy Single Page into 7 Child Pages

**Files:**
- Create: `content/open-capabilities/html-to-pptx/introduction.mdx`
- Create: `content/open-capabilities/html-to-pptx/integration-notes.mdx`
- Create: `content/open-capabilities/html-to-pptx/quickstart.mdx`
- Create: `content/open-capabilities/html-to-pptx/api-reference.mdx`
- Create: `content/open-capabilities/html-to-pptx/error-codes.mdx`
- Create: `content/open-capabilities/html-to-pptx/best-practices.mdx`
- Create: `content/open-capabilities/html-to-pptx/pricing.mdx`
- Delete: `content/open-capabilities/html-to-pptx.mdx`

- [ ] **Step 1: Create `能力介绍`**

Include:
- 一句话定义
- 适用场景
- 输入输出概览
- 能力边界
- 推荐阅读顺序

- [ ] **Step 2: Create `接入须知`**

Include:
- 鉴权方式
- `.slide` 根元素要求
- 同一次请求中的所有 HTML 必须同一尺寸
- `htmls` 顺序规则
- `fileUrl` 为临时 OSS 地址
- 平台不长期保存
- `pageErrorMode` 对失败页的影响

- [ ] **Step 3: Create `快速开始`**

Include:
- 最小可运行 `curl` 示例
- 最小成功响应
- 如何提取 `fileUrl`
- 如何快速判断 `failedPageDetails`

- [ ] **Step 4: Create `完整 API 文档`**

Include:
- 方法、路径、鉴权、Content-Type
- 请求参数表
- 完全成功响应
- 部分成功响应
- 整体失败响应
- 响应字段说明

Preserve the existing API contract semantics exactly. Only content organization and wording may change.
Specifically preserve:
- `failedPageDetails[].index` is 1-based
- `failedPageDetails[].finalAction` only uses `blank` or `skip`
- `50101` and `50102` stay as page-level failure classifications by default

- [ ] **Step 5: Create `错误码说明`**

Include:
- `40010`
- `50101`
- `50102`
- `50103`
- `50199`
- 含义、触发条件、建议处理方式

- [ ] **Step 6: Create `最佳实践`**

Include:
- HTML 提交前自检
- `pageErrorMode` 的选择建议
- 收到结果后立即下载并转存
- 记录失败页索引和原因
- 重试、监控、告警建议

- [ ] **Step 7: Create `能力计费` 占位页**

Only include:
- 页面标题
- “能力计费信息即将上线”
- 如需提前了解请联系商务或产品支持

- [ ] **Step 8: Delete the legacy single-page file**

Delete:
- `content/open-capabilities/html-to-pptx.mdx`

- [ ] **Step 9: Run the targeted test to verify the multi-page assertions pass**

Run: `npm test -- tests/docs-structure.test.ts`
Expected: PASS

## Task 4: Full Verification

**Files:**
- Verify: `tests/docs-structure.test.ts`
- Verify: `content/open-capabilities/_meta.ts`
- Verify: `content/open-capabilities/html-to-pptx/_meta.ts`
- Verify: all 7 child MDX pages

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: PASS with the nested `HTML 转 PPTX` child navigation rendered successfully.

- [ ] **Step 3: Manually inspect the migrated pages against the approved spec**

Confirm:
- `接入须知` carries the prerequisite constraints
- `完整 API 文档` is the only contract page
- `错误码说明` contains the full code list
- `能力计费` is a placeholder only
- API semantics still match the approved spec exactly
