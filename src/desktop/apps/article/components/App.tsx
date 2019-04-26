import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import { Article } from "reaction/Components/Publishing"
import { SystemContextProvider } from "reaction/Artsy"
import { InfiniteScrollNewsArticle } from "./InfiniteScrollNewsArticle"
import { EditButton } from "desktop/apps/article/components/EditButton"
import { ArticleLayout } from "./layouts/Article"
import { data as sd } from "sharify"
import { ArticleProps } from "@artsy/reaction/dist/Components/Publishing/Article"
import { isProduction } from "lib/environment"
import { articleAdCategory } from "../ad_category"

export interface AppProps extends ArticleProps {
  templates?: {
    SuperArticleFooter: string
    SuperArticleHeader: string
  }
}
interface HtlbidProps {
  cmd: any
  setTargeting?: (a: string, b: string) => any
}
export class App extends React.Component<AppProps> {
  componentDidMount() {
    this.mountDFPScript()
  }

  mountDFPScript() {
    const { article } = this.props
    let htlbid: HtlbidProps = {
      cmd: [],
    }
    let testingState = isProduction ? "no" : "yes"
    let pageType = articleAdCategory(article)
    let postID = article.id

    return `
      <script src="//htlbid.com/v2/artsy.min.js"></script>
      <script>
        ${htlbid["cmd"].push(() => {
          htlbid.setTargeting("is_testing", testingState)
          htlbid.setTargeting("page_type", pageType)
          htlbid.setTargeting("post_id", postID)
        })}
      </script>
    `
  }

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
