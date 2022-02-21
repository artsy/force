import {
  Box,
  Column,
  Flex,
  GridColumns,
  Spacer,
  Text,
  Title,
} from "@artsy/palette"
import { useEffect, useState } from "react"
import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { PaginationFragmentContainer as Pagination } from "v2/Components/Pagination"
import { extractNodes } from "v2/Utils/extractNodes"
import { DedicatedArticlesBreadcrumbsFragmentContainer as DedicatedArticlesBreadcrumbs } from "../Components/DedicatedArticlesBreadcrumbs"
import { FairOrganizerDedicatedArticlesQuery } from "./FairOrganizerDedicatedArticlesQuery"
import { FairOrganizerDedicatedArticles_fairOrganizer$data } from "v2/__generated__/FairOrganizerDedicatedArticles_fairOrganizer.graphql"
import createLogger from "v2/Utils/logger"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { LoadingArea } from "v2/Components/LoadingArea"
import { FairOrganizerArticle } from "../Components/FairOrganizerArticle"

const PAGE_SIZE = 16

interface FairOrganizerDedicatedArticlesProps {
  fairOrganizer: FairOrganizerDedicatedArticles_fairOrganizer$data
  relay: RelayRefetchProp
}

export const FairOrganizerDedicatedArticles: React.FC<FairOrganizerDedicatedArticlesProps> = ({
  fairOrganizer,
  relay,
}) => {
  const { name, slug, articlesConnection } = fairOrganizer
  const {
    pageInfo: { hasNextPage },
    pageCursors,
  } = articlesConnection!

  const articles = extractNodes(articlesConnection)

  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const logger = createLogger("FairOrganizerDedicatedArticles.tsx")

  useEffect(() => {
    setIsLoading(true)

    const relayRefetchParams = {
      id: slug,
      first: PAGE_SIZE,
      page,
    }

    relay.refetch(relayRefetchParams, null, error => {
      if (error) {
        logger.error(error)
      }

      setIsLoading(false)
    })
  }, [page])

  const loadNext = () => {
    const currentPage = page ?? 0
    const nextPage = currentPage + 1
    if (hasNextPage) {
      loadPage(nextPage)
    }
  }

  const loadPage = newPage => {
    setPage(newPage)
    updateUrl({ page: newPage })
  }

  return (
    <>
      <Title>{`${name} | Artsy`}</Title>

      <DedicatedArticlesBreadcrumbs fairOrganizer={fairOrganizer} />

      <Box id="jump--FairOrganizerDedicatedArticles">
        <Text as="h1" variant="lg" mt={6}>
          All Articles for {name} on Artsy
        </Text>

        <Spacer mt={4} />

        <LoadingArea isLoading={isLoading}>
          <GridColumns>
            {articles.map(article => (
              <Column key={article.id} span={[12, 3]} mb={30}>
                <Flex justifyContent="center">
                  <FairOrganizerArticle article={article} width="100%" />
                </Flex>
              </Column>
            ))}
          </GridColumns>
        </LoadingArea>

        <Pagination
          hasNextPage={hasNextPage}
          pageCursors={pageCursors}
          onClick={(_cursor, page) => loadPage(page)}
          onNext={loadNext}
          scrollTo="#jump--FairOrganizerDedicatedArticles"
        />
      </Box>
    </>
  )
}

export const FairOrganizerDedicatedArticlesFragmentContainer = createRefetchContainer(
  FairOrganizerDedicatedArticles,
  {
    fairOrganizer: graphql`
      fragment FairOrganizerDedicatedArticles_fairOrganizer on FairOrganizer
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 16 }
          page: { type: "Int", defaultValue: 1 }
        ) {
        slug
        name
        articlesConnection(
          first: $first
          page: $page
          sort: PUBLISHED_AT_DESC
        ) {
          totalCount
          pageInfo {
            hasNextPage
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          edges {
            node {
              id
              ...FairEditorialItem_article
            }
          }
        }
        ...DedicatedArticlesBreadcrumbs_fairOrganizer
      }
    `,
  },
  FairOrganizerDedicatedArticlesQuery
)
