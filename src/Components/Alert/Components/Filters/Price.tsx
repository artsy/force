import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { Text } from "@artsy/palette"
import { PriceRange } from "Components/PriceRange/PriceRange"
import {
  CustomRange,
  DEFAULT_PRICE_RANGE,
} from "Components/PriceRange/constants"
import { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import { aggregationsToHistogram } from "Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { PriceAggregationsQuery } from "__generated__/PriceAggregationsQuery.graphql"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { createFragmentContainer, graphql } from "react-relay"
import { Price_artworksConnection$data } from "__generated__/Price_artworksConnection.graphql"

interface PriceProps {
  artworksConnection?: Price_artworksConnection$data | null
}

export const Price: React.FC<PriceProps> = ({ artworksConnection }) => {
  const { state, dispatch } = useAlertContext()

  const bars = aggregationsToHistogram(
    artworksConnection?.aggregations as Aggregations
  )

  const handlePriceRangeUpdate = (updatedValues: CustomRange) => {
    dispatch({
      type: "SET_CRITERIA_ATTRIBUTE",
      payload: { key: "priceRange", value: updatedValues.join("-") },
    })
  }

  return (
    <>
      <Text variant="sm-display" mb={2}>
        Price Range
      </Text>

      <PriceRange
        bars={bars}
        priceRange={state.criteria.priceRange || DEFAULT_PRICE_RANGE}
        onDebouncedUpdate={handlePriceRangeUpdate}
      />
    </>
  )
}

export const PriceFragmentContainer = createFragmentContainer(Price, {
  artworksConnection: graphql`
    fragment Price_artworksConnection on FilterArtworksConnection {
      aggregations {
        slice
        counts {
          name
          value
          count
        }
      }
    }
  `,
})

export const PriceQueryRenderer = () => {
  const { state } = useAlertContext()

  const artistIDs = state.criteria.artistIDs

  if (!artistIDs?.length) return <Price />

  return (
    <SystemQueryRenderer<PriceAggregationsQuery>
      lazyLoad
      placeholder={<Price />}
      variables={{ artistIDs }}
      query={graphql`
        query PriceAggregationsQuery($artistIDs: [String!]!) {
          artworksConnection(
            aggregations: [SIMPLE_PRICE_HISTOGRAM]
            artistIDs: $artistIDs
            first: 0
          ) {
            ...Price_artworksConnection
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
        }

        const artworksConnection = props?.artworksConnection

        return (
          <PriceFragmentContainer artworksConnection={artworksConnection} />
        )
      }}
    />
  )
}
