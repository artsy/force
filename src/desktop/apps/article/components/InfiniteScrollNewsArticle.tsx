import { data as sd } from "sharify"
import moment from "moment"
import styled from "styled-components"
import React, { Component, Fragment } from "react"
import { flatten, throttle } from "lodash"
import Waypoint from "react-waypoint"
import { positronql } from "desktop/lib/positronql"
import { newsArticlesQuery } from "desktop/apps/article/queries/articles"
import {
  ArticleData,
  RelatedArticleCanvasData,
} from "@artsy/reaction/dist/Components/Publishing/Typings"
import { NewsNav } from "@artsy/reaction/dist/Components/Publishing/Nav/NewsNav"
import { LoadingSpinner } from "./InfiniteScrollArticle"
import { NewsArticle } from "./NewsArticle"
import { NewsDateDivider } from "@artsy/reaction/dist/Components/Publishing/News/NewsDateDivider"
const Cookies = require("desktop/components/cookies/index.coffee")
import { shouldAdRender } from "desktop/apps/article/helpers"
import { handleScrollingAuthModal } from "desktop/lib/openAuthModal"
import { ContextModule, Intent } from "@artsy/cohesion"

export interface Props {
  article?: ArticleData
  articles: ArticleData[]
  isMobile?: boolean
  showCollectionsRail?: boolean
  shouldAdRender?: boolean
}

interface State {
  activeArticle: string
  articles: ArticleData[]
  date: string
  error: boolean
  isEnabled: boolean
  isLoading: boolean
  offset: number
  omit: string
  relatedArticles: RelatedArticleCanvasData[]
}

export class InfiniteScrollNewsArticle extends Component<Props, State> {
  private throttledDateChange
  constructor(props) {
    super(props)

    const article = props.articles[0] || {}
    const date = this.getDateField(article)
    const omit = props.article ? props.article.id : null
    const offset = props.article ? 0 : 6

    this.throttledDateChange = throttle(this.onDateChange, 50)

    this.state = {
      activeArticle: "",
      articles: props.articles,
      date,
      error: false,
      isEnabled: true,
      isLoading: false,
      offset,
      omit,
      relatedArticles: [],
    }
  }

  componentDidMount() {
    const editorialAuthDismissedCookie = Cookies.get(
      "editorial-signup-dismissed"
    )

    if (
      !sd.CURRENT_USER &&
      !editorialAuthDismissedCookie &&
      !this.props.isMobile
    ) {
      this.showAuthModal()
    }
  }

  dismissAuthModal() {
    Cookies.set("editorial-signup-dismissed", 1, { expires: 864000 })
  }

  fetchNextArticles = async () => {
    const { articles, offset, omit, relatedArticles } = this.state

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

      const newRelatedArticles = [data.relatedArticlesCanvas]

      if (newArticles.length) {
        this.setState({
          articles: articles.concat(newArticles),
          relatedArticles: relatedArticles.concat(newRelatedArticles),
          isLoading: false,
          offset: offset + 6,
        })
      } else {
        this.setState({
          isEnabled: false,
          isLoading: false,
        })
      }
    } catch (error) {
      console.error(
        "(apps/article/InfiniteScrollNewsArticle) Error fetching next article set: ",
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
    const hasNewDate = !moment(date).isSame(this.state.date, "day")
    if (hasNewDate) {
      // Commenting this out as we're noticing that when a user is scrolling
      // and the top date is updated, it leads to a reset of the current scroll
      // position, preventing the user from scrolling down the page.
      // FIXME: Reenable once newsfeed scrolling bug tracked down.
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
    const { activeArticle, articles, relatedArticles } = this.state
    const { isMobile, showCollectionsRail } = this.props

    let counter = 0

    return flatten(
      articles.map((article, i) => {
        const hasMetaContent = i % 6 === 0 && i !== 0
        const related = relatedArticles[counter]
        if (hasMetaContent) {
          counter++
        }
        const isTruncated = !this.props.article || i !== 0
        const hasDateDivider = i !== 0 && this.hasNewDate(article, i)
        const relatedArticlesCanvas = hasMetaContent && related

        // render ads on News Landing the 3rd and then every 6 news articles thereafter
        const adPosition = {
          index: i + 1, // article index + 1
          startIndex: 3, // render first ad after 3rd article
          frequency: 6, // render subsequent ads after 6th article
        }

        const renderAd = shouldAdRender(
          adPosition.index,
          adPosition.startIndex,
          adPosition.frequency
        )

        return (
          <Fragment key={`article-${i}`}>
            {hasDateDivider && <NewsDateDivider date={article.published_at} />}
            <NewsArticle
              isMobile={isMobile || false}
              article={article}
              isTruncated={isTruncated}
              onDateChange={this.throttledDateChange}
              nextArticle={articles[i + 1] as any}
              onActiveArticleChange={id => this.onActiveArticleChange(id)}
              isActive={activeArticle === article.id}
              relatedArticlesForCanvas={relatedArticlesCanvas as any}
              // Only show rail if already rendering canvas
              showCollectionsRail={relatedArticles && showCollectionsRail}
              shouldAdRender={renderAd}
              articleSerial={adPosition.index}
            />
          </Fragment>
        )
      })
    )
  }

  showAuthModal() {
    handleScrollingAuthModal({
      intent: Intent.viewEditorial,
      copy: "Sign up for the best stories in art and visual culture",
      destination: location.href,
      afterSignUpAction: {
        action: "editorialSignup",
      },
      contextModule: ContextModule.popUpModal,
    })
  }

  render() {
    const { isMobile } = this.props
    const { date } = this.state

    return (
      <NewsContainer isMobile={isMobile || false} id="article-root">
        <NewsNav date={date} positionTop={56} />
        {this.renderContent()}
        {this.renderWaypoint()}
      </NewsContainer>
    )
  }
}

const NewsContainer = styled.div<{ isMobile: boolean }>`
  margin-top: ${props => (props.isMobile ? "100" : "200")}px;
`
