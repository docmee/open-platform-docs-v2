import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
  codeHighlight: true,
  readingTime: true,
  mdxOptions: {
    rehypePrettyCodeOptions: {
      bypassInlineCode: true,
      // keepBackground: true,
      // theme: 'night-owl',
      theme: {
        light: 'night-owl-light',
        dark: 'night-owl',
      },
    },
  },
})

export default withNextra({
  images: {
    domains: ['oss.docmee.cn'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oss.docmee.cn',
      },
    ],
  },
})
