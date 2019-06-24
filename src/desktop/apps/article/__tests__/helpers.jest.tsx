import {
  areThirdPartyAdsEnabled,
  shouldAdRender,
} from "desktop/apps/article/helpers"
import { data as sd } from "sharify"
import {
  NewsArticle as NewsArticleFixture,
  FeatureArticle,
  StandardArticle,
} from "reaction/Components/Publishing/Fixtures/Articles"
import React from "react"
import { NewsArticle } from "desktop/apps/article/components/NewsArticle"
import { NewDisplayCanvas } from "reaction/Components/Publishing/Display/NewDisplayCanvas"
import { NewDisplayPanel } from "reaction/Components/Publishing/Display/NewDisplayPanel"
import { mount } from "enzyme"
import { ArticleLayout } from "desktop/apps/article/components/layouts/Article"
import { SystemContextProvider } from "reaction/Artsy"

jest.mock("sharify", () => ({
  data: {},
}))

describe("feature flag checks when ads should be disabled", () => {
  it("checks that ads are disabled  on production", () => {
    let mockResponse = sd
    sd.HASHTAG_LAB_ADS_ENABLED = false

    expect(areThirdPartyAdsEnabled(mockResponse)).toBe(false)
  })

  it("checks that ads are enabled in non-production environments", () => {
    let mockResponse = sd
    sd.HASHTAG_LAB_ADS_ENABLED = true

    expect(areThirdPartyAdsEnabled(mockResponse)).toBe(true)
  })
})

describe("ad display logic on Feature and Standard Articles", () => {
  let props

  const getWrapper = (passedProps = props) => {
    return mount(
      <SystemContextProvider user={null}>
        <ArticleLayout {...passedProps} />
      </SystemContextProvider>
    )
  }

  beforeEach(() => {
    props = {
      areHostedAdsEnabled: true,
    }
  })

  // FIXME: useMemo in System Context React hook is causing these tests to fail
  xit("renders new ad component in a Standard article", () => {
    props.shouldAdRender = true
    props.article = StandardArticle
    const component = getWrapper()
    expect(component.find(NewDisplayCanvas).length).toBe(1)
    expect(component.find(NewDisplayPanel).length).toBe(1)
  })

  // FIXME: useMemo in System Context React hook is causing these tests to fail
  xit("renders new ad component in a Feature article", () => {
    props.shouldAdRender = true
    props.article = FeatureArticle
    const component = getWrapper()
    expect(component.find(NewDisplayCanvas).length).toBe(1)
  })

  it("checks the shouldAdRender prop is correctly passed Feature articles", () => {
    const articleType = FeatureArticle.layout
    const shouldRender = shouldAdRender(null, null, null, articleType)

    expect(shouldRender).toBe(true)
  })

  it("checks the shouldAdRender prop is correctly passed Standard articles", () => {
    const articleType = StandardArticle.layout
    const shouldRender = shouldAdRender(null, null, null, articleType)

    expect(shouldRender).toBe(true)
  })
})

describe("ad display frequency logic on News Articles", () => {
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
      areHostedAdsEnabled: true,
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
    expect(component.find(NewDisplayCanvas).length).toBe(1)
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
