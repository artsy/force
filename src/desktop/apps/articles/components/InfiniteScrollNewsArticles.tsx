import React, { Component } from 'react'
import { flatten } from 'lodash'
import { Article } from '@artsy/reaction/dist/Components/Publishing'
import { NewsNav } from '@artsy/reaction/dist/Components/Publishing/Nav/NewsNav'
import { NewsDateDivider } from '@artsy/reaction/dist/Components/Publishing/News/NewsDateDivider'
import { ArticleData } from '@artsy/reaction/dist/Components/Publishing/Typings'
import Waypoint from 'react-waypoint'
import { positronql as _positronql } from 'desktop/lib/positronql'
import { newsArticlesQuery } from '../queries/news_articles_query'
import { setupFollows, setupFollowButtons } from 'desktop/apps/article/components/FollowButton.js'
import { LoadingSpinner } from 'desktop/apps/article/components/InfiniteScrollArticle'

export interface Props {
  articles: ArticleData[]
  isMobile: boolean
  marginTop: string
}

interface State {
  isLoading: boolean
  articles: ArticleData[]
  date: any
  offset: number
  error: boolean
  following: any[]
  isEnabled: boolean
}

// FIXME: Rewire
let positronql = _positronql

const FETCH_TOP_OFFSET = 200

export class InfiniteScrollNewsArticles extends Component<
  Props,
  State
  > {

  constructor(props) {
    super(props)

    const { articles } = props
    const date = articles && articles.length ? articles[0].published_at : null

    this.state = {
      isLoading: false,
      articles: props.articles || [],
      date,
      offset: 6,
      error: false,
      following: setupFollows() || null,
      isEnabled: true,
    }
  }

  componentDidMount() {
    setupFollowButtons(this.state.following)
  }

  fetchNextArticles = async () => {
    const { articles, following, offset } = this.state

    this.setState({
      isLoading: true,
    })

    try {
      const data = await positronql({
        query: newsArticlesQuery({
          offset,
          limit: 6
        }),
      })

      const newArticles = data.articles

      if (newArticles.length) {
        this.setState({
          articles: articles.concat(newArticles),
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
  }

  onLeave = (i, { previousPosition, currentPosition }) => {
    const nextArticle = this.state.articles[i + 1]
    const { date } = this.state
    const hasNewDate = nextArticle && nextArticle.published_at !== date
    if (
      nextArticle &&
      previousPosition === 'inside' &&
      currentPosition === 'above' &&
      hasNewDate
    ) {
      // LEFT AN ARTICLE
      this.setState({ date: nextArticle.published_at })
      window.history.replaceState({}, 'news', `/news`)
    }
  }

  onExpand = (article) => {
    // Set slug/document title when expanding an article
    document.title = article.thumbnail_title
    window.history.replaceState({}, article.id, `/news/${article.slug}`)
  }

  renderContent = () => {
    const { articles } = this.state
    const { isMobile, marginTop } = this.props

    return flatten(
      articles.map((article, i) => {
        const beforeArticle = articles[i - 1]
        const hasNewDate = beforeArticle &&
          beforeArticle.published_at.substring(0, 10) !== article.published_at.substring(0, 10)

        return (
          <div key={`article-${i}`}>
            {hasNewDate && <NewsDateDivider date={article.published_at} />}
            <Article
              article={article}
              isTruncated={true}
              isMobile={isMobile}
              marginTop={i === 0 ? marginTop : null}
              onExpand={() => this.onExpand(article)}
            />
            <Waypoint
              topOffset={FETCH_TOP_OFFSET}
              onEnter={(waypointData) => this.onEnter(article, waypointData)}
              onLeave={(waypointData) => this.onLeave(i, waypointData)}
            />
          </div>
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
