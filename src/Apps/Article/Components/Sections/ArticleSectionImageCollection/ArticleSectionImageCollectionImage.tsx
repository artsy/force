import { ArticleZoomButton } from "Apps/Article/Components/ArticleZoomButton"
import { useArticleZoomGallery } from "Apps/Article/Components/ArticleZoomGallery/ArticleZoomGallery"
import { resized } from "Utils/resized"
import { Image, ResponsiveBox } from "@artsy/palette"
import type { ArticleSectionImageCollectionImage_figure$data } from "__generated__/ArticleSectionImageCollectionImage_figure.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArticleSectionImageCollectionImageProps {
  figure: ArticleSectionImageCollectionImage_figure$data
  targetWidth: number
  isFirst?: boolean
}

const ArticleSectionImageCollectionImage: FC<
  React.PropsWithChildren<ArticleSectionImageCollectionImageProps>
> = ({ figure, targetWidth, isFirst = false }) => {
  const { articleZoomGalleryComponent, showArticleZoomGallery } =
    useArticleZoomGallery()

  const handleClick = () => {
    if (!figure.id) return
    showArticleZoomGallery(figure.id)
  }

  if (!figure.image?.url) return null

  const img = resized(figure.image.url, { width: targetWidth })

  return (
    <>
      {articleZoomGalleryComponent}

      <ResponsiveBox
        aspectWidth={figure.image.width || 1}
        aspectHeight={figure.image.height || 1}
        maxWidth="100%"
        bg="mono10"
        position="relative"
      >
        <ArticleZoomButton width="100%" height="100%" onClick={handleClick}>
          {isFirst ? (
            <img
              src={img.src}
              srcSet={img.srcSet}
              width="100%"
              height="100%"
              alt={figure.formattedMetadata ?? ""}
              fetchPriority="high"
              decoding="async"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Image
              src={img.src}
              srcSet={img.srcSet}
              width="100%"
              height="100%"
              alt={figure.formattedMetadata ?? ""}
              lazyLoad
            />
          )}
        </ArticleZoomButton>
      </ResponsiveBox>
    </>
  )
}

export const ArticleSectionImageCollectionImageFragmentContainer =
  createFragmentContainer(ArticleSectionImageCollectionImage, {
    figure: graphql`
      fragment ArticleSectionImageCollectionImage_figure on ArticleSectionImageCollectionFigure {
        ... on ArticleImageSection {
          id
          image {
            url(version: ["main", "normalized", "larger", "large"])
            width
            height
          }
        }
        ... on Artwork {
          id
          formattedMetadata
          image {
            url(version: ["main", "normalized", "larger", "large"])
            width
            height
          }
        }
        ... on ArticleUnpublishedArtwork {
          id
          image {
            url(version: ["main", "normalized", "larger", "large"])
            width
            height
          }
        }
      }
    `,
  })
