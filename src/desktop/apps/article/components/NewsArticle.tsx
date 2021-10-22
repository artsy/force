import { Component, Fragment } from "react";
import { Article } from "@artsy/reaction/dist/Components/Publishing/Article"
import Waypoint from "react-waypoint"
import type {
  ArticleData,
  RelatedArticleCanvasData,
} from "@artsy/reaction/dist/Components/Publishing/Typings"

interface Props {
  article: ArticleData
  isActive: boolean
  isMobile: boolean
  isEigen?: boolean
  isTruncated: boolean
  nextArticle: ArticleData
  onActiveArticleChange: (id: string) => void
  onDateChange: (date: string) => void
  relatedArticlesForCanvas?: RelatedArticleCanvasData[]
  shouldAdRender?: boolean
  articleSerial?: number
}

interface State {
  isTruncated: boolean
  bottomOffset: string
}

export class NewsArticle extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      isTruncated: props.isTruncated || false,
      bottomOffset: "200px",
    }
  }

  componentDidMount() {
    this.setState({
      bottomOffset: `${window.innerHeight / 2}px`,
    })
  }

  onExpand = () => {
    const { article } = this.props
    this.setMetadata(article)
    this.setState({
      isTruncated: false,
    })
  }

  setMetadata = (article: any = null) => {
    const id = article ? article.id : "news"
    const path = article ? `/news/${article.slug}` : "/news"
    document.title = article ? article.thumbnail_title : "News"
    window.history.replaceState({}, id, path)
  }

  onEnter = ({ previousPosition, currentPosition }) => {
    const {
      article,
      onActiveArticleChange,
      onDateChange,
      isMobile,
    } = this.props
    const { isTruncated } = this.state

    if (currentPosition === "inside") {
      if (previousPosition === "above") {
        article.published_at && onDateChange(article.published_at)
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
      onActiveArticleChange,
    } = this.props

    if (currentPosition === "above" && previousPosition === "inside") {
      if (nextArticle) {
        nextArticle.published_at && onDateChange(nextArticle.published_at)
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
      isEigen,
      isTruncated,
      relatedArticlesForCanvas,
      shouldAdRender,
      articleSerial,
    } = this.props
    const { bottomOffset } = this.state

    return (
      <Fragment>
        <Waypoint
          onEnter={waypointData => this.onEnter(waypointData)}
          onLeave={waypointData => this.onLeave(waypointData)}
          topOffset="-10px"
          bottomOffset={bottomOffset}
        >
          <div>
            <Article
              article={article}
              isTruncated={isTruncated}
              isMobile={isMobile}
              hideAuthModal={isEigen}
              onExpand={this.onExpand}
              isHovered={isMobile && isActive}
              relatedArticlesForCanvas={relatedArticlesForCanvas}
              shouldAdRender={shouldAdRender}
              articleSerial={articleSerial}
            />
          </div>
        </Waypoint>
      </Fragment>
    )
  }
}
