import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { DisplayAd } from "v2/Components/Publishing/Display/DisplayAd"
import { NewsArticle } from "v2/Components/Publishing/Fixtures/Articles"
import { RelatedCanvas } from "v2/Components/Publishing/Fixtures/Components"
import { NewsSectionContainer } from "v2/Components/Publishing/News/NewsSections"
import { RelatedArticlesCanvas } from "v2/Components/Publishing/RelatedArticles/Canvas/RelatedArticlesCanvas"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { ExpandButton, NewsArticleContainer, NewsLayout } from "../NewsLayout"
jest.mock("isomorphic-fetch")

declare const global: any
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({}),
  })
)
jest.mock("Artsy/Analytics/useTracking")

describe("News Layout", () => {
  const dateNow = Date.now

  beforeAll(() => {
    Date.now = () => Date.parse("01 Jan 2009 00:00:00 EST")
  })

  afterAll(() => {
    Date.now = dateNow
  })
  it("renders the news layout properly", () => {
    const series = renderer
      .create(<NewsLayout article={NewsArticle} />)
      .toJSON()
    expect(series).toMatchSnapshot()
  })

  it("truncates the article", () => {
    const component = mount(<NewsLayout article={NewsArticle} isTruncated />)
    expect(component.find(NewsSectionContainer).length).toEqual(2)
  })

  it("expands the article on click", () => {
    const component = mount(<NewsLayout article={NewsArticle} isTruncated />)
    component
      .find(NewsSectionContainer)
      .at(0)
      .simulate("click")
    expect(component.find(NewsSectionContainer).length).toEqual(9)
  })

  it("expands the article on clicking expand button", () => {
    const component = mount(<NewsLayout article={NewsArticle} isTruncated />)
    component.find(ExpandButton).simulate("click")
    expect(component.find(NewsSectionContainer).length).toEqual(9)
  })

  it("Calls props.onExpand on click if provided", () => {
    const onExpand = jest.fn()
    const component = mount(
      <NewsLayout article={NewsArticle} onExpand={onExpand} isTruncated />
    )
    component.find(ExpandButton).simulate("click")
    expect(onExpand).toBeCalled()
  })

  it("Can render related articles if provided", () => {
    const component = mount(
      <NewsLayout
        article={NewsArticle}
        isTruncated
        relatedArticlesForCanvas={RelatedCanvas}
      />
    )
    expect(component.find(RelatedArticlesCanvas)).toHaveLength(1)
  })

  it("sets a hover state onMouseEnter if desktop", () => {
    const component = mount(<NewsLayout article={NewsArticle} isTruncated />)
    component
      .find(NewsArticleContainer)
      .at(0)
      .simulate("mouseenter")
    expect(component.state("isHovered")).toBe(true)
  })

  it("only uses hover state from props if mobile", () => {
    const component = mount(
      <NewsLayout article={NewsArticle} isTruncated isHovered isMobile />
    )
    component.simulate("mouseleave")
    expect(component.state("isHovered")).toBe(true)
  })

  it("renders the news layout on mobile", () => {
    const component = renderer.create(
      <NewsLayout article={NewsArticle} isMobile />
    )

    expect(component).toMatchSnapshot()
  })

  describe("Analytics", () => {
    it("tracks the expand button", () => {
      const trackEvent = jest.fn()
      const component = mount(
        <NewsLayout
          article={NewsArticle}
          isTruncated
          tracking={
            {
              trackEvent,
            } as any
          }
        />
      )
      component.find(ExpandButton).simulate("click")
      expect(trackEvent.mock.calls[0][0]).toEqual({
        action: "Clicked read more",
        pathname: "/news/news-article",
      })
    })
  })
})

describe("News Layout with display ads", () => {
  let props
  const getWrapper = (passedProps = props) => {
    return mount(<NewsLayout {...passedProps} />)
  }
  const trackEvent = jest.fn()

  beforeEach(() => {
    props = {
      shouldAdRender: true,
      article: NewsArticle,
    }
      ; (useTracking as jest.Mock).mockImplementation(() => {
        return {
          trackEvent,
        }
      })
  })

  it("renders the news layout properly with display ads", () => {
    const layout = renderer
      .create(<NewsLayout article={NewsArticle} shouldAdRender />)
      .toJSON()

    expect(layout).toMatchSnapshot()
  })

  it("renders the news layout component with new ads component", () => {
    const component = getWrapper()

    expect(component.find(DisplayAd).length).toBe(1)
  })

  it("renders the news layout component with correct ad unit after the 3rd article on desktop", () => {
    props.articleSerial = 3
    const component = getWrapper()

    const ads = component.find(DisplayAd)
    expect(ads.length).toBe(1)

    expect(ads.prop("adUnit")).toEqual("Desktop_Leaderboard1")
    expect(ads.prop("adDimension")).toEqual("970x250")
    expect(ads.prop("targetingData")).toEqual({
      is_testing: true,
      page_type: "newslanding",
      post_id: "594a7e2254c37f00177c0ea9",
      tags: "News",
    })
  })

  it("renders the news layout component with correct ad unit after the 3rd article on mobile", () => {
    props.articleSerial = 3
    props.isMobile = true

    const component = getWrapper()

    const ads = component.find(DisplayAd)
    expect(ads.length).toBe(1)

    expect(ads.prop("adUnit")).toEqual("Mobile_InContentMR1")
    expect(ads.prop("adDimension")).toEqual("300x50")
    expect(ads.prop("targetingData")).toEqual({
      is_testing: true,
      page_type: "newslanding",
      post_id: "594a7e2254c37f00177c0ea9",
      tags: "News",
    })
  })

  it("renders the news layout component with correct ad unit after the 9th article on desktop", () => {
    props.articleSerial = 9
    const component = getWrapper()

    const ads = component.find(DisplayAd)
    expect(ads.length).toBe(1)

    expect(ads.prop("adUnit")).toEqual("Desktop_Leaderboard2")
    expect(ads.prop("adDimension")).toEqual("970x250")
  })

  it("renders the news layout component with correct ad unit after the 9th article on mobile", () => {
    props.articleSerial = 9
    props.isMobile = true

    const component = getWrapper()

    const ads = component.find(DisplayAd)
    expect(ads.length).toBe(1)

    expect(ads.prop("adUnit")).toEqual("Mobile_InContentMR2")
    expect(ads.prop("adDimension")).toEqual("300x50")
  })

  it("renders the news layout component with correct ad unit after the 15th article on desktop", () => {
    props.articleSerial = 15
    const component = getWrapper()

    const ads = component.find(DisplayAd)
    expect(ads.length).toBe(1)

    expect(ads.prop("adUnit")).toEqual("Desktop_LeaderboardRepeat")
    expect(ads.prop("adDimension")).toEqual("970x250")
  })

  it("renders the news layout component with correct ad unit after the 15th article on mobile", () => {
    props.articleSerial = 15
    props.isMobile = true
    const component = getWrapper()

    const ads = component.find(DisplayAd)
    expect(ads.length).toBe(1)

    expect(ads.prop("adUnit")).toEqual("Mobile_InContentMRRepeat")
    expect(ads.prop("adDimension")).toEqual("300x50")
  })
})
