import { shouldAdRender } from "desktop/apps/article/helpers"
import {
  NewsArticle as NewsArticleFixture,
  FeatureArticle,
  StandardArticle,
} from "reaction/Components/Publishing/Fixtures/Articles"
import React from "react"
import { NewsArticle } from "desktop/apps/article/components/NewsArticle"
import { DisplayAd } from "reaction/Components/Publishing/Display/DisplayAd"
import { mount } from "enzyme"
import { ArticleLayout } from "desktop/apps/article/components/layouts/Article"
import { SystemContextProvider } from "reaction/Artsy"

describe("ad display logic in Feature and Standard Articles", () => {
  let props

  const getWrapper = (passedProps = props) => {
    return mount(
      <SystemContextProvider user={null}>
        <ArticleLayout {...passedProps} />
      </SystemContextProvider>
    )
  }

  // FIXME: useMemo in System Context React hook is causing these tests to fail
  xit("renders new ad component in a Standard article", () => {
    props.shouldAdRender = true
    props.article = StandardArticle
    const component = getWrapper()
    expect(component.find(DisplayAd).length).toBe(2)
  })

  // FIXME: useMemo in System Context React hook is causing these tests to fail
  xit("renders new ad component in a Feature article", () => {
    props.shouldAdRender = true
    props.article = FeatureArticle
    const component = getWrapper()
    expect(component.find(DisplayAd).length).toBe(1)
  })

  it("checks the shouldAdRender prop is passed to Feature articles", () => {
    const articleType = FeatureArticle.layout
    const shouldRender = shouldAdRender(null, null, null, articleType)

    expect(shouldRender).toBe(true)
  })

  it("checks the shouldAdRender prop is passed to Standard articles", () => {
    const articleType = StandardArticle.layout
    const shouldRender = shouldAdRender(null, null, null, articleType)

    expect(shouldRender).toBe(true)
  })
})

describe("ad display frequency logic in News Articles", () => {
  let props
  const startingIndex = 3
  const frequency = 6

  const getWrapper = (passedProps = props) => {
    return mount(<NewsArticle {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      isMobile: false,
      shouldAdRender: true,
      articleSerial: 3,
      article: NewsArticleFixture,
      isTruncated: true,
      isFirstArticle: true,
      nextArticle: {
        id: "1234",
        published_at: "5678",
      },
      onDateChange: jest.fn(),
      onActiveArticleChange: jest.fn(),
    }
  })

  // FIXME: useState React hook in DisplayAd component is causing this test to fail
  xit("checks that NewsArticle renders with the new ads", () => {
    const component = getWrapper()
    expect(component.find(DisplayAd).length).toBe(1)
  })

  it("checks that News Articles receive the correct prop to render ads after the 3rd article", () => {
    const articleIndex = 3
    const shouldRender = shouldAdRender(articleIndex, startingIndex, frequency)
    expect(shouldRender).toBe(true)
  })

  it("checks that News Articles receive the correct prop to render ads after the 9th article", () => {
    const articleIndex = 9
    const shouldRender = shouldAdRender(articleIndex, startingIndex, frequency)
    expect(shouldRender).toBe(true)
  })

  it("checks that News Articles receive the correct prop to render ads after the 6th article", () => {
    const articleIndex = 6
    const shouldRender = shouldAdRender(articleIndex, startingIndex, frequency)
    expect(shouldRender).toBe(false)
  })

  it("checks that News Articles receive the correct prop to render ads after the 12th article", () => {
    const articleIndex = 12
    const shouldRender = shouldAdRender(articleIndex, startingIndex, frequency)
    expect(shouldRender).toBe(false)
  })
})
