import {
  areThirdPartyAdsEnabled,
  shouldAdRender,
} from "desktop/apps/article/helpers"
import { data as sd } from "sharify"
import { NewsArticle as NewsArticleFixture } from "reaction/Components/Publishing/Fixtures/Articles"
import React from "react"
import { NewsArticle } from "desktop/apps/article/components/NewsArticle"
import { NewDisplayCanvas } from "reaction/Components/Publishing/Display/NewDisplayCanvas"
import { NewDisplayPanel } from "reaction/Components/Publishing/Display/NewDisplayPanel"
import { mount } from "enzyme"
import {
  FeatureArticle,
  StandardArticle,
} from "@artsy/reaction/dist/Components/Publishing/Fixtures/Articles"
import { ArticleLayout } from "desktop/apps/article/components/layouts/Article"
import { SystemContextProvider } from "reaction/Artsy"

jest.mock("sharify", () => ({
  data: {
    HASHTAG_LAB_ADS_ALLOWLIST: "alloweduser@email.com,alloweduser2@email.com",
    HASHTAG_LAB_ADS_ENABLED: true,
    CURRENT_USER: {
      type: "Non-Admin",
      email: "someuser@email.com",
    },
  },
}))

describe("feature flag checks when ads should be disabled", () => {
  it("checks that ads are disabled for non-allowlisted users", () => {
    const currentUser = sd.CURRENT_USER.email
    const allowList = sd.HASHTAG_LAB_ADS_ALLOWLIST.split(",").filter(Boolean)
    const isUserAllowed = allowList.includes(currentUser)
    const mockResponse = sd.data

    expect(areThirdPartyAdsEnabled(mockResponse)).toBe(false)
    expect(allowList).toHaveLength(2)
    expect(isUserAllowed).toBe(false)
    expect(allowList).toHaveLength(2)
    expect(allowList).toEqual([
      "alloweduser@email.com",
      "alloweduser2@email.com",
    ])
  })

  it("checks that ads are disabled for current users", () => {
    const currentUser = sd.CURRENT_USER.email
    const allowList = sd.HASHTAG_LAB_ADS_ALLOWLIST.split(",").filter(Boolean)
    const allowedUsers = allowList.includes(currentUser)
    const mockResponse = sd.data

    expect(areThirdPartyAdsEnabled(mockResponse)).toBe(false)
    expect(allowedUsers).not.toContain(currentUser)
  })

  it("checks that ads are disabled for non-admin users", () => {
    const adminUser = sd.CURRENT_USER.type
    const isAdminUser = adminUser === "Admin"
    const mockResponse = sd.data

    expect(areThirdPartyAdsEnabled(mockResponse)).toBe(false)
    expect(isAdminUser).toBe(false)
    expect(adminUser).toEqual("Non-Admin")
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
    const articleType = FeatureArticle.article.layout
    const shouldRender = shouldAdRender(null, null, null, articleType)

    expect(shouldRender).toBe(true)
  })

  it("checks the shouldAdRender prop is correctly passed Standard articles", () => {
    const articleType = StandardArticle.article.layout
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

  it("checks that NewsArticle renders with the new ads", () => {
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
