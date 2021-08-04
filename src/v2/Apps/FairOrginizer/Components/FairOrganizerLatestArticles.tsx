import React from "react"
import { Box, Button, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import {
  FairEditorialItemFragmentContainer as FairEditorialItem,
  FairEditorialItemProps,
} from "v2/Apps/Fair/Components/FairEditorial/FairEditorialItem"
import { RouterLink } from "v2/System/Router/RouterLink"

function getArticlesColumns<T>(articles: T[]) {
  const leftColumn: T[] = []
  const rightColumn: T[] = []

  articles.forEach((article: T, i) => {
    ;(i % 2 === 0 ? leftColumn : rightColumn).push(article)
  })

  return { leftColumn, rightColumn }
}

export const FairOrganizerLatestArticles: React.FC<any> = ({
  fairOrganizer,
}) => {
  const { articles, name } = fairOrganizer
  const [latestArticle, ...otherArticles] = articles

  const { leftColumn, rightColumn } = getArticlesColumns<typeof otherArticles>(
    otherArticles
  )

  const Article: React.FC<FairEditorialItemProps> = ({
    article,
    size = "small",
  }) => (
    <>
      <FairEditorialItem
        article={article as typeof otherArticles}
        size={size as "large" | "small"}
        isResponsive
      />
      <Spacer mt={30} />
    </>
  )

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
        </Column>

        {/* other articles */}
        <Column span={6}>
          <GridColumns>
            {/* left column */}
            <Column span={[6]}>
              {leftColumn.map(article => (
                <Article article={article} />
              ))}
            </Column>

            {/* right column */}
            <Column span={[6]}>
              {rightColumn.map(article => (
                <Article article={article} />
              ))}
            </Column>

            {/* Read All Articles button */}
            <Column span={[12, 8, 6]} start={[1, 5, 7]}>
              <Spacer mt={30} />
              <RouterLink
                to={"/fair/art-paris-2020"}
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
          </GridColumns>
        </Column>
      </GridColumns>
    </Box>
  )
}
