import { MockBoot, renderRelayTree } from "v2/DevTools"
import React from "react"
import FairApp from "../FairApp"
import { graphql } from "react-relay"
import { Title } from "react-head"
import { FairApp_QueryRawResponse } from "v2/__generated__/FairApp_Query.graphql"

jest.unmock("react-relay")

const FAIR_APP_FIXTURE: FairApp_QueryRawResponse = {
  fair: {
    id: "fair12345",
    about: "Lorem ipsum",
    name: "Miart 2020",
    formattedOpeningHours: "Closes in 12 days",
    slug: "miart-2020",
    smallHero: {
      _1x: {
        src: "https://cloudfront.com/square.jpg",
        width: 300,
        height: 400,
      },
      _2x: {
        src: "https://cloudfront.com/square.jpg",
      },
    },
    mediumHero: {
      _1x: {
        src: "https://cloudfront.com/square.jpg",
        width: 600,
        height: 800,
      },
      _2x: {
        src: "https://cloudfront.com/square.jpg",
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
    profile: {
      id: "profile",
      icon: {
        _1x: {
          src: "/path/to/cats.jpg",
        },
        _2x: {
          src: "/path/to/cats.jpg",
        },
      },
    },
    metaDescription: null,
    metaImage: null,
  },
}

const FAIR_EDITORIAL_ARTICLE_FIXTURE = {
  id: "QXJ0aWNsZTo1ZGE1ZTQ1YjQ2NzY5NDAwMjBkODI4NWM=",
  title: "IFPDA Fine Art Print Fair 2019: Programming and Projects",
  href:
    "/article/ifpda-fine-art-print-fair-ifpda-fine-art-print-fair-2019-programming-projects",
  publishedAt: "Jun 9th, 2020",
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

describe("FairApp", () => {
  const getWrapper = async (
    response: FairApp_QueryRawResponse = FAIR_APP_FIXTURE
  ) => {
    return renderRelayTree({
      Component: ({ fair }) => {
        return (
          <MockBoot>
            <FairApp fair={fair} />
          </MockBoot>
        )
      },
      query: graphql`
        query FairApp_Query($slug: String!) @raw_response_type {
          fair(id: $slug) {
            ...FairApp_fair
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

  it("renders articles if they are present", async () => {
    const wrapper = await getWrapper({
      fair: {
        ...FAIR_APP_FIXTURE.fair,
        articles: {
          edges: [{ node: FAIR_EDITORIAL_ARTICLE_FIXTURE } as any],
        },
      },
    })

    const html = wrapper.html()

    expect(html).toContain("Related articles")
    expect(html).toContain(
      "IFPDA Fine Art Print Fair 2019: Programming and Projects"
    )
  })

  it("does not render articles when they are missing", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()

    expect(html).not.toContain("Related articles")
    expect(html).not.toContain(
      "IFPDA Fine Art Print Fair 2019: Programming and Projects"
    )
  })

  it("renders the exhibitors tab by default", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()

    expect(html).toContain("Exhibitors")
  })

  it("sets a title tag", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find(Title).prop("children")).toEqual("Miart 2020 | Artsy")
  })
})
