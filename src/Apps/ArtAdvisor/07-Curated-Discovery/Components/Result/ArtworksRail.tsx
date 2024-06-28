import React, { FC, useEffect, useState } from "react"
import { Box, SkeletonBox } from "@artsy/palette"
import { Rail } from "Components/Rail/Rail"
import { BudgetIntent, State } from "Apps/ArtAdvisor/07-Curated-Discovery/App"
import { Artwork } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/Artwork"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { DiscoveryArtwork } from "Apps/ArtAdvisor/07-Curated-Discovery/types"

interface ArtworksRailProps {
  state: State
}

function getPriceRange(budgetIntent?: BudgetIntent) {
  let priceMinUSD = budgetIntent?.budget?.min
  let priceMaxUSD = budgetIntent?.budget?.max
  let numberOfArtworks = budgetIntent?.numberOfArtworks

  if (numberOfArtworks) {
    if (priceMinUSD) priceMinUSD = priceMinUSD / numberOfArtworks
    if (priceMaxUSD) priceMaxUSD = priceMaxUSD / numberOfArtworks
  }

  return { priceMinUSD, priceMaxUSD }
}

export const ArtworksRail: FC<ArtworksRailProps> = props => {
  const { state } = props
  const [artworks, setArtworks] = useState<DiscoveryArtwork[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [excludeArtworkIds, setExcludeArtworkIds] = useState<string[]>([])

  const { user } = useSystemContext()

  useEffect(() => {
    const fetchArtworks = async (options: {
      concepts: string[]
      excludeArtworkIds: string[]
    }) => {
      setIsLoading(true)

      const { concepts, excludeArtworkIds } = options
      const { priceMinUSD, priceMaxUSD } = getPriceRange(state.budgetIntent)

      const params = new URLSearchParams()

      if (priceMinUSD) params.append("priceMinUSD", priceMinUSD.toString())
      if (priceMaxUSD) params.append("priceMaxUSD", priceMaxUSD.toString())
      concepts.forEach(concept => {
        params.append("concepts", concept)
      })
      excludeArtworkIds.forEach(id => {
        params.append("excludeArtworkIds", id)
      })
      params.append("userId", user?.id || "")
      params.append("goal", state.goal)

      const response = await fetch(
        `/api/advisor/7/artworks?${params.toString()}`
      )
      const data = await response.json()
      setIsLoading(false)
      return data
    }

    const options = {
      concepts: [...state.interests, ...state.parsedInterests],
      userId: user?.id,
      excludeArtworkIds,
    }

    fetchArtworks(options).then(setArtworks)
  }, [
    state.interests,
    state.parsedInterests,
    state.goal,
    state.budgetIntent,
    excludeArtworkIds,
    user,
  ])

  return (
    <>
      {artworks.length ? (
        <Box opacity={isLoading ? 0.2 : 1}>
          <Rail
            title="We think you’ll be interested in these works"
            getItems={() => {
              return artworks.map((artwork: DiscoveryArtwork) => {
                return (
                  <Artwork
                    key={artwork.id}
                    artwork={artwork}
                    setExcludeArtworkIds={setExcludeArtworkIds}
                  />
                )
              })
            }}
          />
        </Box>
      ) : (
        <SkeletonBox height={500} />
      )}
    </>
  )
}
