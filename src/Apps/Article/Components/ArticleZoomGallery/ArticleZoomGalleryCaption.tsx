import { Box, Button, Flex, HTML, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import Metadata from "Components/Artwork/Metadata"
import { RouterLink } from "System/Components/RouterLink"
import { ArticleZoomGalleryCaption_figure$data } from "__generated__/ArticleZoomGalleryCaption_figure.graphql"

interface ArticleZoomGalleryCaptionProps {
  figure: ArticleZoomGalleryCaption_figure$data
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

    case "ArticleUnpublishedArtwork":
      return (
        <Box>
          {figure.artist && (
            <Text variant="sm-display" overflowEllipsis>
              {figure.artist.name}
            </Text>
          )}

          {figure.title && (
            <Text variant="sm-display" color="black60" overflowEllipsis>
              <i>{figure.title}</i>
              {figure.date && `, ${figure.date}`}
            </Text>
          )}

          {figure.partner && (
            <Text variant="xs" color="black60" overflowEllipsis>
              {figure.partner.name}
            </Text>
          )}
        </Box>
      )

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
        ... on ArticleUnpublishedArtwork {
          title
          date
          artist {
            name
          }
          partner {
            name
          }
        }
      }
    `,
  }
)
