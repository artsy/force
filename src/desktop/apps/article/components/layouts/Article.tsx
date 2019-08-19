import React from "react"
import { once } from "lodash"
import { Article } from "@artsy/reaction/dist/Components/Publishing/Article"
import {
  ModalOptions,
  ModalType,
} from "@artsy/reaction/dist/Components/Authentication/Types"
import { AppProps } from "../App"
import { InfiniteScrollArticle } from "../InfiniteScrollArticle"
import { shouldAdRender } from "desktop/apps/article/helpers"
import { setupFollows, setupFollowButtons } from "../FollowButton"

const SuperArticleView = require("desktop/components/article/client/super_article.coffee")
const ArticleModel = require("desktop/models/article.coffee")
const Cookies = require("desktop/components/cookies/index.coffee")
const mediator = require("desktop/lib/mediator.coffee")

interface ArticleLayoutState {
  following: any // Backbone collection
}

interface ArticleModalOptions extends ModalOptions {
  signupIntent: string
}

export class ArticleLayout extends React.Component<
  AppProps,
  ArticleLayoutState
> {
  constructor(props) {
    super(props)
    this.state = {
      following: setupFollows() || null,
    }
  }

  componentDidMount() {
    const { article, isSuper } = this.props
    // TODO: Replace with relay follow
    setupFollowButtons(this.state.following)

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
    if (!this.props.isLoggedIn && !this.props.isMobile) {
      window.addEventListener(
        "scroll",
        once(() => {
          setTimeout(() => {
            this.handleOpenAuthModal("register", {
              mode: ModalType.signup,
              intent: "Viewed editorial",
              signupIntent: "signup",
              trigger: "timed",
              triggerSeconds: 2,
              copy: "Sign up for the Best Stories in Art and Visual Culture",
              destination: location.href,
              afterSignUpAction: {
                action: "editorialSignup",
              },
            } as any)
          }, 2000)
        }),
        { once: true }
      )
    }
  }

  handleOpenAuthModal = (mode, options: ArticleModalOptions) => {
    mediator.trigger("open:auth", {
      mode,
      ...options,
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
            onOpenAuthModal={this.handleOpenAuthModal}
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
            onOpenAuthModal={this.handleOpenAuthModal}
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
