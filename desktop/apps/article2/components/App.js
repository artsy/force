import PropTypes from 'prop-types'
import * as React from 'react'
import components from '@artsy/reaction-force/dist/components/publishing/index'

const { Article } = components

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
