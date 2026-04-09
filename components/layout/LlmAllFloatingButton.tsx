'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CheckIcon, CopyIcon, FileText, Loader2, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type LoadState = 'idle' | 'loading' | 'success' | 'error'

function getCandidateUrls() {
  if (typeof window === 'undefined') {
    return ['/llm-all.md']
  }

  const onDocsBasePath = window.location.pathname === '/docs-v2' || window.location.pathname.startsWith('/docs-v2/')

  return onDocsBasePath ? ['/docs-v2/llm-all.md', '/llm-all.md'] : ['/llm-all.md', '/docs-v2/llm-all.md']
}

export function LlmAllFloatingButton() {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [sourceText, setSourceText] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [loadState, setLoadState] = useState<LoadState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const hasSource = sourceText.length > 0
  const defaultSourceUrl = useMemo(() => getCandidateUrls()[0] ?? '/llm-all.md', [])

  const statusText = useMemo(() => {
    if (loadState === 'loading') {
      return '正在加载 llm-all.md ...'
    }

    if (loadState === 'error') {
      return errorMessage || '读取 llm-all.md 失败'
    }

    return ''
  }, [errorMessage, loadState])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  async function loadSource() {
    if (loadState === 'loading' || hasSource) {
      return
    }

    setLoadState('loading')
    setErrorMessage('')

    const urls = getCandidateUrls()

    for (const url of urls) {
      try {
        const response = await fetch(url, {
          cache: 'no-store',
        })

        if (!response.ok) {
          continue
        }

        const text = await response.text()
        setSourceText(text)
        setSourceUrl(url)
        setLoadState('success')
        return
      } catch {
        // Try the next candidate URL.
      }
    }

    setLoadState('error')
    setErrorMessage('未找到可读取的 llm-all.md，请先执行 npm run generate:llm-all')
  }

  async function onOpen() {
    setIsOpen(true)

    if (!hasSource) {
      await loadSource()
    }
  }

  return (
    <>
      <button
        type="button"
        className="docmee-llm-fab"
        aria-label="打开 llm-all 原文"
        title="查看 llm-all 原文"
        onClick={() => {
          void onOpen()
        }}
      >
        <FileText size={14} aria-hidden="true" />
        <span>LLM</span>
      </button>

      {isOpen ? (
        <div
          className="docmee-llm-overlay"
          role="presentation"
          onClick={() => {
            setIsOpen(false)
          }}
        >
          <section
            className="docmee-llm-panel"
            role="dialog"
            aria-modal="true"
            aria-label="llm-all 原文"
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            <header className="docmee-llm-panel-header">
              <div className="docmee-llm-panel-title">
                <strong>llm-all.md</strong>
                <span>llm like 风格的文档，复制给模型上下文</span>
              </div>

              <div className="docmee-llm-panel-actions">
                <a href={sourceUrl || defaultSourceUrl} target="_blank" rel="noreferrer" className="docmee-llm-link">
                  新窗口打开
                </a>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      className="docmee-llm-link"
                      type="button"
                      onClick={async () => {
                        setCopied(true)
                        await navigator.clipboard.writeText(sourceText)
                        setTimeout(() => {
                          setCopied(false)
                        }, 2000)
                      }}
                    >
                      {copied ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copied ? '已复制' : '复制全部文本到剪贴板'}</p>
                  </TooltipContent>
                </Tooltip>
                <button
                  type="button"
                  className="docmee-llm-close"
                  aria-label="关闭"
                  onClick={() => {
                    setIsOpen(false)
                  }}
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </div>
            </header>

            <div className="docmee-llm-panel-body">
              {loadState === 'loading' ? (
                <p className="docmee-llm-status">
                  <Loader2 size={14} className="docmee-llm-spinner" aria-hidden="true" />
                  {statusText}
                </p>
              ) : null}

              {loadState === 'error' ? <p className="docmee-llm-status docmee-llm-status-error">{statusText}</p> : null}

              {loadState === 'success' ? <pre className="docmee-llm-source">{sourceText}</pre> : null}
            </div>
          </section>
        </div>
      ) : null}
    </>
  )
}
