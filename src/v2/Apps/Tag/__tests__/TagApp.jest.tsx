import React from "react"
import { TagAppFragmentContainer } from "../TagApp"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { TagApp_Test_Query } from "v2/__generated__/TagApp_Test_Query.graphql"
import { MockBoot } from "v2/DevTools"

jest.unmock("react-relay")
jest.mock("../Components/TagArtworkFilter", () => ({
  TagArtworkFilterRefetchContainer: () => <div />,
}))

const { getWrapper } = setupTestWrapper<TagApp_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        <TagAppFragmentContainer {...props} />
      </MockBoot>
    )
  },
  query: graphql`
    query TagApp_Test_Query {
      tag(id: "example") {
        ...TagApp_tag
      }
    }
  `,
})

describe("TagApp", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Tag: () => ({
        name: "Example Tag",
      }),
    })

    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Example Tag")
  })
})
