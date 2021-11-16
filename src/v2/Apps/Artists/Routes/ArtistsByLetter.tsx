import {
  Box,
  Text,
  media,
  space,
  GridColumns,
  Breadcrumbs,
  Spacer,
  Column,
} from "@artsy/palette"
import { useState } from "react"
import * as React from "react"
import { graphql, createRefetchContainer, RelayRefetchProp } from "react-relay"
import styled, { css } from "styled-components"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useRouter } from "v2/System/Router/useRouter"
import { PaginationFragmentContainer } from "v2/Components/Pagination"
import { ArtistsByLetter_viewer } from "v2/__generated__/ArtistsByLetter_viewer.graphql"
import { ArtistsByLetterMeta } from "../Components/ArtistsByLetterMeta"
import { ArtistsLetterNav } from "../Components/ArtistsLetterNav"

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
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    handleClick(endCursor, page)
  }

  const handleClick = (_cursor: string, page: number) => {
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

      <GridColumns mt={4}>
        <Column span={6}>
          <Text as="h1" variant="xl" mb={1}>
            Artists
            {params.letter && <> - {params.letter.toUpperCase()}</>}
          </Text>

          <Breadcrumbs>
            <RouterLink to="/artists" noUnderline>
              Artists
            </RouterLink>

            <RouterLink to="">Browse over 100,000 artists</RouterLink>
          </Breadcrumbs>
        </Column>

        <Column span={6}>
          <ArtistsLetterNav />
        </Column>
      </GridColumns>

      <Spacer mt={6} />

      <Columns isLoading={isLoading}>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
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
