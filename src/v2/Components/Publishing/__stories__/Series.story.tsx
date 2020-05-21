import { storiesOf } from "@storybook/react"
import React from "react"
import { SeriesAbout } from "../Series/SeriesAbout"
import { SeriesTitle } from "../Series/SeriesTitle"

import {
  SeriesArticle,
  SeriesArticleCustomSubTitle,
  SeriesArticleSponsored,
} from "../Fixtures/Articles"
import { EditableChild } from "../Fixtures/Helpers"

storiesOf("Publishing/Series/Title", module)
  .add("Title", () => {
    return (
      <div>
        <SeriesTitle article={SeriesArticle} />
      </div>
    )
  })
  .add("Sponsored", () => {
    return (
      <div>
        <SeriesTitle article={SeriesArticleSponsored} />
      </div>
    )
  })
  .add("Editable Children", () => {
    return (
      <div>
        <SeriesTitle
          article={SeriesArticle}
          editTitle={EditableChild("title")}
        />
      </div>
    )
  })

storiesOf("Publishing/Series/About", module)
  .add("About", () => {
    return (
      <div>
        <SeriesAbout article={SeriesArticle} />
      </div>
    )
  })
  .add("Sponsored", () => {
    return (
      <div>
        <SeriesAbout article={SeriesArticleSponsored} />
      </div>
    )
  })
  .add("Editable children", () => {
    return (
      <div>
        <SeriesAbout
          article={SeriesArticle}
          editDescription={EditableChild("description")}
          editSubTitle={EditableChild("sub_title")}
        />
      </div>
    )
  })
  .add("Custom sub_title", () => {
    return (
      <div>
        <SeriesAbout article={SeriesArticleCustomSubTitle} />
      </div>
    )
  })
