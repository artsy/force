import React from "react"
import { graphql } from "react-relay"
import { FollowGeneButtonFragmentContainer } from "../FollowGeneButton"
import * as openAuthModal from "v2/Utils/openAuthModal"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { MockBoot } from "v2/DevTools"
import { FollowGeneButton_Test_Query } from "v2/__generated__/FollowGeneButton_Test_Query.graphql"
import { mediator } from "lib/mediator"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<FollowGeneButton_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        <FollowGeneButtonFragmentContainer {...props} />
      </MockBoot>
    )
  },
  query: graphql`
    query FollowGeneButton_Test_Query {
      gene(id: "example") {
        ...FollowGeneButton_gene
      }
    }
  `,
})

describe("FollowGeneButton", () => {
  it("renders correctly if you are not following", () => {
    const wrapper = getWrapper({
      Gene: () => ({ isFollowed: false }),
    })

    // The first following is for handling the width of the element and can be ignored
    expect(wrapper.text()).toEqual("FollowingFollow")
  })

  it("renders correctly if you are following", () => {
    const wrapper = getWrapper({
      Gene: () => ({ isFollowed: true }),
    })

    // The first following is for handling the width of the element and can be ignored
    expect(wrapper.text()).toEqual("FollowingFollowing")
  })

  describe("logged out", () => {
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

      const openAuthToFollowSave = jest.spyOn(
        openAuthModal,
        "openAuthToFollowSave"
      )

      wrapper.find("button").simulate("click")

      expect(openAuthToFollowSave).toBeCalledWith(mediator, {
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
