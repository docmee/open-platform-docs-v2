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
    expect(existsSync('content/ui-integration/index.mdx')).toBe(true)
    expect(existsSync('content/ui-integration/quickstart.mdx')).toBe(true)
    expect(existsSync('content/ui-integration/configuration.mdx')).toBe(true)
    expect(existsSync('content/ui-integration/events.mdx')).toBe(true)
    expect(existsSync('content/ui-integration/methods.mdx')).toBe(true)
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
    expect(metaText).toContain("'ui-integration':")
    expect(metaText).toContain('UI 接入')
    expect(metaText).toContain("'getting-started':")
    expect(metaText).toContain('快速开始')
    expect(metaText).toContain('API 参考')
  })

  it('places ui integration first in the top-level navbar order', () => {
    const metaText = readFileSync('content/_meta.tsx', 'utf8')
    expect(metaText.indexOf("'ui-integration':")).toBeGreaterThan(-1)
    expect(metaText.indexOf("'getting-started':")).toBeGreaterThan(-1)
    expect(metaText.indexOf("'ui-integration':")).toBeLessThan(
      metaText.indexOf("'getting-started':")
    )
  })

  it('registers the open capabilities top-level navigation entry', () => {
    expect(existsSync('content/_meta.tsx')).toBe(true)

    const rootMetaText = readFileSync('content/_meta.tsx', 'utf8')
    expect(rootMetaText).toContain("'open-capabilities':")
    expect(rootMetaText).toContain('开放能力')
  })

  it('documents the ui integration multi-page navigation', () => {
    expect(existsSync('content/ui-integration/_meta.ts')).toBe(true)

    const sectionMetaText = readFileSync('content/ui-integration/_meta.ts', 'utf8')
    expect(sectionMetaText).toContain("index: '新版 UI 接入'")
    expect(sectionMetaText).toContain("quickstart: '快速开始'")
    expect(sectionMetaText).toContain("configuration: '初始化参数'")
    expect(sectionMetaText).toContain("events: '事件回调'")
    expect(sectionMetaText).toContain("methods: '实例方法'")
  })

  it('documents the new ui integration content', () => {
    const indexText = readFileSync('content/ui-integration/index.mdx', 'utf8')
    expect(indexText).toContain('@docmee/sdk-ui')
    expect(indexText).toContain("creatorVersion: 'v2'")
    expect(indexText).toContain('/ui-integration/quickstart')

    const quickstartText = readFileSync('content/ui-integration/quickstart.mdx', 'utf8')
    expect(quickstartText).toContain('npm install @docmee/sdk-ui')
    expect(quickstartText).toContain("page: 'creator'")
    expect(quickstartText).toContain("docmee.on('beforeGenerate'")

    const configurationText = readFileSync(
      'content/ui-integration/configuration.mdx',
      'utf8'
    )
    expect(configurationText).toContain('createApiToken')
    expect(configurationText).toContain("DOMAIN: 'https://app.xpptx.com'")
    expect(configurationText).toContain('proxy_pass https://docmee.cn/api;')
    expect(configurationText).toContain('baseURL')
    expect(configurationText).toContain('templateMenu')
    expect(configurationText).toContain('hideDashboardButton')
    expect(configurationText).toContain('editorDisplay')
    expect(configurationText).toContain('targetOrigin')

    const eventsText = readFileSync('content/ui-integration/events.mdx', 'utf8')
    expect(eventsText).toContain("type: 'beforeGenerate'")
    expect(eventsText).toContain("type: 'beforeCreatePpt'")
    expect(eventsText).toContain("type: 'beforeDownload'")
    expect(eventsText).toContain("type: 'error'")
    expect(eventsText).toContain("type: 'outlineGenerated'")
    expect(eventsText).toContain("type: 'changeSlideIndex'")
    expect(eventsText).toContain("type: 'pptxRenamed'")
    expect(eventsText).toContain('Promise<boolean | string>')

    const methodsText = readFileSync('content/ui-integration/methods.mdx', 'utf8')
    expect(methodsText).toContain('updateToken(newToken: string)')
    expect(methodsText).toContain("navigate({ page: 'editor', pptId: 'ppt_xxx' })")
    expect(methodsText).toContain("docmee.sendMessage({")
    expect(methodsText).toContain('continueCreatePpt')
    expect(methodsText).toContain('changeSlidePageIndex')
    expect(methodsText).toContain('reloadEditor')
  })

  it('includes the open capabilities structure files', () => {
    expect(existsSync('content/open-capabilities/_meta.tsx')).toBe(true)
    expect(existsSync('content/open-capabilities/html-to-pptx/_meta.ts')).toBe(true)
    expect(existsSync('content/open-capabilities/html-to-pptx/introduction.mdx')).toBe(
      true
    )
    expect(
      existsSync('content/open-capabilities/html-to-pptx/integration-notes.mdx')
    ).toBe(true)
    expect(existsSync('content/open-capabilities/html-to-pptx/quickstart.mdx')).toBe(
      true
    )
    expect(existsSync('content/open-capabilities/html-to-pptx/api-reference.mdx')).toBe(
      true
    )
    expect(existsSync('content/open-capabilities/html-to-pptx/error-codes.mdx')).toBe(
      true
    )
    expect(
      existsSync('content/open-capabilities/html-to-pptx/best-practices.mdx')
    ).toBe(true)
    expect(existsSync('content/open-capabilities/html-to-pptx/pricing.mdx')).toBe(true)
    expect(existsSync('content/open-capabilities/html-to-pptx.mdx')).toBe(false)
  })

  it('documents the html-to-pptx open capability multi-page navigation', () => {
    expect(existsSync('content/open-capabilities/_meta.tsx')).toBe(true)
    expect(existsSync('content/open-capabilities/html-to-pptx/_meta.ts')).toBe(true)

    const sectionMetaText = readFileSync(
      'content/open-capabilities/_meta.tsx',
      'utf8'
    )
    expect(sectionMetaText).toContain('html-to-pptx')
    expect(sectionMetaText).toContain('HTML 转 PPTX')

    const htmlToPptxMetaText = readFileSync(
      'content/open-capabilities/html-to-pptx/_meta.ts',
      'utf8'
    )
    expect(htmlToPptxMetaText).toContain("'introduction': '能力介绍'")
    expect(htmlToPptxMetaText).toContain("'quickstart': '快速开始'")
    expect(htmlToPptxMetaText).toContain("'integration-notes': '❗限制条件'")
    expect(htmlToPptxMetaText).toContain("'api-reference': '完整 API 文档'")
    expect(htmlToPptxMetaText).toContain("'error-codes': '错误码说明'")
    expect(htmlToPptxMetaText).toContain("'best-practices': '最佳实践'")
    expect(htmlToPptxMetaText).toContain("'pricing': '能力计费'")
  })

  it('documents the html-to-pptx child page content', () => {
    const integrationNotesText = readFileSync(
      'content/open-capabilities/html-to-pptx/integration-notes.mdx',
      'utf8'
    )
    expect(integrationNotesText).toContain('.slide')
    expect(integrationNotesText).toContain('1280 × 720')
    expect(integrationNotesText).toContain('尽力缩放到目标尺寸')
    expect(integrationNotesText).toContain('临时 OSS 下载地址')
    expect(integrationNotesText).toContain('不提供长期保存')
    expect(integrationNotesText).toContain('filename')

    const apiReferenceText = readFileSync(
      'content/open-capabilities/html-to-pptx/api-reference.mdx',
      'utf8'
    )
    expect(apiReferenceText).toContain('/v2/api/htmljson-bridge/convert-html-to-json')
    expect(apiReferenceText).toContain('filename')
    expect(apiReferenceText).toContain('/open-capabilities/html-to-pptx/integration-notes')

    const errorCodesText = readFileSync(
      'content/open-capabilities/html-to-pptx/error-codes.mdx',
      'utf8'
    )
    expect(errorCodesText).toContain('40010')
    expect(errorCodesText).toContain('50103')
    expect(errorCodesText).toContain('50199')

    const pricingText = readFileSync(
      'content/open-capabilities/html-to-pptx/pricing.mdx',
      'utf8'
    )
    expect(pricingText).toContain('成功转换页数计费')
    expect(pricingText).toContain('每一个成功转换的页面消耗 `0.3` 积分')
    expect(pricingText).toContain('>= 50')
    expect(pricingText).toContain('successPages')

    const quickstartText = readFileSync(
      'content/open-capabilities/html-to-pptx/quickstart.mdx',
      'utf8'
    )
    expect(quickstartText).toContain('filename')
    expect(quickstartText).toContain('/open-capabilities/html-to-pptx/integration-notes')

    const bestPracticesText = readFileSync(
      'content/open-capabilities/html-to-pptx/best-practices.mdx',
      'utf8'
    )
    expect(bestPracticesText).toContain('/open-capabilities/html-to-pptx/integration-notes')
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
    expect(mdxComponentsText).toContain('Callout')
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
