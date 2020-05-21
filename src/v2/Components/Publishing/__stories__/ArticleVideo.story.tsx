import { storiesOf } from "@storybook/react"
import { clone } from "lodash"
import React from "react"
import { Article } from "../Article"
import { ArticleData } from "../Typings"

import {
  SeriesArticle,
  SeriesArticleSponsored,
  StandardArticle,
  VideoArticle,
  VideoArticleSponsored,
} from "../Fixtures/Articles"

storiesOf("Publishing/Articles/Video", module)
  .add("Video", () => {
    return <Article article={VideoArticle} />
  })
  .add("In Series", () => {
    const article = clone({
      ...VideoArticle,
      seriesArticle: SeriesArticle,
    } as ArticleData)

    return (
      <Article
        article={article}
        relatedArticles={[StandardArticle, VideoArticle]}
      />
    )
  })
  .add("With Sponsor", () => {
    return <Article article={VideoArticleSponsored} />
  })
  .add("Series + Sponsored", () => {
    const article = clone({
      ...VideoArticle,
      seriesArticle: SeriesArticleSponsored,
    } as ArticleData)

    return (
      <Article
        article={article}
        relatedArticles={[StandardArticle, VideoArticle]}
      />
    )
  })
