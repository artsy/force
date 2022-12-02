import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { useEffect, useState } from "react"
import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { PaginationFragmentContainer } from "Components/Pagination"
import { extractNodes } from "Utils/extractNodes"
import { DedicatedArticlesBreadcrumbsFragmentContainer as DedicatedArticlesBreadcrumbs } from "Apps/FairOrginizer/Components/DedicatedArticlesBreadcrumbs"
import { FairOrganizerDedicatedArticlesQuery } from "./FairOrganizerDedicatedArticlesQuery"
import { FairOrganizerDedicatedArticles_fairOrganizer$data } from "__generated__/FairOrganizerDedicatedArticles_fairOrganizer.graphql"
import createLogger from "Utils/logger"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { LoadingArea } from "Components/LoadingArea"
import { CellArticleFragmentContainer } from "Components/Cells/CellArticle"
import { MetaTags } from "Components/MetaTags"
import { Jump } from "Utils/Hooks/useJump"

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
      <MetaTags
        title={`${name} | Artsy`}
        pathname={`/fair-organizer/${slug}/articles`}
      />

      <DedicatedArticlesBreadcrumbs fairOrganizer={fairOrganizer} />

      <Jump id="FairOrganizerDedicatedArticles" />

      <Text as="h1" variant="lg-display" mt={6}>
        All Articles for {name} on Artsy
      </Text>

      <Spacer y={4} />

      <LoadingArea isLoading={isLoading}>
        <GridColumns gridRowGap={4}>
          {articles.map(article => (
            <Column key={article.id} span={3}>
              <CellArticleFragmentContainer article={article} mode="GRID" />
            </Column>
          ))}
        </GridColumns>
      </LoadingArea>

      <PaginationFragmentContainer
        hasNextPage={hasNextPage}
        pageCursors={pageCursors}
        onClick={(_cursor, page) => loadPage(page)}
        onNext={loadNext}
        scrollTo="FairOrganizerDedicatedArticles"
      />
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
              ...CellArticle_article
              id
            }
          }
        }
        ...DedicatedArticlesBreadcrumbs_fairOrganizer
      }
    `,
  },
  FairOrganizerDedicatedArticlesQuery
)
