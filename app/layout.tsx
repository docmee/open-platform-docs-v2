import Image from 'next/image'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import 'nextra-theme-docs/style.css'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import './global.css'

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

// const banner = (
//   <Banner
//     storageKey="docmee-docs-center-doc-v2-banner"
//   >
//     文多多AiPPT文档中心 2.0 已发布 🎉
//   </Banner>
// )
const navbar = (
  <Navbar
    logo={
      <div className="text-xl font-bold flex items-center gap-1">
        <Image
          src="https://oss.docmee.cn/static/open/open-platform-logo.png"
          className="size-10"
          alt="文多多AiPPT文档中心"
          width={100}
          height={100}
        />
        文多多AiPPT文档中心
      </div>
    }
    // ... Your additional navbar options
  />
)
const footer = <Footer>MIT {new Date().getFullYear()} © 文多多AiPPT.</Footer>

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      // Not required, but good for SEO
      lang="zh-CN"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
      // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        {/* <div className="-z-10 fixed top-0 left-0 right-0 bottom-0 bg-linear-to-br from-background  to-pink-200/20">
          <div className="size-96 rounded-full bg-blue-400 shadow-3xl shadow-pink-300 opacity-5 blur-2xl scale-y-75 rotate-45 top-40 right-40 absolute"></div>
          <div className="size-[40vw] rounded-full bg-linear-to-r from-sky-400/10 to-rose-300/10 blur-3xl bottom-[20vh] left-[10vw] absolute scale-x-105"></div>
          <div className="size-[20vh] rounded-full bg-pink-400/10 blur-2xl skew-x-12 bottom-40 left-40 scale-200 absolute"></div>
        </div> */}
        <Layout
          // banner={banner}
          navbar={navbar}
          feedback={{ content: null, labels: undefined }}
          editLink={null}
          pageMap={await getPageMap('')}
          // docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
          footer={footer}
          // ... Your additional layout options
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
