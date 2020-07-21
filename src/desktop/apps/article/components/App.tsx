import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import { Article } from "@artsy/reaction/dist/Components/Publishing"
import { SystemContextProvider } from "@artsy/reaction/dist/Artsy"
import { InfiniteScrollNewsArticle } from "./InfiniteScrollNewsArticle"
import { EditButton } from "desktop/apps/article/components/EditButton"
import { ArticleLayout } from "./layouts/Article"
import { data as sd } from "sharify"
import { ArticleProps } from "@artsy/reaction/dist/Components/Publishing/Article"
import { ClassicArticleLayout } from "desktop/apps/article/components/layouts/Classic"

export interface AppProps extends ArticleProps {
  templates?: {
    SuperArticleFooter: string
    SuperArticleHeader: string
    ArticlesGridView: string
  }
}

export class App extends React.Component<AppProps> {
  getArticleLayout = () => {
    const { article } = this.props

    switch (article.layout) {
      case "video": {
        return (
          <Article
            relatedArticles={article.relatedArticles}
            seriesArticle={article.seriesArticle}
            {...this.props}
          />
        )
      }
      case "series": {
        return (
          <Article {...this.props} relatedArticles={article.relatedArticles} />
        )
      }
      case "news": {
        return (
          <InfiniteScrollNewsArticle articles={[article]} {...this.props} />
        )
      }
      case "classic": {
        return <ClassicArticleLayout {...this.props} />
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
        <SystemContextProvider user={sd.CURRENT_USER}>
          {this.getArticleLayout()}
        </SystemContextProvider>
      </Fragment>
    )
  }
}

class EditPortal extends React.Component<ArticleProps> {
  render() {
    const { article } = this.props
    const positionTop = article.layout === "news" ? 125 : null

    try {
      return ReactDOM.createPortal(
        <EditButton
          channelId={article.channel_id}
          slug={article.slug}
          positionTop={positionTop}
        />,
        document.getElementById("react-portal")
      )
    } catch (e) {
      return false
    }
  }
}
