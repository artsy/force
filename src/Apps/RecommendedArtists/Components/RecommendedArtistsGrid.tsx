import {
  ActionType,
  ClickedArtistGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Column, GridColumns, Text } from "@artsy/palette"
import {
  CellArtistFragmentContainer,
  CellArtistPlaceholder,
} from "Components/Cells/CellArtist"
import { InfiniteScrollSentinel } from "Components/InfiniteScrollSentinel"
import { extractNodes } from "Utils/extractNodes"
import type { RecommendedArtistsGrid_me$key } from "__generated__/RecommendedArtistsGrid_me.graphql"
import type { FC } from "react"
import { graphql, usePaginationFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface RecommendedArtistsGridProps {
  me: RecommendedArtistsGrid_me$key
}

export const RecommendedArtistsGrid: FC<
  React.PropsWithChildren<RecommendedArtistsGridProps>
> = ({ me }) => {
  const { trackEvent } = useTracking()
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    FRAGMENT,
    me,
  )

  const handleNext = () => {
    if (!hasNext || isLoadingNext) {
      return
    }

    loadNext(10)
  }

  if (!data.artistRecommendations?.totalCount) {
    return (
      <Text variant="lg-display" mt={4} color="mono60">
        Nothing yet.
      </Text>
    )
  }

  const artists = extractNodes(data.artistRecommendations)

  return (
    <GridColumns width="100%">
      {artists.map(artist => (
        <Column span={[12, 6, 3]} key={artist.internalID} minWidth={0}>
          <CellArtistFragmentContainer
            mode="GRID"
            key={artist.internalID}
            artist={artist}
            onClick={() => {
              const trackingEvent: ClickedArtistGroup = {
                action: ActionType.clickedArtistGroup,
                context_module: ContextModule.artistGrid,
                context_page_owner_type: OwnerType.recommendedArtists,
                destination_page_owner_id: artist.internalID,
                destination_page_owner_slug: artist.slug,
                destination_page_owner_type: OwnerType.artist,
                type: "thumbnail",
              }
              trackEvent(trackingEvent)
            }}
          />
        </Column>
      ))}

      {isLoadingNext && <Placeholder />}

      {hasNext && <InfiniteScrollSentinel onNext={handleNext} />}
    </GridColumns>
  )
}

const FRAGMENT = graphql`
  fragment RecommendedArtistsGrid_me on Me
  @argumentDefinitions(first: { type: "Int" }, after: { type: "String" })
  @refetchable(queryName: "RecommendedArtistsGridPaginationQuery") {
    artistRecommendations(first: $first, after: $after)
      @connection(key: "RecommendedArtistsGrid_artistRecommendations") {
      totalCount
      edges {
        node {
          internalID
          slug
          ...CellArtist_artist
        }
      }
    }
  }
`

const Placeholder: FC = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <Column span={[12, 6, 3]} key={index} minWidth={0}>
          <CellArtistPlaceholder />
        </Column>
      ))}
    </>
  )
}
