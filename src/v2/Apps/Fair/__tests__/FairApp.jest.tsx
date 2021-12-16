import { MockBoot } from "v2/DevTools"
import { FairAppFragmentContainer } from "../FairApp"
import { graphql } from "react-relay"
import { Title } from "react-head"
import { FairApp_Test_Query } from "v2/__generated__/FairApp_Test_Query.graphql"
import { useTracking } from "react-tracking"
import { OwnerType } from "@artsy/cohesion"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ReactWrapper } from "enzyme"
import { useRouter } from "v2/System/Router/useRouter"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))
jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: jest.fn(),
  useIsRouteActive: () => false,
}))

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
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <FairAppFragmentContainer {...props} />
      </MockBoot>
    )
  },
  query: graphql`
    query FairApp_Test_Query @relay_test_operation {
      fair(id: "example") {
        ...FairApp_fair
      }
    }
  `,
})
const sd = require("sharify").data

describe("FairApp", () => {
  const trackEvent = jest.fn()
  const mockUseRouter = useRouter as jest.Mock

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          pathname: "anything",
        },
      },
    }))
  })

  afterEach(() => {
    mockUseRouter.mockReset()
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

  it("renders the booths tab with an appropriate href", () => {
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

  it("renders the exhibitors tab when env variable is true", () => {
    sd.ENABLE_FAIR_PAGE_EXHIBITORS_TAB = true
    const wrapper = getWrapper({
      Fair: () => ({
        href: "/fair/miart-2020",
      }),
    })

    const exhibitorsTab = wrapper
      .find("RouteTab")
      .findWhere(t => !!t.text().match("Exhibitors A-Z"))
      .first()

    expect(exhibitorsTab.text()).toContain("Exhibitors A-Z")
    expect(exhibitorsTab.props().to).toEqual("/fair/miart-2020/exhibitors")
  })

  it("tracks clicks to the booths tab", () => {
    sd.ENABLE_FAIR_PAGE_EXHIBITORS_TAB = false

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

    const enableFairPageExhibitorsTab = sd.ENABLE_FAIR_PAGE_EXHIBITORS_TAB

    let previousTab: ReactWrapper

    if (enableFairPageExhibitorsTab) {
      previousTab = wrapper
        .find("RouteTab")
        .findWhere(t => !!t.text().match("Exhibitors"))
        .first()
    } else {
      previousTab = wrapper
        .find("RouteTab")
        .findWhere(t => !!t.text().match("Booths"))
        .first()
    }

    previousTab.simulate("click")
    artworksTab.simulate("click")

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedNavigationTab",
      context_module: enableFairPageExhibitorsTab
        ? "exhibitorsTab"
        : "boothsTab",
      context_page_owner_id: "bson-fair",
      context_page_owner_slug: "miart-2020",
      context_page_owner_type: "fair",
      destination_path: "/fair/miart-2020/artworks",
      subject: "Artworks",
    })
  })

  describe("Exhibitors tab", () => {
    beforeEach(() => {
      mockUseRouter.mockImplementation(() => ({
        match: {
          location: {
            pathname: "/exhibitors",
          },
        },
      }))
    })

    it("renders the letters nav", () => {
      const wrapper = getWrapper(FAIR_FIXTURE)
      expect(wrapper.find("ExhibitorsLetterNav").length).toBe(1)
    })

    it("scrolls down the page on letter click", () => {
      document.querySelector = jest.fn().mockReturnValue({
        getBoundingClientRect: () => ({
          top: 0,
        }),
      })

      const spy = jest.fn()
      window.scrollTo = spy

      const wrapper = getWrapper(FAIR_FIXTURE)

      const letter = wrapper.find("ExhibitorsLetterNav").find("Letter").at(3)

      letter.simulate("click")
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})

const FAIR_FIXTURE = {
  Fair: () => ({
    exhibitorsGroupedByName: [
      {
        letter: "A",
        exhibitors: [],
      },
      {
        letter: "C",
        exhibitors: [],
      },
      {
        letter: "D",
        exhibitors: [],
      },
    ],
  }),
}
