import React, { Component } from "react"
import { ArticleData } from "reaction/Components/Publishing/Typings"
import { ContextProvider } from "reaction/Artsy"
import { InfiniteScrollNewsArticle } from "desktop/apps/article/components/InfiniteScrollNewsArticle"
import { data as sd } from "sharify"

// TODO: update after CollectionsRail a/b test
const splitTest = require("desktop/components/split_test/index.coffee")

export interface Props {
  articles: ArticleData[]
  isMobile: boolean
  marginTop: string
  isNewsLayout?: boolean
}

export default class App extends Component<Props, any> {
  // TODO: Remove after CollectionsRail a/b test
  componentDidMount() {
    if (this.props.isNewsLayout) {
      splitTest("editorial_collection_rail").view()
    }
  }

  render() {
    return (
      <ContextProvider user={sd.CURRENT_USER}>
        <InfiniteScrollNewsArticle {...this.props} />
      </ContextProvider>
    )
  }
}
