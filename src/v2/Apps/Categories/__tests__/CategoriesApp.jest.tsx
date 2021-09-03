import React from "react"
import { graphql } from "react-relay"
import { MockBoot } from "v2/DevTools"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { CategoriesAppFragmentContainer } from "../CategoriesApp"
import { CategoriesApp_Test_Query } from "v2/__generated__/CategoriesApp_Test_Query.graphql"

jest.unmock("react-relay")

jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => ({}),
}))

const { getWrapper } = setupTestWrapper<CategoriesApp_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        <CategoriesAppFragmentContainer {...(props as any)} />
      </MockBoot>
    )
  },
  query: graphql`
    query CategoriesApp_Test_Query {
      geneFamiliesConnection(first: 20) {
        ...CategoriesApp_geneFamiliesConnection
      }
    }
  `,
})

describe("CategoriesApp", () => {
  it("renders", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("CategoriesApp").exists()).toBe(true)
  })
})
