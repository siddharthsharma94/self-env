import { Suspense, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { Button, Code, Page, Text, Textarea } from "@geist-ui/core"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  const [envText, setenvText] = useState<string | null>(null)
  const [envMap, setEnvMap] = useState(null)

  const testEnvRegex = (regex: string) => {
    const envExpression = new RegExp(/(^[A-Z0-9_]+)(\=)(.*\n(?=[A-Z])|.*$)/gm)
    const result = envExpression.test(regex)
    console.log(result)
    return result
  }

  const varsToJson = (vars: string) => {
    const map = new Map()
    for (let line of vars.split("\n")) {
      const [variable, value] = line.split("=")
      const noCharsValue = value!.replace(/["']/g, "")
      console.log("🚀 ~ file: index.tsx ~ line 69 ~ varsToJson ~ variable, value", variable, value)
      //@ts-ignore
      map.set(variable, noCharsValue)
    }
    setEnvMap(Object.fromEntries(map))
    return Object.fromEntries(map)
  }

  return (
    <Page>
      <div className="flex flex-col space-y-5">
        <Text h3>Enter ENV Vars to convert to JSON</Text>
        <Textarea onChange={(e) => setenvText(e.target.value)} width="100%" height="200px" />
        <Button
          onClick={() => varsToJson(envText!)}
          disabled={!testEnvRegex(envText!)}
          type="success-light"
          className="self-start"
        >
          Save
        </Button>
        {envMap && (
          <Code height="200px" block my={0}>
            {JSON.stringify(envMap, null, 2)}
          </Code>
        )}
      </div>
      {/* <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense> */}
    </Page>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
