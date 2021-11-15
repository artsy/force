import { Component, Fragment } from "react"
import ReactDOM from "react-dom"
import { Article } from "@artsy/reaction/dist/Components/Publishing"
import { Mediator, SystemContextProvider } from "@artsy/reaction/dist/Artsy"
import { InfiniteScrollNewsArticle } from "./InfiniteScrollNewsArticle"
import { EditButton } from "desktop/apps/article/components/EditButton"
import { ArticleLayout } from "./layouts/Article"
import { data as sd } from "sharify"
import { ArticleProps } from "@artsy/reaction/dist/Components/Publishing/Article"
import { ClassicArticleLayout } from "desktop/apps/article/components/layouts/Classic"
import { mediator } from "lib/mediator"

export interface AppProps extends ArticleProps {
  isEigen?: boolean
  templates?: {
    SuperArticleFooter: string
    SuperArticleHeader: string
    ArticlesGridView: string
  }
}

export class App extends Component<AppProps> {
  getArticleLayout = () => {
    const { article, isEigen } = this.props

    switch (article.layout) {
      case "video": {
        return (
          <Article
            hideAuthModal={isEigen}
            relatedArticles={article.relatedArticles}
            seriesArticle={article.seriesArticle}
            {...this.props}
          />
        )
      }
      case "series": {
        return (
          <Article
            {...this.props}
            hideAuthModal={isEigen}
            relatedArticles={article.relatedArticles}
          />
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
        <SystemContextProvider
          user={sd.CURRENT_USER}
          mediator={mediator as Mediator}
        >
          {this.getArticleLayout()}
        </SystemContextProvider>
      </Fragment>
    )
  }
}

class EditPortal extends Component<ArticleProps> {
  render() {
    const { article } = this.props
    const positionTop = article.layout === "news" ? 125 : null

    try {
      return ReactDOM.createPortal(
        <EditButton
          channelId={article.channel_id}
          slug={article.slug}
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          positionTop={positionTop}
        />,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        document.getElementById("react-portal")
      )
    } catch (e) {
      return false
    }
  }
}
