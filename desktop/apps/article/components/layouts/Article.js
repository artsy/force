import ArticleModel from 'desktop/models/article.coffee'
import InfiniteScrollArticle from '../InfiniteScrollArticle'
import PropTypes from 'prop-types'
import React from 'react'
import SuperArticleView from 'desktop/components/article/client/super_article.coffee'
import get from 'lodash.get'
import updeep from 'updeep'
import { Article } from '@artsy/reaction-force/dist/Components/Publishing'
import { setupFollows, setupFollowButtons } from '../FollowButton.js'
import { data as sd } from 'sharify'

const NAVHEIGHT = '53px'

export class ArticleLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      following: setupFollows() || null
    }
  }
  static propTypes = {
    article: PropTypes.object,
    isMobile: PropTypes.bool,
    isSuper: PropTypes.bool,
    subscribed: PropTypes.bool,
    templates: PropTypes.object
  }

  componentDidMount () {
    setupFollowButtons(this.state.following)
    if (this.props.isSuper) {
      new SuperArticleView({
        el: document.querySelector('body'),
        article: new ArticleModel(this.props.article)
      })
    }
  }

  renderArticle = () => {
    let { article } = this.props
    const { isMobile, isSuper, subscribed } = this.props
    const articleMarginTop = article.layout === 'standard' ? '100px' : '0px'
    const navHeight = isSuper ? '0px' : NAVHEIGHT
    const headerHeight = `calc(100vh - ${navHeight})`

    /**
     * FIXME:
     * Patch missing canvas cover images with display cover images. Needed
     * until support is added in Positron.
     */
    const cover_image_url = get(article, 'display.panel.cover_image_url', false)

    if (cover_image_url) {
      article = updeep({
        display: {
          canvas: {
            cover_image_url
          }
        }
      }, article)
    }

    if (!isSuper) {
      const emailSignupUrl = subscribed ? '' : `${sd.APP_URL}/signup/editorial`

      return (
        <InfiniteScrollArticle
          isMobile={isMobile}
          article={article}
          emailSignupUrl={emailSignupUrl}
          headerHeight={headerHeight}
          marginTop={articleMarginTop}
        />
      )
    } else {
      return (
        <Article
          isMobile={isMobile}
          article={article}
          relatedArticlesForPanel={article.relatedArticlesPanel}
          headerHeight={headerHeight}
          marginTop={articleMarginTop}
        />
      )
    }
  }

  render () {
    const {
      templates: {
        SuperArticleFooter,
        SuperArticleHeader
      } = {}
    } = this.props

    return (
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: SuperArticleHeader
          }}
        />

        {this.renderArticle()}

        <div
          dangerouslySetInnerHTML={{
            __html: SuperArticleFooter
          }}
        />

      </div>
    )
  }
}
