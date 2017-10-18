import * as React from 'react'
import _ from 'underscore'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import articlesQuery from 'desktop/apps/article2/queries/articles.js'
import colors from '@artsy/reaction-force/dist/Assets/Colors'
import positronql from 'desktop/lib/positronql.coffee'
import styled from 'styled-components'
import { Article } from '@artsy/reaction-force/dist/Components/Publishing'
import { data as sd } from 'sharify'

export default class InfiniteScrollArticle extends React.Component {
  static propTypes = {
    article: PropTypes.object,
    emailSignupUrl: PropTypes.string
  }

  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      articles: [this.props.article],
      offset: 0,
      error: false
    }
  }

  fetchNextArticles = async () => {
    const { articles, offset } = this.state

    this.setState({
      isLoading: true
    })

    try {
      const data = await positronql({
        query: articlesQuery({
          offset,
          limit: 3,
          channel: sd.ARTSY_EDITORIAL_CHANNEL,
          omit: this.props.article.id
        })
      })

      this.setState({
        articles: articles.concat(data.articles),
        isLoading: false,
        offset: offset + 3
      })
    } catch (error) {
      this.setState({
        isLoading: false,
        error: true
      })
    }
  }

  renderWaypoint = () => {
    const { isLoading, error } = this.state

    if (!isLoading) {
      return (
        <Waypoint
          onEnter={this.fetchNextArticles}
          threshold={2.0}
        />
      )
    } else if (!error) {
      return (
        <LoadingSpinner>
          <div className='loading-spinner' />
        </LoadingSpinner>
      )
    }
  }

  onEnter = (article, {previousPosition, currentPosition}) => {
    if (previousPosition === 'above' && currentPosition === 'inside') {
      document.title = article.thumbnail_title
      window.history.replaceState({}, article.id, `/article/${article.slug}`)
    }
  }

  onLeave = (i, {previousPosition, currentPosition}) => {
    const nextArticle = this.state.articles[i + 1]

    if (previousPosition === 'inside' && currentPosition === 'above' && nextArticle) {
      document.title = nextArticle.thumbnail_title
      window.history.replaceState({}, nextArticle.id, `/article/${nextArticle.slug}`)
    }
  }

  renderContent = () => {
    return _.flatten(_.map(this.state.articles, (article, i) => {
      return (
        <div key={`article-${i}`}>
          <Article
            article={article}
            relatedArticlesForPanel={article.relatedArticlesPanel}
            relatedArticlesForCanvas={article.relatedArticlesCanvas}
            isTruncated={i !== 0}
            emailSignupUrl={this.props.emailSignupUrl}
            display={article.display}
          />
          <Break />
          <Waypoint
            onEnter={(waypointData => this.onEnter(article, waypointData))}
            onLeave={(waypointData => this.onLeave(i, waypointData))}
          />
        </div>
      )
    }))
  }

  render () {
    return (
      <InfiniteScrollContainer id='article-root'>
        {this.renderContent()}
        {this.renderWaypoint()}
      </InfiniteScrollContainer>
    )
  }
}

const LoadingSpinner = styled.div`
  position: relative;
  padding: 100px;
`
const Break = styled.div`
  border-top: 1px solid ${colors.grayRegular};
  width: 100%;
`
const InfiniteScrollContainer = styled.div`
  margin-top: 100px;
`
