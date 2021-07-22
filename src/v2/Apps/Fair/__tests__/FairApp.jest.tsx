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

  it("renders the overview tab by default", () => {
    const wrapper = getWrapper()
    const html = wrapper.html()

    expect(html).toContain("Overview")
  })

  it("sets a title tag", () => {
    const wrapper = getWrapper({
      Fair: () => ({ name: "Miart 2020" }),
    })

    expect(wrapper.find(Title).prop("children")).toEqual("Miart 2020 | Artsy")
  })

  it("renders the exhibitors (booths) tab with an appropriate href", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        href: "/fair/miart-2020",
      }),
    })

    const boothsTab = wrapper
      .find("RouteTab")
      .findWhere(t => !!t.text().match("Booths"))
      .first()

    expect(boothsTab.text()).toContain("Booths")
    expect(boothsTab.props().to).toEqual("/fair/miart-2020/booths")
  })

  it("tracks clicks to the exhibitors (booths) tab", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        internalID: "bson-fair",
        slug: "miart-2020",
        href: "/fair/miart-2020",
      }),
    })

    const boothsTab = wrapper
      .find("RouteTab")
      .findWhere(t => t.text() === "Booths")
      .first()

    boothsTab.simulate("click")

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedNavigationTab",
      context_module: "fairInfo",
      context_page_owner_id: "bson-fair",
      context_page_owner_slug: "miart-2020",
      context_page_owner_type: "fair",
      destination_path: "/fair/miart-2020/booths",
      subject: "Booths",
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
    const boothsTab = wrapper
      .find("RouteTab")
      .findWhere(t => !!t.text().match("Booths"))
      .first()

    boothsTab.simulate("click")
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
