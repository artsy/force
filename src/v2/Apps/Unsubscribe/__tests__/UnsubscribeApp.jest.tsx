import { MockBoot } from "v2/DevTools"
import React from "react"
import { mount } from "enzyme"
import {
  UnsubscribeApp,
  UnsubscribeAppFragmentContainer,
} from "../UnsubscribeApp"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { UnsubscribeApp_Test_Query } from "v2/__generated__/UnsubscribeApp_Test_Query.graphql"
import { useRouter } from "v2/System/Router/useRouter"

const mockUseRouter = useRouter as jest.Mock

jest.unmock("react-relay")
jest.mock("v2/System/Router/useRouter")

const { getWrapper } = setupTestWrapper<UnsubscribeApp_Test_Query>({
  Component: props => (
    <MockBoot>
      <UnsubscribeAppFragmentContainer {...props} />
    </MockBoot>
  ),
  query: graphql`
    query UnsubscribeApp_Test_Query {
      me {
        ...UnsubscribeApp_me
      }
    }
  `,
})

const bootAndMount = props => {
  const wrapper = mount(
    <MockBoot>
      <UnsubscribeApp {...props} />
    </MockBoot>
  )

  return wrapper
}

describe("UnsubscribeApp", () => {
  const emptyQuery = {
    match: {
      location: {
        query: {},
      },
    },
  }

  const queryWithToken = {
    match: {
      location: {
        query: { authentication_token: "abc123" },
      },
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the logged in version with a user", () => {
    mockUseRouter.mockImplementation(() => emptyQuery)
    const wrapper = getWrapper()

    expect(wrapper.find("UnsubscribeLoggedIn")).toHaveLength(1)
    expect(wrapper.find("UnsubscribeLoggedOut")).toHaveLength(0)
    expect(wrapper.find("UnsubscribeFallback")).toHaveLength(0)
  })

  it("renders the logged out version with a token", () => {
    mockUseRouter.mockImplementation(() => queryWithToken)
    const wrapper = bootAndMount({ me: null })

    expect(wrapper.find("UnsubscribeLoggedIn")).toHaveLength(0)
    expect(wrapper.find("UnsubscribeLoggedOut")).toHaveLength(1)
    expect(wrapper.find("UnsubscribeFallback")).toHaveLength(0)
  })

  it("renders the fallback message without a user or token", () => {
    mockUseRouter.mockImplementation(() => emptyQuery)
    const wrapper = bootAndMount({ me: null })

    expect(wrapper.find("UnsubscribeLoggedIn")).toHaveLength(0)
    expect(wrapper.find("UnsubscribeLoggedOut")).toHaveLength(0)
    expect(wrapper.find("UnsubscribeFallback")).toHaveLength(1)
  })
})
