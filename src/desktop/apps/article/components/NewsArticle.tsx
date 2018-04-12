import React, { Component, Fragment } from 'react'
import { Article } from '@artsy/reaction/dist/Components/Publishing'
import Waypoint from 'react-waypoint'

interface Props {
  article: any
  isActive: boolean
  isMobile: boolean
  isTruncated: boolean
  isFirstArticle: boolean
  nextArticle: any
  onActiveArticleChange: (id: string) => void
  onDateChange: (date: string) => void
}

interface State {
  isTruncated: boolean
}

export class NewsArticle extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      isTruncated: props.isTruncated || false
    }
  }

  onExpand = () => {
    const { article } = this.props
    this.setMetadata(article)
    this.setState({
      isTruncated: false
    })
  }

  setMetadata = (article: any = null) => {
    const id = article ? article.id : 'news'
    const path = article ? `/news/${article.slug}` : '/news'
    document.title = article ? article.thumbnail_title : 'News'
    window.history.replaceState({}, id, path)
  }

  onEnter = ({ previousPosition, currentPosition }) => {
    const {
      article,
      onActiveArticleChange,
      onDateChange,
      isMobile
    } = this.props
    const { isTruncated } = this.state

    if (currentPosition === 'inside') {
      if (previousPosition === 'above') {
        onDateChange(article.published_at)
      }

      if (!isTruncated) {
        this.setMetadata(article)
      } else {
        this.setMetadata()
      }

      if (isMobile) {
        onActiveArticleChange(article.id)
      }

    }
  }

  onLeave = ({ previousPosition, currentPosition }) => {
    const {
      nextArticle,
      onDateChange,
      isMobile,
      onActiveArticleChange
    } = this.props

    if (currentPosition === 'above' && previousPosition === 'inside') {
      if (nextArticle) {
        onDateChange(nextArticle.published_at)
        if (isMobile) {
          onActiveArticleChange(nextArticle.id)
        }
      }
    }
  }

  render() {
    const {
      article,
      isActive,
      isMobile,
      isTruncated,
      isFirstArticle
    } = this.props
    const marginTop = isMobile ? '100px' : '200px'
    const bottomOffset = window ? `${window.innerHeight / 2}px` : '200px'

    return (
      <Fragment>
        <Waypoint
          onEnter={(waypointData) => this.onEnter(waypointData)}
          onLeave={(waypointData) => this.onLeave(waypointData)}
          topOffset="-10px"
          bottomOffset={bottomOffset}
        >
          <div>
            <Article
              article={article}
              isTruncated={isTruncated}
              isMobile={isMobile}
              marginTop={isFirstArticle ? marginTop : null}
              onExpand={this.onExpand}
              isHovered={isMobile && isActive}
            />
          </div>
        </Waypoint>
      </Fragment>
    )
  }
}
