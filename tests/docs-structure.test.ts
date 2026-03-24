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
    expect(existsSync('content/getting-started/first-ppt.mdx')).toBe(true)
    expect(existsSync('content/getting-started/html-designed-ppt.mdx')).toBe(true)
    expect(existsSync('content/api-reference/index.mdx')).toBe(true)
    expect(existsSync('content/api-reference/all-api.mdx')).toBe(true)
    expect(existsSync('content/api-reference/v2/create-task.mdx')).toBe(true)
    expect(existsSync('content/api-reference/v1/generate-outline.mdx')).toBe(true)
  })

  it('defines Chinese navigation labels in root meta', () => {
    expect(existsSync('content/_meta.ts')).toBe(true)
    const metaText = readFileSync('content/_meta.ts', 'utf8')
    expect(metaText).toContain("'how-to-use':")
    expect(metaText).toContain("title: '快速开始'")
    expect(metaText).toContain("title: 'API 参考'")
  })

  it('supports reusable multi-language API code examples', () => {
    expect(existsSync('components/mdx/ApiCodeTabs.tsx')).toBe(true)

    const mdxComponentsText = readFileSync('mdx-components.tsx', 'utf8')
    expect(mdxComponentsText).toContain('ApiCodeTabs')

    const firstPptText = readFileSync('content/getting-started/first-ppt.mdx', 'utf8')
    expect(firstPptText).toContain('<ApiCodeTabs')
    expect(firstPptText).toContain('node={`')
    expect(firstPptText).toContain('python={`')
    expect(firstPptText).toContain('go={`')
    expect(firstPptText).toContain('java={`')
  })

  it('uses shiki for runtime syntax highlighting in API code tabs', () => {
    const packageText = readFileSync('package.json', 'utf8')
    expect(packageText).toContain('"shiki"')

    const apiCodeTabsText = readFileSync('components/mdx/ApiCodeTabs.tsx', 'utf8')
    expect(apiCodeTabsText).toContain("from 'shiki'")
    expect(apiCodeTabsText).toContain('codeToHtml')
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
