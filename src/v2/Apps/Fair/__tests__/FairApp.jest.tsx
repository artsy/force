import { MockBoot } from "v2/DevTools"
import React from "react"
import { FairAppFragmentContainer } from "../FairApp"
import { graphql } from "react-relay"
import { Title } from "react-head"
import { FairApp_Test_Query } from "v2/__generated__/FairApp_Test_Query.graphql"
import { useTracking } from "react-tracking"
import { OwnerType } from "@artsy/cohesion"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { getWrapper } = setupTestWrapper<FairApp_Test_Query>({
  Component: props => {
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
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        <FairAppFragmentContainer {...props} />
      </MockBoot>
    )
  },
  query: graphql`
    query FairApp_Test_Query {
      fair(id: "example") {
        ...FairApp_fair
      }
    }
  `,
})

describe("FairApp", () => {
  const trackEvent = jest.fn()

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  afterEach(() => {
    trackEvent.mockClear()
  })

  it("displays basic information about the fair", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("FairHeader").length).toBe(1)
  })

  it("renders articles if they are present", () => {
    const wrapper = getWrapper({
      Article: () => ({
        title: "IFPDA Fine Art Print Fair 2019: Programming and Projects",
      }),
    })

    const html = wrapper.html()

    expect(html).toContain(
      "IFPDA Fine Art Print Fair 2019: Programming and Projects"
    )
  })

  it("does not render articles when they are missing", () => {
    const wrapper = getWrapper({
      ArticleConnection: () => ({ edges: [] }),
    })

    const html = wrapper.html()

    expect(html).not.toContain(
      "IFPDA Fine Art Print Fair 2019: Programming and Projects"
    )
  })

  it("renders the collection when it is present", () => {
    const wrapper = getWrapper({
      MarketingCollection: () => ({ title: "Big Artists, Small Sculptures" }),
      FilterArtworksConnection: () => ({ counts: { total: 10 } }),
    })

    const html = wrapper.html()

    expect(html).toContain("Curated Highlights")
    expect(html).toContain("Big Artists, Small Sculptures")
    expect(html).toContain("10 works")
  })

  it("does not render the collection when it is missing", () => {
    const wrapper = getWrapper({
      Fair: () => ({ marketingCollections: [] }),
    })

    const html = wrapper.html()

    expect(html).not.toContain("Curated Highlights")
    expect(html).not.toContain("Big Artists, Small Sculptures")
  })

  it("renders the exhibitors tab by default", () => {
    const wrapper = getWrapper()
    const html = wrapper.html()

    expect(html).toContain("Exhibitors")
  })

  it("sets a title tag", () => {
    const wrapper = getWrapper({
      Fair: () => ({ name: "Miart 2020" }),
    })

    expect(wrapper.find(Title).prop("children")).toEqual("Miart 2020 | Artsy")
  })

  it("renders the exhibitors tab with an appropriate href", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        href: "/fair/miart-2020",
      }),
    })

    const exhibitorsTab = wrapper
      .find("RouteTab")
      .findWhere(t => !!t.text().match("Exhibitors"))
      .first()

    expect(exhibitorsTab.text()).toContain("Exhibitors")
    expect(exhibitorsTab.props().to).toEqual("/fair/miart-2020")
  })

  it("tracks clicks to the exhibitors tab", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        internalID: "bson-fair",
        slug: "miart-2020",
        href: "/fair/miart-2020",
      }),
    })

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

  it("renders the artworks tab with a count and appropriate href", () => {
    const wrapper = getWrapper({
      Fair: () => ({ href: "/fair/miart-2020" }),
      FairCounts: () => ({ artworks: 10 }),
    })

    const artworksTab = wrapper
      .find("RouteTab")
      .findWhere(t => !!t.text().match("Artworks"))
      .first()

    expect(artworksTab.text()).toContain("Artworks (10)")
    expect(artworksTab.props().to).toEqual("/fair/miart-2020/artworks")
  })

  it("tracks clicks to the artworks tab", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        internalID: "bson-fair",
        slug: "miart-2020",
        href: "/fair/miart-2020",
      }),
    })

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
