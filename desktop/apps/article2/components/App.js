import PropTypes from 'prop-types'
import * as React from 'react'
import components from '@artsy/reaction-force/dist/components/publishing/index'
import InfiniteScrollArticle from './InfiniteScrollArticle'
import { data as sd } from 'sharify'
import EditButton from 'desktop/apps/article2/components/EditButton'
import SuperArticleView from 'desktop/components/article/client/super_article.coffee'
import ArticleModel from 'desktop/models/article.coffee'
const { Article } = components

const NAVHEIGHT = '53px'

export default class App extends React.Component {
  static propTypes = {
    article: PropTypes.object,
    subscribed: PropTypes.bool,
    templates: PropTypes.object
  }

  componentDidMount () {
    new SuperArticleView({
      el: document.querySelector('body'),
      article: new ArticleModel(this.props.article)
    })
  }

  renderArticle = () => {
    if (this.props.article.layout === 'standard') {
      const emailSignupUrl = this.props.subscribed ? '' : `${sd.APP_URL}/signup/editorial`

      return (
        <InfiniteScrollArticle article={this.props.article} emailSignupUrl={emailSignupUrl} />
      )
    } else {
      const isSuper = this.props.article.is_super_article || this.props.article.is_super_sub_article
      const navHeight = isSuper ? '0px' : NAVHEIGHT

      return (
        <Article article={this.props.article} headerHeight={`calc(100vh - ${navHeight})`} />
      )
    }
  }

  render () {
    const {
      article,
      templates: {
        SuperArticleFooter,
        SuperArticleHeader
      }
    } = this.props
    return (
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: SuperArticleHeader
          }}
        />
        <EditButton channelId={article.channel_id} slug={article.slug} />
        {this.renderArticle()}
      
        <div
          dangerouslySetInnerHTML={{
            __html: SuperArticleFooter
          }}
        />
      </div>
    )
  }
}
