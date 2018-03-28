import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { ArticleData } from '@artsy/reaction/dist/Components/Publishing/Typings'
import { InfiniteScrollNewsArticle } from 'desktop/apps/article/components/InfiniteScrollNewsArticle'

export interface Props {
  articles: ArticleData[]
  isMobile: boolean
  marginTop: string
}

export default hot(module)(
  class App extends Component<
    Props,
    any
    > {

    render() {
      return (
        <InfiniteScrollNewsArticle {...this.props} />
      )
    }
  }
)
