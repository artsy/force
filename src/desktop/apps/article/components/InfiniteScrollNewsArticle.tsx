import React, { Component, Fragment } from 'react'
import { flatten } from 'lodash'
import Waypoint from 'react-waypoint'
import { positronql as _positronql } from 'desktop/lib/positronql'
import { newsArticlesQuery } from 'desktop/apps/article/queries/articles'
import { Article, RelatedArticlesCanvas } from '@artsy/reaction/dist/Components/Publishing'
import { ArticleData } from '@artsy/reaction/dist/Components/Publishing/Typings'
import { NewsDateDivider } from '@artsy/reaction/dist/Components/Publishing/News/NewsDateDivider'
import { NewsNav } from '@artsy/reaction/dist/Components/Publishing/Nav/NewsNav'
import { setupFollows, setupFollowButtons } from './FollowButton.js'
import { DisplayCanvas } from '@artsy/reaction/dist/Components/Publishing/Display/Canvas'
import { Break } from 'desktop/apps/article/components/InfiniteScrollArticle'
import { LoadingSpinner } from './InfiniteScrollArticle'


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
  offset: number
  omit: string
  error: boolean
  following: any[]
  isEnabled: boolean
  isLoading: boolean
  relatedArticles: any[]
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

    const date = props.articles[0] ? props.articles[0].published_at : null
    const omit = props.article ? props.article.id : null
    const offset = props.article ? 0 : 6

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
      relatedArticles: []
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
      relatedArticles
    } = this.state

    this.setState({
      isLoading: true,
    })

    try {
      const data = await positronql({
        query: newsArticlesQuery({
          offset,
          limit: 6,
          omit
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
      currentPosition === 'above'
    ) {
      // LEFT AN ARTICLE
      if (hasNewDate) {
        this.setState({ date: nextArticle.published_at })
      }
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
    const {
      articles,
      display,
      relatedArticles
    } = this.state
    const { isMobile } = this.props
    const marginTop = isMobile ? '100px' : '200px'

    let counter = 0

    return flatten(
      articles.map((article, i) => {
        const hasMetaContent = i % 6 === 0 && i !== 0
        const displayAd = display[counter]
        const related = relatedArticles[counter]
        if (hasMetaContent) {
          counter++
        }

        const hasDateDivider = i !== 0 && this.hasNewDate(article, i)
        const isTruncated = !this.props.article || i !== 0

        return (
          <Fragment key={`article-${i}`}>
            {hasDateDivider &&
              <NewsDateDivider date={article.published_at} />
            }
            <div key={`article-${i}`}>
              <Article
                article={article}
                isTruncated={isTruncated}
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
            {hasMetaContent && related && (
              <Fragment>
                <Break />
                <RelatedArticlesCanvas
                  articles={related}
                  isMobile={isMobile}
                />
                <Break />
              </Fragment>
            )}
            {hasMetaContent && displayAd && (
              <Fragment>
                <DisplayCanvas unit={displayAd.canvas} campaign={displayAd} />
                <Break />
              </Fragment>
            )}
          </Fragment >
        )
      }
      )
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
