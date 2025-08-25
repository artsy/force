import { Box, SkeletonText, Stack, Text, media } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { PaginationFragmentContainer } from "Components/Pagination"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { extractNodes } from "Utils/extractNodes"
import type { ArticlesAuthorsQuery } from "__generated__/ArticlesAuthorsQuery.graphql"
import { useState } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import styled from "styled-components"

export const ArticlesAuthors = () => {
  const { match, router } = useRouter()

  const [page, setPage] = useState(Number(match.location.query.page ?? 1))

  const { authorsConnection } = useLazyLoadQuery<ArticlesAuthorsQuery>(QUERY, {
    page,
    size: 100,
  })

  const authors = extractNodes(authorsConnection)

  const handlePageChange = (page: number) => {
    setPage(page)

    router.replace({
      pathname: match.location.pathname,
      query: { page },
    })
  }

  return (
    <Stack gap={2}>
      <Columns>
        {authors.map(author => {
          return (
            <Name
              key={author.internalID}
              to={`/articles/author/${author.internalID}`}
              inline
            >
              <Text variant="sm">{author.name}</Text>
            </Name>
          )
        })}
      </Columns>

      <PaginationFragmentContainer
        hasNextPage={!!authorsConnection?.pageInfo?.hasNextPage}
        pageCursors={authorsConnection?.pageCursors}
        onClick={(_cursor, page) => handlePageChange(page)}
        onNext={page => handlePageChange(page)}
      />
    </Stack>
  )
}

const QUERY = graphql`
  query ArticlesAuthorsQuery($page: Int, $size: Int) {
    authorsConnection(first: $size, page: $page)
      @connection(key: "AuthorsApp_authorsConnection") {
      edges {
        node {
          internalID
          name
        }
      }
      pageCursors {
        ...Pagination_pageCursors
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

const Columns = styled(Box)`
  column-count: 4;
  ${media.md`column-count: 3;`}
  ${media.xs`column-count: 1;`}
`

const Name = styled(RouterLink)`
  display: block;
  text-decoration: none;
  padding: ${themeGet("space.half")} 0;
`

export const ArticlesAuthorsPlaceholder = () => {
  return (
    <Stack gap={2}>
      <Columns>
        {Array.from({ length: 100 }).map((_, index) => (
          <SkeletonText key={index} variant="sm" my={1}>
            {
              [
                "First Last",
                "Andy Warhol",
                "Pablo Picasso",
                "Alan Smithee",
                "Jane Doe",
              ][index % 5]
            }
          </SkeletonText>
        ))}
      </Columns>
    </Stack>
  )
}
