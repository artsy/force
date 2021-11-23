import { Component } from "react";
import { Article as PublishingArticle } from "@artsy/reaction/dist/Components/Publishing/Article"
import { AppProps } from "../App"
import { InfiniteScrollArticle } from "../InfiniteScrollArticle"
import { shouldAdRender } from "desktop/apps/article/helpers"
import { handleScrollingAuthModal } from "desktop/lib/openAuthModal"
import { ContextModule, Intent } from "@artsy/cohesion"
import { mediator } from "lib/mediator"
const SuperArticleView = require("desktop/components/article/client/super_article.coffee")
import { Article } from "desktop/models/article"
import Cookies from "desktop/components/cookies/index"

export class ArticleLayout extends Component<AppProps> {
  componentDidMount() {
    const { article, isSuper } = this.props
    if (isSuper) {
      // @ts-ignore
      const _superArticleView = new SuperArticleView({
        el: document.querySelector("body"),
        // @ts-ignore
        article: new Article(article),
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
      intent: Intent.viewEditorial,
      copy: "Sign up for the best stories in art and visual culture",
      destination: location.href,
      afterSignUpAction: {
        action: "editorialSignup",
      },
      contextModule: ContextModule.popUpModal,
    })
  }

  render() {
    const {
      article,
      customEditorial,
      isEigen,
      isSuper,
      isLoggedIn,
      isMobile,
      showTooltips,
      articleSerial,
      templates: { SuperArticleFooter, SuperArticleHeader } = {} as any,
    } = this.props

    const isStatic = isSuper || article.seriesArticle || customEditorial

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const renderAd = shouldAdRender(null, null, null, article.layout, isEigen)

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
          <PublishingArticle
            article={article}
            customEditorial={customEditorial}
            isMobile={isMobile}
            isLoggedIn={isLoggedIn}
            isSuper={isSuper}
            relatedArticlesForPanel={article.relatedArticlesPanel}
            relatedArticlesForCanvas={article.relatedArticlesCanvas}
            showTooltips={showTooltips}
            hideAuthModal={isEigen}
            shouldAdRender={!isEigen} // always render ads on super, series, and custom editorial articles if not on Eigen
          />
        ) : (
          <InfiniteScrollArticle
            article={article}
            isMobile={isMobile}
            showTooltips={showTooltips}
            shouldAdRender={renderAd}
            articleSerial={articleSerial}
            isEigen={isEigen}
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
