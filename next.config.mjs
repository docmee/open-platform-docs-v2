import nextra from 'nextra'

const withNextra = nextra({
  readingTime: true,
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
