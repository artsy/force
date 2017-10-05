import PropTypes from 'prop-types'
import * as React from 'react'
import components from '@artsy/reaction-force/dist/components/publishing/index'
import InfiniteScrollArticle from './InfiniteScrollArticle'
import { data as sd } from 'sharify'
import EditButton from 'desktop/apps/article2/components/EditButton'
const { Article } = components

const NAVHEIGHT = '53px'

export default class App extends React.Component {
  static propTypes = {
    article: PropTypes.object,
    subscribed: PropTypes.bool
  }

  componentDidMount() {
    
  }

  renderArticle = () => {
    if (this.props.article.layout === 'standard') {
      const emailSignupUrl = this.props.subscribed ? '' : `${sd.APP_URL}/signup/editorial`
      return <InfiniteScrollArticle article={this.props.article} emailSignupUrl={emailSignupUrl} />
    } else {
      return <Article article={this.props.article} headerHeight={`calc(100vh - ${NAVHEIGHT})`} />
    }
  }

  render () {
    return (
      <div>
        <EditButton channelId={this.props.article.channel_id} slug={this.props.article.slug} />
        {this.renderArticle()}
      </div>
    )
  }
}
