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

  handleOpenAuthModal = (mode, options) =>
    mediator.trigger('open:auth', {
      mode,
      ...options,
    })

  renderArticle = () => {
    let { article } = this.props
    const { isMobile, isSuper, renderTime, showTooltips } = this.props
    const isExperimentInfiniteScroll =
      sd.ARTICLE_INFINITE_SCROLL === 'experiment'

    const isInfiniteScroll =
      !isSuper && !article.seriesArticle && !isExperimentInfiniteScroll
    /**
     * FIXME:
     * Patch missing canvas cover images with display cover images. Needed
     * until support is added in Positron.
     */
    const cover_image_url = get(article, 'display.panel.cover_image_url', false)

    if (cover_image_url) {
      article = updeep(
        {
          display: {
            canvas: {
              cover_image_url,
            },
          },
        },
        article
      )
    }

    if (isInfiniteScroll) {
      return (
        <InfiniteScrollArticle
          isMobile={isMobile}
          article={article}
          showTooltips={showTooltips}
          onOpenAuthModal={this.handleOpenAuthModal}
          renderTime={renderTime}
        />
      )
    } else {
      return (
        <Article
          isMobile={isMobile}
          article={article}
          display={isExperimentInfiniteScroll && article.display}
          relatedArticlesForPanel={article.relatedArticlesPanel}
          relatedArticlesForCanvas={
            isExperimentInfiniteScroll && article.relatedArticlesCanvas
          }
          onOpenAuthModal={this.handleOpenAuthModal}
          showTooltips={showTooltips}
        />
      )
    }
  }

  render() {
    const {
      templates: { SuperArticleFooter, SuperArticleHeader } = {},
    } = this.props

    return (
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: SuperArticleHeader,
          }}
        />

        {this.renderArticle()}

        <div
          dangerouslySetInnerHTML={{
            __html: SuperArticleFooter,
          }}
        />
      </div>
    )
  }
}
