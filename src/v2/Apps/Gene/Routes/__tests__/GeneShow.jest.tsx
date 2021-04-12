import React from "react"
import { GeneShowFragmentContainer } from "../GeneShow"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { GeneShow_Test_Query } from "v2/__generated__/GeneShow_Test_Query.graphql"
import { MockBoot } from "v2/DevTools"

jest.unmock("react-relay")
jest.mock("../../Components/GeneArtworkFilter", () => ({
  GeneArtworkFilterRefetchContainer: () => <div />,
}))

const { getWrapper } = setupTestWrapper<GeneShow_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        <GeneShowFragmentContainer {...props} />
      </MockBoot>
    )
  },
  query: graphql`
    query GeneShow_Test_Query {
      gene(id: "example") {
        ...GeneShow_gene
      }
    }
  `,
})

describe("GeneShow", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Gene: () => ({
        name: "Example Gene",
      }),
    })

    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Example Gene")
  })
})
