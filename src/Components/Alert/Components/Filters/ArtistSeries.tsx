import {
  Flex,
  Separator,
  Skeleton,
  SkeletonBox,
  SkeletonText,
} from "@artsy/palette"
import { QuickMultipleSelectAlertFilter } from "Components/Alert/Components/Filters/QuickMultipleSelectAlertFilter"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import type { ArtistSeriesOptionsQuery } from "__generated__/ArtistSeriesOptionsQuery.graphql"
import { compact } from "es-toolkit"
import { times } from "es-toolkit/compat"
import { type FC, Suspense } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"

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

export const ArtistSeries: FC<React.PropsWithChildren<unknown>> = () => {
  const { state } = useAlertContext()
  const artistIDs = state?.criteria?.artistIDs

  const data = useLazyLoadQuery<ArtistSeriesOptionsQuery>(
    artistSeriesOptionsQuery,
    {
      input: { artistIDs, aggregations: ["ARTIST_SERIES"] },
    },
  )
  const artistSeries = (data.artworksConnection?.aggregations || []).find(
    aggs => aggs?.slice === "ARTIST_SERIES",
  )

  const options = compact(
    (artistSeries?.counts ?? []).map(count => {
      if (!count) return null

      return {
        name: count.name,
        value: count.value,
      }
    }),
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

export const ArtistSeriesQueryRenderer: React.FC<
  React.PropsWithChildren<unknown>
> = props => {
  return (
    <Suspense fallback={<ArtistSeriesPlaceholder />}>
      <ArtistSeries {...props} />
    </Suspense>
  )
}

const ArtistSeriesPlaceholder: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
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
