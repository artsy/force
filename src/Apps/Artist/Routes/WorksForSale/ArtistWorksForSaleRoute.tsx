import { ArtistMediumsTitle } from "Apps/Artist/Routes/WorksForSale/Components/ArtistMediumsTitle"
import { ArtistWorksForSaleEmptyFragmentContainer } from "Apps/Artist/Routes/WorksForSale/Components/ArtistWorksForSaleEmpty"
import { getWorksForSaleRouteVariables } from "Apps/Artist/Routes/WorksForSale/Utils/getWorksForSaleRouteVariables"
import type { SharedArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtworkFilterPlaceholder } from "Components/ArtworkFilter/ArtworkFilterPlaceholder"
import { useRouter } from "System/Hooks/useRouter"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { ArtistWorksForSaleRouteArtworksQuery } from "__generated__/ArtistWorksForSaleRouteArtworksQuery.graphql"
import type { ArtistWorksForSaleRoute_artist$data } from "__generated__/ArtistWorksForSaleRoute_artist.graphql"
import type React from "react"
import { Meta } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistArtworkFilterRefetchContainer } from "./Components/ArtistArtworkFilter"

interface ArtistWorksForSaleRouteProps {
  artist: ArtistWorksForSaleRoute_artist$data
}

const ArtistWorksForSaleRoute: React.FC<
  React.PropsWithChildren<ArtistWorksForSaleRouteProps>
> = ({ artist }) => {
  const { title, description } = artist.meta
  const { match } = useRouter()

  return (
    <>
      <ArtistMediumsTitle
        defaultTitle={title}
        name={artist.name ?? "Unknown Artist"}
      />
      <Meta name="description" content={description} />
      <SystemQueryRenderer<ArtistWorksForSaleRouteArtworksQuery>
        query={graphql`
          query ArtistWorksForSaleRouteArtworksQuery(
            $artistID: String!
            $aggregations: [ArtworkAggregation]
            $input: FilterArtworksInput!
          ) {
            artist(id: $artistID) {
              ...ArtistArtworkFilter_artist @arguments(input: $input)
              sidebarAggregations: filterArtworksConnection(
                aggregations: $aggregations
                first: 1
              ) {
                counts {
                  total
                }
                aggregations {
                  slice
                  counts {
                    name
                    value
                    count
                  }
                }
              }
            }
          }
        `}
        variables={{
          ...getWorksForSaleRouteVariables(
            match.params as { artistID: string },
            match,
          ),
          artistID: artist.slug,
        }}
        placeholder={<ArtworkFilterPlaceholder showCreateAlert />}
        render={({ error, props }) => {
          if (error) {
            console.error(
              "[ArtistWorksForSaleRoute]: Error loading artwork grid",
              error,
            )
            return null
          }

          if (!props || !props.artist) {
            return <ArtworkFilterPlaceholder showCreateAlert />
          }

          return (
            <>
              {props.artist.sidebarAggregations?.counts?.total === 0 ? (
                <ArtistWorksForSaleEmptyFragmentContainer artist={artist} />
              ) : (
                <ArtistArtworkFilterRefetchContainer
                  artist={props.artist}
                  aggregations={
                    props.artist.sidebarAggregations
                      ?.aggregations as SharedArtworkFilterContextProps["aggregations"]
                  }
                />
              )}
            </>
          )
        }}
      />
    </>
  )
}

export const ArtistWorksForSaleRouteFragmentContainer = createFragmentContainer(
  ArtistWorksForSaleRoute,
  {
    artist: graphql`
      fragment ArtistWorksForSaleRoute_artist on Artist {
        ...ArtistWorksForSaleEmpty_artist
        slug
        name
        meta(page: ARTWORKS) {
          description
          title
        }
      }
    `,
  },
)
