import { MockBoot, renderRelayTree } from "v2/DevTools"
import React from "react"
import FairApp from "../FairApp"
import { graphql } from "react-relay"
import { Title } from "react-head"
import { FairApp_QueryRawResponse } from "v2/__generated__/FairApp_Query.graphql"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const FAIR_APP_FIXTURE: FairApp_QueryRawResponse = {
  fair: {
    id: "fair12345",
    counts: {
      artworks: 10,
    },
    internalID: "bson-fair",
    about: "Lorem ipsum",
    name: "Miart 2020",
    exhibitionPeriod: "Aug 19 - Sep 19",
    slug: "miart-2020",
    startAt: "2020-08-19T08:00:00+00:00",
    endAt: "2020-09-19T08:00:00+00:00",
    image: {
      small: {
        src: "https://cloudfront.com/square.jpg",
        srcSet: "https://cloudfront.com/square.jpg",
        width: 100,
        height: 400,
      },
      medium: {
        src: "https://cloudfront.com/square.jpg",
        srcSet: "https://cloudfront.com/square.jpg",
      },
      large: {
        srcSet: "https://cloudfront.com/square.jpg",
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
    marketingCollections: [],
    profile: {
      id: "profile",
      icon: {
        cropped: {
          src: "/path/to/cats.jpg",
          srcSet: "/path/to/cats.jpg",
        },
      },
    },
    metaDescription: null,
    metaImage: null,
    followedArtistArtworks: null,
  },
}

const FAIR_EDITORIAL_ARTICLE_FIXTURE = {
  id: "QXJ0aWNsZTo1ZGE1ZTQ1YjQ2NzY5NDAwMjBkODI4NWM=",
  slug: "article-slug",
  internalID: "articleID",
  title: "IFPDA Fine Art Print Fair 2019: Programming and Projects",
  href:
    "/article/ifpda-fine-art-print-fair-ifpda-fine-art-print-fair-2019-programming-projects",
  publishedAt: "Jun 9th, 2020",
  thumbnailTitle: "IFPDA Fine Art Print Fair 2019: Programming and Projects",
  thumbnailImage: {
    cropped: {
      width: 140,
      height: 80,
      src: "example.jpg",
      srcSet: "example.jpg",
    },
  },
}

const FAIR_COLLECTION_FIXTURE = {
  slug: "collectible-sculptures",
  title: "Big Artists, Small Sculptures",
  artworks: {
    counts: {
      total: 10,
    },
    edges: [
      {
        node: {
          image: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/soQ-Hq04yd7yFbKw_cbJbA/larger.jpg",
          },
        },
      },
      {
        node: {
          image: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/1y50hphmsAyRkWDPUOyM7Q/larger.jpg",
          },
        },
      },
      {
        node: {
          image: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/NNDJExmp5iTtKWoJj4Av6A/larger.jpg",
          },
        },
      },
    ],
  },
}

describe("FairApp", () => {
  let trackEvent

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

  beforeEach(() => {
    trackEvent = jest.fn()
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

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

  it("renders the collection when it is present", async () => {
    const wrapper = await getWrapper({
      fair: {
        ...FAIR_APP_FIXTURE.fair,
        marketingCollections: [FAIR_COLLECTION_FIXTURE as any],
      },
    })

    const html = wrapper.html()

    expect(html).toContain("Curated highlights")
    expect(html).toContain("Big Artists, Small Sculptures")
    expect(html).toContain("10 works")
  })

  it("does not render the collection when it is missing", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()

    expect(html).not.toContain("Curated highlights")
    expect(html).not.toContain("Big Artists, Small Sculptures")
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

  it("tracks clicks to the exhibitors tab", async () => {
    const wrapper = await getWrapper()
    const exhibitorsTab = wrapper
      .find("RouteTab")
      .findWhere(t => t.text() === "Exhibitors")
      .first()
    exhibitorsTab.simulate("click")

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedNavigationTab",
      context_module: "artworksTab",
      context_page_owner_id: "bson-fair",
      context_page_owner_slug: "miart-2020",
      context_page_owner_type: "fair",
      destination_path: "fair/miart-2020",
      subject: "Exhibitors",
    })
  })

  it("renders the count of artworks in the tab", async () => {
    const wrapper = await getWrapper()
    const artworksTab = wrapper
      .find("RouteTab")
      .findWhere(t => !!t.text().match("Artworks"))
      .first()

    expect(artworksTab.text()).toContain("Artworks (10)")
  })

  it("tracks clicks to the artworks tab", async () => {
    const wrapper = await getWrapper()
    const artworksTab = wrapper
      .find("RouteTab")
      .findWhere(t => !!t.text().match("Artworks"))
      .first()
    artworksTab.simulate("click")

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedNavigationTab",
      context_module: "exhibitorsTab",
      context_page_owner_id: "bson-fair",
      context_page_owner_slug: "miart-2020",
      context_page_owner_type: "fair",
      destination_path: "fair/miart-2020/artworks",
      subject: "Artworks",
    })
  })
})
