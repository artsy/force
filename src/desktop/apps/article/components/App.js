import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Article } from 'reaction/Components/Publishing'
import { ContextProvider } from 'reaction/Components/Artsy'
import { InfiniteScrollNewsArticle } from './InfiniteScrollNewsArticle.tsx'
import { EditButton } from 'desktop/apps/article/components/EditButton'
import ArticleLayout from './layouts/Article'
import { data as sd } from 'sharify'

export default hot(module)(
  class App extends React.Component {
    static propTypes = {
      article: PropTypes.object,
    }

    getArticleLayout = () => {
      const { article } = this.props

      switch (article.layout) {
        case 'video': {
          return (
            <Article
              {...this.props}
              relatedArticles={article.relatedArticles}
              seriesArticle={article.seriesArticle}
            />
          )
        }
        case 'series': {
          return (
            <Article
              {...this.props}
              relatedArticles={article.relatedArticles}
            />
          )
        }
        case 'news': {
          return (
            <InfiniteScrollNewsArticle articles={[article]} {...this.props} />
          )
        }
        default: {
          return <ArticleLayout {...this.props} />
        }
      }
    }

    render() {
      const { article } = this.props

      return (
        <Fragment>
          <EditPortal article={article} />
          <ContextProvider currentUser={sd.CURRENT_USER}>
            {this.getArticleLayout()}
          </ContextProvider>
        </Fragment>
      )
    }
  }
)

class EditPortal extends React.Component {
  static propTypes = {
    article: PropTypes.object,
  }

  render() {
    const { article } = this.props
    const positionTop = article.layout === 'news' ? 125 : null

    try {
      return ReactDOM.createPortal(
        <EditButton
          channelId={article.channel_id}
          slug={article.slug}
          positionTop={positionTop}
        />,
        document.getElementById('react-portal')
      )
    } catch (e) {
      return false
    }
  }
}
