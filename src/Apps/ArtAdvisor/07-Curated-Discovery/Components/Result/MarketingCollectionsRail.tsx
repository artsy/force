import { Box, SkeletonBox } from "@artsy/palette"
import { State } from "Apps/ArtAdvisor/07-Curated-Discovery/App"
import { MarketingCollection } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/MarketingCollection"
import { Rail } from "Components/Rail/Rail"
import { FC, useEffect, useState } from "react"

interface MarketingCollectionsRailProps {
  state: State
}

export interface DiscoveryMarketingCollections {
  id: string
  imageUrl: string
  slug: string
  title: string
}

export const MarketingCollectionsRail: FC<MarketingCollectionsRailProps> = ({
  state,
}) => {
  const [marketingCollections, setMarketingCollections] = useState<
    DiscoveryMarketingCollections[]
  >([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const params = new URLSearchParams()
    params.append("concepts", state.goal) //TODO: improve use of goal
    state.interests.forEach(concept => {
      params.append("concepts", concept)
    })

    const fetchMarketingCollections = async () => {
      const response = await fetch(
        `/api/advisor/7/marketing_collections?${params.toString()}`
      )
      const data = await response.json()
      setMarketingCollections(data)
      setIsLoading(false)
    }

    fetchMarketingCollections()
  }, [state.interests, state.goal])

  return (
    <>
      {marketingCollections.length ? (
        <Box opacity={isLoading ? 0.2 : 1}>
          <Rail
            title="Marketing Collections"
            getItems={() => {
              return marketingCollections.map(
                (marketingCollection: DiscoveryMarketingCollections) => {
                  return (
                    <MarketingCollection
                      key={marketingCollection.id}
                      marketingCollection={marketingCollection}
                    />
                  )
                }
              )
            }}
          />
        </Box>
      ) : (
        <SkeletonBox height={460} />
      )}
    </>
  )
}
