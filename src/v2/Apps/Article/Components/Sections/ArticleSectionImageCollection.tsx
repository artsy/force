import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  Text,
  Image,
  ResponsiveBox,
  GridColumns,
  Column,
  ColumnSpan,
} from "@artsy/palette"
import { ArticleSectionImageCollection_section$data } from "v2/__generated__/ArticleSectionImageCollection_section.graphql"
import Metadata from "v2/Components/Artwork/Metadata"
import { useArticleZoomGallery } from "../ArticleZoomGallery"
import { useRouter } from "v2/System/Router/useRouter"
import { ArticleZoomButton } from "../ArticleZoomButton"

interface ArticleSectionImageCollectionProps {
  section: ArticleSectionImageCollection_section$data
}

const ArticleSectionImageCollection: FC<ArticleSectionImageCollectionProps> = ({
  section,
}) => {
  const { match } = useRouter()

  const {
    articleZoomGalleryComponent,
    showArticleZoomGallery,
  } = useArticleZoomGallery({ id: match.params.id })

  // TODO: Clean up or explain what's happening here.
  const span = (section.figures.length <= 3
    ? { 1: 12, 2: [6], 3: 4 }[section.figures.length]
    : [6]) as ColumnSpan

  return (
    <>
      {articleZoomGalleryComponent}

      <GridColumns gridRowGap={4}>
        {section.figures.map((figure, i) => {
          if (
            !(
              figure.__typename === "ArticleImageSection" ||
              figure.__typename === "Artwork"
            )
          ) {
            return null
          }

          const img = figure.image?.resized

          if (!img) return

          const handleClick = () => {
            showArticleZoomGallery(figure.id)
          }

          return (
            <Column
              span={span}
              key={i}
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
            >
              <ResponsiveBox
                aspectWidth={img.width ?? 1}
                aspectHeight={img.height ?? 1}
                maxWidth="100%"
                bg="black10"
                position="relative"
              >
                <ArticleZoomButton
                  width="100%"
                  height="100%"
                  onClick={handleClick}
                >
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

              {figure.__typename === "ArticleImageSection" &&
                figure.caption && (
                  <Text
                    variant="xs"
                    color="black60"
                    mt={0.5}
                    dangerouslySetInnerHTML={{ __html: figure.caption }}
                  />
                )}

              {figure.__typename === "Artwork" && <Metadata artwork={figure} />}
            </Column>
          )
        })}
      </GridColumns>
    </>
  )
}

export const ArticleSectionImageCollectionFragmentContainer = createFragmentContainer(
  ArticleSectionImageCollection,
  {
    section: graphql`
      fragment ArticleSectionImageCollection_section on ArticleSectionImageCollection {
        layout
        figures {
          __typename
          ... on ArticleImageSection {
            id
            caption
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
            ...Metadata_artwork
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
      }
    `,
  }
)
