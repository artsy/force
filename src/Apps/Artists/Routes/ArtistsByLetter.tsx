import {
  Box,
  Breadcrumbs,
  Column,
  GridColumns,
  Spacer,
  Text,
  VisuallyHidden,
  media,
  space,
} from "@artsy/palette"
import { PaginatedMetaTags } from "Components/PaginatedMetaTags"
import { ArtistsLetterNav } from "Apps/Artists/Components/ArtistsLetterNav"
import { LoadingArea } from "Components/LoadingArea"
import { PaginationFragmentContainer } from "Components/Pagination"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { getPageNumber, buildPageQuery } from "Utils/url"
import type { ArtistsByLetter_viewer$data } from "__generated__/ArtistsByLetter_viewer.graphql"
import { useState } from "react"
import type * as React from "react"
import {
  type RelayRefetchProp,
  createRefetchContainer,
  graphql,
} from "react-relay"
import styled from "styled-components"

const Columns = styled(Box)`
  column-count: 4;
  ${media.md`column-count: 3;`}
  ${media.xs`column-count: 1;`}
`

const Name = styled(RouterLink)`
  display: block;
  text-decoration: none;
  padding: ${space(0.5)}px 0;
`

interface ArtistsByLetterProps {
  viewer: ArtistsByLetter_viewer$data | null
  relay: RelayRefetchProp
}

export const ArtistsByLetter: React.FC<
  React.PropsWithChildren<ArtistsByLetterProps>
> = ({ relay, viewer }) => {
  const {
    match: { params, location },
    router,
  } = useRouter()
  const [isLoading, setLoading] = useState(false)

  const page = getPageNumber(location)
  const h1Text = getH1Text(params.letter, page)

  if (!viewer?.artistsConnection?.artists) {
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

  const handleClick = (_cursor: string | null | undefined, page: number) => {
    setLoading(true)

    relay.refetch({ page }, null, error => {
      if (error) {
        console.error(error)
      }

      setLoading(false)

      router.push({
        pathname: location.pathname,
        query: buildPageQuery(location.query, page),
      })
    })
  }

  const title = `Artists Starting with ${params.letter.toUpperCase()} | Modern and Contemporary Artists`
  const description = `Research and discover artists starting with ${params.letter.toUpperCase()} on Artsy. Find works for sale, biographies, CVs, and auction results.`

  return (
    <>
      <PaginatedMetaTags title={title} description={description} />

      <GridColumns mt={4}>
        <Column span={6}>
          <Text as="h1" variant="xl" mb={1}>
            {h1Text}
          </Text>

          <Breadcrumbs>
            <RouterLink to="/artists" textDecoration="none">
              Artists
            </RouterLink>

            <RouterLink to="">Browse over 100,000 artists</RouterLink>
          </Breadcrumbs>
        </Column>

        <Column span={6}>
          <ArtistsLetterNav />
        </Column>
      </GridColumns>

      <Spacer y={6} />

      <LoadingArea isLoading={isLoading}>
        <Columns>
          {artists.map(singleArtist => {
            if (!singleArtist) return

            const { artist } = singleArtist

            if (artist?.name && artist?.href) {
              return (
                <Text key={artist?.internalID}>
                  <Name to={artist?.href}>{artist.name}</Name>
                </Text>
              )
            }
          })}
        </Columns>
      </LoadingArea>

      <PaginationFragmentContainer
        hasNextPage={hasNextPage}
        pageCursors={pageCursors}
        onNext={handleNext}
        onClick={handleClick}
      />
    </>
  )
}

const buildH1Title = (
  letter: string,
  page: number,
): string | React.JSX.Element => {
  const baseTitle = `Artists - ${letter.toUpperCase()}`
  const isPagedContent = page > 1

  return isPagedContent ? (
    <>
      {baseTitle}
      <VisuallyHidden> - Page {page}</VisuallyHidden>
    </>
  ) : (
    baseTitle
  )
}

const getH1Text = (
  letter: string | undefined,
  page: number,
): string | React.JSX.Element => {
  return letter ? buildH1Title(letter, page) : "Artists"
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
  ARTISTS_BY_LETTER_QUERY,
)
