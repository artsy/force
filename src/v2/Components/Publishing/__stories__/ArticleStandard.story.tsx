import { storiesOf } from "@storybook/react"
import { Article } from "v2/Components/Publishing/Article"
import { clone, extend } from "lodash"
import React from "react"

import {
  BasicArticle,
  ImageHeavyStandardArticle,
  MissingVerticalStandardArticle,
  SeriesArticle,
  StandardArticle,
  SuperArticle,
} from "../Fixtures/Articles"

import { SystemContextProvider } from "v2/Artsy"
import {
  HeroSections,
  RelatedCanvas,
  RelatedPanel,
} from "../Fixtures/Components"
import { ArticleData } from "../Typings"

const story = storiesOf("Publishing/Articles/Standard", module)
  .add("Standard", () => {
    return (
      <SystemContextProvider>
        <Article
          article={StandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
        />
      </SystemContextProvider>
    )
  })
  .add("Super Article", () => {
    const article = extend({}, SuperArticle, { hero_section: HeroSections[2] })
    return (
      <SystemContextProvider>
        <Article
          article={article}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          isSuper
        />
      </SystemContextProvider>
    )
  })
  .add("In series", () => {
    const article = clone({
      ...StandardArticle,
      seriesArticle: SeriesArticle,
      relatedArticles: [BasicArticle, SuperArticle],
    } as ArticleData)

    return (
      <SystemContextProvider>
        <Article article={article} />
      </SystemContextProvider>
    )
  })
  .add("Without Vertical", () => {
    return (
      <SystemContextProvider>
        <Article
          article={MissingVerticalStandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
        />
      </SystemContextProvider>
    )
  })
  .add("Truncated", () => {
    return (
      <SystemContextProvider>
        <Article
          article={ImageHeavyStandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          isTruncated
        />
      </SystemContextProvider>
    )
  })
  .add("With tooltips", () => {
    return (
      <SystemContextProvider>
        <Article
          article={StandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          showTooltips
        />
      </SystemContextProvider>
    )
  })

story.add(`Multiple articles`, () => {
  const article: ArticleData = {
    ...StandardArticle,
    sections: [
      {
        type: "text",
        body: "<p>What would Antoine Court?</p>",
      },
    ],
  }

  return (
    <SystemContextProvider>
      <div>
        <Article
          article={article}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          showCollectionsRail
        />
        <Article
          article={article}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          isTruncated
        />
        <Article
          article={article}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          isTruncated
        />
      </div>
    </SystemContextProvider>
  )
})
