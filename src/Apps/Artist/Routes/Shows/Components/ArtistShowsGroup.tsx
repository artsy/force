import { Text, GridColumns, Column, Spacer } from "@artsy/palette"
import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { ArtistShowsGroup_artist$data } from "__generated__/ArtistShowsGroup_artist.graphql"
import { PaginationFragmentContainer } from "Components/Pagination"
import { CellShowFragmentContainer } from "Components/Cells/CellShow"
import { useState } from "react"
import { LoadingArea } from "Components/LoadingArea"
import { Jump } from "Utils/Hooks/useJump"

interface ArtistShowsGroupProps {
  artist: ArtistShowsGroup_artist$data
  relay: RelayRefetchProp
  title: string
  sort: string
  status: string
}

const ArtistShowsGroup: React.FC<ArtistShowsGroupProps> = ({
  artist,
  relay,
  sort,
  status,
  title,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleNext = (page: number) => {
    handleClick(null, page)
  }

  const handleClick = (_cursor: string | null, page: number) => {
    setIsLoading(true)

    relay.refetch(
      { page, artistID: artist.slug, status, sort },
      null,
      error => {
        if (error) {
          console.error(error)
        }

        setIsLoading(false)
      }
    )
  }

  const shows = extractNodes(artist.showsConnection)
  const jump = `Shows--${status}`

  if (shows.length === 0) {
    return null
  }

  return (
    <>
      <Text variant="xl">{title}</Text>

      <Spacer y={6} />

      <Jump id={jump} />

      <LoadingArea isLoading={isLoading}>
        <GridColumns gridRowGap={[2, 4]}>
          {shows.map(show => {
            return (
              <Column key={show.internalID} span={[6, 4, 3]}>
                <CellShowFragmentContainer show={show} mode="GRID" />
              </Column>
            )
          })}
        </GridColumns>
      </LoadingArea>

      <PaginationFragmentContainer
        getHref={() => ""}
        pageCursors={artist.showsConnection?.pageCursors!}
        onClick={handleClick}
        onNext={handleNext}
        hasNextPage={!!artist.showsConnection?.pageInfo.hasNextPage}
        scrollTo={jump}
        offset={10}
      />
    </>
  )
}

export const ArtistShowsGroupRefetchContainer = createRefetchContainer(
  ArtistShowsGroup,
  {
    artist: graphql`
      fragment ArtistShowsGroup_artist on Artist
        @argumentDefinitions(
          page: { type: "Int", defaultValue: 1 }
          sort: { type: "ShowSorts" }
          status: { type: "String" }
        ) {
        slug
        showsConnection(first: 12, page: $page, sort: $sort, status: $status) {
          pageInfo {
            hasNextPage
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          edges {
            node {
              ...CellShow_show
              internalID
            }
          }
        }
      }
    `,
  },
  graphql`
    query ArtistShowsGroupQuery(
      $page: Int
      $artistID: String!
      $sort: ShowSorts
      $status: String!
    ) {
      artist(id: $artistID) {
        ...ArtistShowsGroup_artist
          @arguments(page: $page, sort: $sort, status: $status)
      }
    }
  `
)
