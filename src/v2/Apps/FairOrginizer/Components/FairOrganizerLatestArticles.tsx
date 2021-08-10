import React from "react"
import styled from "styled-components"
import { Box, Button, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { FairEditorialItemFragmentContainer as FairEditorialItem } from "v2/Apps/Fair/Components/FairEditorial/FairEditorialItem"
import { RouterLink } from "v2/System/Router/RouterLink"
import { createFragmentContainer, graphql, _FragmentRefs } from "react-relay"
import { getArticlesColumns } from "../helpers/getArticlesColumns"
import { FairOrganizerLatestArticles_fairOrganizer } from "v2/__generated__/FairOrganizerLatestArticles_fairOrganizer.graphql"
import { extractNodes } from "v2/Utils/extractNodes"

interface FairOrganizerLatestArticlesProps {
  fairOrganizer: FairOrganizerLatestArticles_fairOrganizer
}

export const FairOrganizerLatestArticles: React.FC<FairOrganizerLatestArticlesProps> = ({
  fairOrganizer,
}) => {
  const { articlesConnection, name, slug } = fairOrganizer
  const articles = extractNodes(articlesConnection)
  const [latestArticle, ...otherArticles] = articles
  const { leftColumn, rightColumn } = getArticlesColumns(otherArticles)

  const showReadAllButton = articlesConnection?.totalCount! > 7

  return (
    <Box>
      <Text as="h2" variant="lg">
        Latest from {name}
      </Text>

      <Spacer mt={4} />

      <GridColumns>
        {/* latest article */}
        <Column span={6}>
          <Article article={latestArticle} size="large" />
          <Spacer mt={30} />
        </Column>

        {/* other articles */}
        <Column span={6}>
          <GridColumns>
            {/* left column */}
            <Column span={[6]}>
              {leftColumn.map(article => (
                <Box mb={30} key={article.id}>
                  <Article article={article} size={"small"} />
                </Box>
              ))}
            </Column>

            {/* right column */}
            <Column span={[6]}>
              {rightColumn.map(article => (
                <Box mb={30} key={article.id}>
                  <Article article={article} size={"small"} />
                </Box>
              ))}
            </Column>

            {/* Read All Articles button */}
            {showReadAllButton && (
              <Column span={[12, 8, 6]} start={[1, 5, 7]}>
                <Spacer mt={30} />
                <RouterLink
                  to={`/fair-organizer/${slug}/articles`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <Button
                    variant="secondaryOutline"
                    size="medium"
                    display="block"
                    width="100%"
                  >
                    Read All Articles
                  </Button>
                </RouterLink>
              </Column>
            )}
          </GridColumns>
        </Column>
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
        articlesConnection(first: 7) {
          totalCount
          edges {
            node {
              id
              ...FairEditorialItem_article
            }
          }
        }
      }
    `,
  }
)

const Article = styled(FairEditorialItem).attrs({
  isResponsive: true,
})``
Article.displayName = "Article"
