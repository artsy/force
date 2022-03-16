import { FC, useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Flex, Join, Spacer, Box, FullBleed } from "@artsy/palette"
import { ArticleSectionImageCollection_section } from "v2/__generated__/ArticleSectionImageCollection_section.graphql"
import { ArticleSectionImageCollectionImageFragmentContainer } from "./ArticleSectionImageCollectionImage"
import { ArticleSectionImageCollectionCaptionFragmentContainer } from "./ArticleSectionImageCollectionCaption"

const FULLBLEED_IMAGE_WIDTH = 2000
const MAX_IMAGE_WIDTH = 910
const FIGURE_GUTTER_WIDTH = 10

interface ArticleSectionImageCollectionProps {
  section: ArticleSectionImageCollection_section
}

const ArticleSectionImageCollection: FC<ArticleSectionImageCollectionProps> = ({
  section,
}) => {
  const { Container, targetWidth, px } = useMemo(() => {
    switch (section.layout) {
      case "FILLWIDTH":
        return {
          Container: FullBleed,
          targetWidth: FULLBLEED_IMAGE_WIDTH,
          px: 2,
        }

      // OVERFLOW_FILLWIDTH
      // COLUMN_WIDTH
      default:
        return {
          Container: Box,
          targetWidth:
            (MAX_IMAGE_WIDTH -
              FIGURE_GUTTER_WIDTH * (section.figures.length - 1)) /
            section.figures.length,
          px: 0,
        }
    }
  }, [section.figures.length, section.layout])

  return (
    <Container>
      <Flex alignItems="flex-end">
        <Join separator={<Spacer ml={FIGURE_GUTTER_WIDTH} />}>
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

      <Spacer mt={1} />

      <Flex alignItems="flex-start">
        <Join separator={<Spacer ml={FIGURE_GUTTER_WIDTH} />}>
          {section.figures.map((figure, i) => {
            return (
              <Box key={i} flex={1} overflow="hidden" px={px}>
                <ArticleSectionImageCollectionCaptionFragmentContainer
                  figure={figure}
                />
              </Box>
            )
          })}
        </Join>
      </Flex>
    </Container>
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
