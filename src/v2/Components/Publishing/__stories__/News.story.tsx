import { storiesOf } from "@storybook/react"
import React from "react"
import { FeatureArticle, NewsArticle } from "../Fixtures/Articles"
import { EditableChild } from "../Fixtures/Helpers"
import { NewsHeadline } from "../News/NewsHeadline"
import { NewsPanel } from "../News/NewsPanel"

storiesOf("Publishing/News/Headline", module)
  .add("Headline", () => {
    return (
      <div>
        <NewsHeadline article={NewsArticle} />
      </div>
    )
  })
  .add("With children", () => {
    return (
      <div>
        <NewsHeadline
          article={NewsArticle}
          editTitle={EditableChild("title")}
        />
      </div>
    )
  })

storiesOf("Publishing/News/Panel", module).add("Panel", () => {
  return (
    <div>
      <NewsPanel articles={[NewsArticle, FeatureArticle]} />
    </div>
  )
})
