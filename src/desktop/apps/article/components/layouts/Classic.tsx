import React from "react"
import { Article } from "@artsy/reaction/dist/Components/Publishing/Article"
import { AppProps } from "../App"

const ArticlesGridView = require("desktop/components/articles_grid/view.coffee")
const Articles = require("desktop/collections/articles.coffee")

export class ClassicArticleLayout extends React.Component<AppProps> {
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
      collection,
      el: document.querySelector("#articles-footer"),
      header: `More from ${article.channel.name || "Artsy"}`,
      hideMore: true,
    })

    collection.fetch({
      data: {
        channel_id: article.channel_id,
        limit: 12,
        published: true,
        sort: "-published_at",
      },
    })
  }

  render() {
    const {
      article,
      isLoggedIn,
      isMobile,
      templates: { ArticlesGridView } = {} as any,
    } = this.props

    return (
      <div>
        <Article
          article={article}
          isMobile={isMobile}
          isLoggedIn={isLoggedIn}
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
