import React from "react"
import { Flex, Spacer, Text } from "@artsy/palette"
import { QueryRenderer, createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/Artsy"
import { SoldRecentlyQuery } from "v2/__generated__/SoldRecentlyQuery.graphql"
import { SoldRecently_targetSupply } from "v2/__generated__/SoldRecently_targetSupply.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { Carousel } from "v2/Components/Carousel"
import { SectionContainer } from "./SectionContainer"
import { Media } from "v2/Utils/Responsive"

const HEIGHT = 300

interface SoldRecentlyProps {
  targetSupply: SoldRecently_targetSupply
}

const SoldRecently: React.FC<SoldRecentlyProps> = ({ targetSupply }) => {
  if (!targetSupply.microfunnel) {
    return null
  }

  const recentlySoldArtworks = targetSupply.microfunnel.map(microfunnel => {
    return extractNodes(microfunnel.artworksConnection)
  })

  return (
    <SectionContainer>
      <Text mb={[3, 2]} variant="largeTitle">
        Sold recently on Artsy
      </Text>
      <Flex flexDirection="column">
        <Carousel arrowHeight={HEIGHT}>
          {recentlySoldArtworks.map(([artwork, _], key) => {
            return (
              <Flex
                key={key}
                flexDirection="column"
                style={{ textAlign: "left" }}
              >
                <FillwidthItem
                  artwork={artwork}
                  hidePartnerName
                  hideSaleInfo
                  imageHeight={HEIGHT}
                  showExtended={false}
                />
                {artwork.realizedPrice && (
                  <>
                    <Media greaterThanOrEqual="sm">
                      <Flex flexDirection="row" alignItems="baseline">
                        <Text variant="largeTitle">
                          {artwork.realizedPrice}
                        </Text>
                        <Spacer ml={0.5} />
                        <Text variant="caption" color="black60">
                          Realized price
                        </Text>
                      </Flex>
                    </Media>
                    <Media lessThan="sm">
                      <Flex flexDirection="column">
                        <Text variant="caption" color="black60">
                          Realized price
                        </Text>
                        <Text variant="largeTitle">
                          {artwork.realizedPrice}
                        </Text>
                      </Flex>
                    </Media>
                  </>
                )}
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
        artworksConnection(first: 1) {
          edges {
            node {
              ...FillwidthItem_artwork
              realizedPrice
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
          <SoldRecentlyFragmentContainer targetSupply={props.targetSupply} />
        )
      }}
    />
  )
}
