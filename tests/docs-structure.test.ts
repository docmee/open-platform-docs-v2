import { existsSync } from 'node:fs'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('docs center structure', () => {
  it('includes the required app shell files', () => {
    expect(existsSync('app/layout.tsx')).toBe(true)
    expect(existsSync('app/[[...mdxPath]]/page.tsx')).toBe(true)
    expect(existsSync('mdx-components.tsx')).toBe(true)
  })

  it('includes required content files', () => {
    expect(existsSync('content/index.mdx')).toBe(true)
    expect(existsSync('content/how-to-use/index.mdx')).toBe(true)
    expect(existsSync('content/getting-started/index.mdx')).toBe(true)
    expect(existsSync('content/getting-started/ail-ppt.mdx')).toBe(true)
    expect(existsSync('content/getting-started/template-mode/0_portable-version.mdx')).toBe(true)
    expect(existsSync('content/api-reference/index.mdx')).toBe(true)
    expect(existsSync('content/api-reference/all-api.mdx')).toBe(true)
    expect(existsSync('content/api-reference/v2/create-task.mdx')).toBe(true)
    expect(existsSync('content/api-reference/v1/generate-outline.mdx')).toBe(true)
  })

  it('defines Chinese navigation labels in root meta', () => {
    expect(existsSync('content/_meta.tsx')).toBe(true)
    const metaText = readFileSync('content/_meta.tsx', 'utf8')
    expect(metaText).toContain("'how-to-use':")
    expect(metaText).toContain("title: '快速开始'")
    expect(metaText).toContain("title: 'API 参考'")
  })

  it('supports multi-language API code examples with ApiCodeTabs and code fences', () => {
    expect(existsSync('components/mdx/ApiCodeTabs.tsx')).toBe(true)

    const mdxComponentsText = readFileSync('mdx-components.tsx', 'utf8')
    expect(mdxComponentsText).toContain('ApiCodeTabs')
    expect(mdxComponentsText).toContain('ApiCodeTab')

    const apiDocText = readFileSync('content/api-reference/v2/create-task.mdx', 'utf8')
    expect(apiDocText).toContain('<ApiCodeTabs items={[')
    expect(apiDocText).toContain('<ApiCodeTab>')
    expect(apiDocText).toContain('```js')
    expect(apiDocText).toContain('```python')
    expect(apiDocText).toContain('```go')
    expect(apiDocText).toContain('```java')
  })

  it('registers shared API reference MDX components', () => {
    expect(existsSync('components/mdx/InlineCode.tsx')).toBe(true)
    expect(existsSync('components/mdx/HttpMethodBadge.tsx')).toBe(true)
    expect(existsSync('components/mdx/ImportantNote.tsx')).toBe(true)

    const mdxComponentsText = readFileSync('mdx-components.tsx', 'utf8')
    expect(mdxComponentsText).toContain('InlineCode')
    expect(mdxComponentsText).toContain('HttpMethodBadge')
    expect(mdxComponentsText).toContain('ImportantNote')
  })

  it('standardizes representative API reference detail pages', () => {
    const createTaskText = readFileSync('content/api-reference/v2/create-task.mdx', 'utf8')
    expect(createTaskText).toContain('https://open.docmee.cn')
    expect(createTaskText).toContain('<HttpMethodBadge')
    expect(createTaskText).toContain('<InlineCode')
    expect(createTaskText).toContain('## 请求示例')
    expect(createTaskText).toContain('```bash')
    expect(createTaskText).toContain('## 响应字段说明')

    const loadPptxText = readFileSync('content/api-reference/ppts/load-pptx.mdx', 'utf8')
    expect(loadPptxText).toContain('https://open.docmee.cn')
    expect(loadPptxText).toContain('<HttpMethodBadge method="GET"')
    expect(loadPptxText).toContain('## 请求参数')
    expect(loadPptxText).toContain('## 响应字段说明')

    const portableCreateTaskText = readFileSync('content/api-reference/portable/create-task.mdx', 'utf8')
    expect(portableCreateTaskText).toContain('<HttpMethodBadge')
    expect(portableCreateTaskText).toContain('```bash')
    expect(portableCreateTaskText).toContain('multipart/form-data')
    expect(portableCreateTaskText).toContain('## 响应字段说明')
  })

  it('does not rely on runtime shiki highlighting helpers', () => {
    const packageText = readFileSync('package.json', 'utf8')
    expect(packageText).not.toContain('"shiki"')
  })

  it('uses redesigned homepage sections', () => {
    const homeText = readFileSync('content/index.mdx', 'utf8')
    expect(homeText).toContain('HomeHero')
    expect(homeText).toContain('HomeCardGrid')
    expect(homeText).toContain('HomeFlow')
    expect(homeText).toContain('HomeReadingPaths')

    expect(existsSync('components/mdx/HomeHero.tsx')).toBe(true)
    expect(existsSync('components/mdx/HomeCardGrid.tsx')).toBe(true)
    expect(existsSync('components/mdx/HomeFlow.tsx')).toBe(true)
    expect(existsSync('components/mdx/HomeReadingPaths.tsx')).toBe(true)
  })
})
