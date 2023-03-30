import { compact } from "lodash"
import { useMemo } from "react"
import { RetrospectiveFollowsAndSaves_collection$data } from "__generated__/RetrospectiveFollowsAndSaves_collection.graphql"

interface UseRetrospectiveDataProps {
  me: RetrospectiveFollowsAndSaves_collection$data
}

export const useRetrospectiveData = ({ me }: UseRetrospectiveDataProps) => {
  const artistConnectionEdges = me.followsAndSaves?.artistsConnection?.edges
  const artworksConnectionEdges = me.followsAndSaves?.artworksConnection?.edges

  const topGenes = useMemo(() => {
    const genes = artistConnectionEdges?.flatMap(edge =>
      edge?.node?.artist?.genes?.map(gene => gene?.slug)
    )

    const geneCounts = compact(genes).reduce(
      (acc: Record<string, number>, gene) => {
        if (acc[gene]) {
          acc[gene]++
        } else {
          acc[gene] = 1
        }

        return acc
      },
      {}
    )

    // extract the top 5 genes
    const topFiveGenes = Object.entries(geneCounts!)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    return topFiveGenes
  }, [artistConnectionEdges])

  const topMediums = useMemo(() => {
    const mediums = artworksConnectionEdges?.flatMap(
      edge => edge?.node?.mediumType?.name
    )

    const mediumCounts = compact(mediums).reduce(
      (acc: Record<string, number>, medium) => {
        if (acc[medium]) {
          acc[medium]++
        } else {
          acc[medium] = 1
        }

        return acc
      },
      {}
    )

    // extract the top 5 mediums
    const topFiveMediums = Object.entries(mediumCounts!)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    return topFiveMediums
  }, [artworksConnectionEdges])

  const topArtists = useMemo(() => {
    const artists = artworksConnectionEdges?.flatMap(
      edge => edge?.node?.artist?.slug
    )

    const artistCounts = compact(artists).reduce(
      (acc: Record<string, number>, artist) => {
        if (acc[artist]) {
          acc[artist]++
        } else {
          acc[artist] = 1
        }

        return acc
      },
      {}
    )

    // extract the top 5 artists
    const topFiveArtists = Object.entries(artistCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    return topFiveArtists
  }, [artworksConnectionEdges])

  const topRarities = useMemo(() => {
    const rarities = artworksConnectionEdges?.flatMap(
      edge => edge?.node?.attributionClass?.name
    )

    const rarityCounts = compact(rarities).reduce(
      (acc: Record<string, number>, rarity) => {
        if (acc[rarity]) {
          acc[rarity]++
        } else {
          acc[rarity] = 1
        }

        return acc
      },
      {}
    )

    // extract the top 5 rarities
    const topFiveRarities = Object.entries(rarityCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    return topFiveRarities
  }, [artworksConnectionEdges])

  return {
    topGenes,
    topMediums,
    topArtists,
    topRarities,
  }
}
