import React, { ReactElement } from "react"
import { ArticleData } from "../Typings"
import { ClassicHeader } from "./Layouts/ClassicHeader"
import { FeatureHeader } from "./Layouts/FeatureHeader"
import { StandardHeader } from "./Layouts/StandardHeader"

interface HeaderProps {
  article: ArticleData
  textColor?: string
  date?: string
  editDeck?: ReactElement<any>
  editImage?: ReactElement<any>
  editLeadParagraph?: ReactElement<any>
  editTitle?: ReactElement<any>
  editVertical?: ReactElement<any>
}

export const Header: React.SFC<HeaderProps> = props => {
  const {
    article,
    date,
    textColor,
    editLeadParagraph,
    editDeck,
    editImage,
    editTitle,
    editVertical,
  } = props

  switch (article.layout) {
    case "feature": {
      return (
        <FeatureHeader
          article={article}
          textColor={textColor}
          date={date && date}
          editDeck={editDeck}
          editImage={editImage}
          editTitle={editTitle}
          editVertical={editVertical}
        />
      )
    }

    case "standard": {
      return (
        <StandardHeader
          article={article}
          date={date && date}
          editTitle={editTitle}
          editVertical={editVertical}
        />
      )
    }

    default: {
      return (
        <ClassicHeader
          article={article}
          date={date && date}
          editLeadParagraph={editLeadParagraph}
          editTitle={editTitle}
        />
      )
    }
  }
}
