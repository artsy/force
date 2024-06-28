import { Box, SkeletonBox } from "@artsy/palette"
import { State } from "Apps/ArtAdvisor/07-Curated-Discovery/App"
import { MarketingCollection } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/MarketingCollection"
import { DiscoveryMarketingCollection } from "Apps/ArtAdvisor/07-Curated-Discovery/types"
import { Rail } from "Components/Rail/Rail"
import { FC, useEffect, useState } from "react"

interface MarketingCollectionsRailProps {
  state: State
}

export const MarketingCollectionsRail: FC<MarketingCollectionsRailProps> = ({
  state,
}) => {
  const [marketingCollections, setMarketingCollections] = useState<
    DiscoveryMarketingCollection[]
  >([])

  useEffect(() => {
    const params = new URLSearchParams()
    params.append("concepts", state.goal) //TODO: improve use of goal
    state.interests.forEach(concept => {
      params.append("concepts", concept)
    })
    state.parsedInterests.forEach(concept => {
      params.append("concepts", concept)
    })

    const fetchMarketingCollections = async () => {
      const response = await fetch(
        `/api/advisor/7/marketing_collections?${params.toString()}`
      )
      const data = await response.json()
      setMarketingCollections(data)
    }

    fetchMarketingCollections()
  }, [state.interests, state.parsedInterests, state.goal])

  return (
    <>
      {marketingCollections.length ? (
        <Box>
          <Rail
            title="And these collections"
            getItems={() => {
              return marketingCollections.map(
                (marketingCollection: DiscoveryMarketingCollection) => {
                  return (
                    <MarketingCollection
                      key={marketingCollection.internalID}
                      marketingCollection={marketingCollection}
                    />
                  )
                }
              )
            }}
          />
        </Box>
      ) : (
        <SkeletonBox height={445} />
      )}
    </>
  )
}
