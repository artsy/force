import { FC } from "react"
import { HTML, Text } from "@artsy/palette"
import Metadata from "Components/Artwork/Metadata"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleSectionImageCollectionCaption_figure$data } from "__generated__/ArticleSectionImageCollectionCaption_figure.graphql"

interface ArticleSectionImageCollectionCaptionProps {
  figure: ArticleSectionImageCollectionCaption_figure$data
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

  if (figure.__typename === "ArticleUnpublishedArtwork") {
    return (
      <>
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
      </>
    )
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
