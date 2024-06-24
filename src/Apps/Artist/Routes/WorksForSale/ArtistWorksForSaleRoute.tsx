import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistArtworkFilterRefetchContainer } from "./Components/ArtistArtworkFilter"
import { ArtistWorksForSaleRoute_artist$data } from "__generated__/ArtistWorksForSaleRoute_artist.graphql"
import { SharedArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import { Title, Meta } from "react-head"
import { ArtistWorksForSaleEmptyFragmentContainer } from "Apps/Artist/Routes/WorksForSale/Components/ArtistWorksForSaleEmpty"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ArtistWorksForSaleRouteQuery } from "__generated__/ArtistWorksForSaleRouteQuery.graphql"
import { getWorksForSaleRouteVariables } from "Apps/Artist/Routes/WorksForSale/Utils/getWorksForSaleRouteVariables"
import { ArtworkFilterPlaceholder } from "Components/ArtworkFilter"

interface ArtistWorksForSaleRouteProps {
  artist: ArtistWorksForSaleRoute_artist$data
}

const ArtistWorksForSaleRoute: React.FC<ArtistWorksForSaleRouteProps> = ({
  artist,
}) => {
  const { title, description } = artist.meta
  const total = artist.sidebarAggregations?.counts?.total ?? 0

  return (
    <>
      <Title>{title}</Title>
      <Meta name="title" content={title} />
      <Meta name="description" content={description} />

      {total === 0 ? (
        <ArtistWorksForSaleEmptyFragmentContainer artist={artist} />
      ) : (
        <ArtistArtworkFilterRefetchContainer
          artist={artist}
          aggregations={
            artist.sidebarAggregations
              ?.aggregations as SharedArtworkFilterContextProps["aggregations"]
          }
        />
      )}
    </>
  )
}

export const ArtistWorksForSaleRouteFragmentContainer = createFragmentContainer(
  ArtistWorksForSaleRoute,
  {
    artist: graphql`
      fragment ArtistWorksForSaleRoute_artist on Artist
        @argumentDefinitions(
          aggregations: { type: "[ArtworkAggregation]" }
          input: { type: "FilterArtworksInput" }
          includeBlurHash: { type: "Boolean!", defaultValue: true }
        ) {
        ...ArtistArtworkFilter_artist
          @arguments(input: $input, includeBlurHash: $includeBlurHash)
        ...ArtistWorksForSaleEmpty_artist
        meta(page: ARTWORKS) {
          description
          title
        }
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
    `,
  }
)

export const ArtistWorksForSaleRouteQueryRenderer: FC<{
  match: { location: any; params: any }
}> = ({ match: { location, params } }) => {
  const variables = getWorksForSaleRouteVariables(params, location)

  return (
    <SystemQueryRenderer<ArtistWorksForSaleRouteQuery>
      lazyLoad
      placeholder={<ArtworkFilterPlaceholder />}
      variables={variables}
      query={graphql`
        query ArtistWorksForSaleRouteQuery(
          $artistID: String!
          $input: FilterArtworksInput
          # TODO:(?) only request the artist series aggregation if user has the Unleash flag enabled?
          $aggregations: [ArtworkAggregation]
          $includeBlurHash: Boolean!
        ) {
          artist(id: $artistID) {
            ...ArtistWorksForSaleRoute_artist
              @arguments(
                input: $input
                aggregations: $aggregations
                includeBlurHash: $includeBlurHash
              )
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.artist) {
          return <ArtworkFilterPlaceholder />
        }

        return (
          <ArtistWorksForSaleRouteFragmentContainer artist={props.artist} />
        )
      }}
    />
  )
}
