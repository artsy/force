import { storiesOf } from "@storybook/react"
import React from "react"
import { Article } from "../Article"
import {
  ClassicArticle,
  ClassicArticleInternalChannel,
  ClassicArticlePromotedContent,
} from "../Fixtures/Articles"

storiesOf("Publishing/Articles/Classic", module).add("Classic", () => {
  return <Article article={ClassicArticle} />
})

storiesOf("Publishing/Articles/Classic", module).add("Internal channel", () => {
  return <Article article={ClassicArticleInternalChannel} />
})

storiesOf("Publishing/Articles/Classic", module).add(
  "Sponsored content",
  () => {
    return <Article article={ClassicArticlePromotedContent} />
  }
)
