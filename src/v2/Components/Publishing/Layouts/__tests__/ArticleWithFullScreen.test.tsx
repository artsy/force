import { useTracking } from "v2/Artsy/Analytics/useTracking"
import {
  FeatureArticle,
  StandardArticle,
} from "v2/Components/Publishing/Fixtures/Articles"
import {
  RelatedCanvas,
  RelatedPanel,
} from "v2/Components/Publishing/Fixtures/Components"
import { RelatedArticlesCanvas } from "v2/Components/Publishing/RelatedArticles/Canvas/RelatedArticlesCanvas"
import { RelatedArticlesPanel } from "v2/Components/Publishing/RelatedArticles/Panel/RelatedArticlesPanel"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { ArticleWithFullScreen } from "../ArticleWithFullScreen"
import { FeatureLayout } from "../FeatureLayout"
import { StandardLayout } from "../StandardLayout"

jest.mock(
  "Components/Publishing/Sections/FullscreenViewer/withFullScreen",
  () => ({
    withFullScreen: x => x,
  })
)
jest.mock("Components/Publishing/ToolTip/TooltipsDataLoader", () => ({
  TooltipsData: props => props.children,
}))

jest.mock("Artsy/Analytics/useTracking")

const trackEvent = jest.fn()

beforeEach(() => {
  ; (useTracking as jest.Mock).mockImplementation(() => {
    return {
      trackEvent,
    }
  })
})

it("indexes and titles images", () => {
  const props = {
    article: StandardArticle,
    relatedArticlesForCanvas: RelatedCanvas,
    relatedArticlesForPanel: RelatedPanel,
  }
  const article = mount(
    <ArticleWithFullScreen {...props}>
      <StandardLayout {...props} />
    </ArticleWithFullScreen>
  ) as any

  expect(article.state().fullscreenImages[0].setTitle).toBe(
    "A World Without Capitalism"
  )
  expect(article.state().fullscreenImages[0].index).toBe(0)
  expect(article.state().fullscreenImages[1].index).toBe(1)
  expect(article.find(StandardLayout).length).toBe(1)
  expect(article.find(RelatedArticlesPanel).length).toBe(1)
  expect(article.find(RelatedArticlesCanvas).length).toBe(1)
})

it("renders articles in feature layout", () => {
  const props = {
    article: FeatureArticle,
    relatedArticlesForCanvas: RelatedCanvas,
    relatedArticlesForPanel: RelatedPanel,
  }
  const article = mount(
    <ArticleWithFullScreen {...props}>
      <FeatureLayout {...props} />
    </ArticleWithFullScreen>
  ) as any
  expect(article.state().fullscreenImages[0].title).toBe("Untitled Suspended")
  expect(article.find(FeatureLayout).length).toBe(1)
  expect(article.find(RelatedArticlesPanel).length).toBe(0)
  expect(article.find(RelatedArticlesCanvas).length).toBe(1)
})
