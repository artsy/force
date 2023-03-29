import { Box, Skeleton, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { RetrospectiveFollowsAndSaves_collection$data } from "__generated__/RetrospectiveFollowsAndSaves_collection.graphql"
import { RetrospectiveFollowsAndSavesQuery } from "__generated__/RetrospectiveFollowsAndSavesQuery.graphql"
import { useMemo } from "react"

interface RetrospectiveFollowsAndSavesProps {
  me: RetrospectiveFollowsAndSaves_collection$data
}

export const RetrospectiveFollowsAndSaves: React.FC<RetrospectiveFollowsAndSavesProps> = ({
  me,
}) => {
  const artistConnectionEdges = me.followsAndSaves?.artistsConnection?.edges
  const artworksConnectionEdges = me.followsAndSaves?.artworksConnection?.edges

  const topGenes = useMemo(() => {
    const genes = artistConnectionEdges?.flatMap(edge =>
      edge?.node?.artist?.genes?.map(gene => gene?.name)
    )

    const geneCounts = genes?.reduce((acc, gene) => {
      if (acc[gene]) {
        acc[gene]++
      } else {
        acc[gene] = 1
      }

      return acc
    }, {})

    //extract the top 5 genes
    const topFiveGenes = Object.entries(geneCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
    // .map(([gene]) => gene)

    return topFiveGenes
  }, [artistConnectionEdges])

  const topMediums = useMemo(() => {
    const mediums = artworksConnectionEdges?.flatMap(
      edge => edge?.node?.mediumType?.name
    )

    const mediumCounts = mediums?.reduce((acc, medium) => {
      if (acc[medium]) {
        acc[medium]++
      } else {
        acc[medium] = 1
      }

      return acc
    }, {})

    // extract the top 5 mediums
    const topFiveMediums = Object.entries(mediumCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
    // .map(([medium]) => medium)

    return topFiveMediums
  }, [artworksConnectionEdges])

  const topArtists = useMemo(() => {
    const artists = artworksConnectionEdges?.flatMap(
      edge => edge?.node?.artist?.name
    )

    const artistCounts = artists?.reduce((acc, artist) => {
      if (acc[artist]) {
        acc[artist]++
      } else {
        acc[artist] = 1
      }

      return acc
    }, {})

    // extract the top 5 artists
    const topFiveArtists = Object.entries(artistCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
    // .map(([artist]) => artist)

    return topFiveArtists
  }, [artistConnectionEdges])

  const topRarities = useMemo(() => {
    const rarities = artworksConnectionEdges?.flatMap(
      edge => edge?.node?.attributionClass?.name
    )

    const rarityCounts = rarities?.reduce((acc, rarity) => {
      // omit undefined values
      if (!rarity) {
        return acc
      }
      if (acc[rarity]) {
        acc[rarity]++
      } else {
        acc[rarity] = 1
      }

      return acc
    }, {})

    // extract the top 5 rarities
    const topFiveRarities = Object.entries(rarityCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
    // .map(([rarity]) => rarity)

    return topFiveRarities
  }, [artworksConnectionEdges])

  return (
    <Box>
      <Text variant="lg-display">Follows and Saves</Text>
      <pre>Top Mediums: {JSON.stringify(topMediums, null, 2)}</pre>
      <pre>Top Genes: {JSON.stringify(topGenes, null, 2)}</pre>
      <pre>Top Artists: {JSON.stringify(topArtists, null, 2)}</pre>
      <pre>Rarity: {JSON.stringify(topRarities, null, 2)}</pre>
    </Box>
  )
}

export const RetrospectiveFollowsAndSavesFragmentContainer = createFragmentContainer(
  RetrospectiveFollowsAndSaves,
  {
    me: graphql`
      fragment RetrospectiveFollowsAndSaves_collection on Me {
        followsAndSaves {
          artworksConnection(first: 100, page: 1, private: true) {
            totalCount
            edges {
              node {
                artist {
                  name
                }
                id
                attributionClass {
                  name
                }
                mediumType {
                  name
                }
              }
            }
          }
          artistsConnection(first: 100) {
            edges {
              node {
                artist {
                  name
                  genes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
  }
)

const PLACEHOLDER = (
  <Skeleton>
    <Text variant="lg-display">
      We don't have any data for you at this time
    </Text>
  </Skeleton>
)

export const RetrospectiveFollowsAndSavesQueryRenderer: React.FC = () => {
  return (
    <SystemQueryRenderer<RetrospectiveFollowsAndSavesQuery>
      query={graphql`
        query RetrospectiveFollowsAndSavesQuery {
          me {
            ...RetrospectiveFollowsAndSaves_collection
          }
        }
      `}
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return PLACEHOLDER
        }

        if (props.me) {
          return <RetrospectiveFollowsAndSavesFragmentContainer me={props.me} />
        }

        return null
      }}
    />
  )
}
