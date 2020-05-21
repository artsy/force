import { storiesOf } from "@storybook/react"
import React from "react"
import {
  NewsArticle,
  TextClassicArticle,
  TextFeatureArticle,
  TextStandardArticle,
} from "../Fixtures/Articles"
import { TextFromArticle } from "../Fixtures/Helpers"
import { Text } from "../Sections/Text"

storiesOf("Publishing/Sections/Text", module)
  .add("Classic", () => {
    return (
      <div style={{ maxWidth: 580, margin: "0 auto" }}>
        <Text layout="classic" html={TextFromArticle(TextClassicArticle)} />
      </div>
    )
  })
  .add("Feature", () => {
    return (
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <Text layout="feature" html={TextFromArticle(TextFeatureArticle)} />
      </div>
    )
  })
  .add("Standard", () => {
    return (
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <Text layout="standard" html={TextFromArticle(TextStandardArticle)} />
      </div>
    )
  })
  .add("News", () => {
    return (
      <div style={{ maxWidth: 660, margin: "0 auto" }}>
        <Text layout="news" html={TextFromArticle(NewsArticle)} />
      </div>
    )
  })
