import PropTypes from 'prop-types'
import * as React from 'react'
import components from '@artsy/reaction-force/dist/components/publishing/index'
import InfiniteScrollArticle from './InfiniteScrollArticle'
import { data as sd } from 'sharify'
const { Article } = components
import EditButton from 'desktop/apps/article2/components/EditButton'

export default class App extends React.Component {
  static propTypes = {
    article: PropTypes.object,
    subscribed: PropTypes.bool
  }

  renderArticle = () => {
    if (this.props.article.layout === 'standard') {
      const emailSignupUrl = this.props.subscribed ? '' : `${sd.APP_URL}/signup/editorial`
      return <InfiniteScrollArticle article={this.props.article} emailSignupUrl={emailSignupUrl} />
    } else {
      return <Article article={this.props.article} />
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
