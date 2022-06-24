import { Head, BlitzLayout } from "blitz"

const Layout: BlitzLayout<{title?: string, children?: React.ReactNode}> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "self-env"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  )
}

export default Layout