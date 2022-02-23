import { ResponsiveBox, Image } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "v2/System/Router/useRouter"
import { ArticleZoomButton } from "../../ArticleZoomButton"
import { useArticleZoomGallery } from "../../ArticleZoomGallery"
import { ArticleSectionImageCollectionImage_figure } from "v2/__generated__/ArticleSectionImageCollectionImage_figure.graphql"
import { resized } from "v2/Utils/resized"

interface ArticleSectionImageCollectionImageProps {
  figure: ArticleSectionImageCollectionImage_figure
  targetWidth: number
}

const ArticleSectionImageCollectionImage: FC<ArticleSectionImageCollectionImageProps> = ({
  figure,
  targetWidth,
}) => {
  const { match } = useRouter()

  const {
    articleZoomGalleryComponent,
    showArticleZoomGallery,
  } = useArticleZoomGallery({ id: match.params.id })

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
        aspectWidth={figure.image.width ?? 1}
        aspectHeight={figure.image.height ?? 1}
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
            url(version: ["normalized", "larger", "large"])
            width
            height
          }
        }
        ... on Artwork {
          id
          image {
            url(version: ["normalized", "larger", "large"])
            width
            height
          }
        }
      }
    `,
  }
)
