import type { Metadata } from 'next'
import Image from 'next/image'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import 'nextra-theme-docs/style.css'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import './global.css'

export const metadata: Metadata = {
  title: {
    default: '文多多AiPPT 开放平台文档',
    template: '%s | 文多多AiPPT 开放平台文档'
  },
  description: '文多多AiPPT 开放平台文档中心，涵盖快速开始、开发指南与 API 参考。'
}

const navbar = (
  <Navbar
    logo={
      <div className="brand-mark">
        <div className="brand-mark-icon">
          <Image
            src="https://oss.docmee.cn/static/open/open-platform-logo.png"
            alt="DocMee"
            width={40}
            height={40}
          />
        </div>
        <div className="brand-mark-copy">
          <span>DocMee</span>
          <strong>开放平台文档</strong>
        </div>
      </div>
    }
  />
)

const footer = (
  <Footer>
    <div className="site-footer">
      <span>DocMee Open Platform Docs</span>
      <span>{new Date().getFullYear()} © 文多多 AiPPT</span>
    </div>
  </Footer>
)

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <div className="site-shell">
          <div className="site-shell-gradient site-shell-gradient-top" aria-hidden="true" />
          <div className="site-shell-gradient site-shell-gradient-bottom" aria-hidden="true" />
          <Layout
            navbar={navbar}
            feedback={{ content: null, labels: undefined }}
            editLink={null}
            pageMap={await getPageMap('')}
            footer={footer}
          >
            {children}
          </Layout>
        </div>
      </body>
    </html>
  )
}
