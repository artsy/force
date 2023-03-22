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
import { AuctionResultMetaData } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultMetaData"
import { AuctionResultPrice } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultPrice"
import { AuctionResultTitleInfo } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultTitleInfo"
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
  const { artist, images, title, comparableAuctionResults } = auctionResult

  const results = extractNodes(comparableAuctionResults)
  const image = images?.larger?.resized

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

      <GridColumns gridRowGap={[2, 0]}>
        <Column span={4}>
          {image ? (
            <ResponsiveBox
              data-testid="artwork-lightbox-box"
              bg="black10"
              mx={[0, 2, 4]}
              maxWidth={MAX_DIMENSION}
              aspectWidth={image.width || 1}
              aspectHeight={image.height || 1}
            >
              <ArtworkLightboxPlaceholder
                src={image.src ?? ""}
                preload
                lazyLoad
              />
              <Image
                data-testid="artwork-lightbox-image"
                width="100%"
                height="100%"
                src={image.src}
                srcSet={image.srcSet}
                alt={title ?? ""}
                lazyLoad
                style={{ position: "relative", alignSelf: "center" }}
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
        </Column>

        <Column span={8}>
          <Box>
            <Join separator={<Spacer y={[2, 4]} />}>
              <AuctionResultTitleInfo auctionResult={auctionResult} />

              <AuctionResultPrice auctionResult={auctionResult} />

              <AuctionResultMetaData auctionResult={auctionResult} />
            </Join>
          </Box>
        </Column>
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
        artist {
          name
          slug
        }
        title
        images {
          larger {
            resized(height: 400, width: 400, version: "larger") {
              src
              srcSet
              height
              width
            }
          }
        }
        comparableAuctionResults(first: 6) @optionalField {
          edges {
            cursor
            node {
              ...ArtistAuctionResultItem_auctionResult
            }
          }
        }
        ...AuctionResultMetaData_auctionResult
        ...AuctionResultTitleInfo_auctionResult
        ...AuctionResultPrice_auctionResult
      }
    `,
  }
)
