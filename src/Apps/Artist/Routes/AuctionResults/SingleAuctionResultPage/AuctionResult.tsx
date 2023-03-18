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
  Join,
} from "@artsy/palette"
import { ArtistAuctionResultItemFragmentContainer } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResultItem"
import { AuctionResultMetaDataFragmentContainer } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultMetaData"
import { AuctionResultTitleInfoFragmentContainer } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultTitleInfo"
import { ArtworkLightboxPlaceholder } from "Apps/Artwork/Components/ArtworkLightboxPlaceholder"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { Media } from "Utils/Responsive"
import { AuctionResult_auctionResult$data } from "__generated__/AuctionResult_auctionResult.graphql"

export const MAX_DIMENSION = 400
interface AuctionResultProps {
  auctionResult: AuctionResult_auctionResult$data
}

export const AuctionResult: React.FC<AuctionResultProps> = ({
  auctionResult,
}) => {
  const {
    artist,
    images,
    title,
    estimate,
    comparableAuctionResults,
  } = auctionResult

  const results = extractNodes(comparableAuctionResults)

  return (
    <>
      <Flex py={[2, 1]} justifyContent="space-between" alignItems="center">
        <RouterLink
          textDecoration="none"
          to={`/artist/${artist?.slug}/auction-results`}
        >
          <Flex alignItems="center">
            <ChevronIcon height={14} width={14} direction="left" />
            <Media greaterThanOrEqual="sm">
              <Text variant="xs" pl={1}>
                Back to {artist?.name}
              </Text>
            </Media>
          </Flex>
        </RouterLink>
      </Flex>

      <GridColumns gridRowGap={[2, null]}>
        <Column span={4} mr={[0, 4]}>
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

        <Column span={4}>
          <Box>
            <Join separator={<Spacer y={[2, 4]} />}>
              <AuctionResultTitleInfoFragmentContainer
                auctionResultTitleInfo={auctionResult}
              />

              <Box>
                <Text variant="xs">Pre-sale Estimate</Text>
                <Text variant="lg-display">{estimate?.display}</Text>
                <Text variant="xs" color="black60">
                  {/* TODO: display USD price - check the design */}
                  {estimate?.display}
                </Text>
              </Box>
              <Box>
                <AuctionResultMetaDataFragmentContainer
                  auctionResultMetaData={auctionResult}
                />
              </Box>
            </Join>
          </Box>
        </Column>

        {/* this column is needed to make sure the right side of the pafe is always empty */}
        <Column span={4}></Column>
      </GridColumns>

      <Spacer y={[4, 6]} />

      <Text variant={["sm-display", "md"]} textAlign="left">
        Comparable Works
      </Text>

      <Spacer y={[2, 4]} />
      <Join separator={<Spacer y={2} />}>
        {results.map((result, index) => {
          return (
            <ArtistAuctionResultItemFragmentContainer
              key={index}
              auctionResult={result}
              filtersAtDefault={false}
            />
          )
        })}
      </Join>
    </>
  )
}

export const AuctionResultFragmentContainer = createFragmentContainer(
  AuctionResult,
  {
    auctionResult: graphql`
      fragment AuctionResult_auctionResult on AuctionResult {
        ...AuctionResultMetaData_auctionResult
        ...AuctionResultTitleInfo_auctionResult
        artist {
          slug
          name
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
        comparableAuctionResults(first: 6) @optionalField {
          edges {
            cursor
            node {
              ...ArtistAuctionResultItem_auctionResult
            }
          }
        }
      }
    `,
  }
)
