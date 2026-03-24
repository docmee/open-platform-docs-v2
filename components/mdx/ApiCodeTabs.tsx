'use client'

import { Tabs } from 'nextra/components'
import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

type ApiCodeTabsProps = {
  node?: string
  python?: string
  go?: string
  java?: string
  defaultLanguage?: 'node' | 'python' | 'go' | 'java'
}

const LANGUAGE_ORDER = [
  { key: 'node', label: 'Node.js', codeClass: 'language-js', shikiLang: 'javascript' },
  { key: 'python', label: 'Python', codeClass: 'language-python', shikiLang: 'python' },
  { key: 'go', label: 'Go', codeClass: 'language-go', shikiLang: 'go' },
  { key: 'java', label: 'Java', codeClass: 'language-java', shikiLang: 'java' }
] as const

const highlightCache = new Map<string, Promise<string>>()

function getHighlightedHtml(code: string, lang: string) {
  const cacheKey = `${lang}::${code}`

  if (!highlightCache.has(cacheKey)) {
    highlightCache.set(
      cacheKey,
      codeToHtml(code, {
        lang,
        themes: {
          light: 'slack-ochin',
          dark: 'slack-dark',
        }
      })
    )
  }

  return highlightCache.get(cacheKey)!
}

function HighlightedCode({
  code,
  codeClass,
  shikiLang
}: {
  code: string
  codeClass: string
  shikiLang: string
}) {
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    getHighlightedHtml(code, shikiLang)
      .then(result => {
        if (active) {
          setHtml(result)
        }
      })
      .catch(() => {
        if (active) {
          setHtml(null)
        }
      })

    return () => {
      active = false
    }
  }, [code, shikiLang])

  if (!html) {
    return (
      <pre>
        <code className={codeClass}>{code}</code>
      </pre>
    )
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default function ApiCodeTabs({
  node,
  python,
  go,
  java,
  defaultLanguage = 'node'
}: ApiCodeTabsProps) {
  const snippets = { node, python, go, java }
  const items = LANGUAGE_ORDER.filter(item => snippets[item.key]).map(item => item.label)
  const defaultIndex = Math.max(
    0,
    LANGUAGE_ORDER.filter(item => snippets[item.key]).findIndex(item => item.key === defaultLanguage)
  )

  return (
    <Tabs items={items} defaultIndex={defaultIndex}>
      {LANGUAGE_ORDER.filter(item => snippets[item.key]).map(item => (
        <Tabs.Tab key={item.key}>
          <HighlightedCode
            code={snippets[item.key]!}
            codeClass={item.codeClass}
            shikiLang={item.shikiLang}
          />
        </Tabs.Tab>
      ))}
    </Tabs>
  )
}
