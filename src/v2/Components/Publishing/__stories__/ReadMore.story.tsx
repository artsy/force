import { SystemContextProvider } from "v2/Artsy"
import React from "react"
import { storiesOfPublishing } from "../../../__stories__/storiesOf.js"
import { Article } from "../Article"
import {
  ImageHeavyStandardArticle,
  ShortStandardArticle,
  StandardArticle,
} from "../Fixtures/Articles"
import { RelatedCanvas, RelatedPanel } from "../Fixtures/Components"

storiesOfPublishing("Publishing/Read More", module).add("Text Article", () => {
  return (
    <SystemContextProvider>
      <Article
        article={StandardArticle}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        infiniteScrollEntrySlug="artsy-editorial-this-article"
        isTruncated
      />
    </SystemContextProvider>
  )
})

storiesOfPublishing("Publishing/Read More", module).add(
  "Image Heavy Article",
  () => {
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
  }
)

storiesOfPublishing("Publishing/Read More", module).add("Short Article", () => {
  return (
    <SystemContextProvider>
      <Article
        article={ShortStandardArticle}
        relatedArticlesForPanel={RelatedPanel}
        relatedArticlesForCanvas={RelatedCanvas}
        isTruncated
      />
    </SystemContextProvider>
  )
})
