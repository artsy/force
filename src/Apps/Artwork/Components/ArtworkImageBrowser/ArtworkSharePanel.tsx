import {
  Box,
  BoxProps,
  Button,
  Clickable,
  Flex,
  Input,
  Separator,
  Text,
} from "@artsy/palette"
import * as React from "react"
import { useRef, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSharePanel_artwork$data } from "__generated__/ArtworkSharePanel_artwork.graphql"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"
import { RouterLink } from "System/Components/RouterLink"
import XIcon from "@artsy/icons/XIcon"
import FacebookIcon from "@artsy/icons/FacebookIcon"
import EnvelopeIcon from "@artsy/icons/EnvelopeIcon"
import TumblrIcon from "@artsy/icons/TumblrIcon"
import PinterestIcon from "@artsy/icons/PinterestIcon"

interface ArtworkSharePanelProps extends BoxProps {
  artwork: ArtworkSharePanel_artwork$data
}

export const ArtworkSharePanel: React.FC<ArtworkSharePanelProps> = ({
  artwork: { href, artworkMeta, images },
  ...rest
}) => {
  const [copyState, setCopyState] = useState({
    copyLabelText: "Copy",
    copyLocked: false,
  })

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleCopy = () => {
    if (!inputRef.current) return

    if (!copyState.copyLocked) {
      inputRef.current.focus()
      inputRef.current.setSelectionRange(0, inputRef.current.value.length)

      document.execCommand("copy")

      setCopyState({ copyLabelText: "Copied", copyLocked: true })

      setTimeout(() => {
        setCopyState({ copyLabelText: "Copy", copyLocked: false })
      }, 500)
    }
  }

  const openShareModal = ({ service, url }) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    // Extracted from https://github.com/artsy/force/blob/master/src/desktop/components/share/view.coffee#L19
    const wLeft = window.screenLeft || window.screenX
    const wTop = window.screenTop || window.screenY
    const width = 750
    const height = 400
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

  const share = artworkMeta?.share ?? ""
  const shareImageUrl = (images && images[0]?.url) ?? "https://www.artsy.net"
  const url = sd.APP_URL + href

  return (
    <Box width={300} {...rest}>
      <Text variant="lg-display">Share</Text>

      <Flex alignItems="center">
        <Input
          ref={inputRef}
          readOnly
          type="text"
          value={url}
          style={{ textOverflow: "ellipsis" }}
        />

        <Button
          ml={2}
          size="small"
          variant="secondaryBlack"
          onClick={handleCopy}
        >
          {copyState.copyLabelText}
        </Button>
      </Flex>

      <Separator my={2} />

      <Flex flexDirection="row" flexWrap="wrap">
        <ShareButton
          onClick={openShareModal}
          service="facebook"
          label="Facebook"
          message="Post to Facebook"
          url={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        />

        <ShareButton
          onClick={openShareModal}
          service="x"
          label="X"
          message="Share on X"
          url={`https://twitter.com/intent/post?original_referer=${url}&text=${share}&url=${url}&via=artsy`}
        />

        <RouterLink
          display="flex"
          alignItems="center"
          flexBasis="50%"
          textDecoration="none"
          py={0.5}
          to={`mailto:?subject=${share}&body=${share} on Artsy: ${url}`}
        >
          <Flex
            width={20}
            height={20}
            alignItems="center"
            justifyContent="center"
            mr={1}
          >
            <EnvelopeIcon />
          </Flex>

          <Text variant="xs" lineHeight={1}>
            Mail
          </Text>
        </RouterLink>

        <ShareButton
          onClick={openShareModal}
          service="pinterest"
          label="Pinterest"
          message="Pin It on Pinterest"
          url={`https://pinterest.com/pin/create/button/?url=${url}&media=${shareImageUrl}&description=${share}`}
        />

        <ShareButton
          onClick={openShareModal}
          service="tumblr"
          label="Tumblr"
          message=""
          url={`https://www.tumblr.com/share/photo?source=${shareImageUrl}&caption=${share}&clickthru=${url}`}
        />
      </Flex>
    </Box>
  )
}

export const ArtworkSharePanelFragmentContainer = createFragmentContainer(
  ArtworkSharePanel,
  {
    artwork: graphql`
      fragment ArtworkSharePanel_artwork on Artwork
        @argumentDefinitions(
          includeAllImages: { type: "Boolean", defaultValue: false }
        ) {
        href
        images(includeAll: $includeAllImages) {
          url
        }
        artworkMeta: meta {
          share
        }
      }
    `,
  }
)

const ICONS = {
  facebook: (
    <FacebookIcon
      // @ts-ignore
      fill="currentColor"
    />
  ),
  x: (
    <XIcon
      // @ts-ignore
      fill="currentColor"
    />
  ),
  pinterest: (
    <PinterestIcon
      // @ts-ignore
      fill="currentColor"
    />
  ),
  tumblr: (
    <TumblrIcon
      // @ts-ignore
      fill="currentColor"
    />
  ),
}

const ShareButton: React.FC<{
  service: string
  label: string
  message: string
  url: string
  onClick({
    service,
    url,
  }: {
    service: string
    url: string
  }): (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}> = ({ service, label, message, url, onClick, ...rest }) => {
  return (
    <Clickable
      display="flex"
      alignItems="center"
      flexBasis="50%"
      py={0.5}
      onClick={onClick({ service, url })}
      aria-label={`Share on ${service}`}
      {...rest}
    >
      {/* Icons are consistently sized */}
      <Flex
        width={20}
        height={20}
        alignItems="center"
        justifyContent="center"
        mr={1}
      >
        {ICONS[service]}
      </Flex>

      <Text variant="xs" lineHeight={1}>
        {label}
      </Text>
    </Clickable>
  )
}
