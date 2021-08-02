import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { PastEventsRail_Test_Query } from "v2/__generated__/PastEventsRail_Test_Query.graphql"
import { PastEventRailCell } from "../PastEventRailCell"
import { PastEventsRailFragmentContainer as PastEventsRail } from "../PastEventsRail"

jest.unmock("react-relay")

describe("PastEventsRail", () => {
  const { getWrapper } = setupTestWrapper<PastEventsRail_Test_Query>({
    Component: PastEventsRail,
    query: graphql`
      query PastEventsRail_Test_Query($slug: String!) {
        fairs: fairsConnection(fairOrganizerID: $slug) {
          ...PastEventsRail_fairs
        }
      }
    `,
    variables: { slug: "fair" },
  })

  it("renders correctly", () => {
    const wrapper = getWrapper({
      CroppedImageUrl: () => ({
        width: 325,
        height: 140,
      }),
      FairConnection: () => ({
        edges: [
          {
            node: {
              name: "Banksy",
              slug: "banksy",
            },
          },
          {
            node: {
              name: "Kaws",
              slug: "kaws",
            },
          },
        ],
      }),
    })

    expect(wrapper.find(PastEventRailCell).length).toBe(2)
    expect(wrapper.find("RouterLink").length).toBe(2)

    expect(wrapper.find("RouterLink").at(0).html()).toContain(
      `href="/fair/banksy"`
    )
  })

  it("does not render rail if no collections", () => {
    const wrapper = getWrapper({
      FairConnection: () => ({
        edges: null,
      }),
    })

    expect(wrapper.html()).toBeFalsy()
  })
})
