import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSellWithArtsy_artist$data } from "__generated__/ArtistSellWithArtsy_artist.graphql"
import { ArtistSellWithArtsyQuery } from "__generated__/ArtistSellWithArtsyQuery.graphql"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  Box,
  Button,
  Column,
  FullBleed,
  GridColumns,
  Image,
  Text,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { RouterLink } from "System/Components/RouterLink"
import { useTracking } from "react-tracking"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import styled from "styled-components"

interface ArtistSellWithArtsyProps {
  artist?: ArtistSellWithArtsy_artist$data
}

const ArtistSellWithArtsy: FC<ArtistSellWithArtsyProps> = ({ artist }) => {
  const image = artist?.image?.resized?.src

  const href = artist?.targetSupply?.isInMicrofunnel
    ? `${artist?.href}/consign`
    : "/consign"

  const tracking = useTracking()

  const handleClick = () => {
    tracking.trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
      context_module: DeprecatedAnalyticsSchema.ContextModule.ArtistConsignment,
      context_page: DeprecatedAnalyticsSchema.PageName.ArtistPage,
      context_page_owner_id: artist?.internalID,
      context_page_owner_slug: artist?.slug,
      context_page_owner_type: DeprecatedAnalyticsSchema.OwnerType.Artist,
      destination_path: href,
      subject: DeprecatedAnalyticsSchema.Subject.GetStarted,
    })
  }

  return (
    <>
      <Container bg="black100" color="white100">
        {image && (
          <Box
            position="fixed"
            top={0}
            left={0}
            width="100%"
            height="100%"
            opacity={0.4}
            style={{
              filter: "blur(10px)",
              transform: "scale(1.1)",
              pointerEvents: "none",
            }}
          >
            <Image
              src={image}
              lazyLoad
              width="100%"
              height="100%"
              alt=""
              style={{
                objectFit: "cover",
              }}
            />
          </Box>
        )}

        <AppContainer
          position="relative"
          minHeight={360}
          py={4}
          display="flex"
          alignItems="center"
        >
          <HorizontalPadding>
            <GridColumns gridRowGap={[2, 4]}>
              <Column span={6} start={7}>
                <Text variant="xs" mb={2}>
                  Artsy Consignments
                </Text>

                <Text variant="lg-display" mb={2}>
                  Sell Works from Your Collection
                </Text>

                <Text variant="sm">
                  Get competitive offers from the world’s top auction houses and
                  galleries to take your works on consignment. It’s simple and
                  free to submit.
                </Text>
              </Column>

              <Column span={3} start={7}>
                <Button
                  variant="primaryWhite"
                  width="100%"
                  onClick={handleClick}
                  // @ts-ignore
                  as={RouterLink}
                  to={href}
                >
                  Submit Now
                </Button>
              </Column>
            </GridColumns>
          </HorizontalPadding>
        </AppContainer>
      </Container>
    </>
  )
}

const ArtistSellWithArtsyFragmentContainer = createFragmentContainer(
  ArtistSellWithArtsy,
  {
    artist: graphql`
      fragment ArtistSellWithArtsy_artist on Artist {
        internalID
        slug
        href
        targetSupply {
          isInMicrofunnel
        }
        image {
          resized(width: 640) {
            src
          }
        }
      }
    `,
  }
)

interface ArtistSellWithArtsyQueryRendererProps {
  slug: string
}

export const ArtistSellWithArtsyQueryRenderer: FC<ArtistSellWithArtsyQueryRendererProps> = ({
  slug,
}) => {
  return (
    <SystemQueryRenderer<ArtistSellWithArtsyQuery>
      lazyLoad
      placeholder={<ArtistSellWithArtsy />}
      variables={{ slug }}
      query={graphql`
        query ArtistSellWithArtsyQuery($slug: String!) {
          artist(id: $slug) {
            ...ArtistSellWithArtsy_artist
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.artist) {
          return <ArtistSellWithArtsy />
        }

        return <ArtistSellWithArtsyFragmentContainer artist={props.artist} />
      }}
    />
  )
}

const Container = styled(FullBleed)`
  overflow: hidden;
  clip-path: inset(0);
`
