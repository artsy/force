import React, { Component, Fragment } from 'react'
import { Article } from '@artsy/reaction/dist/Components/Publishing'
import Waypoint from 'react-waypoint'

interface Props {
  article: any
  isMobile: boolean
  isTruncated: boolean
  isFirstArticle: boolean
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

  onEnter = ({ currentPosition }) => {
    const {
      article,
      onDateChange
    } = this.props
    const { isTruncated } = this.state

    if (currentPosition === 'inside') {
      onDateChange(article.published_at)

      if (!isTruncated) {
        this.setMetadata(article)
      } else {
        this.setMetadata()
      }
    }
  }

  render() {
    const {
      article,
      isMobile,
      isTruncated,
      isFirstArticle
    } = this.props
    const marginTop = isMobile ? '100px' : '200px'

    return (
      <Fragment>
        <Waypoint
          onEnter={(waypointData) => this.onEnter(waypointData)}
          topOffset="30px"
        >
          <div>
            <Article
              article={article}
              isTruncated={isTruncated}
              isMobile={isMobile}
              marginTop={isFirstArticle ? marginTop : null}
              onExpand={this.onExpand}
            />
          </div>
        </Waypoint>
      </Fragment>
    )
  }
}
