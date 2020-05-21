import { storiesOf } from "@storybook/react"
import { SystemContextProvider } from "v2/Artsy"
import { Article } from "v2/Components/Publishing/Article"
import {
  BasicArticle,
  FeatureArticle,
  SeriesArticle,
  SeriesArticleSponsored,
  SuperArticle,
} from "v2/Components/Publishing/Fixtures/Articles"
import {
  HeroSections,
  RelatedCanvas,
} from "v2/Components/Publishing/Fixtures/Components"
import { ArticleData } from "v2/Components/Publishing/Typings"
import { clone, extend } from "lodash"
import React from "react"

storiesOf("Publishing/Articles/Feature/Fullscreen", module)
  .add("Fullscreen", () => {
    return (
      <SystemContextProvider>
        <Article
          article={FeatureArticle}
          relatedArticlesForCanvas={RelatedCanvas}
          showTooltips
        />
      </SystemContextProvider>
    )
  })
  .add("Series", () => {
    const article = clone({
      ...FeatureArticle,
      seriesArticle: SeriesArticle,
      relatedArticles: [BasicArticle, SuperArticle],
    } as ArticleData)

    return (
      <SystemContextProvider>
        <Article article={article} showTooltips />
      </SystemContextProvider>
    )
  })
  .add("Sponsored series", () => {
    const article = clone({
      ...FeatureArticle,
      seriesArticle: SeriesArticleSponsored,
      relatedArticles: [BasicArticle, SuperArticle],
    } as ArticleData)

    return (
      <SystemContextProvider>
        <Article article={article} showTooltips />
      </SystemContextProvider>
    )
  })
  .add("Custom color", () => {
    const article = clone({
      ...FeatureArticle,
      seriesArticle: SeriesArticleSponsored,
      relatedArticles: [BasicArticle, SuperArticle],
    } as ArticleData)

    return (
      <SystemContextProvider>
        <Article
          article={article}
          showTooltips
          backgroundColor="gainsboro"
          color="orangered"
        />
      </SystemContextProvider>
    )
  })

storiesOf("Publishing/Articles/Feature", module)
  .add("Text", () => {
    const article = clone({
      ...FeatureArticle,
      hero_section: {
        type: "text",
        url: FeatureArticle.hero_section.url,
      },
    } as ArticleData)

    return (
      <SystemContextProvider>
        <Article article={article} showTooltips />
      </SystemContextProvider>
    )
  })
  .add("Split", () => {
    const article = clone({
      ...FeatureArticle,
      hero_section: {
        type: "split",
        url: FeatureArticle.hero_section.url,
      },
    } as ArticleData)

    return (
      <SystemContextProvider>
        <Article article={article} showTooltips />
      </SystemContextProvider>
    )
  })
  .add("Basic", () => {
    const article = clone({
      ...BasicArticle,
      sections: [
        {
          type: "text",
          body:
            "<p>The Black Power Tarot was conceived by musician King Khan in consultation with Alejandro Jodorowsky, and designed by illustrator Michael Eaton in 2015. The deck celebrates the strength and achievements of Black musicians, artists, and activists while staying faithful to the imagery and composition of the classic Tarot de Marseilles.</p>",
        },
      ],
    } as ArticleData)

    return (
      <SystemContextProvider>
        <Article
          article={article}
          relatedArticlesForCanvas={RelatedCanvas}
          isTruncated
          showTooltips
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
          isSuper
          relatedArticlesForCanvas={RelatedCanvas}
          showTooltips
        />
      </SystemContextProvider>
    )
  })
