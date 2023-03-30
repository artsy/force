import { compact } from "lodash"
import { useMemo } from "react"
import { RetrospectiveFollowsAndSaves_collection$data } from "__generated__/RetrospectiveFollowsAndSaves_collection.graphql"

interface UseRetrospectiveDataProps {
  me: RetrospectiveFollowsAndSaves_collection$data
}

export type RetrospectiveData = {
  topGenes: [string, number][]
  topMediums: [string, number][]
  topArtists: [string, number][]
  topRarities: [string, number][]
  genes: { name: string | null; slug: string }[]
  mediums: { internalID: string; name: string | null }[]
  rarities: { internalID: string; name: string | null }[]
  me: RetrospectiveFollowsAndSaves_collection$data
}

export const useRetrospectiveData = ({
  me,
}: UseRetrospectiveDataProps): RetrospectiveData => {
  const artistConnectionEdges = me.followsAndSaves?.artistsConnection?.edges
  const artworksConnectionEdges = me.followsAndSaves?.artworksConnection?.edges

  const genes = useMemo(() => {
    return compact(
      artistConnectionEdges?.flatMap(edge => edge?.node?.artist?.genes)
    )
  }, [artistConnectionEdges])

  const mediums = useMemo(() => {
    return compact(
      artworksConnectionEdges?.flatMap(
        edge => edge?.node?.mediumType?.filterGene
      )
    )
  }, [artworksConnectionEdges])

  const rarities = useMemo(() => {
    return compact(
      artworksConnectionEdges?.flatMap(edge => edge?.node?.attributionClass)
    )
  }, [artworksConnectionEdges])

  const topGenes = useMemo(() => {
    const geneCounts = compact(genes).reduce(
      (acc: Record<string, number>, gene) => {
        if (acc[gene.slug]) {
          acc[gene.slug]++
        } else {
          acc[gene.slug] = 1
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
  }, [genes])

  const topMediums = useMemo(() => {
    const mediumCounts = compact(mediums).reduce(
      (acc: Record<string, number>, medium) => {
        if (acc[medium.internalID]) {
          acc[medium.internalID]++
        } else {
          acc[medium.internalID] = 1
        }

        return acc
      },
      {}
    )

    const topFiveMediums = Object.entries(mediumCounts!)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    return topFiveMediums
  }, [mediums])

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
    const rarityCounts = compact(rarities).reduce(
      (acc: Record<string, number>, rarity) => {
        if (acc[rarity.internalID]) {
          acc[rarity.internalID]++
        } else {
          acc[rarity.internalID] = 1
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
  }, [rarities])

  return {
    topGenes,
    topMediums,
    topArtists,
    topRarities,
    genes,
    mediums,
    rarities,
    me,
  }
}
