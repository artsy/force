import React from "react"
import sizeMe from "react-sizeme"
import track, { TrackingProp } from "react-tracking"
import styled from "styled-components"
import urlParser from "url"
import Events from "../../../Utils/Events"
import { resize } from "../../../Utils/resizer"
import { pMedia as breakpoint } from "../../Helpers"
import { SIZE_ME_REFRESH_RATE } from "../Constants"
import { ArticleLayout } from "../Typings"
import { Caption } from "./Caption"
import { VideoControls } from "./VideoControls"

const BLACKLIST = ["gif", "jpg", "jpeg", "png"]
const QUERYSTRING =
  "?title=0&portrait=0&badge=0&byline=0&showinfo=0&rel=0&controls=2&modestbranding=1&iv_load_policy=3&color=E5E5E5"
export const VIDEO_RATIO = 0.5625

interface VideoProps {
  color?: string
  section: {
    url: string
    caption?: string
    cover_image_url?: string
  }
  size?: any
  tracking?: TrackingProp
  trackingData?: any
  layout?: ArticleLayout
}

interface VideoState {
  src?: string // FIXME: Coming from Positron, this can be empty / invalid
  hidden: boolean
}

@track(
  props => {
    return props.trackingData ? props.trackingData : {}
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
class VideoComponent extends React.Component<VideoProps, VideoState> {
  static defaultProps = {
    size: {
      width: 500,
    },
    tracking: {
      trackEvent: x => x,
    },
  }

  constructor(props) {
    super(props)

    const { url } = this.props.section
    const isValid = url && isValidVideoUrl(url)

    if (isValid) {
      const parsedUrl = urlParser.parse(url, true)
      const playerUrl = getPlayerUrl(parsedUrl)
      const id = getId(parsedUrl)
      const playerSrc = playerUrl + id + QUERYSTRING

      this.state = {
        src: playerSrc,
        hidden: false,
      }
    } else {
      console.error(
        "(@artsy/reaction) Video.tsx: A url is required for video.",
        this.props
      )

      this.state = {
        hidden: true,
      }
    }
    this.playVideo = this.playVideo.bind(this)
  }

  trackVideoClick() {
    this.props.tracking.trackEvent({
      action: "Click",
      label: "Play video",
    })
  }

  playVideo() {
    const playerSrc = this.state.src + "&autoplay=1"
    this.setState({ src: playerSrc, hidden: true })
    this.trackVideoClick()
  }

  render() {
    const {
      color,
      layout,
      section: { caption, cover_image_url },
      size: { width },
    } = this.props
    const showCaption = layout !== "feature"

    return (
      <VideoContainer layout={layout} className="VideoContainer">
        {cover_image_url && (
          <CoverImage
            className="VideoCover"
            src={resize(cover_image_url, { width: 1200 })}
            height={width && width * VIDEO_RATIO}
            onClick={this.playVideo}
            hidden={this.state.hidden}
          >
            <VideoControls />
          </CoverImage>
        )}

        <IFrame
          src={this.state.src}
          frameBorder="0"
          allowFullScreen
          height={width && width * VIDEO_RATIO}
        />

        {showCaption && (
          <Caption caption={caption} layout={layout} color={color}>
            {this.props.children}
          </Caption>
        )}
      </VideoContainer>
    )
  }
}

// Utils
export function isValidVideoUrl(url: string) {
  const urlExtension = url && url.split(".").pop()
  const isValid = BLACKLIST.every(bad => urlExtension !== bad)
  return isValid
}

export function getPlayerUrl(url) {
  const { hostname } = url

  if (hostname) {
    if (hostname.indexOf("vimeo.com") > -1) {
      return "https://player.vimeo.com/video/"
    } else if (hostname.indexOf("youtu") > -1) {
      return "https://www.youtube.com/embed/"
    }
  } else {
    return "" // FIXME: check for errors
  }
}

function getId(url) {
  const { hostname, pathname } = url

  if (hostname && pathname) {
    if (url.hostname.indexOf("youtube.com") > 0) {
      return url.query.v
    } else {
      return url.pathname.split("/").pop()
    }
  } else {
    return "" // FIXME: error
  }
}

// Styles

export const IFrame = styled.iframe`
  width: 100%;
  height: ${props => (props.height ? `${props.height}px` : "100%")};
`

interface CoverImageProps {
  src?: string
  height?: number
  layout?: ArticleLayout
}

const VideoContainer = styled.div<CoverImageProps>`
  width: 100%;
  position: relative;

  ${p => {
    if (p.layout === "feature") {
      return `
        text-align: center;
        padding-bottom: 53px;
        max-width: 1200px;
        margin: 0 auto;
        ${breakpoint.md`
          height: 450px;
        `}

        ${breakpoint.xs`
          height: 300px;
          padding-bottom: 20px;
        `}
      `
    }
  }};
`

export const CoverImage = styled.div<CoverImageProps>`
  display: ${props => (props.hidden || !props.src ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${props => (props.height ? `${props.height}px` : "100%")};
  position: absolute;
  background: url(${props => props.src || ""}) no-repeat center center;
  background-size: cover;
  cursor: pointer;
`

const sizeMeOptions = {
  refreshRate: SIZE_ME_REFRESH_RATE,
  noPlaceholder: true,
}

export const Video = sizeMe(sizeMeOptions)(VideoComponent)
