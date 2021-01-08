import { Box, Text, media, space } from "@artsy/palette"
import React, { useState } from "react"
import { graphql, createRefetchContainer, RelayRefetchProp } from "react-relay"
import styled, { css } from "styled-components"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { useRouter } from "v2/Artsy/Router/useRouter"
import { PaginationFragmentContainer } from "v2/Components/Pagination"
import { ArtistsTopNav } from "../Components/ArtistsTopNav"
import { ArtistsByLetter_viewer } from "v2/__generated__/ArtistsByLetter_viewer.graphql"
import { ArtistsByLetterMeta } from "../Components/ArtistsByLetterMeta"

const Columns = styled(Box)<{ isLoading: boolean }>`
  column-count: 4;
  ${media.md`column-count: 3;`}
  ${media.xs`column-count: 1;`}

  ${({ isLoading }) =>
    isLoading &&
    css`
      opacity: 0.25;
      pointer-events: none;
    `}
`

const Name = styled(RouterLink)`
  display: block;
  text-decoration: none;
  padding: ${space(0.5)}px 0;
`

interface ArtistsByLetterProps {
  viewer: ArtistsByLetter_viewer
  relay: RelayRefetchProp
}

export const ArtistsByLetter: React.FC<ArtistsByLetterProps> = ({
  relay,
  viewer,
}) => {
  const {
    match: { params, location },
    router,
  } = useRouter()
  const [isLoading, setLoading] = useState(false)

  if (!viewer.artistsConnection?.artists) {
    return null
  }

  const {
    artistsConnection: {
      artists,
      pageCursors,
      pageInfo: { endCursor, hasNextPage },
    },
  } = viewer

  const handleNext = (page: number) => {
    handleClick(endCursor, page)
  }

  const handleClick = (cursor: string, page: number) => {
    setLoading(true)

    relay.refetch({ page }, null, error => {
      if (error) {
        console.error(error)
      }

      setLoading(false)

      router.push({
        pathname: location.pathname,
        query: { ...location.query, page },
      })
    })
  }

  return (
    <>
      <ArtistsByLetterMeta />

      <Box>
        <Text my={3}>
          <RouterLink to="/artists2" noUnderline>
            Artists
          </RouterLink>{" "}
          / Browse over 100,000 artists
        </Text>

        <ArtistsTopNav my={3}>
          <Text as="h1" variant="largeTitle">
            Artists
            {params.letter && <> – {params.letter.toUpperCase()}</>}
          </Text>
        </ArtistsTopNav>

        <Columns my={3} isLoading={isLoading}>
          {artists.map(({ artist }) => {
            return (
              <Text key={artist.internalID}>
                <Name to={artist.href}>{artist.name}</Name>
              </Text>
            )
          })}
        </Columns>

        <PaginationFragmentContainer
          hasNextPage={hasNextPage}
          pageCursors={pageCursors}
          onNext={handleNext}
          onClick={handleClick}
        />
      </Box>
    </>
  )
}

export const ARTISTS_BY_LETTER_QUERY = graphql`
  query ArtistsByLetterQuery($letter: String!, $size: Int, $page: Int) {
    viewer {
      ...ArtistsByLetter_viewer
        @arguments(letter: $letter, page: $page, size: $size)
    }
  }
`

export const ArtistsByLetterFragmentContainer = createRefetchContainer(
  ArtistsByLetter,
  {
    viewer: graphql`
      fragment ArtistsByLetter_viewer on Viewer
        @argumentDefinitions(
          letter: { type: "String", defaultValue: "a" }
          page: { type: "Int", defaultValue: 1 }
          size: { type: "Int", defaultValue: 100 }
        ) {
        artistsConnection(letter: $letter, page: $page, size: $size) {
          pageInfo {
            endCursor
            hasNextPage
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          artists: edges {
            artist: node {
              internalID
              name
              href
            }
          }
        }
      }
    `,
  },
  ARTISTS_BY_LETTER_QUERY
)
