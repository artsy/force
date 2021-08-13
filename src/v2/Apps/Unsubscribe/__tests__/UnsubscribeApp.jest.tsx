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

  describe("logged in", () => {
    it("allows the user to manage their email preferences", () => {
      mockUseRouter.mockImplementation(() => emptyQuery)
      const wrapper = getWrapper()
      const html = wrapper.html()

      expect(html).toContain("Email Preferences")
      expect(html).toContain("Email frequency")
    })
  })

  describe("logged out; has token", () => {
    it("allows the user to opt-out of all email", () => {
      mockUseRouter.mockImplementation(() => queryWithToken)
      const wrapper = bootAndMount({ me: null })
      const html = wrapper.html()

      expect(html).toContain("Email Preferences")
      expect(html).toContain("Opt out of all email")
    })
  })

  describe("logged out; no token", () => {
    it("renders the fallback message", () => {
      mockUseRouter.mockImplementation(() => emptyQuery)
      const wrapper = bootAndMount({ me: null })
      const html = wrapper.html()

      expect(html).toContain("Please sign in to update your email preferences")

      expect(html).not.toContain("Email Preferences")
    })
  })
})
