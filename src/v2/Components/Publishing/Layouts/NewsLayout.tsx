import { color } from "@artsy/palette"
import { unica } from "v2/Assets/Fonts"
import { targetingData } from "v2/Components/Publishing/Display/DisplayTargeting"
import { once } from "lodash"
import React, { Component } from "react"
import track, { TrackingProp } from "react-tracking"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { DisplayAd } from "../Display/DisplayAd"
import { NewsHeadline } from "../News/NewsHeadline"
import { NewsSections } from "../News/NewsSections"
import {
  AdDimension,
  AdUnit,
  ArticleData,
  RelatedArticleCanvasData,
} from "../Typings"
import { CanvasFooter, CanvasFooterContainer } from "./Components/CanvasFooter"

interface Props {
  article: ArticleData
  articleSerial?: number
  isMobile?: boolean
  isHovered?: boolean
  isTruncated?: boolean
  onExpand?: () => void
  relatedArticlesForCanvas?: RelatedArticleCanvasData[]
  showCollectionsRail?: boolean
  tracking?: TrackingProp
  shouldAdRender?: boolean
}

interface State {
  isTruncated: boolean
  isHovered: boolean
}

interface NewsContainerProps {
  isTruncated: boolean
  marginTop?: string
  isHovered: boolean
}

@track()
export class NewsLayout extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isTruncated: this.props.isTruncated || false,
      isHovered: this.props.isHovered || false,
    }

    this.onExpand = this.onExpand.bind(this)
    this.trackExpand = once(this.trackExpand)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isHovered !== this.props.isHovered) {
      this.setState({ isHovered: nextProps.isHovered })
    }
  }

  onExpand() {
    const { onExpand } = this.props
    this.trackExpand()
    if (onExpand) {
      onExpand()
    }
    this.setState({ isTruncated: false })
  }

  trackExpand = () => {
    const { article, tracking } = this.props
    if (tracking) {
      tracking.trackEvent({
        action: "Clicked read more",
        pathname: `/news/${article.slug}`,
      })
    }
  }
  /**
   * Ad unit code "Mobile/Desktop_InContentLB1" is for ads that appear after the 3rd article,
   * "<Mobile/Desktop_InContentLB2" for ads that appear after the 9th article,
   * and Mobile/Desktop_InContentLBRepeat is for all subsequent ads
   */
  getAdUnit() {
    const { articleSerial, isMobile } = this.props

    if (articleSerial === 3) {
      return isMobile
        ? AdUnit.Mobile_NewsLanding_InContent1
        : AdUnit.Desktop_NewsLanding_Leaderboard1
    }
    if (articleSerial === 9) {
      return isMobile
        ? AdUnit.Mobile_NewsLanding_InContent2
        : AdUnit.Desktop_NewsLanding_Leaderboard2
    }
    return isMobile
      ? AdUnit.Mobile_NewsLanding_InContent3
      : AdUnit.Desktop_NewsLanding_LeaderboardRepeat
  }

  renderFooterContent() {
    const {
      isMobile,
      article,
      relatedArticlesForCanvas,
      showCollectionsRail,
      shouldAdRender,
    } = this.props
    const adUnit = this.getAdUnit()
    const adDimension = isMobile
      ? AdDimension.Mobile_NewsLanding_InContent1
      : AdDimension.Desktop_NewsLanding_Leaderboard1

    return (
      <>
        {shouldAdRender && (
          <DisplayAd
            adUnit={adUnit}
            adDimension={adDimension}
            targetingData={targetingData(article, "newslanding")}
            articleSlug={article.slug}
          />
        )}
        {relatedArticlesForCanvas && (
          <CanvasFooter
            article={article}
            relatedArticles={relatedArticlesForCanvas}
            showCollectionsRail={showCollectionsRail}
          />
        )}
      </>
    )
  }

  render() {
    const { article, isMobile } = this.props
    const { isTruncated, isHovered } = this.state

    return (
      <NewsContainer>
        <NewsArticleContainer
          isTruncated={isTruncated}
          isHovered={isHovered}
          onClick={() => {
            if (isTruncated) {
              this.onExpand()
            }
          }}
          onMouseEnter={() => {
            if (!isMobile) {
              this.setState({ isHovered: true })
            }
          }}
          onMouseLeave={() => {
            if (!isMobile) {
              this.setState({ isHovered: false })
            }
          }}
        >
          <NewsHeadline article={article} />
          <NewsSections {...this.props} isTruncated={isTruncated} />
          <ExpandButton
            isHovered={isHovered}
            isTruncated={isTruncated}
            onClick={this.onExpand}
          >
            Expand
          </ExpandButton>
        </NewsArticleContainer>

        {this.renderFooterContent()}
      </NewsContainer>
    )
  }
}
const NewsContainer = styled.div`
  ${CanvasFooterContainer} {
    border-bottom: 1px solid ${color("black10")};
  }
`

export const ExpandButton = styled.button`
  width: 80px;
  height: 30px;
  background-color: black;
  position: absolute;
  bottom: 30px;
  right: 30px;
  color: white;
  border-radius: 2px;
  border: none;
  display: block;
  opacity: 0;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.25s ease;
  ${unica("s14", "medium")};
  line-height: 1em;

  &:focus {
    outline: 0;
  }

  &:hover {
    color: ${color("black10")};
  }

  ${(props: NewsContainerProps) =>
    props.isHovered &&
    props.isTruncated &&
    `
      opacity: 1;
    `};

  ${pMedia.sm`
    bottom: 15px;
    right: 15px;
  `};
`

export const NewsArticleContainer = styled.div`
  position: relative;
  max-width: 780px;
  padding: 20px 30px 30px;
  margin: 40px auto;
  transition: all 0.25s ease;
  border: 1px solid transparent;

  ${(props: NewsContainerProps) =>
    props.marginTop &&
    `
    margin-top: ${props.marginTop};
  `};

  ${(props: NewsContainerProps) =>
    props.isTruncated &&
    props.isHovered &&
    `
    border-radius: 4px;
    border: 1px solid ${color("black10")};
    cursor: pointer;
  `};

  ${pMedia.sm`
    margin: 40px 5px;
    padding: 10px 15px 20px;
    ${(props: NewsContainerProps) =>
      props.marginTop &&
      `
      margin-top: ${props.marginTop};
    `};
  `};
`
