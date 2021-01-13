import { MockBoot, renderRelayTree } from "v2/DevTools"
import React from "react"
import { FairAppFragmentContainer } from "../FairApp"
import { graphql } from "react-relay"
import { Title } from "react-head"
import { FairApp_QueryRawResponse } from "v2/__generated__/FairApp_Query.graphql"
import { useTracking } from "react-tracking"
import { OwnerType } from "@artsy/cohesion"

jest.unmock("react-relay")
jest.mock("react-tracking")

const FAIR_APP_FIXTURE: FairApp_QueryRawResponse = {
  fair: {
    about: "Lorem ipsum",
    articlesConnection: {
      totalCount: 0,
      edges: [],
    },
    contact: "<b>Contact us</b>",
    counts: {
      artworks: 10,
    },
    endAt: "2020-09-19T08:00:00+00:00",
    exhibitionPeriod: "Aug 19 - Sep 19",
    followedArtistArtworks: null,
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
    internalID: "bson-fair",
    links: "",
    location: null,
    marketingCollections: [],
    metaDescription: null,
    metaImage: null,
    name: "Miart 2020",
    profile: {
      __typename: "Profile",
      icon: {
        cropped: {
          src: "/path/to/cats.jpg",
          srcSet: "/path/to/cats.jpg",
        },
      },
      id: "profile",
    },
    slug: "miart-2020",
    href: "/fair/miart-2020",
    startAt: "2020-08-19T08:00:00+00:00",
    summary: "This is the summary.",
    tagline: "",
    tickets: "<b>Tickets available today</b>",
    ticketsLink: "",
  },
}

const FAIR_EDITORIAL_ARTICLE_FIXTURE = {
  href:
    "/article/ifpda-fine-art-print-fair-ifpda-fine-art-print-fair-2019-programming-projects",
  id: "QXJ0aWNsZTo1ZGE1ZTQ1YjQ2NzY5NDAwMjBkODI4NWM=",
  internalID: "articleID",
  publishedAt: "Jun 9th, 2020",
  slug: "article-slug",
  thumbnailImage: {
    cropped: {
      height: 80,
      src: "example.jpg",
      srcSet: "example.jpg",
      width: 140,
    },
  },
  thumbnailTitle: "IFPDA Fine Art Print Fair 2019: Programming and Projects",
  title: "IFPDA Fine Art Print Fair 2019: Programming and Projects",
}

const FAIR_COLLECTION_FIXTURE = {
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
  slug: "collectible-sculptures",
  title: "Big Artists, Small Sculptures",
}

describe("FairApp", () => {
  let trackEvent

  const getWrapper = async (
    response: FairApp_QueryRawResponse = FAIR_APP_FIXTURE
  ) => {
    return renderRelayTree({
      Component: ({ fair }) => {
        return (
          <MockBoot
            context={{
              analytics: {
                contextPageOwnerId: "bson-fair",
                contextPageOwnerSlug: "miart-2020",
                contextPageOwnerType: OwnerType.fair,
              },
            }}
          >
            <FairAppFragmentContainer fair={fair} />
          </MockBoot>
        )
      },
      mockData: response,
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
        articlesConnection: {
          totalCount: 1,
          edges: [{ node: FAIR_EDITORIAL_ARTICLE_FIXTURE } as any],
        },
      },
    })

    const html = wrapper.html()

    expect(html).toContain("Related Reading")
    expect(html).toContain(
      "IFPDA Fine Art Print Fair 2019: Programming and Projects"
    )
  })

  it("does not render articles when they are missing", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()

    expect(html).not.toContain("Related Reading")
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

    expect(html).toContain("Curated Highlights")
    expect(html).toContain("Big Artists, Small Sculptures")
    expect(html).toContain("10 works")
  })

  it("does not render the collection when it is missing", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()

    expect(html).not.toContain("Curated Highlights")
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

  it("renders the exhibitors tab with an appropriate href", async () => {
    const wrapper = await getWrapper()
    const exhibitorsTab = wrapper
      .find("RouteTab")
      .findWhere(t => !!t.text().match("Exhibitors"))
      .first()

    expect(exhibitorsTab.text()).toContain("Exhibitors")
    expect(exhibitorsTab.props().to).toEqual("/fair/miart-2020")
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
      destination_path: "/fair/miart-2020",
      subject: "Exhibitors",
    })
  })

  it("renders the artworks tab with a count and appropriate href", async () => {
    const wrapper = await getWrapper()
    const artworksTab = wrapper
      .find("RouteTab")
      .findWhere(t => !!t.text().match("Artworks"))
      .first()

    expect(artworksTab.text()).toContain("Artworks (10)")
    expect(artworksTab.props().to).toEqual("/fair/miart-2020/artworks")
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
      destination_path: "/fair/miart-2020/artworks",
      subject: "Artworks",
    })
  })
})
