'use client'

import { Moon, Sun } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from 'nextra-theme-docs'

function findSidebar() {
  return document.querySelector<HTMLElement>('.nextra-sidebar')
}

function findCollapseButton(sidebar: HTMLElement | null) {
  return sidebar?.querySelector<HTMLButtonElement>('.nextra-sidebar-footer button[aria-expanded]') ?? null
}

export function SidebarControlsBridge() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const sidebar = findSidebar()

    if (!sidebar) {
      setPortalTarget(null)
      return
    }

    const nextPortalTarget = document.createElement('div')
    nextPortalTarget.dataset.docmeeSidebarControls = 'true'
    sidebar.prepend(nextPortalTarget)
    setPortalTarget(nextPortalTarget)

    const collapseButton = findCollapseButton(sidebar)
    const syncCollapsedState = () => {
      setIsCollapsed(collapseButton?.getAttribute('aria-expanded') !== 'true')
    }

    syncCollapsedState()

    const observer = collapseButton
      ? new MutationObserver(() => {
          syncCollapsedState()
        })
      : null

    if (collapseButton) {
      observer?.observe(collapseButton, {
        attributes: true,
        attributeFilter: ['aria-expanded'],
      })
    }

    return () => {
      observer?.disconnect()
      nextPortalTarget.remove()
    }
  }, [pathname])

  if (!portalTarget) {
    return null
  }

  const isDark = resolvedTheme === 'dark'

  return createPortal(
    <div className="docmee-sidebar-controls-shell" data-collapsed={isCollapsed}>
      <div className="docmee-sidebar-theme-anchor">
        <button
          type="button"
          className="docmee-theme-switch"
          role="switch"
          aria-checked={isDark}
          aria-label={isDark ? '切换到亮色模式' : '切换到暗色模式'}
          title={isDark ? '切换到亮色模式' : '切换到暗色模式'}
          onClick={() => {
            setTheme(isDark ? 'light' : 'dark')
          }}
        >
          <span className="docmee-theme-switch-track" aria-hidden="true">
            <span className="docmee-theme-switch-thumb">
              {isDark ? <Moon size={14}  /> : <Sun size={14} />}
            </span>
          </span>
        </button>
      </div>
    </div>,
    portalTarget
  )
}
