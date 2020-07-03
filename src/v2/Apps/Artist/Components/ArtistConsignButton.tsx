import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtistConsignButton_artist } from "v2/__generated__/ArtistConsignButton_artist.graphql"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { Media } from "v2/Utils/Responsive"

import {
  BorderBox,
  Box,
  Button,
  Flex,
  Image,
  Sans,
  color,
} from "@artsy/palette"
import { AnalyticsSchema, useTracking } from "v2/Artsy"

export interface ArtistConsignButtonProps {
  artist: ArtistConsignButton_artist
}

export const ArtistConsignButton: React.FC<ArtistConsignButtonProps> = ({
  artist,
}) => {
  const tracking = useTracking()

  const trackGetStartedClick = ({ destinationPath }) => {
    tracking.trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      context_page: AnalyticsSchema.PageName.ArtistPage,
      context_page_owner_id: artist.internalID,
      context_page_owner_slug: artist.slug,
      context_page_owner_type: AnalyticsSchema.OwnerType.Artist,
      context_module: AnalyticsSchema.ContextModule.ArtistConsignment,
      subject: AnalyticsSchema.Subject.GetStarted,
      destination_path: destinationPath,
    })
  }

  const props = { artist, trackGetStartedClick }

  return (
    <>
      <Media at="xs">
        <ArtistConsignButtonSmall {...props} />
      </Media>
      <Media greaterThan="xs">
        <ArtistConsignButtonLarge {...props} />
      </Media>
    </>
  )
}

interface Tracking {
  trackGetStartedClick: (props: { destinationPath: string }) => void
}

export const ArtistConsignButtonLarge: React.FC<
  ArtistConsignButtonProps & Tracking
> = props => {
  const { showImage, imageURL, headline, consignURL } = getData(props)

  return (
    <RouterLink
      to={consignURL}
      style={{
        textDecoration: "none",
      }}
      onClick={() => {
        props.trackGetStartedClick({
          destinationPath: consignURL,
        })
      }}
    >
      <BorderBox width="100%" p={1}>
        <Flex alignItems="center" width="100%" justifyContent="space-between">
          <Flex>
            {showImage && (
              <Image
                src={imageURL}
                alt={headline}
                width={50}
                height={50}
                mr={1}
              />
            )}
            <Flex flexDirection="column" justifyContent="center">
              <Sans size="3t" weight="medium">
                {headline}
              </Sans>
              <Box position="relative">
                <Sans size="3t" color={color("black60")}>
                  Consign with Artsy
                </Sans>
              </Box>
            </Flex>
          </Flex>
          <Box>
            <Button variant="secondaryGray">Get started</Button>
          </Box>
        </Flex>
      </BorderBox>
    </RouterLink>
  )
}

export const ArtistConsignButtonSmall: React.FC<
  ArtistConsignButtonProps & Tracking
> = props => {
  const { showImage, imageURL, headline, consignURL } = getData(props)

  return (
    <RouterLink
      to={consignURL}
      style={{
        textDecoration: "none",
      }}
      onClick={() => {
        props.trackGetStartedClick({
          destinationPath: consignURL,
        })
      }}
    >
      <BorderBox p={1}>
        <Flex alignItems="center">
          {showImage && <Image src={imageURL} alt={headline} mr={2} />}
          <Flex flexDirection="column" justifyContent="center">
            <Sans size="3t" weight="medium">
              {headline}
            </Sans>
            <Box top="-2px" position="relative">
              <Sans size="3t" color={color("black60")}>
                Consign with Artsy
              </Sans>
            </Box>
            <Box>
              <Button size="small" variant="secondaryGray">
                Get started
              </Button>
            </Box>
          </Flex>
        </Flex>
      </BorderBox>
    </RouterLink>
  )
}

function getData(props) {
  const {
    artist: {
      targetSupply: { isInMicrofunnel, isTargetSupply },
      href,
      name,
      image,
    },
  } = props
  const imageURL = image?.cropped?.url
  const showImage = imageURL && (isInMicrofunnel || isTargetSupply)
  const headline = isInMicrofunnel
    ? `Sell your ${name}`
    : "Sell art from your collection"
  const consignURL = isInMicrofunnel ? `${href}/consign` : "/consign"

  return {
    showImage,
    imageURL,
    headline,
    consignURL,
  }
}

export const ArtistConsignButtonFragmentContainer = createFragmentContainer(
  ArtistConsignButton,
  {
    artist: graphql`
      fragment ArtistConsignButton_artist on Artist {
        targetSupply {
          isInMicrofunnel
          isTargetSupply
        }

        internalID
        slug
        name
        href
        image {
          cropped(width: 66, height: 66) {
            url
          }
        }
      }
    `,
  }
)
