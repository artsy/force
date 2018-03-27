import React, { Component, Fragment } from 'react'
import { flatten, flattenDeep } from 'lodash'
import Waypoint from 'react-waypoint'
import { positronql as _positronql } from 'desktop/lib/positronql'
import { newsArticlesQuery } from 'desktop/apps/article/queries/articles'
import { Article } from '@artsy/reaction/dist/Components/Publishing'
import { ArticleData } from '@artsy/reaction/dist/Components/Publishing/Typings'
import { NewsDateDivider } from '@artsy/reaction/dist/Components/Publishing/News/NewsDateDivider'
import { NewsNav } from '@artsy/reaction/dist/Components/Publishing/Nav/NewsNav'
import { setupFollows, setupFollowButtons } from './FollowButton.js'
import { DisplayCanvas } from '@artsy/reaction/dist/Components/Publishing/Display/Canvas'
import { Break } from 'desktop/apps/article/components/InfiniteScrollArticle'
import { LoadingSpinner } from './InfiniteScrollArticle'

export interface Props {
  article: ArticleData
  articles: ArticleData[]
  isMobile: boolean
  marginTop: string
}

interface State {
  isLoading: boolean
  articles: ArticleData[]
  date: any
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

    const articles = props.articles || []

    this.state = {
      isLoading: false,
      articles: flattenDeep([props.article, articles]),
      date: props.article ? props.article.published_at : null,
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
          omit: article && article.id
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
    const { date } = this.state
    const enteredArticle =
      previousPosition === 'above' && currentPosition === 'inside'
    const hasNewDate = article.published_at !== date

    if (enteredArticle && hasNewDate) {
      // ENTERED AN ARTICLE
      this.setState({ date: article.published_at })
    }
    if (enteredArticle && article === this.props.article) {
      this.onExpand(article)
    }
  }

  onLeave = (i, { previousPosition, currentPosition }) => {
    const { date, articles } = this.state
    const nextArticle = articles[i + 1]
    const hasNewDate = nextArticle && nextArticle.published_at !== date

    if (
      nextArticle &&
      previousPosition === 'inside' &&
      currentPosition === 'above' &&
      hasNewDate
    ) {
      // LEFT AN ARTICLE
      this.setState({ date: nextArticle.published_at })
      document.title = 'News' // todo: replace with actual meta-title
      window.history.replaceState({}, 'news', `/news`)
    }
  }

  onExpand = (article) => {
    // Set slug/document title when expanding an article
    document.title = article.thumbnail_title
    window.history.replaceState({}, article.id, `/news/${article.slug}`)
  }

  hasNewDate = (article, i) => {
    const { articles } = this.state
    const beforeDate = articles[i - 1] && articles[i - 1].published_at.substring(0, 10)
    const currentDate = article.published_at.substring(0, 10)

    return beforeDate !== currentDate
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

        const hasDateDivider = i !== 0 && this.hasNewDate(article, i)

        return (
          <Fragment key={`article-${i}`}>
            {hasDateDivider &&
              <NewsDateDivider date={article.published_at} />
            }
            <div key={`article-${i}`}>
              <Article
                article={article}
                isTruncated={i !== 0}
                isMobile={isMobile}
                marginTop={i === 0 ? marginTop : null}
                onExpand={() => this.onExpand(article)}
              />
              <Waypoint
                onEnter={(waypointData) => this.onEnter(article, waypointData)}
                onLeave={(waypointData) => this.onLeave(i, waypointData)}
                topOffset={FETCH_TOP_OFFSET}
              />
            </div>

            {hasDisplay && displayAd && (
              <Fragment>
                <Break />
                <DisplayCanvas unit={displayAd.canvas} campaign={displayAd} />
                <Break />
              </Fragment>
            )
            }
          </Fragment>
        )
      })
    )
  }

  render() {
    const { date } = this.state

    return (
      <div id="article-root">
        <NewsNav date={date} />
        {this.renderContent()}
        {this.renderWaypoint()}
      </div>
    )
  }
}
