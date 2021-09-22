import React from "react"
import { graphql } from "react-relay"
import { MockBoot } from "v2/DevTools"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { GeneFamiliesFragmentContainer } from "../GeneFamilies"
import { GeneFamilies_Test_Query } from "v2/__generated__/GeneFamilies_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => false,
}))

const { getWrapper } = setupTestWrapper<GeneFamilies_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        <GeneFamiliesFragmentContainer {...(props as any)} />
      </MockBoot>
    )
  },
  query: graphql`
    query GeneFamilies_Test_Query {
      geneFamiliesConnection(first: 20) {
        ...GeneFamilies_geneFamiliesConnection
      }
    }
  `,
})

describe("GeneFamilies", () => {
  it("renders gene families", () => {
    const wrapper = getWrapper({
      GeneFamilyConnection: () => ({
        edges: [
          {
            node: {
              internalID: "12345",
              name: "Artistic Disciplines",
            },
          },
        ],
      }),
    })

    expect(wrapper.find("GeneFamily").length).toBe(1)
    expect(wrapper.text()).toContain("Artistic Disciplines")
  })
})
