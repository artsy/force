import { Button, Flex, HTML } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import Metadata from "v2/Components/Artwork/Metadata"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ArticleZoomGalleryCaption_figure } from "v2/__generated__/ArticleZoomGalleryCaption_figure.graphql"

interface ArticleZoomGalleryCaptionProps {
  figure: ArticleZoomGalleryCaption_figure
}

const ArticleZoomGalleryCaption: FC<ArticleZoomGalleryCaptionProps> = ({
  figure,
}) => {
  switch (figure.__typename) {
    case "Artwork":
      return (
        <Flex
          flexDirection={["column", "row"]}
          alignItems={["flex-start", "center"]}
          justifyContent="space-between"
          flex={1}
          maxWidth={["75%", "100%"]}
        >
          <Metadata mt={0} artwork={figure} width="100%" />

          <Button
            mt={[1, 0]}
            size="small"
            variant="secondaryBlack"
            // @ts-ignore
            as={RouterLink}
            to={figure.href}
          >
            View Artwork
          </Button>
        </Flex>
      )

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
          href
        }
        ... on ArticleImageSection {
          caption
        }
      }
    `,
  }
)
