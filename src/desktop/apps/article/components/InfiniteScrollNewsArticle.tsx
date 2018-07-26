import moment from 'moment'
import styled from 'styled-components'
import React, { Component, Fragment } from 'react'
import { flatten, debounce, extend } from 'lodash'
import Waypoint from 'react-waypoint'
import { positronql as _positronql } from 'desktop/lib/positronql'
import { newsArticlesQuery } from 'desktop/apps/article/queries/articles'
import {
  ArticleData,
  RelatedArticleData,
  DisplayData,
} from '@artsy/reaction/dist/Components/Publishing/Typings'
import { NewsNav } from '@artsy/reaction/dist/Components/Publishing/Nav/NewsNav'
import { setupFollows, setupFollowButtons } from './FollowButton.js'
import { LoadingSpinner } from './InfiniteScrollArticle'
import { NewsArticle } from './NewsArticle'
import { NewsDateDivider } from '@artsy/reaction/dist/Components/Publishing/News/NewsDateDivider'

export interface Props {
  article?: ArticleData
  articles: ArticleData[]
  isMobile: boolean
  renderTime?: number
}

interface State {
  activeArticle: string
  articles: ArticleData[]
  date: string
  display: DisplayData[]
  error: boolean
  following: object[]
  isEnabled: boolean
  isLoading: boolean
  offset: number
  omit: string
  relatedArticles: RelatedArticleData[]
}

// FIXME: Rewire
let positronql = _positronql

export class InfiniteScrollNewsArticle extends Component<Props, State> {
  constructor(props) {
    super(props)

    const article = props.articles[0] || {}
    const date = this.getDateField(article)
    const omit = props.article ? props.article.id : null
    const offset = props.article ? 0 : 6

    this.onDateChange = debounce(this.onDateChange, 200)

    this.state = {
      activeArticle: '',
      articles: props.articles,
      date,
      display: [],
      error: false,
      following: setupFollows() || null,
      isEnabled: true,
      isLoading: false,
      offset,
      omit,
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

      let newDisplay
      if (data.display) {
        newDisplay = extend({}, data.display, {
          renderTime: moment().unix(),
        })
      }
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

  onDateChange = date => {
    const hasNewDate = !moment(date).isSame(this.state.date, 'day')
    if (hasNewDate) {
      this.setState({ date })
    }
  }

  onActiveArticleChange = id => {
    this.setState({ activeArticle: id })
  }

  hasNewDate = (article, i) => {
    const { articles } = this.state
    const beforeArticle = articles[i - 1] || {}
    const beforeDate = this.getDateField(beforeArticle).substring(0, 10)
    const currentDate = this.getDateField(article).substring(0, 10)

    return beforeDate !== currentDate
  }

  getDateField = article => {
    const { published_at, scheduled_publish_at } = article
    return published_at || scheduled_publish_at || moment().toISOString()
  }

  renderContent = () => {
    const { activeArticle, articles, display, relatedArticles } = this.state
    const { isMobile, renderTime } = this.props

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
        const relatedArticlesCanvas = hasMetaContent && related
        const displayCanvas = hasMetaContent && displayAd
        const hasRenderTime =
          hasMetaContent && ((displayAd && displayAd.renderTime) || renderTime)

        return (
          <Fragment key={`article-${i}`}>
            {hasDateDivider && <NewsDateDivider date={article.published_at} />}
            <NewsArticle
              isMobile={isMobile}
              article={article}
              isTruncated={isTruncated}
              onDateChange={date => this.onDateChange(date)}
              nextArticle={articles[i + 1] as any}
              onActiveArticleChange={id => this.onActiveArticleChange(id)}
              isActive={activeArticle === article.id}
              relatedArticlesForCanvas={relatedArticlesCanvas as any}
              display={displayCanvas as any}
              renderTime={hasRenderTime as any}
            />
          </Fragment>
        )
      })
    )
  }

  render() {
    const { isMobile } = this.props
    const { date } = this.state

    return (
      <NewsContainer isMobile={isMobile}>
        <NewsNav date={date} positionTop={61} />
        {this.renderContent()}
        {this.renderWaypoint()}
      </NewsContainer>
    )
  }
}

const NewsContainer = styled.div.attrs<{ isMobile: boolean }>({})`
  margin-top: ${props => (props.isMobile ? '100' : '200')}px;
`
