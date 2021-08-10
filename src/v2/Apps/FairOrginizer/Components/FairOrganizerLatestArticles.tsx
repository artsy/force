import React from "react"
import { Box, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { FairEditorialItemFragmentContainer as FairEditorialItem } from "v2/Apps/Fair/Components/FairEditorial/FairEditorialItem"

export const FairOrganizerLatestArticles: React.FC<any> = ({
  fairOrganizer,
}) => {
  const { articles, name } = fairOrganizer
  const [latestArticle, ...otherArticles] = articles

  return (
    <Box>
      <Text as="h2" variant="lg">
        Latest from {name}
      </Text>

      <Spacer mt={4} />

      <GridColumns>
        <Column span={6}>
          <FairEditorialItem
            article={latestArticle}
            size="large"
            isResponsive
          />
          <Spacer mt={30} />
        </Column>

        <Column span={6}>
          <GridColumns>
            {otherArticles.map(article => (
              <Column span={[6]}>
                <FairEditorialItem
                  article={article}
                  size="small"
                  isResponsive
                />
                <Spacer mt={50} />
              </Column>
            ))}
          </GridColumns>
        </Column>
      </GridColumns>
    </Box>
  )
}
