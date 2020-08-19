import { Breakpoint } from "@artsy/palette"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import React from "react"
import FairOverview from "../FairOverview"
import { graphql } from "react-relay"
import { FairOverview_QueryRawResponse } from "v2/__generated__/FairOverview_Query.graphql"

jest.unmock("react-relay")

const FAIR_OVERVIEW_FIXTURE: FairOverview_QueryRawResponse = {
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
    articles: {
      edges: [],
    },
  },
}

const FAIR_EDITORIAL_ARTICLE_FIXTURE = {
  id: "QXJ0aWNsZTo1ZGE1ZTQ1YjQ2NzY5NDAwMjBkODI4NWM=",
  title: "IFPDA Fine Art Print Fair 2019: Programming and Projects",
  href:
    "/article/ifpda-fine-art-print-fair-ifpda-fine-art-print-fair-2019-programming-projects",
  author: { name: "IFPDA" },
  thumbnailTitle: "IFPDA Fine Art Print Fair 2019: Programming and Projects",
  thumbnailImage: {
    _1x: {
      width: 140,
      height: 80,
      src: "example.jpg",
    },
    _2x: {
      width: 280,
      height: 160,
      src: "example.jpg",
    },
  },
}

describe("FairOverview", () => {
  const getWrapper = async (
    breakpoint: Breakpoint = "lg",
    response: FairOverview_QueryRawResponse = FAIR_OVERVIEW_FIXTURE
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

  it("renders articles", async () => {
    const wrapper = await getWrapper("lg", {
      fair: {
        ...FAIR_OVERVIEW_FIXTURE.fair,
        articles: {
          edges: [{ node: FAIR_EDITORIAL_ARTICLE_FIXTURE } as any],
        },
      },
    })

    const html = wrapper.html()

    expect(html).toContain("Coverage by Artsy Editorial")
    expect(html).toContain(
      "IFPDA Fine Art Print Fair 2019: Programming and Projects"
    )
  })

  it("does not render articles when they are missing", async () => {
    const wrapper = await getWrapper()

    const html = wrapper.html()

    expect(html).not.toContain("Coverage by Artsy Editorial")
    expect(html).not.toContain(
      "IFPDA Fine Art Print Fair 2019: Programming and Projects"
    )
  })
})
