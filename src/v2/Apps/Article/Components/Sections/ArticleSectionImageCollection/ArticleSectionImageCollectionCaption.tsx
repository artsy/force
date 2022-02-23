import { FC } from "react"
import { HTML } from "@artsy/palette"
import Metadata from "v2/Components/Artwork/Metadata"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleSectionImageCollectionCaption_figure } from "v2/__generated__/ArticleSectionImageCollectionCaption_figure.graphql"

interface ArticleSectionImageCollectionCaptionProps {
  figure: ArticleSectionImageCollectionCaption_figure
}

const ArticleSectionImageCollectionCaption: FC<ArticleSectionImageCollectionCaptionProps> = ({
  figure,
}) => {
  if (figure.__typename === "Artwork") {
    return <Metadata mt={0} artwork={figure} />
  }

  if (figure.__typename === "ArticleImageSection" && figure.caption) {
    return <HTML variant="xs" color="black60" html={figure.caption} />
  }

  return null
}

export const ArticleSectionImageCollectionCaptionFragmentContainer = createFragmentContainer(
  ArticleSectionImageCollectionCaption,
  {
    figure: graphql`
      fragment ArticleSectionImageCollectionCaption_figure on ArticleSectionImageCollectionFigure {
        __typename
        ...Metadata_artwork
        ... on ArticleImageSection {
          caption
        }
      }
    `,
  }
)
