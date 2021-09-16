import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeFeaturedGalleriesRailFragmentContainer } from "../Components/HomeFeaturedGalleriesRail"
import { HomeFeaturedGalleriesRail_Test_Query } from "v2/__generated__/HomeFeaturedGalleriesRail_Test_Query.graphql"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<HomeFeaturedGalleriesRail_Test_Query>({
  Component: props => {
    return (
      <HomeFeaturedGalleriesRailFragmentContainer
        orderedSet={props.orderedSet!}
      />
    )
  },
  query: graphql`
    query HomeFeaturedGalleriesRail_Test_Query {
      orderedSet(id: "5638fdfb7261690296000031") {
        ...HomeFeaturedGalleriesRail_orderedSet
      }
    }
  `,
})

describe("HomeFeaturedGalleriesRail", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      OrderedSet: () => ({
        orderedItemsConnection: {
          edges: [
            {
              node: {
                name: "Test Gallery",
                href: "test-href",
              },
            },
          ],
        },
      }),
    })

    expect(wrapper.text()).toContain("Featured Galleries")
    expect(wrapper.text()).toContain("View All Galleries")
    expect(wrapper.text()).toContain("Test Gallery")
    expect(wrapper.text()).toContain("Following")
    expect(wrapper.html()).toContain("test-href")
  })
})
