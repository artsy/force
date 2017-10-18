import ArticleModel from 'desktop/models/article.coffee'
import EditButton from 'desktop/apps/article2/components/EditButton'
import InfiniteScrollArticle from './InfiniteScrollArticle'
import PropTypes from 'prop-types'
import React from 'react'
import SuperArticleView from 'desktop/components/article/client/super_article.coffee'
import { Article } from '@artsy/reaction-force/dist/Components/Publishing'
import { data as sd } from 'sharify'

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
    const { article, isSuper, subscribed } = this.props

    if (article.layout === 'standard' && !isSuper) {
      const emailSignupUrl = subscribed ? '' : `${sd.APP_URL}/signup/editorial`

      return (
        <InfiniteScrollArticle
          article={article}
          emailSignupUrl={emailSignupUrl}
        />
      )
    } else {
      const navHeight = isSuper ? '0px' : NAVHEIGHT
      const articleMarginTop = article.layout === 'standard' ? '100' : '0'
      const headerHeight = `calc(100vh - ${navHeight})`

      return (
        <Article
          article={article}
          relatedArticlesForPanel={article.relatedArticlesPanel}
          headerHeight={headerHeight}
          marginTop={articleMarginTop}
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
      } = {}
    } = this.props

    return (
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: SuperArticleHeader
          }}
        />

        <EditButton
          channelId={article.channel_id}
          slug={article.slug}
        />

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
