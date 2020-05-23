import { EntityHeader } from "@artsy/palette"
import { CollectionsAppTestQueryRawResponse } from "v2/__generated__/CollectionsAppTestQuery.graphql"
import { CategoriesFixture } from "v2/Apps/__tests__/Fixtures/Collections"
import { CollectionsAppFragmentContainer as CollectionsApp } from "v2/Apps/Collect/Routes/Collections"
import { CollectionsGrid } from "v2/Apps/Collect/Routes/Collections/Components/CollectionsGrid"
import { BreadCrumbList } from "v2/Components/Seo"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("found", () => ({
  Link: () => <div />,
  RouterContext: jest.requireActual("found").RouterContext,
}))

describe("CollectionApp", () => {
  it("renders a relay tree correctly", async () => {
    const getRelayWrapper = async () => {
      const trackEvent = jest.fn()
      const tracking = { trackEvent }
      return await renderRelayTree({
        Component: CollectionsApp,
        componentProps: { tracking },
        query: graphql`
          query CollectionsAppTestQuery @raw_response_type {
            marketingCategories {
              ...Collections_marketingCategories
            }
          }
        `,
        mockData: {
          marketingCategories: [
            {
              name: "Modern",
              collections: [], // "Modern" exists to test sort order so no need to add collections
            },
            ...CategoriesFixture,
          ],
        } as CollectionsAppTestQueryRawResponse,
        wrapper: children => <MockBoot breakpoint="lg">{children}</MockBoot>,
      })
    }
    const tree = await getRelayWrapper()

    expect(tree.find(CollectionsGrid).length).toBe(4)
    expect(tree.find(EntityHeader).length).toBe(10)
    expect(tree.text()).toMatch("Abstract Art")
    expect(tree.text()).toMatch("Keith Haring: Pop")
    expect(tree.find(CollectionsGrid).get(0).props.name).toEqual("Abstract Art")
    expect(tree.find(CollectionsGrid).get(1).props.name).toEqual(
      "Contemporary Art"
    )
    expect(tree.find(CollectionsGrid).get(2).props.name).toEqual("Modern")
    expect(tree.find(CollectionsGrid).get(3).props.name).toEqual("Street Art")

    const breadCrumbList = tree.find(BreadCrumbList)

    expect(breadCrumbList.props().items).toEqual([
      { path: "/collections", name: "Collections" },
    ])
  })
})
