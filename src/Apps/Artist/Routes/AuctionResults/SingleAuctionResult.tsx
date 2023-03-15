import {
  Text,
  Box,
  Spacer,
  GridColumns,
  Column,
  Flex,
  ChevronIcon,
  ResponsiveBox,
  NoImageIcon,
  Image,
} from "@artsy/palette"
import { ArtworkLightboxPlaceholder } from "Apps/Artwork/Components/ArtworkLightboxPlaceholder"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { Media } from "Utils/Responsive"
import { SingleAuctionResult_auctionResult$data } from "__generated__/SingleAuctionResult_auctionResult.graphql"

interface SingleAuctionResultProps {
  auctionResult: SingleAuctionResult_auctionResult$data
}

export const SingleAuctionResult: React.FC<SingleAuctionResultProps> = ({
  auctionResult,
}) => {
  const { artist, dateText, title, images } = auctionResult
  console.log("[LOGD] auctionResult = ", auctionResult)

  const artistSlug = artist?.slug || "banksy" // TODO: FOR TESTING
  return (
    <Box>
      <Flex py={[2, 1]} justifyContent="space-between" alignItems="center">
        <RouterLink
          textDecoration="none"
          to={`/artist/${artistSlug}/auction-results`}
        >
          <Flex alignItems="center">
            <ChevronIcon height={14} width={14} direction="left" />
            <Media greaterThanOrEqual="sm">
              <Text variant="xs" pl={1}>
                Back to {artist?.name || "Banksy" /* TODO: FOR TESTING */}
              </Text>
            </Media>
          </Flex>
        </RouterLink>
      </Flex>

      <GridColumns gridRowGap={[2, null]} gridColumnGap={[0, 4]}>
        <Column span={8}>
          {images?.thumbnail?.url ? (
            <ResponsiveBox
              data-testid="artwork-lightbox-box"
              bg="black10"
              mx={[0, 2, 4]}
              // @ts-ignore
              maxWidth={images.thumbnail?.width || "100%"}
              aspectWidth={images.thumbnail?.width || 1}
              aspectHeight={images.thumbnail?.height || 1}
            >
              <ArtworkLightboxPlaceholder
                src={images.thumbnail?.url ?? ""}
                preload={true}
                lazyLoad={true}
              />
              <Image
                data-testid="artwork-lightbox-image"
                width="100%"
                height="100%"
                src={images.thumbnail?.url}
                alt={title ?? ""}
                lazyLoad={true}
                style={{ position: "relative" }}
              />
            </ResponsiveBox>
          ) : (
            <ResponsiveBox
              data-testid="artwork-browser-no-image-box"
              bg="black10"
              mx={[0, 2, 4]}
              maxWidth="100%"
              aspectWidth={1}
              aspectHeight={1}
            >
              <Flex
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                justifyContent="center"
                alignItems="center"
              >
                <NoImageIcon width="28px" height="28px" fill="black60" />
              </Flex>
            </ResponsiveBox>
          )}
        </Column>
        <Column span={4}>
          <>
            <Text as="h1" variant="lg-display">
              {artist?.isPersonalArtist ? (
                artist.name
              ) : (
                <RouterLink textDecoration="none" to={"artist!.href"}>
                  {artist?.name}
                </RouterLink>
              )}
            </Text>
            <Text as="h1" variant="lg-display" color="black60" mb={[0.5, 0]}>
              <i>{title?.trim()}</i>
              {dateText &&
                dateText.replace(/\s+/g, "").length > 0 &&
                ", " + dateText}
            </Text>

            <Spacer x={[4, 2]} y={[4, 2]} />
          </>
        </Column>
      </GridColumns>
    </Box>
  )
}

export const SingleAuctionResultFragmentContainer = createFragmentContainer(
  SingleAuctionResult,
  {
    auctionResult: graphql`
      fragment SingleAuctionResult_auctionResult on AuctionResult {
        artist {
          slug
          name
          href
          isPersonalArtist
          birthday
        }
        internalID
        artistID
        boughtIn
        currency
        categoryText
        dateText
        dimensions {
          height
          width
        }
        dimensionText
        estimate {
          display
          high
          low
        }
        images {
          thumbnail {
            url(version: "large")
            height
            width
            aspectRatio
          }
        }
        location
        mediumText
        organization
        performance {
          mid
        }
        currency
        priceRealized {
          cents
          centsUSD
          display
          displayUSD
        }
        saleDate
        saleTitle
        title
      }
    `,
  }
)
