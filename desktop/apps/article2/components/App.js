import PropTypes from 'prop-types'
import * as React from 'react'
import components from '@artsy/reaction-force/dist/components/publishing/index'
import InfiniteScrollArticle from './InfiniteScrollArticle'
const { Article } = components

export default class App extends React.Component {
  static propTypes = {
    article: PropTypes.object,
    relatedArticles: PropTypes.array
  }

  render () {
    if (this.props.article.layout === 'standard') {
      return <InfiniteScrollArticle article={this.props.article} relatedArticles={this.props.relatedArticles} />
    } else {
      return (
        <div id='article-root'>
          <Article article={this.props.article} />
        </div>
      )
    }
  }
}
