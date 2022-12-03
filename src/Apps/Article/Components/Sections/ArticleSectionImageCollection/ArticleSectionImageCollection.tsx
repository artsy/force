import { FC, useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  Flex,
  Join,
  Spacer,
  Box,
  FullBleed,
  GridColumns,
  Column,
} from "@artsy/palette"
import { ArticleSectionImageCollection_section$data } from "__generated__/ArticleSectionImageCollection_section.graphql"
import { ArticleSectionImageCollectionImageFragmentContainer } from "./ArticleSectionImageCollectionImage"
import { ArticleSectionImageCollectionCaptionFragmentContainer } from "./ArticleSectionImageCollectionCaption"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { CENTERED_LAYOUT_COLUMNS } from "Apps/Article/Components/ArticleBody"

const FULLBLEED_IMAGE_WIDTH = 2000
const MAX_IMAGE_WIDTH = 910
const FIGURE_GUTTER_WIDTH = 10

interface ArticleSectionImageCollectionProps {
  section: ArticleSectionImageCollection_section$data
}

const ArticleSectionImageCollection: FC<ArticleSectionImageCollectionProps> = ({
  section,
}) => {
  const { Container, Caption, targetWidth } = useMemo(() => {
    switch (section.layout) {
      case "FILLWIDTH":
        return {
          Container: FullBleed,
          Caption: FullBleedCaption,
          targetWidth: FULLBLEED_IMAGE_WIDTH,
        }

      // OVERFLOW_FILLWIDTH
      // COLUMN_WIDTH
      default:
        return {
          Container: Box,
          Caption: Box,
          targetWidth:
            (MAX_IMAGE_WIDTH -
              FIGURE_GUTTER_WIDTH * (section.figures.length - 1)) /
            section.figures.length,
        }
    }
  }, [section.figures.length, section.layout])

  return (
    <Container>
      <Flex alignItems="flex-end">
        <Join separator={<Spacer x={FIGURE_GUTTER_WIDTH} />}>
          {section.figures.map((figure, i) => {
            return (
              <ArticleSectionImageCollectionImageFragmentContainer
                key={i}
                figure={figure}
                targetWidth={targetWidth}
              />
            )
          })}
        </Join>
      </Flex>

      <Spacer y={1} />

      <Flex alignItems="flex-start">
        <Join separator={<Spacer x={FIGURE_GUTTER_WIDTH} />}>
          {section.figures.map((figure, i) => {
            return (
              <Box key={i} flex={1} overflow="hidden">
                <Caption>
                  <ArticleSectionImageCollectionCaptionFragmentContainer
                    figure={figure}
                  />
                </Caption>
              </Box>
            )
          })}
        </Join>
      </Flex>
    </Container>
  )
}

const FullBleedCaption: FC = ({ children }) => {
  return (
    <HorizontalPadding>
      <GridColumns>
        <Column {...CENTERED_LAYOUT_COLUMNS}>{children}</Column>
      </GridColumns>
    </HorizontalPadding>
  )
}

export const ArticleSectionImageCollectionFragmentContainer = createFragmentContainer(
  ArticleSectionImageCollection,
  {
    section: graphql`
      fragment ArticleSectionImageCollection_section on ArticleSectionImageCollection {
        layout
        figures {
          __typename
          ...ArticleSectionImageCollectionImage_figure
          ...ArticleSectionImageCollectionCaption_figure
        }
      }
    `,
  }
)
