import Metadata from "Components/Artwork/Metadata"
import { HTML, Text } from "@artsy/palette"
import type { ArticleSectionImageCollectionCaption_figure$data } from "__generated__/ArticleSectionImageCollectionCaption_figure.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArticleSectionImageCollectionCaptionProps {
  figure: ArticleSectionImageCollectionCaption_figure$data
}

const ArticleSectionImageCollectionCaption: FC<
  React.PropsWithChildren<ArticleSectionImageCollectionCaptionProps>
> = ({ figure }) => {
  if (figure.__typename === "Artwork") {
    return <Metadata mt={0} artwork={figure} />
  }

  if (figure.__typename === "ArticleImageSection" && figure.caption) {
    return <HTML variant="xs" color="mono60" html={figure.caption} />
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
          <Text variant="sm-display" color="mono60" overflowEllipsis>
            <i>{figure.title}</i>
            {figure.date && `, ${figure.date}`}
          </Text>
        )}

        {figure.partner && (
          <Text variant="xs" color="mono60" overflowEllipsis>
            {figure.partner.name}
          </Text>
        )}
      </>
    )
  }

  return null
}

export const ArticleSectionImageCollectionCaptionFragmentContainer =
  createFragmentContainer(ArticleSectionImageCollectionCaption, {
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
  })
