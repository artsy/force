import { ResponsiveBox, Image } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "v2/System/Router/useRouter"
import { ArticleZoomButton } from "../../ArticleZoomButton"
import { useArticleZoomGallery } from "../../ArticleZoomGallery"
import { ArticleSectionImageCollectionImage_figure } from "v2/__generated__/ArticleSectionImageCollectionImage_figure.graphql"

interface ArticleSectionImageCollectionImageProps {
  figure: ArticleSectionImageCollectionImage_figure
}

const ArticleSectionImageCollectionImage: FC<ArticleSectionImageCollectionImageProps> = ({
  figure,
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

  const img = figure.image?.resized

  if (!img) return null

  return (
    <>
      {articleZoomGalleryComponent}

      <ResponsiveBox
        aspectWidth={img.width ?? 1}
        aspectHeight={img.height ?? 1}
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
            resized(width: 1220, version: ["normalized", "larger", "large"]) {
              src
              srcSet
              height
              width
            }
          }
        }
        ... on Artwork {
          id
          image {
            resized(width: 1220, version: ["normalized", "larger", "large"]) {
              src
              srcSet
              height
              width
            }
          }
        }
      }
    `,
  }
)
