import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Flex, Join, Spacer, Box } from "@artsy/palette"
import { ArticleSectionImageCollection_section } from "v2/__generated__/ArticleSectionImageCollection_section.graphql"
import { ArticleSectionImageCollectionImageFragmentContainer } from "./ArticleSectionImageCollectionImage"
import { ArticleSectionImageCollectionCaptionFragmentContainer } from "./ArticleSectionImageCollectionCaption"

const MAX_IMAGE_WIDTH = 910
const FIGURE_GUTTER_WIDTH = 10

interface ArticleSectionImageCollectionProps {
  section: ArticleSectionImageCollection_section
}

const ArticleSectionImageCollection: FC<ArticleSectionImageCollectionProps> = ({
  section,
}) => {
  const targetWidth =
    (MAX_IMAGE_WIDTH - FIGURE_GUTTER_WIDTH * (section.figures.length - 1)) /
    section.figures.length

  return (
    <>
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
              <Box key={i} flex={1} overflow="hidden">
                <ArticleSectionImageCollectionCaptionFragmentContainer
                  figure={figure}
                />
              </Box>
            )
          })}
        </Join>
      </Flex>
    </>
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
