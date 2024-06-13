import {
  SystemContextConsumer,
  SystemContextProps,
  SystemContextProvider,
  withSystemContext,
} from "System/Contexts/SystemContext"
import { render } from "enzyme"
import * as React from "react"

jest.mock("System/Relay/createRelaySSREnvironment", () => ({
  createRelaySSREnvironment: config => ({
    description: `A mocked env for ${
      config.user ? config.user.id : "no-current-user"
    }`,
  }),
}))

const ShowCurrentUser: React.SFC<
  SystemContextProps & {
    additionalProp?: string
  }
> = props => {
  let text = props.user ? props.user.id : "no-current-user"
  if (props.additionalProp) {
    text = `${text} & ${props.additionalProp}`
  }
  return <div>{text}</div>
}
// This HOC adds the context to the component.
const WithCurrentUser = withSystemContext(ShowCurrentUser)

const ShowRelayEnvironment: React.SFC<SystemContextProps> = props => {
  const mockedEnv: any = props.relayEnvironment
  return <div>{mockedEnv.description}</div>
}
const WithRelayEnvironment = withSystemContext(ShowRelayEnvironment)

describe("Artsy context", () => {
  const user = {
    id: "andy-warhol",
    accessToken: "secret",
  }

  // eslint-disable-next-line jest/no-done-callback
  it("injects default renderProps", done => {
    render(
      <SystemContextProvider>
        <SystemContextConsumer>
          {props => {
            expect(Object.keys(props).sort()).toEqual([
              "isEigen",
              "isFetching",
              "isLoggedIn",
              "relayEnvironment",
              "router",
              "setFetching",
              "setRouter",
              "setUser",
              "user",
            ])
            setTimeout(done, 0)
            return <div />
          }}
        </SystemContextConsumer>
      </SystemContextProvider>
    )
  })

  describe("isEigen", () => {
    it("does not get overwritten by sharify if truthy", () => {
      jest.mock("sharify", () => ({
        data: { EIGEN: false },
      }))
      render(
        <SystemContextProvider isEigen={true}>
          <SystemContextConsumer>
            {props => {
              expect(props.isEigen).toBe(true)
              return null
            }}
          </SystemContextConsumer>
        </SystemContextProvider>
      )
      expect.assertions(1)
    })
  })

  describe("concerning the current user", () => {
    let originalEnv

    beforeAll(() => {
      originalEnv = process.env
      process.env = Object.assign({}, originalEnv, {
        USER_ID: "user-id-from-env",
        USER_ACCESS_TOKEN: "user-access-token-from-env",
      })
    })

    afterAll(() => {
      process.env = originalEnv!
    })

    it("exposes the currently signed-in user", () => {
      const wrapper = render(
        <SystemContextProvider user={user}>
          <WithCurrentUser />
        </SystemContextProvider>
      )
      expect(wrapper.text()).toEqual("andy-warhol")
    })

    it("defaults to environment variables if available", () => {
      const wrapper = render(
        <SystemContextProvider>
          <WithCurrentUser />
        </SystemContextProvider>
      )
      expect(wrapper.text()).toEqual("user-id-from-env")
    })

    it("does not default to environment variables when explicitly passing null", () => {
      const wrapper = render(
        <SystemContextProvider user={null}>
          <WithCurrentUser />
        </SystemContextProvider>
      )
      expect(wrapper.text()).toEqual("no-current-user")
    })
  })

  it("creates and exposes a Relay environment", () => {
    const wrapper = render(
      <SystemContextProvider user={user}>
        <WithRelayEnvironment />
      </SystemContextProvider>
    )
    expect(wrapper.text()).toEqual("A mocked env for andy-warhol")
  })

  it("exposes a passed in Relay environment", () => {
    const mockedEnv: any = { description: "A passed in mocked env" }
    const wrapper = render(
      <SystemContextProvider user={user} relayEnvironment={mockedEnv}>
        <WithRelayEnvironment />
      </SystemContextProvider>
    )
    expect(wrapper.text()).toEqual("A passed in mocked env")
  })

  it("passes other props on", () => {
    const wrapper = render(
      <SystemContextProvider user={user}>
        <WithCurrentUser additionalProp="friends" />
      </SystemContextProvider>
    )
    expect(wrapper.text()).toEqual("andy-warhol & friends")
  })
})
