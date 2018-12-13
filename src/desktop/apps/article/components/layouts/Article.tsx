import React from "react"
import { once } from "lodash"
import {
  Article,
  ArticleProps,
} from "@artsy/reaction/dist/Components/Publishing/Article"
import {
  ModalOptions,
  ModalType,
} from "@artsy/reaction/dist/Components/Authentication/Types"

import InfiniteScrollArticle from "../InfiniteScrollArticle"
import { setupFollows, setupFollowButtons } from "../FollowButton"

const _SuperArticleView = require("desktop/components/article/client/super_article.coffee")
const ArticleModel = require("desktop/models/article.coffee")
const Cookies = require("desktop/components/cookies/index.coffee")
const mediator = require("desktop/lib/mediator.coffee")

// FIXME: Rewire
let SuperArticleView = _SuperArticleView

interface ArticleLayoutProps extends ArticleProps {
  templates: {
    SuperArticleFooter: string
    SuperArticleHeader: string
  }
}

interface ArticleLayoutState {
  following: any // any because the Following class is defined in coffeescript
}

interface ArticleModalOptions extends ModalOptions {
  signupIntent: string
}

export default class ArticleLayout extends React.Component<
  ArticleLayoutProps,
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
      new SuperArticleView({
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
      renderTime,
      showTooltips,
      templates: { SuperArticleFooter, SuperArticleHeader } = {} as any,
    } = this.props

    const isStatic = isSuper || article.seriesArticle || customEditorial

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
            display={article.display}
            isMobile={isMobile}
            isLoggedIn={isLoggedIn}
            onOpenAuthModal={this.handleOpenAuthModal}
            relatedArticlesForPanel={article.relatedArticlesPanel}
            relatedArticlesForCanvas={article.relatedArticlesCanvas}
            renderTime={renderTime}
            showTooltips={showTooltips}
          />
        ) : (
          <InfiniteScrollArticle
            article={article}
            isMobile={isMobile}
            onOpenAuthModal={this.handleOpenAuthModal}
            renderTime={renderTime}
            showTooltips={showTooltips}
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
