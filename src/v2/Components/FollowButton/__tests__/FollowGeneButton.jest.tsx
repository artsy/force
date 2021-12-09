import { graphql } from "react-relay"
import { FollowGeneButtonFragmentContainer } from "../FollowGeneButton"
import * as openAuthModal from "v2/Utils/openAuthModal"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { FollowGeneButton_Test_Query } from "v2/__generated__/FollowGeneButton_Test_Query.graphql"
import { mediator } from "lib/mediator"
import { FollowButton } from "../Button"

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  commitMutation: jest.fn(),
}))

import { commitMutation } from "react-relay"
import { SystemContextProvider } from "v2/System"

let user = {}

const { getWrapper } = setupTestWrapper<FollowGeneButton_Test_Query>({
  Component: props => {
    return (
      <SystemContextProvider user={user}>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <FollowGeneButtonFragmentContainer {...props} />
      </SystemContextProvider>
    )
  },
  query: graphql`
    query FollowGeneButton_Test_Query @relay_test_operation {
      gene(id: "example") {
        ...FollowGeneButton_gene
      }
    }
  `,
})

describe("FollowGeneButton", () => {
  describe("when you are not following", () => {
    const wrapper = getWrapper({
      Gene: () => ({ isFollowed: false }),
    })

    it("renders correctly", () => {
      // The first following is for handling the width of the element and can be ignored
      expect(wrapper.text()).toEqual("FollowingFollow")
    })

    it("follows on button click", async () => {
      wrapper.find(FollowButton).simulate("click")
      const mutation = (commitMutation as any).mock.calls[0][1].variables.input

      expect(mutation.unfollow).toBe(false)
    })
  })

  describe("when you are following", () => {
    const wrapper = getWrapper({
      Gene: () => ({ isFollowed: true }),
    })

    it("renders correctly", () => {
      // The first following is for handling the width of the element and can be ignored
      expect(wrapper.text()).toEqual("FollowingFollowing")
    })

    it("unfollows on button click", () => {
      wrapper.find(FollowButton).simulate("click")
      const mutation = (commitMutation as any).mock.calls[1][1].variables.input

      expect(mutation.unfollow).toBe(true)
    })
  })

  describe("logged out", () => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    user = null

    it("pops up the auth model when clicked", () => {
      const wrapper = getWrapper({
        Gene: () => ({
          id: "example",
          internalID: "example",
          name: "Example Gene",
          slug: "example-gene",
          isFollowed: false,
        }),
      })

      const openAuthToSatisfyIntent = jest.spyOn(
        openAuthModal,
        "openAuthToSatisfyIntent"
      )

      wrapper.find(FollowButton).simulate("click")

      expect(openAuthToSatisfyIntent).toBeCalledWith(mediator, {
        intent: "followGene",
        contextModule: "geneHeader",
        entity: {
          id: "example",
          internalID: "example",
          name: "Example Gene",
          slug: "example-gene",
          isFollowed: false,
        },
      })
    })
  })
})
