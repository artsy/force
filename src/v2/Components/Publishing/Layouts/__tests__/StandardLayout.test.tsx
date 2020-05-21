import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { DisplayAd } from "v2/Components/Publishing/Display/DisplayAd"
import { targetingData } from "v2/Components/Publishing/Display/DisplayTargeting"
import {
  SeriesArticle,
  StandardArticle,
} from "v2/Components/Publishing/Fixtures/Articles"
import {
  RelatedCanvas,
  RelatedPanel,
} from "v2/Components/Publishing/Fixtures/Components"
import { ReadMoreButton } from "v2/Components/Publishing/ReadMore/ReadMoreButton"
import { RelatedArticlesCanvas } from "v2/Components/Publishing/RelatedArticles/Canvas/RelatedArticlesCanvas"
import { RelatedArticlesPanel } from "v2/Components/Publishing/RelatedArticles/Panel/RelatedArticlesPanel"
import { AdDimension, AdUnit } from "v2/Components/Publishing/Typings"
import { mount } from "enzyme"
import "jest-styled-components"
import { cloneDeep, extend } from "lodash"
import React from "react"
import { Sidebar } from "../Components/Sidebar"
import { StandardLayout } from "../StandardLayout"

jest.mock(
  "Components/Publishing/Sections/FullscreenViewer/withFullScreen",
  () => ({
    withFullScreen: x => x,
  })
)
jest.mock("Artsy/Analytics/useTracking")

describe("Standard Article", () => {
  const trackEvent = jest.fn()
  const getWrapper = _props => {
    return mount(<StandardLayout {..._props} />)
  }
  let props

  beforeEach(() => {
    props = {
      article: StandardArticle,
      isTruncated: false,
      relatedArticlesForCanvas: RelatedCanvas,
      relatedArticlesForPanel: RelatedPanel,
    }
      ; (useTracking as jest.Mock).mockImplementation(() => {
        return {
          trackEvent,
        }
      })
  })

  afterEach(() => {
    jest.resetModules()
    jest.resetAllMocks()
  })

  it("renders sidebar", () => {
    const article = getWrapper(props)
    expect(article.find(Sidebar).length).toBe(1)
  })

  it("renders related articles", () => {
    const article = getWrapper(props)
    expect(article.find(RelatedArticlesPanel).length).toBe(1)
    expect(article.find(RelatedArticlesCanvas).length).toBe(1)
  })

  it("Does not render RelatedArticlesCanvas if article is super", () => {
    props.isSuper = true
    const article = getWrapper(props)
    expect(article.find(RelatedArticlesCanvas).length).toBe(0)
  })

  it("Does not render RelatedArticlesCanvas if article is in a series", () => {
    props.article = extend(cloneDeep(StandardArticle), {
      seriesArticle: SeriesArticle,
    })
    const article = getWrapper(props)
    expect(article.find(RelatedArticlesCanvas).length).toBe(0)
  })

  it("Does not render display if article is super", () => {
    props.isSuper = true
    const article = getWrapper(props)
    expect(article.find(DisplayAd).length).toBe(0)
  })

  it("shows read more if truncated", () => {
    props.isTruncated = true
    const article = getWrapper(props)
    expect(article.find(ReadMoreButton).length).toBe(1)
  })

  it("Can remove truncation on click", () => {
    props.isTruncated = true
    const article = getWrapper(props) as any

    article
      .find(ReadMoreButton)
      .at(0)
      .props()
      .onClick()
    expect(article.state().isTruncated).toBeFalsy()
  })

  it("It renders three display ads in Standard Layout", () => {
    const article = getWrapper(props)

    expect(article.find(DisplayAd).length).toBe(3)
  })

  it("renders the top and side rail display ad component with the correct data and properties on standard articles", () => {
    const article = getWrapper(props)
    props.isSuper = false
    props.isMobile = false

    expect(
      article
        .find(DisplayAd)
        .at(0)
        .props().adDimension
    ).toBe("970x250")

    expect(
      article
        .find(DisplayAd)
        .at(0)
        .props().adUnit
    ).toBe("Desktop_TopLeaderboard")

    expect(
      article
        .find(DisplayAd)
        .at(1)
        .props().adDimension
    ).toBe("300x250")

    expect(
      article
        .find(DisplayAd)
        .at(1)
        .props().adUnit
    ).toBe("Desktop_RightRail1")

    expect(
      article
        .find(DisplayAd)
        .at(2)
        .props().adDimension
    ).toBe("300x250")

    expect(
      article
        .find(DisplayAd)
        .at(2)
        .props().adUnit
    ).toBe("Desktop_RightRail1")
  })

  it("renders the top and side rail display ad component with the correct data and properties on standard articles on mobile", () => {
    props.isMobile = true

    const article = getWrapper(props)

    expect(
      article
        .find(DisplayAd)
        .at(0)
        .props().adDimension
    ).toBe("300x50")

    expect(
      article
        .find(DisplayAd)
        .at(0)
        .props().adUnit
    ).toBe("Mobile_InContentMR1")

    expect(
      article
        .find(DisplayAd)
        .at(1)
        .props().adDimension
    ).toBe("300x250")

    expect(
      article
        .find(DisplayAd)
        .at(1)
        .props().adUnit
    ).toBe("Desktop_RightRail1")

    expect(
      article
        .find(DisplayAd)
        .at(2)
        .props().adDimension
    ).toBe("300x250")

    expect(
      article
        .find(DisplayAd)
        .at(2)
        .props().adUnit
    ).toBe("Mobile_InContentMR2")
  })

  describe("Standard Article Display Ads", () => {
    it("renders the top rail display ad component with the correct data and properties on standard articles", () => {
      const ad = mount(
        <DisplayAd
          adDimension={AdDimension.Desktop_TopLeaderboard}
          adUnit={AdUnit.Desktop_TopLeaderboard}
          targetingData={targetingData(StandardArticle, "article")}
          articleSlug={StandardArticle.slug}
        />
      )

      expect(ad.props().adDimension).toEqual("970x250")
      expect(ad.props().adUnit).toEqual("Desktop_TopLeaderboard")
      expect(ad.props().targetingData).toEqual({
        is_testing: true,
        page_type: "article",
        post_id: "594a7e2254c37f00177c0ea9",
        tags: "Art Market",
      })
      expect(ad).toHaveLength(1)
    })

    it("renders the side rail display ad component with the correct data and properties on standard articles", () => {
      const ad = mount(
        <DisplayAd
          adDimension={AdDimension.Desktop_RightRail1}
          adUnit={AdUnit.Desktop_RightRail1}
          targetingData={targetingData(StandardArticle, "article")}
          articleSlug={StandardArticle.slug}
        />
      )

      expect(ad.props().adDimension).toEqual("300x250")
      expect(ad.props().adUnit).toEqual("Desktop_RightRail1")
      expect(ad.props().targetingData).toEqual({
        is_testing: true,
        page_type: "article",
        post_id: "594a7e2254c37f00177c0ea9",
        tags: "Art Market",
      })
      expect(ad).toHaveLength(1)
    })

    it("renders the side rail display ad component with the correct data and properties on standard articles on mobile", () => {
      const ad = mount(
        <DisplayAd
          adDimension={AdDimension.Mobile_InContentMR1}
          adUnit={AdUnit.Mobile_InContentMR1}
          targetingData={targetingData(StandardArticle, "article")}
          articleSlug={StandardArticle.slug}
        />
      )

      expect(ad.props().adDimension).toEqual("300x50")
      expect(ad.props().adUnit).toEqual("Mobile_InContentMR1")
      expect(ad.props().targetingData).toEqual({
        is_testing: true,
        page_type: "article",
        post_id: "594a7e2254c37f00177c0ea9",
        tags: "Art Market",
      })
      expect(ad).toHaveLength(1)
    })

    it("renders the top rail display ad component with the correct data and properties on standard articles on mobile", () => {
      const ad = mount(
        <DisplayAd
          adDimension={AdDimension.Mobile_TopLeaderboard}
          adUnit={AdUnit.Mobile_TopLeaderboard}
          targetingData={targetingData(StandardArticle, "article")}
          articleSlug={StandardArticle.slug}
        />
      )

      expect(ad.props().adDimension).toEqual("300x50")
      expect(ad.props().adUnit).toEqual("Mobile_TopLeaderboard")
      expect(ad.props().targetingData).toEqual({
        is_testing: true,
        page_type: "article",
        post_id: "594a7e2254c37f00177c0ea9",
        tags: "Art Market",
      })
      expect(ad).toHaveLength(1)
    })
  })
})
