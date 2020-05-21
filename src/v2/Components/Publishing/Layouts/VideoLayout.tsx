import { Box } from "@artsy/palette"
import { getEditorialHref } from "v2/Components/Publishing/Constants"
import { DisplayAd } from "v2/Components/Publishing/Display/DisplayAd"
import { targetingData } from "v2/Components/Publishing/Display/DisplayTargeting"
import { Nav, NavContainer } from "v2/Components/Publishing/Nav/Nav"
import { ArticleCardsBlock } from "v2/Components/Publishing/RelatedArticles/ArticleCards/Block"
import { AdDimension, AdUnit, ArticleData } from "v2/Components/Publishing/Typings"
import { isEditorialSponsored } from "v2/Components/Publishing/utils/Sponsored"
import {
  VideoContainer,
  VideoPlayer,
} from "v2/Components/Publishing/Video/Player/VideoPlayer"
import { VideoAbout } from "v2/Components/Publishing/Video/VideoAbout"
import { VideoCover } from "v2/Components/Publishing/Video/VideoCover"
import React, { Component } from "react"
import track from "react-tracking"
import styled from "styled-components"
import Events from "v2/Utils/Events"

interface Props {
  article: ArticleData
  seriesArticle?: ArticleData
  relatedArticles?: any
  isMobile?: boolean
}

interface State {
  isPlaying: boolean
  hideCover: boolean
}

@track(
  props => {
    return {
      page: "Article",
      entity_type: "article",
      entity_id: props.article.id,
    }
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class VideoLayout extends Component<Props, State> {
  state = {
    isPlaying: false,
    hideCover: false,
  }

  playVideo = () => {
    this.setState({
      isPlaying: true,
      hideCover: true,
    })
  }

  onPlayToggle = isPlaying => {
    if (!isPlaying) {
      this.setState({
        isPlaying,
      })
      setTimeout(this.setHideCover.bind(this), 30000)
    } else {
      this.setState({
        isPlaying,
        hideCover: true,
      })
    }
  }

  setHideCover = () => {
    if (!this.state.isPlaying) {
      this.setState({
        hideCover: false,
      })
    }
  }

  render() {
    const { article, isMobile, relatedArticles } = this.props
    const { media, seriesArticle } = article
    const sponsor = seriesArticle ? seriesArticle.sponsor : article.sponsor
    const isSponsored = isEditorialSponsored(sponsor)
    const seriesLink =
      seriesArticle && getEditorialHref("series", seriesArticle.slug)
    const adDimension = isMobile
      ? AdDimension.Mobile_SponsoredSeriesLandingPageAndVideoPage_Bottom
      : AdDimension.Desktop_SponsoredSeriesLandingPageAndVideoPage_LeaderboardBottom

    return (
      <VideoLayoutContainer>
        <Nav transparent sponsor={sponsor} canFix={false} />
        <VideoPlayerContainer>
          {media.url && (
            <VideoPlayer
              url={media.url}
              title={media.title}
              forcePlay={this.state.isPlaying}
              notifyPlayToggle={this.onPlayToggle}
            />
          )}
          <VideoCover
            article={article}
            media={media}
            seriesTitle={seriesArticle && seriesArticle.title}
            seriesLink={seriesLink}
            playVideo={this.playVideo}
            hideCover={this.state.hideCover}
          />
        </VideoPlayerContainer>

        <Box px={20} maxWidth={1200} mx="auto">
          <Box pt={[40, 40, 60]}>
            <VideoAbout article={article} color="white" />
          </Box>

          {(relatedArticles || seriesArticle) && (
            <Box pt={[60, 60, 100]}>
              <ArticleCardsBlock {...this.props} color="white" />
            </Box>
          )}
        </Box>
        <DisplayAd
          adUnit={
            isMobile
              ? AdUnit.Mobile_SponsoredSeriesLandingPageAndVideoPage_Bottom
              : AdUnit.Desktop_SponsoredSeriesLandingPageAndVideoPage_LeaderboardBottom
          }
          adDimension={adDimension}
          targetingData={targetingData(
            article,
            isSponsored ? "sponsorfeature" : "video"
          )}
          isSeries
          articleSlug={article.slug}
        />
      </VideoLayoutContainer>
    )
  }
}

const VideoLayoutContainer = styled.div`
  background: black;
  color: white;
  margin: auto;

  ${NavContainer} {
    position: absolute;
    top: 0;
  }
`

const VideoPlayerContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  ${VideoContainer} {
    position: absolute;
    top: 0;
  }
`
