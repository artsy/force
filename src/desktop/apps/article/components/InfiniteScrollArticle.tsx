import * as React from "react"
import { flatten } from "underscore"
import Waypoint from "react-waypoint"
import styled from "styled-components"
import { data as sd } from "sharify"
import { positronql } from "desktop/lib/positronql"
import {
  Article,
  ArticleProps,
} from "@artsy/reaction/dist/Components/Publishing/Article"
import { articlesQuery } from "desktop/apps/article/queries/articles"
import { setupFollows, setupFollowButtons } from "./FollowButton"
import { ArticleData } from "@artsy/reaction/dist/Components/Publishing/Typings"
import { shouldAdRender } from "desktop/apps/article/helpers"

const FETCH_TOP_OFFSET = 200

interface InfiniteScrollArticleState {
  isLoading: boolean
  articles: ArticleData[]
  offset: number
  error: boolean
  following: any
  isEnabled: boolean
}

export class InfiniteScrollArticle extends React.Component<
  ArticleProps,
  InfiniteScrollArticleState
> {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      articles: [props.article],
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
    const { articles, following, offset } = this.state

    this.setState({
      isLoading: true,
    })

    try {
      const data = await positronql({
        query: articlesQuery({
          offset,
          limit: 3,
          channel: sd.ARTSY_EDITORIAL_CHANNEL,
          omit: this.props.article.id,
        }),
      })

      if (data.articles.length) {
        this.setState({
          articles: articles.concat(data.articles),
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
        "(apps/article/InfiniteScrollArticle) Error fetching next article set: ",
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

  onEnter = (article: ArticleData, { previousPosition, currentPosition }) => {
    if (previousPosition === "above" && currentPosition === "inside") {
      document.title = article.thumbnail_title
      window.history.replaceState({}, article.id, `/article/${article.slug}`)
    }
  }

  onLeave = (i: number, { previousPosition, currentPosition }) => {
    const nextArticle = this.state.articles[i + 1]

    if (
      nextArticle &&
      previousPosition === "inside" &&
      currentPosition === "above"
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
    const {
      article: { slug },
      isMobile,
      showTooltips,
      showCollectionsRail,
      onOpenAuthModal,
    } = this.props
    const { articles } = this.state

    return flatten(
      articles.map((article, i) => {
        const articleType = article.layout
        // Feature articles and Standard articles should return true
        const renderAd = shouldAdRender(null, null, null, articleType)

        return (
          <div key={`article-${i}`}>
            <Article
              article={article}
              relatedArticlesForPanel={article.relatedArticlesPanel}
              relatedArticlesForCanvas={article.relatedArticlesCanvas}
              isTruncated={i !== 0}
              isMobile={isMobile}
              showTooltips={showTooltips}
              showCollectionsRail={showCollectionsRail}
              onOpenAuthModal={onOpenAuthModal}
              infiniteScrollEntrySlug={slug}
              shouldAdRender={renderAd}
              articleSerial={i + 1}
            />
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
