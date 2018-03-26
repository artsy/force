import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { flatten } from 'lodash'
import Waypoint from 'react-waypoint'
import { positronql as _positronql } from 'desktop/lib/positronql'
import { newsArticlesQuery } from 'desktop/apps/article/queries/articles'
import { Article } from '@artsy/reaction/dist/Components/Publishing'
import { ArticleData } from '@artsy/reaction/dist/Components/Publishing/Typings'
import { setupFollows, setupFollowButtons } from './FollowButton.js'
import { DisplayCanvas } from '@artsy/reaction/dist/Components/Publishing/Display/Canvas'

export interface Props {
  article: ArticleData
  isMobile: boolean
  marginTop: string
}

interface State {
  isLoading: boolean
  articles: ArticleData[]
  display: any[]
  offset: number
  error: boolean
  following: any[]
  isEnabled: boolean
}

// FIXME: Rewire
let positronql = _positronql

const FETCH_TOP_OFFSET = 200

export class InfiniteScrollNewsArticle extends Component<
  Props,
  State
  > {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      articles: [props.article],
      display: [],
      offset: 0,
      error: false,
      following: setupFollows() || null,
      isEnabled: true,
    }
  }

  componentDidMount() {
    setupFollowButtons(this.state.following)
  }

  fetchNextArticles = async () => {
    const { articles, display, following, offset } = this.state
    const { article } = this.props

    this.setState({
      isLoading: true,
    })

    try {
      const data = await positronql({
        query: newsArticlesQuery({
          offset,
          limit: 6,
          omit: article.id
        }),
      })

      const newArticles = data.articles
      const newDisplay = data.display

      if (newArticles.length) {
        this.setState({
          articles: articles.concat(newArticles),
          display: display.concat(newDisplay),
          isLoading: false,
          offset: offset + 6,
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
        '(apps/article/InfiniteScrollNewsArticle) Error fetching next article set: ',
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
    const enteredArticle =
      previousPosition === 'above' && currentPosition === 'inside'

    if (enteredArticle) {
      document.title = article.thumbnail_title
      window.history.replaceState({}, article.id, `/news/${article.slug}`)
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
        `/news/${nextArticle.slug}`
      )
    }
  }

  renderContent = () => {
    const { articles, display } = this.state
    const { isMobile, marginTop } = this.props

    let displayCounter = 0

    return flatten(
      articles.map((article, i) => {
        const hasDisplay = i % 6 === 0 && i !== 0
        const displayAd = display[displayCounter]
        if (hasDisplay) {
          displayCounter++
        }
        console.log("i: ", i)
        console.log("hasDisplay: ", hasDisplay)
        console.log("display: ", display)
        console.log("displayAd: ", displayAd)
        console.log("displayCounter: ", displayCounter)

        return (
          <Fragment key={`article-${i}`}>
            <div key={`article-${i}`}>
              <Article
                article={article}
                isTruncated={i !== 0}
                isMobile={isMobile}
                marginTop={i === 0 ? marginTop : null}
              />
              <Waypoint
                onEnter={(waypointData) => this.onEnter(article, waypointData)}
                onLeave={(waypointData) => this.onLeave(i, waypointData)}
              />
            </div>
            {hasDisplay && displayAd && <DisplayCanvas unit={displayAd.canvas} campaign={displayAd} />}
          </Fragment>
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

const LoadingSpinner = styled.div`
  position: relative;
  padding: 100px;
`
