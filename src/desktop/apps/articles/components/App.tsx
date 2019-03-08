import React, { Component } from "react"
import { ArticleData } from "reaction/Components/Publishing/Typings"
import { InfiniteScrollNewsArticle } from "desktop/apps/article/components/InfiniteScrollNewsArticle"

export interface Props {
  articles: ArticleData[]
  isMobile: boolean
  marginTop: string
}

export default class App extends Component<Props, any> {
  render() {
    return <InfiniteScrollNewsArticle {...this.props} />
  }
}
