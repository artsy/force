import { FC } from "react"
import { ArticleSectionImageSet_section } from "v2/__generated__/ArticleSectionImageSet_section.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import {
  ResponsiveBox,
  Image,
  Box,
  Text,
  Sup,
  DROP_SHADOW,
  Clickable,
  ImageSetIcon,
  Flex,
} from "@artsy/palette"
import { useArticleZoomGallery } from "../ArticleZoomGallery"

interface ArticleSectionImageSetProps {
  section: ArticleSectionImageSet_section
}

const ArticleSectionImageSet: FC<ArticleSectionImageSetProps> = ({
  section,
}) => {
  const {
    showArticleZoomGallery,
    articleZoomGalleryComponent,
  } = useArticleZoomGallery()

  const handleClick = () => {
    if (
      !(
        section.cover?.__typename === "ArticleImageSection" ||
        section.cover?.__typename === "Artwork"
      )
    ) {
      return
    }
    showArticleZoomGallery(section.cover.id)
  }

  if (
    !(
      section.cover?.__typename === "ArticleImageSection" ||
      section.cover?.__typename === "Artwork"
    )
  ) {
    return null
  }

  const image = section.cover.image

  if (!image) return null

  return (
    <>
      {articleZoomGalleryComponent}

      {(() => {
        switch (section.setLayout) {
          case "MINI":
            return (
              <Clickable
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                border="1px solid"
                borderColor="black10"
                p={2}
                onClick={handleClick}
              >
                <Flex alignItems="center">
                  <Image
                    src={image.small?.src}
                    srcSet={image.small?.srcSet}
                    width={image.small?.width}
                    height={image.small?.height}
                    lazyLoad
                    alt=""
                  />

                  <Box ml={2}>
                    <Text variant="lg">
                      {section.title ? (
                        <>
                          {section.title}{" "}
                          <Sup color="brand">{section.counts.figures}</Sup>
                        </>
                      ) : (
                        <>
                          {section.counts.figures} Image
                          {section.counts.figures === 1 ? "" : "s"}
                        </>
                      )}
                    </Text>

                    <Text variant="lg" color="black60">
                      View Slideshow
                    </Text>
                  </Box>
                </Flex>

                <ImageSetIcon width={40} height={40} ml={2} />
              </Clickable>
            )

          case "FULL":
            return (
              <ResponsiveBox
                position="relative"
                aspectWidth={image.large?.width!}
                aspectHeight={image.large?.height!}
                maxWidth="100%"
              >
                <Clickable onClick={handleClick} width="100%" height="100%">
                  <Image
                    src={image.large?.src}
                    srcSet={image.large?.srcSet}
                    width="100%"
                    height="100%"
                    lazyLoad
                    alt=""
                  />

                  <Box position="absolute" bottom={2} left={2} right={2}>
                    <Box
                      display="flex"
                      alignItems="center"
                      bg="white100"
                      p={2}
                      width="fit-content"
                      style={{ boxShadow: DROP_SHADOW }}
                    >
                      <Box>
                        <Text variant="lg">
                          {section.title ? (
                            <>
                              {section.title}{" "}
                              <Sup color="brand">{section.counts.figures}</Sup>
                            </>
                          ) : (
                            <>
                              {section.counts.figures} Image
                              {section.counts.figures === 1 ? "" : "s"}
                            </>
                          )}
                        </Text>

                        <Text variant="lg" color="black60">
                          View Slideshow
                        </Text>
                      </Box>

                      <ImageSetIcon width={40} height={40} ml={2} />
                    </Box>
                  </Box>
                </Clickable>
              </ResponsiveBox>
            )

          default:
            return null
        }
      })()}
    </>
  )
}

export const ArticleSectionImageSetFragmentContainer = createFragmentContainer(
  ArticleSectionImageSet,
  {
    section: graphql`
      fragment ArticleSectionImageSet_section on ArticleSectionImageSet {
        setLayout: layout
        title
        counts {
          figures
        }
        cover {
          __typename
          ... on ArticleImageSection {
            id
            image {
              small: cropped(
                width: 80
                height: 80
                version: ["normalized", "larger", "large"]
              ) {
                src
                srcSet
                height
                width
              }
              large: resized(
                width: 1220
                version: ["normalized", "larger", "large"]
              ) {
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
              small: cropped(
                width: 80
                height: 80
                version: ["normalized", "larger", "large"]
              ) {
                src
                srcSet
                height
                width
              }
              large: resized(
                width: 1220
                version: ["normalized", "larger", "large"]
              ) {
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
