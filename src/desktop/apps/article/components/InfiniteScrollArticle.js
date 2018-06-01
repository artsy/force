import * as React from 'react'
import _ from 'underscore'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import styled from 'styled-components'
import colors from 'reaction/Assets/Colors'
import { data as sd } from 'sharify'
import { positronql as _positronql } from 'desktop/lib/positronql'
import { Article } from 'reaction/Components/Publishing'
import { articlesQuery } from 'desktop/apps/article/queries/articles'
import { setupFollows, setupFollowButtons } from './FollowButton.js'
import { getCurrentUnixTimestamp } from 'reaction/Components/Publishing/Constants'

// FIXME: Rewire
let positronql = _positronql

const FETCH_TOP_OFFSET = 200

export default class InfiniteScrollArticle extends React.Component {
  static propTypes = {
    article: PropTypes.object,
    emailSignupUrl: PropTypes.string,
    isMobile: PropTypes.bool,
    headerHeight: PropTypes.string,
    marginTop: PropTypes.string,
    showTooltips: PropTypes.bool,
    showToolTipMarketData: PropTypes.bool,
    onOpenAuthModal: PropTypes.func,
    renderTime: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      articles: [props.article],
      offset: 0,
      error: false,
      following: setupFollows() || null,
      isEnabled: true,
      renderTimes: [props.renderTime],
    }
  }

  componentDidMount() {
    setupFollowButtons(this.state.following)
  }

  fetchNextArticles = async () => {
    const { articles, following, offset, renderTimes } = this.state

    this.setState({
      isLoading: true,
    })

    try {
      const data = await positronql({
        query: articlesQuery({
          offset,
          layout: 'standard',
          limit: 3,
          channel: sd.ARTSY_EDITORIAL_CHANNEL,
          omit: this.props.article.id,
        }),
      })

      if (data.articles.length) {
        this.setState({
          articles: articles.concat(data.articles),
          renderTimes: renderTimes.concat([getCurrentUnixTimestamp()]),
          isLoading: false,
          offset: offset + 3,
        })
        setupFollowButtons(following)
      } else {
        this.setState({
          isEnabled: false,
          isLoading: false,
        })
      }
    } catch (error) {
      console.error(
        '(apps/article/InfiniteScrollArticle) Error fetching next article set: ',
        error
      )

      this.setState({
        isEnabled: false,
        isLoading: false,
        error: true,
      })
    }
  }

  renderWaypoint = () => {
    const { isEnabled, isLoading, error } = this.state

    if (isEnabled) {
      if (!isLoading) {
        return (
          <Waypoint
            onEnter={this.fetchNextArticles}
            threshold={2.0}
            topOffset={FETCH_TOP_OFFSET}
          />
        )
      } else if (!error) {
        return (
          <LoadingSpinner>
            <div className="loading-spinner" />
          </LoadingSpinner>
        )
      }
    }
  }

  onEnter = (article, { previousPosition, currentPosition }) => {
    if (previousPosition === 'above' && currentPosition === 'inside') {
      document.title = article.thumbnail_title
      window.history.replaceState({}, article.id, `/article/${article.slug}`)
    }
  }

  onLeave = (i, { previousPosition, currentPosition }) => {
    const nextArticle = this.state.articles[i + 1]

    if (
      nextArticle &&
      previousPosition === 'inside' &&
      currentPosition === 'above'
    ) {
      document.title = nextArticle.thumbnail_title
      window.history.replaceState(
        {},
        nextArticle.id,
        `/article/${nextArticle.slug}`
      )
    }
  }

  renderContent = () => {
    const { showTooltips, showToolTipMarketData, onOpenAuthModal } = this.props
    const { renderTimes } = this.state

    return _.flatten(
      this.state.articles.map((article, i) => {
        return (
          <div key={`article-${i}`}>
            <Article
              article={article}
              relatedArticlesForPanel={article.relatedArticlesPanel}
              relatedArticlesForCanvas={article.relatedArticlesCanvas}
              isTruncated={i !== 0}
              isMobile={this.props.isMobile}
              emailSignupUrl={this.props.emailSignupUrl}
              display={article.display}
              headerHeight={i === 0 ? this.props.headerHeight : null}
              marginTop={i === 0 ? this.props.marginTop : null}
              showTooltips={showTooltips}
              showToolTipMarketData={showToolTipMarketData}
              onOpenAuthModal={onOpenAuthModal}
              renderTime={renderTimes[i % 3]}
            />
            <Break />
            <Waypoint
              onEnter={waypointData => this.onEnter(article, waypointData)}
              onLeave={waypointData => this.onLeave(i, waypointData)}
            />
          </div>
        )
      })
    )
  }

  render() {
    return (
      <div id="article-root">
        {this.renderContent()}
        {this.renderWaypoint()}
      </div>
    )
  }
}

export const LoadingSpinner = styled.div`
  position: relative;
  padding: 100px;
`
export const Break = styled.div`
  border-top: 1px solid ${colors.grayRegular};
  width: 100%;
  margin-top: 80px;
`
