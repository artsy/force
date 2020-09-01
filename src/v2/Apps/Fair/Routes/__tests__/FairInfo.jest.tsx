import { renderRelayTree } from "v2/DevTools"
import React from "react"
import { FairInfoFragmentContainer } from "../FairInfo"
import { graphql } from "react-relay"
import { FairInfo_QueryRawResponse } from "v2/__generated__/FairInfo_Query.graphql"

jest.unmock("react-relay")

describe("FairInfo", () => {
  const getWrapper = async (
    response: FairInfo_QueryRawResponse = FAIR_INFO_FIXTURE
  ) => {
    return renderRelayTree({
      Component: ({ fair }) => {
        return <FairInfoFragmentContainer fair={fair} />
      },
      query: graphql`
        query FairInfo_Query($slug: String!) @raw_response_type {
          fair(id: $slug) {
            ...FairInfo_fair
          }
        }
      `,
      variables: { slug: "miart-2020" },
      mockData: response,
    })
  }

  it("displays more information about the fair", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.text()).toContain("This is the about.")
    expect(wrapper.text()).toContain("LocationJavitz Center")
    expect(wrapper.text()).toContain("HoursOpen every day at 5am")
    expect(wrapper.text()).toContain("Buy Tickets")
    expect(wrapper.text()).toContain("LinksGoogle it")
  })

  it("handles missing information", async () => {
    const missingInfo = {
      fair: {
        ...FAIR_INFO_FIXTURE.fair,
        about: "",
        tagline: "",
        location: null,
        ticketsLink: "",
        hours: "",
        links: "",
        tickets: "",
        contact: "",
        summary: "",
      },
    }
    const wrapper = await getWrapper(missingInfo)
    expect(wrapper.text()).not.toContain("Location")
    expect(wrapper.text()).not.toContain("Hours")
    expect(wrapper.text()).not.toContain("Buy Tickets")
    expect(wrapper.text()).not.toContain("Links")
    expect(wrapper.text()).not.toContain("Tickets")
    expect(wrapper.text()).not.toContain("Contact")
  })
})

const FAIR_INFO_FIXTURE: FairInfo_QueryRawResponse = {
  fair: {
    id: "fair12345",
    about: "This is the about.",
    name: "Miart 2020",
    slug: "miart-2020",
    tagline: "The tagline.",
    location: {
      id: "location124",
      summary: "Javitz Center",
    },
    ticketsLink: "https://eventbrite.com/cool-event",
    hours: "Open every day at 5am",
    links: "<a href='google.com'>Google it</a>",
    tickets: "<b>Tickets available today</b>",
    contact: "<b>Contact us</b>",
    summary: "This is the summary.",
  },
}
