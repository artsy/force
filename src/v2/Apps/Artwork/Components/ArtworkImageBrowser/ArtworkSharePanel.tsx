import {
  Flex,
  Separator,
  Text,
  Input,
  Button,
  Clickable,
  FacebookIcon,
  TwitterIcon,
  EnvelopeIcon,
  Link,
  BoxProps,
  Box,
  PinterestIcon,
  TumblrIcon,
} from "@artsy/palette"
import { ArtworkSharePanel_artwork } from "v2/__generated__/ArtworkSharePanel_artwork.graphql"
import { useRef, useState } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"

interface ArtworkSharePanelProps extends BoxProps {
  artwork: ArtworkSharePanel_artwork
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
    <Box {...rest}>
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
          service="twitter"
          label="Twitter"
          message="Share on Twitter"
          url={`https://twitter.com/intent/tweet?original_referer=${url}&text=${share}&url=${url}&via=artsy`}
        />

        <Link
          display="flex"
          alignItems="center"
          flexBasis="50%"
          underlineBehavior="none"
          py={0.5}
          href={`mailto:?subject=${share}&body=${share} on Artsy: ${url}`}
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
        </Link>

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

const ICONS = {
  facebook: (
    <FacebookIcon
      // @ts-ignore
      fill="currentColor"
    />
  ),
  twitter: (
    <TwitterIcon
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
