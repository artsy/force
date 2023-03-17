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
import { MetadataField } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSidebar/MyCollectionArtworkSidebarMetadata"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { Media } from "Utils/Responsive"
import { SingleAuctionResult_auctionResult$data } from "__generated__/SingleAuctionResult_auctionResult.graphql"

export const MAX_DIMENSION = 400
interface SingleAuctionResultProps {
  auctionResult: SingleAuctionResult_auctionResult$data
}

export const SingleAuctionResult: React.FC<SingleAuctionResultProps> = ({
  auctionResult,
}) => {
  const {
    artist,
    images,
    title,
    dateText,
    estimate,
    mediumText,
    dimensionText,
    saleDate,
    organization,
    location,
    saleTitle,
    lotNumber,
  } = auctionResult

  console.log("[LOGD] auctionResult = ", auctionResult)

  const artistSlug = artist?.slug || "banksy" // TODO: FOR TESTING

  return (
    <>
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

      <GridColumns gridRowGap={[2, null]}>
        <Column span={5} mr={[0, 4]}>
          <Box position="relative" bg="white100">
            {images?.thumbnail?.url ? (
              <ResponsiveBox
                data-testid="artwork-lightbox-box"
                bg="black10"
                mx={[0, 2, 4]}
                maxHeight={MAX_DIMENSION}
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
              <Flex maxWidth={["100%", MAX_DIMENSION]} mx="auto">
                <ResponsiveBox
                  data-testid="artwork-browser-no-image-box"
                  bg="black10"
                  mx={[0, 2, 4]}
                  maxWidth="100%"
                  aspectWidth={1}
                  aspectHeight={1}
                >
                  <ResponsiveBox
                    data-testid="artwork-browser-no-image-box"
                    bg="black10"
                    mx={[0, 2, 4]}
                    maxHeight={MAX_DIMENSION}
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
                </ResponsiveBox>
              </Flex>
            )}
          </Box>
        </Column>

        <Column span={7}>
          <Box>
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
            <Text variant="xs" color="black60">
              /Auction date/ - {organization}
            </Text>

            <Spacer x={[4, 2]} y={[4, 2]} />

            <Text variant="xs">Pre-sale Estimate</Text>
            <Text variant="lg-display">{estimate?.display}</Text>
            <Text variant="xs" color="black60">
              {estimate?.display}
            </Text>

            <Spacer x={[4, 2]} y={[4, 2]} />
            <>
              <MetadataField label="Medium" value={mediumText} />
              <MetadataField label="Dimensions" value={dimensionText} />
              <MetadataField label="Sale Date" value={saleDate} />
              <MetadataField label="Auction house" value={organization} />
              <MetadataField label="Sale location" value={location} />
              <MetadataField label="Sale name" value={saleTitle} />
              <MetadataField label="Lot" value={lotNumber} />
            </>
          </Box>
        </Column>
      </GridColumns>
    </>
  )
}

export const SingleAuctionResultFragmentContainer = createFragmentContainer(
  SingleAuctionResult,
  {
    auctionResult: graphql`
      fragment SingleAuctionResult_auctionResult on AuctionResult {
        internalID
        artistID
        artist {
          slug
          name
          href
          isPersonalArtist
          birthday
        }
        images {
          thumbnail {
            url(version: "large")
            height
            width
            aspectRatio
          }
        }
        title
        dateText
        estimate {
          display
          high
          low
        }
        mediumText
        dimensionText
        saleDate(format: "MMM DD, YYYY")
        organization
        location
        saleTitle
        lotNumber
        comparableAuctionResults(first: 5) {
          totalCount
        }
      }
    `,
  }
)
