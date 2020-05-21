import { storiesOf } from "@storybook/react"
import { RelatedCanvas } from "v2/Components/Publishing/Fixtures/Components"
import React from "react"
import { Article } from "../Article"
import { NewsArticle } from "../Fixtures/Articles"

storiesOf("Publishing/Articles/News", module)
  .add("Expanded", () => {
    return <Article article={NewsArticle} />
  })
  .add("Collapsed", () => {
    return <Article article={NewsArticle} isTruncated />
  })
  .add("Has Related", () => {
    return (
      <Article
        article={NewsArticle}
        isTruncated
        relatedArticlesForCanvas={RelatedCanvas}
      />
    )
  })
  .add("Mobile Collapsed", () => {
    return <Article article={NewsArticle} isTruncated isMobile />
  })
