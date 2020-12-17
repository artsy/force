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
      mockData: response,
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
    expect(MoreInfoButton.first().prop("to")).toEqual("/fair/miart-2020/info")
  })

  it("doesn't display the More info link if there is no info", async () => {
    const missingInfoFair: FairHeader_QueryRawResponse = {
      fair: {
        ...FairHeaderFixture.fair,
        about: "",
        contact: "",
        hours: "",
        links: "",
        location: null,
        summary: "",
        tagline: "",
        tickets: "",
        ticketsLink: "",
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
        contact: "",
        hours: "",
        links: "",
        location: null,
        summary: "",
        tagline: "I have a tagline",
        tickets: "",
        ticketsLink: "",
      },
    }

    const wrapper = await getWrapper("lg", missingInfoFair)
    const MoreInfoButton = wrapper
      .find(RouterLink)
      .filterWhere(t => t.text() === "More info")
    expect(MoreInfoButton.length).toEqual(1)
  })

  it("displays the relevant timing info", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.text()).toContain("Closed")
  })
})

const FairHeaderFixture: FairHeader_QueryRawResponse = {
  fair: {
    about: "This is the about.",
    endAt: "2020-09-19T08:00:00+00:00",
    exhibitionPeriod: "Aug 19 - Sep 19",
    hours: "",
    id: "fair12345",
    image: {
      large: {
        srcSet: "https://cloudfront.com/square.jpg",
      },
      medium: {
        src: "https://cloudfront.com/square.jpg",
        srcSet: "https://cloudfront.com/square.jpg",
      },
      small: {
        height: 400,
        src: "https://cloudfront.com/square.jpg",
        srcSet: "https://cloudfront.com/square.jpg",
        width: 100,
      },
    },
    contact: "<b>Contact us</b>",
    links: "",
    location: null,
    name: "Miart 2020",
    profile: {
      icon: {
        cropped: {
          src: "/path/to/cats.jpg",
          srcSet: "/path/to/cats.jpg",
        },
      },
      id: "profile",
    },
    slug: "miart-2020",
    startAt: "2020-08-19T08:00:00+00:00",
    summary: "This is the summary.",
    tagline: "",
    tickets: "<b>Tickets available today</b>",
    ticketsLink: "",
  },
}
