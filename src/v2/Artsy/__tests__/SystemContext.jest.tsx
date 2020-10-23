import { SystemContextProps } from "v2/Artsy"
import * as Artsy from "v2/Artsy"
import { render } from "enzyme"
import React from "react"

jest.mock("v2/Artsy/Relay/createRelaySSREnvironment", () => ({
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
const WithCurrentUser = Artsy.withSystemContext(ShowCurrentUser)

const ShowRelayEnvironment: React.SFC<SystemContextProps> = props => {
  const mockedEnv: any = props.relayEnvironment
  return <div>{mockedEnv.description}</div>
}
const WithRelayEnvironment = Artsy.withSystemContext(ShowRelayEnvironment)

describe("Artsy context", () => {
  const user = {
    id: "andy-warhol",
    accessToken: "secret",
  }

  it("injects default renderProps", done => {
    render(
      <Artsy.SystemContextProvider>
        <Artsy.SystemContextConsumer>
          {props => {
            expect(Object.keys(props).sort()).toEqual([
              "isEigen",
              "isFetching",
              "mediator",
              "relayEnvironment",
              "router",
              "setFetching",
              "setRouter",
              "setUser",
              "user",
            ])
            setImmediate(done)
            return <div />
          }}
        </Artsy.SystemContextConsumer>
      </Artsy.SystemContextProvider>
    )
  })

  describe("concerning the current user", () => {
    let originalEnv = null

    beforeAll(() => {
      originalEnv = process.env
      process.env = Object.assign({}, originalEnv, {
        USER_ID: "user-id-from-env",
        USER_ACCESS_TOKEN: "user-access-token-from-env",
      })
    })

    afterAll(() => {
      process.env = originalEnv
    })

    it("exposes the currently signed-in user", () => {
      const wrapper = render(
        <Artsy.SystemContextProvider user={user}>
          <WithCurrentUser />
        </Artsy.SystemContextProvider>
      )
      expect(wrapper.text()).toEqual("andy-warhol")
    })

    it("defaults to environment variables if available", () => {
      const wrapper = render(
        <Artsy.SystemContextProvider>
          <WithCurrentUser />
        </Artsy.SystemContextProvider>
      )
      expect(wrapper.text()).toEqual("user-id-from-env")
    })

    it("does not default to environment variables when explicitly passing null", () => {
      const wrapper = render(
        <Artsy.SystemContextProvider user={null}>
          <WithCurrentUser />
        </Artsy.SystemContextProvider>
      )
      expect(wrapper.text()).toEqual("no-current-user")
    })
  })

  it("creates and exposes a Relay environment", () => {
    const wrapper = render(
      <Artsy.SystemContextProvider user={user}>
        <WithRelayEnvironment />
      </Artsy.SystemContextProvider>
    )
    expect(wrapper.text()).toEqual("A mocked env for andy-warhol")
  })

  it("exposes a passed in Relay environment", () => {
    const mockedEnv: any = { description: "A passed in mocked env" }
    const wrapper = render(
      <Artsy.SystemContextProvider user={user} relayEnvironment={mockedEnv}>
        <WithRelayEnvironment />
      </Artsy.SystemContextProvider>
    )
    expect(wrapper.text()).toEqual("A passed in mocked env")
  })

  it("passes other props on", () => {
    const wrapper = render(
      <Artsy.SystemContextProvider user={user}>
        <WithCurrentUser additionalProp="friends" />
      </Artsy.SystemContextProvider>
    )
    expect(wrapper.text()).toEqual("andy-warhol & friends")
  })
})
