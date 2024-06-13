import * as React from "react"
import { Box, Button, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { createFragmentContainer, graphql } from "react-relay"
import { FairOrganizerLatestArticles_fairOrganizer$data } from "__generated__/FairOrganizerLatestArticles_fairOrganizer.graphql"
import { extractNodes } from "Utils/extractNodes"
import { CellArticleFragmentContainer } from "Components/Cells/CellArticle"
import { Masonry } from "Components/Masonry"

interface FairOrganizerLatestArticlesProps {
  fairOrganizer: FairOrganizerLatestArticles_fairOrganizer$data
}

export const FairOrganizerLatestArticles: React.FC<FairOrganizerLatestArticlesProps> = ({
  fairOrganizer,
}) => {
  const { articlesConnection, name, slug } = fairOrganizer
  const articles = extractNodes(articlesConnection)

  if (articles.length === 0) {
    return null
  }

  const [latestArticle, ...otherArticles] = articles
  const showReadAllButton = articlesConnection?.totalCount! > 7

  return (
    <Box>
      <Text as="h2" variant="lg-display">
        Latest from {name}
      </Text>

      <Spacer y={4} />

      <GridColumns gridRowGap={4}>
        {/* Latest article */}
        <Column span={6}>
          <CellArticleFragmentContainer article={latestArticle} mode="GRID" />
        </Column>

        {/* Other articles */}
        <Column span={6}>
          <Masonry columnCount={2}>
            {otherArticles.map(article => (
              <CellArticleFragmentContainer
                key={article.internalID}
                article={article}
                mode="GRID"
                mb={4}
              />
            ))}
          </Masonry>
        </Column>

        {/* Read All Articles button */}
        {showReadAllButton && (
          <Column span={[12, 6]} start={[1, 7]}>
            <RouterLink
              to={`/fair-organizer/${slug}/articles`}
              display="block"
              textDecoration="none"
            >
              <Button variant="secondaryBlack" display="block" width="100%">
                Read All Articles
              </Button>
            </RouterLink>
          </Column>
        )}
      </GridColumns>
    </Box>
  )
}

export const FairOrganizerLatestArticlesFragmentContainer = createFragmentContainer(
  FairOrganizerLatestArticles,
  {
    fairOrganizer: graphql`
      fragment FairOrganizerLatestArticles_fairOrganizer on FairOrganizer {
        name
        slug
        articlesConnection(first: 7, sort: PUBLISHED_AT_DESC) {
          totalCount
          edges {
            node {
              ...CellArticle_article
              internalID
            }
          }
        }
      }
    `,
  }
)
