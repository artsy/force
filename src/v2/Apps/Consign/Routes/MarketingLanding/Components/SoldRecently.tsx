import React from "react"
import { Flex, Spacer, Text } from "@artsy/palette"
import { QueryRenderer, createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { SoldRecentlyQuery } from "v2/__generated__/SoldRecentlyQuery.graphql"
import { SoldRecently_targetSupply } from "v2/__generated__/SoldRecently_targetSupply.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { Carousel } from "v2/Components/Carousel"
import { SectionContainer } from "./SectionContainer"
import { Media } from "v2/Utils/Responsive"
import { useTracking } from "react-tracking"
import { ContextModule, OwnerType, clickedArtworkGroup } from "@artsy/cohesion"
import { flatten, shuffle } from "lodash"

const HEIGHT = 300

interface SoldRecentlyProps {
  targetSupply: SoldRecently_targetSupply
}

const SoldRecently: React.FC<SoldRecentlyProps> = ({ targetSupply }) => {
  const tracking = useTracking()

  if (!targetSupply.microfunnel) {
    return null
  }

  const recentlySoldArtworks = shuffle(
    flatten(
      targetSupply.microfunnel.map(microfunnel => {
        // @ts-expect-error STRICT_NULL_CHECK
        const artworks = extractNodes(microfunnel.artworksConnection)
        return artworks.filter(
          artwork => artwork.realizedPrice && artwork.realizedToEstimate
        )
      })
    )
  )

  const trackArtworkItemClick = (artwork, horizontalSlidePosition) => () => {
    tracking.trackEvent(
      clickedArtworkGroup({
        artworkID: artwork.internalID,
        artworkSlug: artwork.slug,
        contextModule: ContextModule.artworkRecentlySoldGrid,
        contextPageOwnerType: OwnerType.consign,
        horizontalSlidePosition,
      })
    )
  }

  return (
    <SectionContainer>
      <Text mb={[3, 2]} variant="largeTitle">
        Sold recently on Artsy
      </Text>
      <Flex flexDirection="column">
        <Carousel arrowHeight={HEIGHT}>
          {recentlySoldArtworks.map((artwork, index) => {
            return (
              <Flex
                key={index}
                flexDirection="column"
                style={{ textAlign: "left" }}
              >
                <FillwidthItem
                  artwork={artwork}
                  hidePartnerName
                  hideSaleInfo
                  imageHeight={HEIGHT}
                  showExtended={false}
                  onClick={trackArtworkItemClick(artwork, index)}
                  // @ts-ignore TODO: Add to AuthContextModule
                  contextModule={ContextModule.artworkRecentlySoldGrid}
                />
                <>
                  <Media greaterThanOrEqual="sm">
                    <Flex flexDirection="row" alignItems="baseline">
                      <Text variant="largeTitle">{artwork.realizedPrice}</Text>
                      <Spacer ml={0.5} />
                      <Text variant="caption" color="black60">
                        Realized price
                      </Text>
                    </Flex>
                    <Flex flexDirection="row" alignItems="baseline">
                      <Text variant="caption" fontWeight="bold" color="#00A03E">
                        {artwork.realizedToEstimate + "x"}
                      </Text>
                      <Spacer ml={0.3} />
                      <Text variant="caption" color="black60">
                        estimate
                      </Text>
                    </Flex>
                  </Media>
                  <Media lessThan="sm">
                    <Flex flexDirection="column">
                      <Text variant="caption" color="black60" mt={0.5}>
                        Realized price
                      </Text>
                      <Text variant="largeTitle">{artwork.realizedPrice}</Text>
                      <Flex flexDirection="row" alignItems="baseline">
                        <Text
                          variant="caption"
                          fontWeight="bold"
                          color="#00A03E"
                        >
                          {artwork.realizedToEstimate + "x"}
                        </Text>
                        <Spacer ml={0.3} />
                        <Text variant="caption" color="black60">
                          estimate
                        </Text>
                      </Flex>
                    </Flex>
                  </Media>
                </>
              </Flex>
            )
          })}
        </Carousel>
      </Flex>
    </SectionContainer>
  )
}

const SoldRecentlyFragmentContainer = createFragmentContainer(SoldRecently, {
  targetSupply: graphql`
    fragment SoldRecently_targetSupply on TargetSupply {
      microfunnel {
        artworksConnection {
          edges {
            node {
              ...FillwidthItem_artwork
              realizedPrice
              realizedToEstimate
            }
          }
        }
      }
    }
  `,
})

export const SoldRecentlyQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()
  return (
    <QueryRenderer<SoldRecentlyQuery>
      //  @ts-expect-error STRICT_NULL_CHECK
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query SoldRecentlyQuery {
          targetSupply {
            ...SoldRecently_targetSupply
          }
        }
      `}
      render={({ props, error }) => {
        //FIXME: Error handling
        if (error) {
          return null
        }
        //FIXME: Add skeleton loading state
        if (!props) {
          return null
        }
        return (
          // @ts-expect-error STRICT_NULL_CHECK
          <SoldRecentlyFragmentContainer targetSupply={props.targetSupply} />
        )
      }}
    />
  )
}

export const tests = {
  SoldRecentlyFragmentContainer,
}
