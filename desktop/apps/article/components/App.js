import PropTypes from 'prop-types'
import React from 'react'
import { Article } from '@artsy/reaction-force/dist/Components/Publishing'
import { ArticleLayout } from './layouts/Article'
import { EditButton } from 'desktop/apps/article/components/EditButton'

export default class App extends React.Component {
  static propTypes = {
    article: PropTypes.object,
    isMobile: PropTypes.bool,
    isSuper: PropTypes.bool,
    subscribed: PropTypes.bool,
    templates: PropTypes.object
  }

  getArticleLayout = () => {
    const { article } = this.props

    switch (article.layout) {
      case 'series': {
        return (
          <Article
            {...this.props}
            relatedArticles={article.relatedArticles}
          />
        )
      }
      default: {
        return <ArticleLayout {...this.props} />
      }
    }
  }

  render () {
    const { article } = this.props

    return (
      <div>
        <EditButton
          channelId={article.channel_id}
          slug={article.slug}
        />

        {this.getArticleLayout()}
      </div>
    )
  }
}
