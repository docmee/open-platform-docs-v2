'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ReactNode, useEffect, useMemo, useState } from 'react'

type InlineCodeProps = {
  children: ReactNode
  value?: string
  copyable?: boolean
}

function toCopyText(children: ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children)
  }

  if (Array.isArray(children)) {
    return children.map((child) => toCopyText(child)).join('')
  }

  return ''
}

export function InlineCode({ children, value, copyable = true }: InlineCodeProps) {
  const [copied, setCopied] = useState(false)
  const copyValue = useMemo(() => value ?? toCopyText(children), [children, value])

  useEffect(() => {
    if (!copied) {
      return
    }

    const timeoutId = window.setTimeout(() => setCopied(false), 1200)
    return () => window.clearTimeout(timeoutId)
  }, [copied])

  async function handleCopy() {
    if (!copyable || !copyValue) {
      return
    }

    try {
      await navigator.clipboard.writeText(copyValue)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  if (!copyable) {
    return <code className="api-inline-code">{children}</code>
  }

  return (
    <Tooltip delayDuration={1400}>
      <TooltipTrigger>
        <button
          type="button"
          className="api-inline-code"
          data-copied={copied}
          onClick={handleCopy}
          aria-label={copied ? '已复制' : `复制 ${copyValue}`}
          title={copied ? '已复制' : '点击复制'}
        >
          <code>{children}</code>
        </button>
      </TooltipTrigger>
      <TooltipContent>{copied ? '已复制' : `复制 ${copyValue}`}</TooltipContent>
    </Tooltip>
  )
}

export default InlineCode
