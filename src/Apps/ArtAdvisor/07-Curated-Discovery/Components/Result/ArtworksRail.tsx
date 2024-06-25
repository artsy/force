import React, { FC, useEffect, useState } from "react"
import { Box, SkeletonBox, Text } from "@artsy/palette"
import { Rail } from "Components/Rail/Rail"
import { State } from "Apps/ArtAdvisor/07-Curated-Discovery/App"
import { Artwork } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/Artwork"

interface ArtworksRailProps {
  state: State
}

export type DiscoveryArtwork = {
  id: string
  internalID: string
  slug: string
  title: string
  date: string
  rarity: string
  medium: string
  materials: string
  price: string
  dimensions: string
  imageUrl: string
}

export const ArtworksRail: FC<ArtworksRailProps> = props => {
  const { state } = props
  const [artworks, setArtworks] = useState<DiscoveryArtwork[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const params = new URLSearchParams()
    state.interests.forEach(concept => {
      params.append("concepts", concept)
    })

    const fetchArtworks = async () => {
      const response = await fetch(
        `/api/advisor/7/artworks?${params.toString()}`
      )
      const data = await response.json()
      setArtworks(data)
      setIsLoading(false)
    }

    fetchArtworks()
  }, [state.interests, state.goal, state.budgetIntent])

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <>
      {artworks.length ? (
        <Box opacity={isLoading ? 0.2 : 1}>
          <Rail
            title="Artworks"
            getItems={() => {
              return artworks.map((artwork: DiscoveryArtwork) => {
                return <Artwork key={artwork.id} artwork={artwork} />
              })
            }}
          />
        </Box>
      ) : (
        <SkeletonBox height={460} />
      )}
    </>
  )
}
