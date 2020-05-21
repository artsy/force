import { storiesOf } from "@storybook/react"
import { clone } from "lodash"
import React from "react"
import styled from "styled-components"
import { ArticleCard } from "../RelatedArticles/ArticleCards/ArticleCard"
import { ArticleCards } from "../RelatedArticles/ArticleCards/ArticleCards"
import { ArticleCardsBlock } from "../RelatedArticles/ArticleCards/Block"
import { ArticleData } from "../Typings"

import {
  SeriesArticle,
  SeriesArticleSponsored,
  StandardArticle,
  VideoArticle,
  VideoArticleUnpublished,
} from "../Fixtures/Articles"
import { EditableChild } from "../Fixtures/Helpers"

storiesOf("Publishing/Related Articles/ArticleCards", module)
  .add("Block", () => {
    return (
      <MaxWidthContainer>
        <ArticleCardsBlock
          article={StandardArticle}
          relatedArticles={[StandardArticle, VideoArticle]}
        />
      </MaxWidthContainer>
    )
  })
  .add("Block: Sponsored", () => {
    const article = clone({
      ...StandardArticle,
      seriesArticle: SeriesArticleSponsored,
    } as ArticleData)

    return (
      <MaxWidthContainer>
        <ArticleCardsBlock
          article={article}
          relatedArticles={[StandardArticle, VideoArticle]}
        />
      </MaxWidthContainer>
    )
  })
  .add("Block: Custom color", () => {
    const article = clone({
      ...StandardArticle,
      seriesArticle: SeriesArticleSponsored,
    } as ArticleData)

    return (
      <MaxWidthContainer>
        <ArticleCardsBlock
          color="coral"
          article={article}
          relatedArticles={[StandardArticle, VideoArticle]}
        />
      </MaxWidthContainer>
    )
  })
  .add("ArticleCards", () => {
    return (
      <MaxWidthContainer>
        <ArticleCards
          series={SeriesArticle}
          relatedArticles={[StandardArticle, VideoArticle]}
        />
      </MaxWidthContainer>
    )
  })
  .add("Standard Article", () => {
    return (
      <MaxWidthContainer>
        <ArticleCard article={StandardArticle} series={SeriesArticle} />
      </MaxWidthContainer>
    )
  })
  .add("Media Article", () => {
    return (
      <MaxWidthContainer>
        <ArticleCard article={VideoArticle} series={SeriesArticle} />
      </MaxWidthContainer>
    )
  })
  .add("Unpublished Media", () => {
    return (
      <MaxWidthContainer>
        <ArticleCard article={VideoArticleUnpublished} series={SeriesArticle} />
      </MaxWidthContainer>
    )
  })
  .add("With children", () => {
    return (
      <MaxWidthContainer>
        <ArticleCard
          article={StandardArticle}
          series={SeriesArticle}
          editDate={EditableChild("date")}
          editDescription={EditableChild("description")}
          editImage={EditableChild("image")}
          editTitle={EditableChild("title")}
        />
      </MaxWidthContainer>
    )
  })

const MaxWidthContainer = styled.div`
  width: 90%;
  max-width: 1250px;
  margin: 20px auto;
`
