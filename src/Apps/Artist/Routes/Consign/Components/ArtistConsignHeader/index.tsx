import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  Button,
  Column,
  GridColumns,
  Image,
  ResponsiveBox,
  Text,
} from "@artsy/palette"
import { SectionContainer } from "Apps/Artist/Routes/Consign/Components/SectionContainer"
import { getConsignSubmissionUrl } from "Apps/Artist/Routes/Consign/Components/Utils/getConsignSubmissionUrl"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import type { ArtistConsignHeader_artist$data } from "__generated__/ArtistConsignHeader_artist.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface ArtistConsignHeaderProps {
  artist: ArtistConsignHeader_artist$data
}

export const ArtistConsignHeader: React.FC<
  React.PropsWithChildren<ArtistConsignHeaderProps>
> = ({ artist }) => {
  const tracking = useTracking()

  const [leftArtwork, rightArtwork] = extractNodes(
    artist.targetSupply?.microfunnel?.artworksConnection,
  )

  return (
    <SectionContainer bg="black10">
      <GridColumns>
        <Column
          span={[12, 3, 4]}
          display={["none", "flex"]}
          alignItems="center"
          justifyContent="center"
        >
          {leftArtwork?.image?.cropped && (
            <ResponsiveBox
              aspectWidth={leftArtwork.image.cropped.width}
              aspectHeight={leftArtwork.image.cropped.height}
              maxWidth={leftArtwork.image.cropped.width}
            >
              <Image
                src={leftArtwork.image.cropped.src}
                srcSet={leftArtwork.image.cropped.srcSet}
                width="100%"
                height="100%"
                alt=""
                lazyLoad
              />
            </ResponsiveBox>
          )}
        </Column>

        <Column
          span={[12, 6, 4]}
          textAlign="center"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text as="h1" variant={["xl", "xxl"]}>
            Sell Works by <br />
            {artist.name}
          </Text>

          <Text as="h2" variant={["sm-display", "lg-display"]} mt={2} mb={4}>
            With Artsy's expert guidance, selling is simple
          </Text>

          <Button
            // @ts-ignore
            as={RouterLink}
            to={getConsignSubmissionUrl({
              contextPath: artist.href as string,
              subject: DeprecatedAnalyticsSchema.Subject.RequestPriceEstimate,
            })}
            onClick={() => {
              tracking.trackEvent({
                action_type: DeprecatedAnalyticsSchema.ActionType.Click,
                context_module:
                  DeprecatedAnalyticsSchema.ContextModule.SellWorksBy,
                flow: DeprecatedAnalyticsSchema.Flow.Consignments,
                subject: DeprecatedAnalyticsSchema.Subject.RequestPriceEstimate,
              })
            }}
          >
            Request a price estimate
          </Button>
        </Column>

        <Column
          span={[12, 3, 4]}
          display={["none", "flex"]}
          alignItems="center"
          justifyContent="center"
        >
          {rightArtwork?.image?.cropped && (
            <ResponsiveBox
              aspectWidth={rightArtwork.image.cropped.width}
              aspectHeight={rightArtwork.image.cropped.height}
              maxWidth={rightArtwork.image.cropped.width}
            >
              <Image
                src={rightArtwork.image.cropped.src}
                srcSet={rightArtwork.image.cropped.srcSet}
                width="100%"
                height="100%"
                alt=""
                lazyLoad
              />
            </ResponsiveBox>
          )}
        </Column>
      </GridColumns>
    </SectionContainer>
  )
}

export const ArtistConsignHeaderFragmentContainer = createFragmentContainer(
  ArtistConsignHeader,
  {
    artist: graphql`
      fragment ArtistConsignHeader_artist on Artist {
        name
        href
        targetSupply {
          microfunnel {
            artworksConnection {
              edges {
                node {
                  image {
                    cropped(width: 300, height: 300) {
                      width
                      height
                      src
                      srcSet
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  },
)
