import * as React from "react"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { useSystemContext } from "v2/System"
import { graphql } from "react-relay"
import { chunk, shuffle } from "lodash"
import { ConsignTopArtistsQuery } from "v2/__generated__/ConsignTopArtistsQuery.graphql"
import { Text, EntityHeader, GridColumns, Column } from "@artsy/palette"
import { formatCentsToDollars } from "v2/Apps/Consign/Routes/MarketingLanding/Utils/formatCentsToDollars"

// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
type ArtworkProps = ConsignTopArtistsQuery["response"]["targetSupply"]["microfunnel"][0]["artworksConnection"]["edges"][0]["node"] & {
  realizedPriceAverage: string
}

export const ConsignTopArtists: React.FC = () => {
  return (
    <>
      <Text mb={2} variant="xl">
        Top Artists
      </Text>

      <ConsignTopArtistsQueryRenderer />
    </>
  )
}

const ConsignTopArtistsQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<ConsignTopArtistsQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query ConsignTopArtistsQuery {
          targetSupply {
            microfunnel {
              # Generally there aren't many artworks in a microfunnel; take
              # the first 10 and then average realized price below
              artworksConnection(first: 10) {
                edges {
                  node {
                    slug
                    internalID
                    href
                    artistNames
                    image {
                      imageURL
                    }

                    # FIXME: Need to average up all artist artworks
                    realizedPrice
                  }
                }
              }
            }
          }
        }
      `}
      render={({ props, error }) => {
        // FIXME: Error handling
        if (error) {
          return null
        }

        return <TopArtists {...props!} />
      }}
    />
  )
}

const TopArtists: React.FC<ConsignTopArtistsQuery["response"]> = props => {
  // FIXME: Add skeleton loading state
  if (!props.targetSupply) {
    return null
  }

  const microfunnelItems = props.targetSupply.microfunnel || []
  if (microfunnelItems.length === 0) {
    return null
  }

  // Iterate over microfunnel artworks and a) group into "chunks" of four for
  // displaying in rows; b) average each artwork realized price; c) shuffle the
  // display so that its a bit less static.
  const recentlySoldArtworks = chunk(
    shuffle(
      microfunnelItems.map(artwork => {
        if (artwork?.artworksConnection?.edges?.length === 0) {
          return null
        }

        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const { edges } = artwork.artworksConnection

        const realizedPriceAverage = formatCentsToDollars(
          100 *
            edges
              .map(artwork =>
                Number(
                  artwork.node.realizedPrice.replace("$", "").replace(",", "")
                )
              )
              .filter(maybeArtworkPrice => !!maybeArtworkPrice)
              .reduce((avgArtworkPrice, artworkPrice, _, artworkPrices) => {
                return avgArtworkPrice + artworkPrice / artworkPrices.length
              }, 0)
        )

        // For artist info, image, etc
        const firstNode = edges[0].node

        return {
          ...firstNode,
          realizedPriceAverage: realizedPriceAverage,
        }
      })
    ),
    4
  )

  return (
    <GridColumns>
      {recentlySoldArtworks.map((artworkSet, i) => {
        return (
          <React.Fragment key={i}>
            {artworkSet.map((recentlySoldArtwork: ArtworkProps, k) => {
              const {
                image,
                artistNames,
                realizedPriceAverage,
              } = recentlySoldArtwork

              const imageUrl = image.imageURL.replace(":version", "small")

              return (
                <Column key={k} span={[12, 4, 3, 2]}>
                  <EntityHeader
                    name={artistNames}
                    meta={`Average Sale Price: ${realizedPriceAverage}`}
                    image={{ src: imageUrl }}
                  />
                </Column>
              )
            })}
          </React.Fragment>
        )
      })}
    </GridColumns>
  )
}
