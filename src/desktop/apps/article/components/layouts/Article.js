import ArticleModel from "desktop/models/article.coffee"
import InfiniteScrollArticle from "../InfiniteScrollArticle"
import { once } from "lodash"
import PropTypes from "prop-types"
import React from "react"
import { Article } from "reaction/Components/Publishing"
import Cookies from "desktop/components/cookies/index.coffee"
import _SuperArticleView from "desktop/components/article/client/super_article.coffee"
import { setupFollows, setupFollowButtons } from "../FollowButton.js"
import mediator from "desktop/lib/mediator.coffee"

// FIXME: Rewire
let SuperArticleView = _SuperArticleView

export default class ArticleLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      following: setupFollows() || null,
    }
  }
  static propTypes = {
    article: PropTypes.object,
    isMobile: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    isSuper: PropTypes.bool,
    templates: PropTypes.object,
    showTooltips: PropTypes.bool,
    renderTime: PropTypes.number,
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
              mode: "signup",
              intent: "Viewed editorial",
              signupIntent: "signup",
              trigger: "timed",
              triggerSeconds: 2,
              copy: "Sign up for the Best Stories in Art and Visual Culture",
              destination: location.href,
            })
          }, 2000)
        }),
        { once: true }
      )
    }
  }

  handleOpenAuthModal = (mode, options) => {
    mediator.trigger("open:auth", {
      mode,
      ...options,
    })
  }

  render() {
    const {
      article,
      isSuper,
      isLoggedIn,
      isMobile,
      renderTime,
      showTooltips,
      templates: { SuperArticleFooter, SuperArticleHeader } = {},
    } = this.props
    const hasNav = isSuper || article.seriesArticle
    const isStatic = hasNav

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
