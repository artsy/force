import React from "react"
import { graphql } from "react-relay"
import { MockBoot } from "v2/DevTools"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { CategoriesApp } from "../CategoriesApp"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<any>({
  Component: _props => {
    return (
      <MockBoot>
        <CategoriesApp />
      </MockBoot>
    )
  },
  query: graphql`
    query CategoriesApp_Test_Query {
      geneFamiliesConnection(first: 20) {
        edges {
          node {
            id
          }
        }
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
