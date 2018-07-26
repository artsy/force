import ArticleModel from 'desktop/models/article.coffee'
import InfiniteScrollArticle from '../InfiniteScrollArticle'
import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash.get'
import updeep from 'updeep'
import { data as sd } from 'sharify'
import { Article } from 'reaction/Components/Publishing'
import _EditorialSignupView from 'desktop/components/email/client/editorial_signup.coffee'
import _SuperArticleView from 'desktop/components/article/client/super_article.coffee'
import { setupFollows, setupFollowButtons } from '../FollowButton.js'
import mediator from 'desktop/lib/mediator.coffee'

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
    const { article, isSuper } = this.props
    // TODO: Replace with relay follow
    setupFollowButtons(this.state.following)
    // Comment until we are ready to launch the test
    // splitTest('article_infinite_scroll').view()

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
      isSuper,
      isMobile,
      renderTime,
      showTooltips,
      templates: { SuperArticleFooter, SuperArticleHeader } = {},
    } = this.props

    const isExperimentInfiniteScroll =
      sd.ARTICLE_INFINITE_SCROLL === 'experiment'
    const hasNav = isSuper || article.seriesArticle

    const notScrolling = isExperimentInfiniteScroll || hasNav
    return (
      <div>
        {isSuper && (
          <div
            dangerouslySetInnerHTML={{
              __html: SuperArticleHeader,
            }}
          />
        )}

        {notScrolling ? (
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
