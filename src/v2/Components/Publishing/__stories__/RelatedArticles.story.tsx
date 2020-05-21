import React from "react"
import { storiesOfPublishing } from "../../../__stories__/storiesOf.js"
import { RelatedCanvas, RelatedPanel } from "../Fixtures/Components"
import { RelatedArticlesCanvas } from "../RelatedArticles/Canvas/RelatedArticlesCanvas"
import { RelatedArticlesPanel } from "../RelatedArticles/Panel/RelatedArticlesPanel"

storiesOfPublishing("Publishing/Related Articles/Canvas", module)
  .add("With vertical", () => {
    return (
      <RelatedArticlesCanvas
        articles={RelatedCanvas}
        vertical={{
          name: "Market Analysis",
          id: "123",
        }}
      />
    )
  })
  .add("Without vertical", () => {
    return <RelatedArticlesCanvas articles={RelatedCanvas} />
  })

storiesOfPublishing("Publishing/Related Articles/Panel", module).add(
  "Panel",
  () => {
    return <RelatedArticlesPanel articles={RelatedPanel} />
  }
)
