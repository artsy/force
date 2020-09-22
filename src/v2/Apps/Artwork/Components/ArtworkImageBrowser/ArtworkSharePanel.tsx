import { Flex, Separator, Text, color, media } from "@artsy/palette"
import { ArtworkSharePanel_artwork } from "v2/__generated__/ArtworkSharePanel_artwork.graphql"
import Icon from "v2/Components/Icon"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { ArtworkPopoutPanel } from "./ArtworkPopoutPanel"

interface ArtworkSharePanelProps {
  artwork: ArtworkSharePanel_artwork
  onClose: () => void
}

interface ArtworkSharePanelState {
  copyLabelText: string
  copyLocked: boolean
}

const MODAL = {
  width: 750,
  height: 400,
}

const COPY_LABELS = {
  copy: "Copy",
  copied: "Copied",
}

export class ArtworkSharePanel extends React.Component<
  ArtworkSharePanelProps,
  ArtworkSharePanelState
> {
  private input: HTMLInputElement

  state = {
    copyLabelText: COPY_LABELS.copy,
    copyLocked: false,
  }

  handleCopy = () => {
    if (!this.state.copyLocked) {
      this.input.focus()
      this.input.setSelectionRange(0, this.input.value.length)
      document.execCommand("copy")

      this.setState(
        {
          copyLabelText: COPY_LABELS.copied,
          copyLocked: true,
        },
        () => {
          setTimeout(() => {
            this.setState({
              copyLabelText: COPY_LABELS.copy,
              copyLocked: false,
            })
          }, 500)
        }
      )
    }
  }

  openShareModal = ({ service, url }) => event => {
    event.preventDefault()

    // Extracted from https://github.com/artsy/force/blob/master/src/desktop/components/share/view.coffee#L19
    const wLeft = window.screenLeft || window.screenX
    const wTop = window.screenTop || window.screenY
    const width = MODAL.width
    const height = MODAL.height
    const left = wLeft + window.innerWidth / 2 - width / 2 || 0
    const top = wTop + window.innerHeight / 2 - height / 2 || 0

    const options = Object.entries({
      status: 1,
      width,
      height,
      top,
      left,
    })
      .map(([key, value]) => `${key}=${value}`)
      .join(",")

    window.open(url, service, options)
  }

  renderShareButton({ service, label, message, url }) {
    return (
      <ShareButtonContainer
        flexDirection="row"
        flexBasis="50%"
        mt={2}
        onClick={this.openShareModal({
          service,
          url,
        })}
      >
        <Icon name={service} color="black" />
        <Text variant="text" color="black60">
          {label}
        </Text>
      </ShareButtonContainer>
    )
  }

  render() {
    const {
      artwork: {
        href,
        artworkMeta: { share },
        images,
      },
    } = this.props

    const shareImageUrl = images && images[0].url
    const url = sd.APP_URL + href

    return (
      <ArtworkPopoutPanel title="Share" onClose={this.props.onClose}>
        <Flex flexDirection="row" mb={1}>
          <SansGrow variant="text" color="black60" mr={4}>
            <URLInput
              type="text"
              readOnly
              value={url}
              ref={input => (this.input = input)}
              onClick={this.handleCopy}
            />
          </SansGrow>
          <Text variant="mediumText" color="black60">
            {/* FIXME Remove lint ignore */}
            {/* eslint-disable-next-line  */}
            <a onClick={this.handleCopy}>{this.state.copyLabelText}</a>
          </Text>
        </Flex>
        <Separator />
        <Flex flexDirection="row" flexWrap="wrap">
          {this.renderShareButton({
            service: "facebook",
            label: "Facebook",
            message: "Post to Facebook",
            url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          })}
          {this.renderShareButton({
            service: "twitter",
            label: "Twitter",
            message: "Share on Twitter",
            url: `https://twitter.com/intent/tweet?original_referer=${url}&text=${share}&url=${url}&via=artsy`,
          })}

          {/*
              NOTE: Safari requires direct user interaction.
              See: https://developer.apple.com/safari/technology-preview/release-notes/#r15
            */}
          <Flex flexDirection="row" flexBasis="50%" mt={2}>
            <Icon name="mail" color="black" />
            <Text variant="text" color="black60">
              <UnstyledLink
                href={`mailto:?subject=${share}&body=${share} on Artsy: ${url}`}
              >
                Mail
              </UnstyledLink>
            </Text>
          </Flex>

          {this.renderShareButton({
            service: "pinterest",
            label: "Pinterest",
            message: "Pin It on Pinterest",
            url: `https://pinterest.com/pin/create/button/?url=${url}&media=${shareImageUrl}&description=${share}`,
          })}
          {this.renderShareButton({
            service: "tumblr",
            label: "Tumblr",
            message: "",
            url: `https://www.tumblr.com/share/photo?source=${shareImageUrl}&caption=${share}&clickthru=${url}`,
          })}
        </Flex>
      </ArtworkPopoutPanel>
    )
  }
}

export const ArtworkSharePanelFragmentContainer = createFragmentContainer(
  ArtworkSharePanel,
  {
    artwork: graphql`
      fragment ArtworkSharePanel_artwork on Artwork {
        href
        images {
          url
        }
        artworkMeta: meta {
          share
        }
      }
    `,
  }
)

const ShareButtonContainer = styled(Flex)`
  cursor: pointer;
`

const SansGrow = styled(Text)`
  display: flex;
  flex-grow: 1;
`

const URLInput = styled.input`
  border: 0;
  text-overflow: ellipsis;
  display: flex;
  flex-grow: 1;
  color: inherit;
  font-family: Arial, Helvetica, sans-serif;

  ${media.xs`
    font-size: 16px;
  `};

  &:hover {
    color: ${color("black100")};
  }

  &::selection {
    color: ${color("white100")};
    background: ${color("purple100")};
  }
`

const UnstyledLink = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`
