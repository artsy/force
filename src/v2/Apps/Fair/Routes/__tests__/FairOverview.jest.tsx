import { Breakpoint } from "@artsy/palette"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import React from "react"
import FairOverview from "../FairOverview"
import { graphql } from "react-relay"
import { FairOverview_QueryRawResponse } from "v2/__generated__/FairOverview_Query.graphql"

jest.unmock("react-relay")

describe("FairOverview", () => {
  const getWrapper = async (
    breakpoint: Breakpoint = "lg",
    response: FairOverview_QueryRawResponse = FairOverviewFixture
  ) => {
    return renderRelayTree({
      Component: ({ fair }) => {
        return (
          <MockBoot breakpoint={breakpoint}>
            <FairOverview fair={fair} />
          </MockBoot>
        )
      },
      query: graphql`
        query FairOverview_Query($slug: String!) @raw_response_type {
          fair(id: $slug) {
            ...FairOverview_fair
          }
        }
      `,
      variables: {
        slug: "miart-2020",
      },
      mockData: response,
    })
  }

  it("displays basic information about the fair", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find("FairHeader").length).toBe(1)
  })
})

const FairOverviewFixture: FairOverview_QueryRawResponse = {
  fair: {
    id: "fair12345",
    about: "Lorem ipsum",
    name: "Miart 2020",
    formattedOpeningHours: "Closes in 12 days",
    slug: "miart-2020",
    image: {
      cropped: {
        src: "https://cloudfront.com/square.jpg",
        width: 100,
        height: 400,
      },
    },
    tagline: "",
    location: null,
    ticketsLink: "",
    hours: "",
    links: "",
    tickets: "<b>Tickets available today</b>",
    contact: "<b>Contact us</b>",
    summary: "This is the summary.",
  },
}
