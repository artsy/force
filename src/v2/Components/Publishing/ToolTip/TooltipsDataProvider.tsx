import { ArticleProps } from "v2/Components/Publishing/Article"
import React from "react"
import { TooltipsData } from "./TooltipsDataLoader"

export const TooltipsDataProvider: React.SFC<ArticleProps> = props => {
  const { article, onOpenAuthModal, showTooltips } = props

  return (
    <TooltipsData
      article={article}
      shouldFetchData={showTooltips}
      onOpenAuthModal={onOpenAuthModal}
    >
      {props.children}
    </TooltipsData>
  )
}
