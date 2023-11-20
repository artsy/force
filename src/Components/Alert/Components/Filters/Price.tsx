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
import { Price_aggregations$data } from "__generated__/Price_aggregations.graphql"

interface PriceProps {
  aggregations?: Price_aggregations$data | null
}

export const Price: React.FC<PriceProps> = ({ aggregations }) => {
  const { state, dispatch } = useAlertContext()

  const bars = aggregationsToHistogram(
    aggregations?.aggregations as Aggregations
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
  aggregations: graphql`
    fragment Price_aggregations on FilterArtworksConnection {
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

  const artistID = state.criteria.artistIDs?.[0]

  if (!artistID) return <Price />

  return (
    <SystemQueryRenderer<PriceAggregationsQuery>
      lazyLoad
      placeholder={<Price />}
      variables={{ artistID }}
      // TODO: use rootlevel artworks connection instead to fetch aggregations for all artists
      // https://github.com/artsy/force/pull/13158#discussion_r1399214348
      query={graphql`
        query PriceAggregationsQuery($artistID: String!) {
          artist(id: $artistID) {
            filterArtworksConnection(
              aggregations: [SIMPLE_PRICE_HISTOGRAM]
              first: 0
            ) {
              ...Price_aggregations
            }
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
        }

        const aggregations = props?.artist?.filterArtworksConnection

        return <PriceFragmentContainer aggregations={aggregations} />
      }}
    />
  )
}
