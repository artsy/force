import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { ArticleData } from '@artsy/reaction/dist/Components/Publishing/Typings'
import { InfiniteScrollNewsArticles } from './InfiniteScrollNewsArticles'

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
    static propTypes = {
      articles: PropTypes.object,
    }

    render() {
      return (
        <InfiniteScrollNewsArticles {...this.props} />
      )
    }
  }
)
