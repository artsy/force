import { HTML } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import Metadata from "v2/Components/Artwork/Metadata"
import { ArticleZoomGalleryCaption_figure$data } from "v2/__generated__/ArticleZoomGalleryCaption_figure.graphql"

interface ArticleZoomGalleryCaptionProps {
  figure: ArticleZoomGalleryCaption_figure$data
}

const ArticleZoomGalleryCaption: FC<ArticleZoomGalleryCaptionProps> = ({
  figure,
}) => {
  switch (figure.__typename) {
    case "Artwork":
      return <Metadata mt={0} artwork={figure} />

    case "ArticleImageSection":
      if (!figure.caption) return <div />

      return <HTML variant="sm" html={figure.caption} />

    default:
      return <div />
  }
}

export const ArticleZoomGalleryCaptionFragmentContainer = createFragmentContainer(
  ArticleZoomGalleryCaption,
  {
    figure: graphql`
      fragment ArticleZoomGalleryCaption_figure on ArticleSectionImageCollectionFigure {
        __typename
        ... on Artwork {
          ...Metadata_artwork
        }
        ... on ArticleImageSection {
          caption
        }
      }
    `,
  }
)
