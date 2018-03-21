import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Article } from 'reaction/Components/Publishing'
import ArticleLayout from './layouts/Article'
import InfiniteScrollNewsArticle from './InfiniteScrollNewsArticle'
import { EditButton } from 'desktop/apps/article/components/EditButton'
import { hot } from 'react-hot-loader'

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
          return <InfiniteScrollNewsArticle {...this.props} />
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
          {this.getArticleLayout()}
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

    try {
      return ReactDOM.createPortal(
        <EditButton channelId={article.channel_id} slug={article.slug} />,
        document.getElementById('react-portal')
      )
    } catch (e) {
      return false
    }
  }
}
