import { ResponsiveBox, Image } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleZoomButton } from "Apps/Article/Components/ArticleZoomButton"
import { useArticleZoomGallery } from "Apps/Article/Components/ArticleZoomGallery/ArticleZoomGallery"
import { ArticleSectionImageCollectionImage_figure$data } from "__generated__/ArticleSectionImageCollectionImage_figure.graphql"
import { resized } from "Utils/resized"

interface ArticleSectionImageCollectionImageProps {
  figure: ArticleSectionImageCollectionImage_figure$data
  targetWidth: number
}

const ArticleSectionImageCollectionImage: FC<ArticleSectionImageCollectionImageProps> = ({
  figure,
  targetWidth,
}) => {
  const {
    articleZoomGalleryComponent,
    showArticleZoomGallery,
  } = useArticleZoomGallery()

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
        bg="black10"
        position="relative"
      >
        <ArticleZoomButton width="100%" height="100%" onClick={handleClick}>
          <Image
            src={img.src}
            srcSet={img.srcSet}
            width="100%"
            height="100%"
            alt=""
            lazyLoad
          />
        </ArticleZoomButton>
      </ResponsiveBox>
    </>
  )
}

export const ArticleSectionImageCollectionImageFragmentContainer = createFragmentContainer(
  ArticleSectionImageCollectionImage,
  {
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
  }
)
