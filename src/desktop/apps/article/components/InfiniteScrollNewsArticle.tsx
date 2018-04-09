import moment from 'moment'
import React, { Component, Fragment } from 'react'
import { flatten, throttle } from 'lodash'
import Waypoint from 'react-waypoint'
import { positronql as _positronql } from 'desktop/lib/positronql'
import { newsArticlesQuery } from 'desktop/apps/article/queries/articles'
import {
  RelatedArticlesCanvas,
} from '@artsy/reaction/dist/Components/Publishing'
import { ArticleData } from '@artsy/reaction/dist/Components/Publishing/Typings'

import { NewsNav } from '@artsy/reaction/dist/Components/Publishing/Nav/NewsNav'
import { setupFollows, setupFollowButtons } from './FollowButton.js'
import { DisplayCanvas } from '@artsy/reaction/dist/Components/Publishing/Display/Canvas'
import { Break } from 'desktop/apps/article/components/InfiniteScrollArticle'
import { LoadingSpinner } from './InfiniteScrollArticle'
import { NewsArticle } from './NewsArticle'
import { NewsDateDivider } from '@artsy/reaction/dist/Components/Publishing/News/NewsDateDivider'

export interface Props {
  article?: ArticleData
  articles: ArticleData[]
  isMobile: boolean
  marginTop: string
}

interface State {
  articles: ArticleData[]
  date: any
  display: any[]
  error: boolean
  following: any[]
  offset: number
  isEnabled: boolean
  isLoading: boolean
  omit: string
  relatedArticles: any[]
}

// FIXME: Rewire
let positronql = _positronql

export class InfiniteScrollNewsArticle extends Component<Props, State> {
  constructor(props) {
    super(props)

    const article = props.articles[0] ? props.articles[0] : {}
    const date = this.getDateField(article)
    const omit = props.article ? props.article.id : null
    const offset = props.article ? 0 : 6

    this.onDateChange = throttle(this.onDateChange, 500, {
      trailing: true
    })

    this.state = {
      isLoading: false,
      articles: props.articles,
      date,
      display: [],
      offset,
      omit,
      error: false,
      following: setupFollows() || null,
      isEnabled: true,
      relatedArticles: [],
    }
  }

  componentDidMount() {
    setupFollowButtons(this.state.following)
  }

  fetchNextArticles = async () => {
    const {
      articles,
      display,
      following,
      offset,
      omit,
      relatedArticles,
    } = this.state

    this.setState({
      isLoading: true,
    })

    try {
      const data = await positronql({
        query: newsArticlesQuery({
          offset,
          limit: 6,
          omit,
        }),
      })

      const newArticles = data.articles
      const newDisplay = data.display
      const newRelatedArticles = [data.relatedArticlesCanvas]

      if (newArticles.length) {
        this.setState({
          articles: articles.concat(newArticles),
          display: display.concat(newDisplay),
          relatedArticles: relatedArticles.concat(newRelatedArticles),
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
        return <Waypoint onEnter={this.fetchNextArticles} bottomOffset="-50%" />
      } else if (!error) {
        return (
          <LoadingSpinner>
            <div className="loading-spinner" />
          </LoadingSpinner>
        )
      }
    }
  }

  onDateChange = (date) => {
    const hasNewDate = date !== this.state.date
    if (hasNewDate) {
      this.setState({ date })
    }
  }

  onMetadataChange = (article: any = null) => {
    const id = article ? article.id : 'news'
    const path = article ? `/news/${article.slug}` : '/news'
    document.title = article ? article.thumbnail_title : 'News'
    window.history.replaceState({}, id, path)
  }

  hasNewDate = (article, i) => {
    const { articles } = this.state
    const beforeArticle = articles[i - 1] || {}
    const beforeDate = this.getDateField(beforeArticle).substring(0, 10)
    const currentDate = this.getDateField(article).substring(0, 10)

    return beforeDate !== currentDate
  }

  getDateField = (article) => {
    const { published_at, scheduled_publish_at } = article
    return published_at || scheduled_publish_at || moment().toISOString()
  }

  renderContent = () => {
    const { articles, display, relatedArticles } = this.state
    const { isMobile } = this.props

    let counter = 0

    return flatten(
      articles.map((article, i) => {
        const hasMetaContent = i % 6 === 0 && i !== 0
        const displayAd = display[counter]
        const related = relatedArticles[counter]
        if (hasMetaContent) {
          counter++
        }
        const isTruncated = !this.props.article || i !== 0
        const hasDateDivider = i !== 0 && this.hasNewDate(article, i)

        return (
          <Fragment key={`article-${i}`}>
            {hasDateDivider && <NewsDateDivider date={article.published_at} />}
            <NewsArticle
              isMobile={isMobile}
              article={article}
              isTruncated={isTruncated}
              isFirstArticle={i === 0}
              nextArticle={articles[i + 1]}
              onDateChange={(date) => this.onDateChange(date)}
              onMetadataChange={this.onMetadataChange}
            />
            {hasMetaContent &&
              related && (
                <Fragment>
                  <Break />
                  <RelatedArticlesCanvas
                    articles={related}
                    isMobile={isMobile}
                  />
                  <Break />
                </Fragment>
              )}
            {hasMetaContent &&
              displayAd && (
                <Fragment>
                  <DisplayCanvas unit={displayAd.canvas} campaign={displayAd} />
                  <Break />
                </Fragment>
              )}
          </Fragment>
        )
      })
    )
  }

  render() {
    const { date } = this.state

    return (
      <div id="article-root">
        <NewsNav date={date} positionTop={61} />
        {this.renderContent()}
        {this.renderWaypoint()}
      </div>
    )
  }
}
