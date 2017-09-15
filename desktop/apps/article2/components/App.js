import PropTypes from 'prop-types'
import * as React from 'react'
import components from '@artsy/reaction-force/dist/components/publishing/index'
import InfiniteScrollArticle from './InfiniteScrollArticle'
const { Article } = components

export default class App extends React.Component {
  static propTypes = {
    article: PropTypes.object
  }

  render () {
    if (this.props.article.layout === 'standard') {
      return <InfiniteScrollArticle article={this.props.article} />
    } else {
      return <Article article={this.props.article} />
    }
  }
}
