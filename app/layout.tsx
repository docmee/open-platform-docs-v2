import { SidebarControlsBridge } from '@/components/layout/SidebarControlsBridge'
import { DotPattern } from '@/components/ui/dot-pattern'
import { HexagonPattern } from '@/components/ui/hexagon-pattern'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Image from 'next/image'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import 'nextra-theme-docs/style.css'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import './global.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: {
    default: '文多多AiPPT 开放平台文档',
    template: '%s | 文多多AiPPT 开放平台文档',
  },
  description: '文多多AiPPT 开放平台文档中心，涵盖快速开始、开发指南与 API 参考。',
}

const navbar = (
  <Navbar
    logo={
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-xl overflow-hidden shadow-md shadow-accent/60 ring-2 ring-accent">
          <Image
            src="https://oss.docmee.cn/static/open/open-platform-logo.png"
            alt="docmee open platform"
            width={40}
            height={40}
          />
        </div>
        <div className="flex items-center gap-2">
          <strong>开放平台文档</strong>
          <div className="text-accent font-bold scale-75 origin-left bg-muted ring ring-accent/80 uppercase text-xs rounded-full px-2 py-0.5 flex items-center gap-1">
            <div className="size-1.5 bg-accent rounded-full" />
            docmee
          </div>
        </div>
      </div>
    }
  />
)

const footer = (
  <Footer className="bg-slate-900 m-0! w-full! max-w-svw! text-slate-100!">
    <div className="flex justify-center items-center size-full text-xs">
      {/* <span>文多多AiPPT 开放平台文档</span> */}
      <span>© 2023-{new Date().getFullYear()} 文多多 AiPPT</span>
    </div>
  </Footer>
)

// const banner = <Banner storageKey='docmee-open-platform-docs-banner'  >文多多AiPPT 开放平台文档</Banner>

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" dir="ltr" suppressHydrationWarning className={cn('font-sans', geist.variable)}>
      <Head />
      <body className="relative min-h-screen overflow-x-hidden bg-background">
        <TooltipProvider>
          <div className="pointer-events-none inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute left-0 top-0 h-[80vh] w-full">
              <DotPattern
                width={14}
                height={14}
                className={cn('mask-[radial-gradient(ellipse_at_top_center,white_10%,transparent_80%)] opacity-40 dark:opacity-10')}
              />
            </div>
            <HexagonPattern
              radius={14}
              gap={5}
              hexagons={[
                [2, 1],
                [6, 2],
                [4, 4],
                [9, 3],
              ]}
              className={cn(
                'inset-x-0 top-[6vh] bottom-auto h-[90vh] stroke-accent/20 fill-transparent opacity-50 mask-[radial-gradient(ellipse_at_top,white_18%,transparent_72%)]'
              )}
            />
            <div
              className="absolute inset-x-0 top-0 h-[55vh] bg-[radial-gradient(circle_at_top,hsl(var(--accent)/0.18),transparent_62%)]"
            />
          </div>
          <div className="site-shell relative">
            <div
              className="fixed -bottom-40 -right-24 size-[65vh] opacity-15  bg-accent/50 rounded-full mask-[radial-gradient(circle_at_center,white_10%,transparent_40%)] pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="fixed -top-[10vh] -left-[30vh] size-[55vh] opacity-15  bg-accent/50 rounded-full mask-[radial-gradient(circle_at_center,white_10%,transparent_40%)] pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="fixed top-0 -right-[30vh] size-[45vh]  bg-sky-400/10 rounded-full mask-[radial-gradient(circle_at_center,white_10%,transparent_40%)] pointer-events-none"
              aria-hidden="true"
            />

            <Layout
              navbar={navbar}
              feedback={{ content: null, labels: undefined }}
              editLink={null}
              copyPageButton={true}
              toc={{ title: '目录', float: true }}
              pageMap={await getPageMap('')}
              footer={footer}
              // banner={banner}
              sidebar={{autoCollapse: true,defaultMenuCollapseLevel: 1}}
            >
              <SidebarControlsBridge />
              <main className="nextra-article-main relative z-10">{children}</main>
            </Layout>
          </div>
        </TooltipProvider>
      </body>
    </html>
  )
}
