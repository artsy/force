import PropTypes from 'prop-types'
import * as React from 'react'
import { Article } from '@artsy/reaction-force/dist/Components/Publishing'
import InfiniteScrollArticle from './InfiniteScrollArticle'
import { data as sd } from 'sharify'
import EditButton from 'desktop/apps/article2/components/EditButton'
import SuperArticleView from 'desktop/components/article/client/super_article.coffee'
import ArticleModel from 'desktop/models/article.coffee'

const NAVHEIGHT = '53px'

export default class App extends React.Component {
  static propTypes = {
    article: PropTypes.object,
    isSuper: PropTypes.bool,
    subscribed: PropTypes.bool,
    templates: PropTypes.object
  }

  componentDidMount () {
    if (this.props.isSuper) {
      new SuperArticleView({
        el: document.querySelector('body'),
        article: new ArticleModel(this.props.article)
      })
    }
  }

  renderArticle = () => {
    const article = this.props.article
    if (article.layout === 'standard' && !this.props.isSuper) {
      const emailSignupUrl = this.props.subscribed ? '' : `${sd.APP_URL}/signup/editorial`

      return (
        <InfiniteScrollArticle article={article} emailSignupUrl={emailSignupUrl} />
      )
    } else {
      const navHeight = this.props.isSuper ? '0px' : NAVHEIGHT

      return (
        <Article
          article={article}
          headerHeight={`calc(100vh - ${navHeight})`}
          marginTop={article.layout === 'standard' ? '100' : '0'}
        />
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
