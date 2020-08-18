import { Breakpoint } from "@artsy/palette"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import React from "react"
import { FairHeaderFragmentContainer } from "../FairHeader"
import { graphql } from "react-relay"
import { FairHeader_QueryRawResponse } from "v2/__generated__/FairHeader_Query.graphql"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

jest.unmock("react-relay")

describe("FairHeader", () => {
  const getWrapper = async (
    breakpoint: Breakpoint = "lg",
    response: FairHeader_QueryRawResponse = FairHeaderFixture
  ) => {
    return renderRelayTree({
      Component: ({ fair }) => {
        return (
          <MockBoot breakpoint={breakpoint}>
            <FairHeaderFragmentContainer fair={fair} />
          </MockBoot>
        )
      },
      query: graphql`
        query FairHeader_Query($slug: String!) @raw_response_type {
          fair(id: $slug) {
            ...FairHeader_fair
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
    expect(wrapper.text()).toContain("Miart 2020")
    expect(wrapper.text()).toContain("This is the summary.")
  })

  it("displays the about content if there is no summary", async () => {
    const noSummaryFair: FairHeader_QueryRawResponse = {
      fair: {
        ...FairHeaderFixture.fair,
        summary: "",
      },
    }
    const wrapper = await getWrapper("lg", noSummaryFair)
    expect(wrapper.text()).toContain("This is the about.")
  })

  it("displays a link to see more info about the fair", async () => {
    const wrapper = await getWrapper()
    const MoreInfoButton = wrapper
      .find(RouterLink)
      .filterWhere(t => t.text() === "More info")
    expect(MoreInfoButton.length).toEqual(1)
    expect(MoreInfoButton.first().prop("to")).toEqual("/fair2/miart-2020/info")
  })

  it("doesn't display the More info link if there is no info", async () => {
    const missingInfoFair: FairHeader_QueryRawResponse = {
      fair: {
        ...FairHeaderFixture.fair,
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

    const wrapper = await getWrapper("lg", missingInfoFair)
    const MoreInfoButton = wrapper
      .find(RouterLink)
      .filterWhere(t => t.text() === "More info")
    expect(MoreInfoButton.length).toEqual(0)
  })

  it("displays the More info link as long as there is some information", async () => {
    const missingInfoFair: FairHeader_QueryRawResponse = {
      fair: {
        ...FairHeaderFixture.fair,
        about: "",
        tagline: "I have a tagline",
        location: null,
        ticketsLink: "",
        hours: "",
        links: "",
        tickets: "",
        contact: "",
        summary: "",
      },
    }

    const wrapper = await getWrapper("lg", missingInfoFair)
    const MoreInfoButton = wrapper
      .find(RouterLink)
      .filterWhere(t => t.text() === "More info")
    expect(MoreInfoButton.length).toEqual(1)
  })
})

const FairHeaderFixture: FairHeader_QueryRawResponse = {
  fair: {
    id: "fair12345",
    about: "This is the about.",
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
