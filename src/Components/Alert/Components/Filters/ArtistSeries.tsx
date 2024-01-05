import { FC, Suspense } from "react"
import { QuickMultipleSelectAlertFilter } from "Components/Alert/Components/Filters/QuickMultipleSelectAlertFilter"
import { ArtistSeriesOptionsQuery } from "__generated__/ArtistSeriesOptionsQuery.graphql"
import { graphql, useLazyLoadQuery } from "react-relay"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import {
  Flex,
  Separator,
  Skeleton,
  SkeletonBox,
  SkeletonText,
} from "@artsy/palette"
import { compact, times } from "lodash"

const artistSeriesOptionsQuery = graphql`
  query ArtistSeriesOptionsQuery($input: FilterArtworksInput!) {
    artworksConnection(size: 0, input: $input) {
      aggregations {
        counts {
          count
          name
          value
        }
        slice
      }
    }
  }
`

export const ArtistSeries: FC = () => {
  const { state } = useAlertContext()
  const artistIDs = state?.criteria?.artistIDs

  const data = useLazyLoadQuery<ArtistSeriesOptionsQuery>(
    artistSeriesOptionsQuery,
    {
      input: { artistIDs, aggregations: ["ARTIST_SERIES"] },
    }
  )
  const artistSeries = (data.artworksConnection?.aggregations || []).find(
    aggs => aggs?.slice === "ARTIST_SERIES"
  )

  const options = compact(
    (artistSeries?.counts ?? []).map(count => {
      if (!count) return null

      return {
        name: count.name,
        value: count.value,
      }
    })
  )

  if (!options.length) return null

  return (
    <>
      <Separator my={2} />

      <QuickMultipleSelectAlertFilter
        label="Artist Series"
        // description="Optionally narrow down your alert to one or more of these series within this artist’s body of work"
        criteriaKey="artistSeriesIDs"
        options={options}
        truncate={8}
      />
    </>
  )
}

export const ArtistSeriesQueryRenderer: React.FC = props => {
  return (
    <Suspense fallback={<ArtistSeriesPlaceholder />}>
      <ArtistSeries {...props} />
    </Suspense>
  )
}

const ArtistSeriesPlaceholder: React.FC = () => {
  return (
    <Skeleton>
      <SkeletonText variant="xs" mb={2}>
        Artist Series
      </SkeletonText>

      <Flex mb={4}>
        {times(5).map(index => (
          <SkeletonBox
            key={`filter-${index}`}
            width={70}
            height={30}
            mr={1}
            mb={1}
          />
        ))}
      </Flex>
    </Skeleton>
  )
}
