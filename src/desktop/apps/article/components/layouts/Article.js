import ArticleModel from 'desktop/models/article.coffee'
import InfiniteScrollArticle from '../InfiniteScrollArticle'
import PropTypes from 'prop-types'
import React from 'react'
import { Article } from 'reaction/Components/Publishing'
import _EditorialSignupView from 'desktop/components/email/client/editorial_signup.coffee'
import _SuperArticleView from 'desktop/components/article/client/super_article.coffee'
import { setupFollows, setupFollowButtons } from '../FollowButton.js'
import mediator from 'desktop/lib/mediator.coffee'
import splitTest from 'desktop/components/split_test/index.coffee'

// FIXME: Rewire
let SuperArticleView = _SuperArticleView
let EditorialSignupView = _EditorialSignupView

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
    isSuper: PropTypes.bool,
    templates: PropTypes.object,
    showTooltips: PropTypes.bool,
    renderTime: PropTypes.number,
  }

  componentDidMount() {
    splitTest('revised_article_infinite_scroll').view()

    const { article, isSuper } = this.props
    // TODO: Replace with relay follow
    setupFollowButtons(this.state.following)

    if (isSuper) {
      new SuperArticleView({
        el: document.querySelector('body'),
        article: new ArticleModel(article),
      })
    }
    if (!isSuper && article.layout === 'standard') {
      new EditorialSignupView({
        el: document.querySelector('body'),
      })
    }
  }

  handleOpenAuthModal = (mode, options) => {
    mediator.trigger('open:auth', {
      mode,
      ...options,
    })
  }

  render() {
    const {
      article,
      isExperimentInfiniteScroll,
      isSuper,
      isMobile,
      renderTime,
      showTooltips,
      templates: { SuperArticleFooter, SuperArticleHeader } = {},
    } = this.props
    const hasNav = isSuper || article.seriesArticle
    const isStatic = isExperimentInfiniteScroll || hasNav

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
