import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    default: 'PicPeak Documentation',
    template: '%s | PicPeak Docs',
  },
  description: 'Documentation for PicPeak — self-hosted photo sharing for event photographers.',
}

const logo = (
  <span style={{ fontWeight: 800, fontSize: '1.2em' }}>
    PicPeak
  </span>
)

const navbar = (
  <Navbar
    logo={logo}
    projectLink="https://github.com/the-luap/picpeak"
  />
)

const footer = (
  <Footer>
    MIT {new Date().getFullYear()} © PicPeak
  </Footer>
)

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/the-luap/picpeak"
          footer={footer}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
