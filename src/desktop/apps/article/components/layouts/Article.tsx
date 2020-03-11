import React from "react"
import { Article } from "@artsy/reaction/dist/Components/Publishing/Article"
import { AppProps } from "../App"
import { InfiniteScrollArticle } from "../InfiniteScrollArticle"
import { shouldAdRender } from "desktop/apps/article/helpers"
import {
  handleOpenAuthModal,
  handleScrollingAuthModal,
} from "desktop/apps/authentication/helpers"
const SuperArticleView = require("desktop/components/article/client/super_article.coffee")
const ArticleModel = require("desktop/models/article.coffee")
const Cookies = require("desktop/components/cookies/index.coffee")
const mediator = require("desktop/lib/mediator.coffee")

export class ArticleLayout extends React.Component<AppProps> {
  componentDidMount() {
    const { article, isSuper } = this.props
    if (isSuper) {
      // @ts-ignore
      const _superArticleView = new SuperArticleView({
        el: document.querySelector("body"),
        article: new ArticleModel(article),
      })
    }

    const editorialAuthDismissedCookie = Cookies.get(
      "editorial-signup-dismissed"
    )

    if (!this.props.isLoggedIn && !editorialAuthDismissedCookie) {
      this.showAuthModal()
    }

    // setup listener for dismissal cookie
    mediator.on("modal:closed", this.dismissAuthModal)
  }

  dismissAuthModal() {
    Cookies.set("editorial-signup-dismissed", 1, { expires: 864000 })
  }

  showAuthModal() {
    handleScrollingAuthModal({
      intent: "Viewed editorial",
      copy: "Sign up for the Best Stories in Art and Visual Culture",
      destination: location.href,
      afterSignUpAction: {
        action: "editorialSignup",
      },
    })
  }

  render() {
    const {
      article,
      customEditorial,
      isSuper,
      isLoggedIn,
      isMobile,
      showTooltips,
      showCollectionsRail,
      articleSerial,
      templates: { SuperArticleFooter, SuperArticleHeader } = {} as any,
    } = this.props

    const isStatic = isSuper || article.seriesArticle || customEditorial
    const renderAd = shouldAdRender(null, null, null, article.layout)

    return (
      <div>
        {isSuper && (
          <div
            dangerouslySetInnerHTML={{
              __html: SuperArticleHeader,
            }}
          />
        )}

        {isStatic ? (
          <Article
            article={article}
            customEditorial={customEditorial}
            isMobile={isMobile}
            isLoggedIn={isLoggedIn}
            isSuper={isSuper}
            onOpenAuthModal={handleOpenAuthModal}
            relatedArticlesForPanel={article.relatedArticlesPanel}
            relatedArticlesForCanvas={article.relatedArticlesCanvas}
            showTooltips={showTooltips}
            showCollectionsRail={showCollectionsRail}
            shouldAdRender={true} // always render ads on super, series, and custom editorial articles
          />
        ) : (
          <InfiniteScrollArticle
            article={article}
            isMobile={isMobile}
            showTooltips={showTooltips}
            showCollectionsRail={showCollectionsRail}
            shouldAdRender={renderAd}
            articleSerial={articleSerial}
          />
        )}

        {isSuper && (
          <div
            dangerouslySetInnerHTML={{
              __html: SuperArticleFooter,
            }}
          />
        )}
      </div>
    )
  }
}
