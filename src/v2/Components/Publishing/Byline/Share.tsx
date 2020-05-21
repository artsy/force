import { Sans } from "@artsy/palette"
import React from "react"
import track, { TrackingProp } from "react-tracking"
import styled from "styled-components"
import Events from "../../../Utils/Events"
import { pMedia } from "../../Helpers"
import { IconSocialEmail } from "../Icon/IconSocialEmail"
import { IconSocialFacebook } from "../Icon/IconSocialFacebook"
import { IconSocialTwitter } from "../Icon/IconSocialTwitter"

interface Props extends React.HTMLProps<HTMLDivElement> {
  url: string
  title: string
  articleId?: string
  color?: string
  tracking?: TrackingProp
  trackingData?: any
  hasLabel?: boolean
  isMobile?: boolean
  isNews?: boolean
}

@track(
  props => {
    return props.trackingData ? props.trackingData : {}
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class Share extends React.Component<Props> {
  static defaultProps = {
    color: "black",
    hasLabel: false,
  }

  constructor(props) {
    super(props)
    this.getHref = this.getHref.bind(this)
    this.trackShare = this.trackShare.bind(this)
  }

  trackShare(e) {
    e.preventDefault()
    window.open(
      e.currentTarget.attributes.href.value,
      "Share",
      "width = 600,height = 300"
    )

    this.props.tracking.trackEvent({
      action: "Click",
      type: "share",
      label: (() => {
        const href = e.currentTarget.attributes.href.value
        if (href.match("facebook")) return "facebook"
        if (href.match("twitter")) return "twitter"
        if (href.match("mailto")) return "email"
      })(),
    })
  }

  getHref(type) {
    const { url, title } = this.props
    const encodedUrl = encodeURIComponent(url)
    const channels = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?original_referer=${encodedUrl}&text=${title}&url=${encodedUrl}&via=artsy`,
      email: `mailto:?subject=${title}&body=Check out ${title} on Artsy: ${url}`,
    }
    return channels[type]
  }

  getIcon = type => {
    const { color } = this.props

    const icon = service => {
      switch (service) {
        case "email": {
          return <IconSocialEmail color={color} />
        }
        case "facebook": {
          return <IconSocialFacebook color={color} />
        }
        case "twitter": {
          return <IconSocialTwitter color={color} />
        }
        default: {
          break
        }
      }
    }
    return (
      <IconWrapper
        href={this.getHref(type)}
        target="_blank"
        onClick={this.trackShare}
      >
        {icon(type)}
      </IconWrapper>
    )
  }

  render() {
    const { hasLabel, isMobile, isNews } = this.props

    return (
      <ShareContainer removeMarginForMobile={isNews && isMobile}>
        {hasLabel && (
          <ShareLabel size="3t" weight="medium">
            Share
          </ShareLabel>
        )}
        {this.getIcon("facebook")}
        {this.getIcon("twitter")}
        {this.getIcon("email")}
      </ShareContainer>
    )
  }
}

interface ShareContainerProps {
  removeMarginForMobile?: boolean
}

export const ShareContainer = styled.div.attrs<ShareContainerProps>({})`
  display: flex;
  align-items: center;
  white-space: nowrap;
  line-height: 1em;
  margin-top: 5px;
  ${props => props.removeMarginForMobile && pMedia.xs`margin-top: 15px;`};
`
const IconWrapper = styled.a`
  text-decoration: none;
  padding-left: 7px;
  padding-right: 7px;

  &:hover {
    opacity: 0.6;
  }

  &:first-child {
    padding-left: 0;
  }
`
const ShareLabel = styled(Sans)`
  margin: 5px 10px 5px 0;
`
