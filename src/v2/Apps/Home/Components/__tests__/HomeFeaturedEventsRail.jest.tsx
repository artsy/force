import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeFeaturedEventsRail_Test_Query } from "v2/__generated__/HomeFeaturedEventsRail_Test_Query.graphql"
import { HomeFeaturedEventsRailFragmentContainer } from "../HomeFeaturedEventsRail"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<HomeFeaturedEventsRail_Test_Query>({
  Component: HomeFeaturedEventsRailFragmentContainer,
  query: graphql`
    query HomeFeaturedEventsRail_Test_Query {
      orderedSet(id: "test") {
        ...HomeFeaturedEventsRail_orderedSet
      }
    }
  `,
})

describe("HomeFeaturedEventsRail", () => {
  it("sets correct href to fair page to RouterLink", () => {
    const wrapper = getWrapper({
      OrderedSet: () => ({
        items: [
          { internalID: "event-1" },
          {
            internalID: "event-2",
            href: "https://www.artsy.net/fair/art-paris-fair-2021",
          },
          {
            internalID: "event-3",
            href: "https://www.artsy.net/fair/future-fair-2021/booths",
          },
        ],
      }),
    })

    const routerLink = wrapper.find("RouterLink")

    expect(routerLink.at(0).prop("to")).toEqual("")
    expect(routerLink.at(1).prop("to")).toEqual(
      "https://www.artsy.net/fair/art-paris-fair-2021"
    )
    expect(routerLink.at(2).prop("to")).toEqual(
      "https://www.artsy.net/fair/future-fair-2021"
    )
  })
})
