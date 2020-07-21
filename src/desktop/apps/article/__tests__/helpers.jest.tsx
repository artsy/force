import { shouldAdRender } from "desktop/apps/article/helpers"
import {
  FeatureArticle,
  NewsArticle as NewsArticleFixture,
  SeriesArticle,
  StandardArticle,
  SuperArticle,
  VideoArticle,
  VideoArticleUnpublished,
} from "@artsy/reaction/dist/Components/Publishing/Fixtures/Articles"
import React from "react"
import { NewsArticle } from "desktop/apps/article/components/NewsArticle"
import { DisplayAd } from "@artsy/reaction/dist/Components/Publishing/Display/DisplayAd"
import { mount } from "enzyme"
import { ArticleLayout } from "desktop/apps/article/components/layouts/Article"
import { SystemContextProvider } from "@artsy/reaction/dist/Artsy"
import {
  getBodyClass,
  getJsonLd,
  getLayoutTemplate,
  getSuperArticleTemplates,
  isUnpublishedVideo,
} from "../helpers"

describe("ad display logic in Feature and Standard Articles", () => {
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

  // FIXME:  System Context React hook is causing these tests to fail
  xit("renders new ad component in a Standard article", () => {
    props.shouldAdRender = true
    props.article = StandardArticle
    const component = getWrapper()
    expect(component.find(DisplayAd).length).toBe(3)
  })

  // FIXME:  System Context React hook is causing these tests to fail
  xit("renders new ad component in a Feature article", () => {
    props.article = FeatureArticle
    const component = getWrapper()
    expect(component.find(DisplayAd).length).toBe(2)
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
    return mount(
      <SystemContextProvider user={null}>
        <NewsArticle {...passedProps} />
      </SystemContextProvider>
    )
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

  // FIXME:  System Context React hook is causing these tests to fail
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

describe("#isUnpublishedVideo", () => {
  it("returns true if article has unpublished media", () => {
    const result = isUnpublishedVideo(VideoArticleUnpublished)
    expect(result).toBeTruthy()
  })

  it("returns false if no unpublished media", () => {
    const result = isUnpublishedVideo(StandardArticle)
    expect(result).toBeFalsy()
  })
})

describe("#getBodyClass", () => {
  it("returns expected class for standard", () => {
    const bodyClass = getBodyClass(StandardArticle)
    expect(bodyClass).toBe("body-article body-no-margins")
  })

  it("returns expected class for feature", () => {
    const bodyClass = getBodyClass(FeatureArticle)
    expect(bodyClass).toBe("body-article body-no-margins")
  })

  it("returns expected class for news", () => {
    const bodyClass = getBodyClass(NewsArticleFixture)
    expect(bodyClass).toBe("body-article body-no-margins")
  })

  it("returns expected class for video", () => {
    const bodyClass = getBodyClass(VideoArticle)
    expect(bodyClass).toBe("body-article body-no-margins")
  })

  it("returns expected class for series", () => {
    const bodyClass = getBodyClass(SeriesArticle)
    expect(bodyClass).toBe("body-article body-no-margins")
  })

  it("returns expected class for fullscreen superArticle", () => {
    const article = {
      hero_section: {
        type: "fullscreen",
      },
      ...SuperArticle,
    }
    const bodyClass = getBodyClass(article)
    expect(bodyClass).toBe("body-article body-no-margins body-no-header")
  })

  it("returns expected class for custom editorial", () => {
    const article = {
      id: "5d2f8bd0cdc74b00208b7e16",
      ...SuperArticle,
    }
    const bodyClass = getBodyClass(article)
    expect(bodyClass).toBe("body-article body-no-margins body-no-header")
  })
})

describe("#getJsonLd", () => {
  it("returns stringified jsonld data", () => {
    const jsonLd = getJsonLd(StandardArticle)
    expect(jsonLd).toBe(
      `{"@context":"http://schema.org","@type":"NewsArticle","headline":"New York's Next Art District","url":"undefined/article/new-yorks-next-art-district","thumbnailUrl":"https://artsy-media-uploads.s3.amazonaws.com/7lsxxsw0qPAuKl37jEYitw%2Farticle+asset+1-hig+res+copy.jpg","datePublished":"2017-05-19T13:09:18.567Z","dateCreated":"2017-05-19T13:09:18.567Z","articleSection":"Editorial","creator":["Casey Lesser"],"keywords":["standard","Art Market"]}`
    )
  })
})

describe("#getLayoutTemplate", () => {
  it("returns expected template for standard", () => {
    const layout = getLayoutTemplate(StandardArticle)
    expect(layout).toBe(
      "../../../components/main_layout/templates/react_index.jade"
    )
  })

  it("returns expected template for feature", () => {
    const layout = getLayoutTemplate(FeatureArticle)
    expect(layout).toBe(
      "../../../components/main_layout/templates/react_index.jade"
    )
  })

  it("returns expected template for fullscreen feature in series", () => {
    const article = {
      seriesArticle: {
        id: "5d2f8bd0cdc74b00208b7e16",
      },
      ...FeatureArticle,
    }
    const layout = getLayoutTemplate(article)
    expect(layout).toBe(
      "../../../components/main_layout/templates/react_blank_index.jade"
    )
  })

  it("returns expected template for news", () => {
    const layout = getLayoutTemplate(NewsArticle)
    expect(layout).toBe(
      "../../../components/main_layout/templates/react_index.jade"
    )
  })

  it("returns expected template for video", () => {
    const layout = getLayoutTemplate(VideoArticle)
    expect(layout).toBe(
      "../../../components/main_layout/templates/react_blank_index.jade"
    )
  })

  it("returns expected template for series", () => {
    const layout = getLayoutTemplate(SeriesArticle)
    expect(layout).toBe(
      "../../../components/main_layout/templates/react_blank_index.jade"
    )
  })

  it("returns expected template for superArticle", () => {
    const layout = getLayoutTemplate(SuperArticle)
    expect(layout).toBe(
      "../../../components/main_layout/templates/react_index.jade"
    )
  })
})

describe("#getSuperArticleTemplates", () => {
  it("returns nothing for non-superArticle", () => {
    const templates = getSuperArticleTemplates(StandardArticle)
    expect(templates).toBeUndefined()
  })

  it("returns expected templates for superArticle", () => {
    const templates = getSuperArticleTemplates(SuperArticle)
    expect(templates).toEqual({
      SuperArticleFooter:
        "../../../components/article/templates/super_article_footer.jade",
      SuperArticleHeader:
        "../../../components/article/templates/super_article_sticky_header.jade",
    })
  })

  it("returns expected templates for super-subArticle", () => {
    const article = {
      is_super_sub_article: true,
      ...StandardArticle,
    }
    const templates = getSuperArticleTemplates(article)
    expect(templates).toEqual({
      SuperArticleFooter:
        "../../../components/article/templates/super_article_footer.jade",
      SuperArticleHeader:
        "../../../components/article/templates/super_article_sticky_header.jade",
    })
  })
})
