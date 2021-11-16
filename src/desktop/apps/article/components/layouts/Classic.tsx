import { Component } from "react";
import { Article } from "@artsy/reaction/dist/Components/Publishing/Article"
import { AppProps } from "../App"

const ArticlesGridView = require("desktop/components/articles_grid/view.coffee")
const { Articles } = require("desktop/collections/articles")

export class ClassicArticleLayout extends Component<AppProps> {
  componentDidMount() {
    const { article } = this.props

    if (article.channel_id) {
      this.setupFooterArticles()
    }
  }

  setupFooterArticles = () => {
    const { article } = this.props
    const collection = new Articles()
    // @ts-ignore
    const _ArticlesGridView = new ArticlesGridView({
      el: document.querySelector("#articles-footer"),
      hideMore: true,
      header: `More from ${article.channel.name || "Artsy"}`,
      collection,
    })

    collection.fetch({
      data: {
        published: true,
        sort: "-published_at",
        limit: 12,
        channel_id: article.channel_id,
      },
    })
  }

  render() {
    const {
      article,
      isLoggedIn,
      isMobile,
      isEigen,
      templates: { ArticlesGridView } = {} as any,
    } = this.props

    return (
      <div>
        <Article
          article={article}
          isMobile={isMobile}
          isLoggedIn={isLoggedIn}
          hideAuthModal={isEigen}
        />

        {article.channel_id && (
          <div
            id="articles-footer"
            className="responsive-layout-container"
            dangerouslySetInnerHTML={{
              __html: ArticlesGridView,
            }}
          />
        )}
      </div>
    )
  }
}
