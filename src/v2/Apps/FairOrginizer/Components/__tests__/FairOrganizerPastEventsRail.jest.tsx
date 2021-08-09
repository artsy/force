import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { FairOrganizerPastEventsRail_Test_Query } from "v2/__generated__/FairOrganizerPastEventsRail_Test_Query.graphql"
import { FairOrganizerPastEventRailCell } from "../FairOrganizerPastEventRailCell"
import { FairOrganizerPastEventsRailFragmentContainer as FairOrganizerPastEventsRail } from "../FairOrganizerPastEventsRail"

jest.unmock("react-relay")

describe("FairOrganizerPastEventsRail", () => {
  const { getWrapper } = setupTestWrapper<
    FairOrganizerPastEventsRail_Test_Query
  >({
    Component: FairOrganizerPastEventsRail,
    query: graphql`
      query FairOrganizerPastEventsRail_Test_Query($slug: String!) {
        fairs: fairsConnection(fairOrganizerID: $slug) {
          ...FairOrganizerPastEventsRail_fairs
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

    expect(wrapper.find(FairOrganizerPastEventRailCell).length).toBe(2)
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
