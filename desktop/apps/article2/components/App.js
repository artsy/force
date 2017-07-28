import PropTypes from 'prop-types'
import * as React from 'react'
import Article from 'desktop/apps/article2/components/article/article'

export default class App extends React.Component {
  static propTypes = {
    article: PropTypes.object
  }

  render () {
    return (
      <Article article={this.props.article} />
    )
  }
}
