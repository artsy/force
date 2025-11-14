import { useArticleZoomGallery } from "Apps/Article/Components/ArticleZoomGallery/ArticleZoomGallery"
import ImageSetIcon from "@artsy/icons/ImageSetIcon"
import {
  Box,
  Clickable,
  Flex,
  Image,
  ResponsiveBox,
  Sup,
  Text,
  useTheme,
} from "@artsy/palette"
import type { ArticleSectionImageSet_section$data } from "__generated__/ArticleSectionImageSet_section.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArticleSectionImageSetProps {
  section: ArticleSectionImageSet_section$data
  isFirst?: boolean
}

const ArticleSectionImageSet: FC<
  React.PropsWithChildren<ArticleSectionImageSetProps>
> = ({ section, isFirst = false }) => {
  const { showArticleZoomGallery, articleZoomGalleryComponent } =
    useArticleZoomGallery()

  const { theme } = useTheme()

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

  const imageTitle =
    section.cover?.__typename === "Artwork"
      ? section.cover.formattedMetadata
      : ""

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
                borderColor="mono10"
                p={2}
                onClick={handleClick}
              >
                <Flex alignItems="center">
                  <Image
                    src={image.small?.src}
                    srcSet={image.small?.srcSet}
                    width={image.small?.width}
                    height={image.small?.height}
                    lazyLoad={!isFirst}
                    fetchPriority={isFirst ? "high" : undefined}
                    alt={imageTitle ?? ""}
                  />

                  <Box ml={2}>
                    <Text variant="sm-display">
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

                    <Text variant="sm-display" color="mono60">
                      View Slideshow
                    </Text>
                  </Box>
                </Flex>

                <ImageSetIcon width={20} height={20} ml={2} />
              </Clickable>
            )

          case "FULL":
            return (
              <ResponsiveBox
                position="relative"
                aspectWidth={image.large?.width ?? 1}
                aspectHeight={image.large?.height ?? 1}
                maxWidth="100%"
              >
                <Clickable onClick={handleClick} width="100%" height="100%">
                  <Image
                    src={image.large?.src}
                    srcSet={image.large?.srcSet}
                    width="100%"
                    height="100%"
                    lazyLoad={!isFirst}
                    fetchPriority={isFirst ? "high" : undefined}
                    alt={imageTitle ?? ""}
                  />

                  <Box position="absolute" bottom={2} left={2} right={2}>
                    <Box
                      display="flex"
                      alignItems="center"
                      bg="mono0"
                      p={2}
                      width="fit-content"
                      style={{ boxShadow: theme.effects.dropShadow }}
                    >
                      <Box>
                        <Text variant="sm-display">
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

                        <Text variant="sm-display" color="mono60">
                          View Slideshow
                        </Text>
                      </Box>

                      <ImageSetIcon width={18} height={18} ml={2} />
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
                version: ["main", "normalized", "larger", "large"]
              ) {
                src
                srcSet
                height
                width
              }
              large: resized(
                width: 1220
                version: ["main", "normalized", "larger", "large"]
              ) {
                src
                srcSet
                height
                width
              }
            }
          }
          ... on Artwork {
            formattedMetadata
            id
            image {
              small: cropped(
                width: 80
                height: 80
                version: ["main", "normalized", "larger", "large"]
              ) {
                src
                srcSet
                height
                width
              }
              large: resized(
                width: 1220
                version: ["main", "normalized", "larger", "large"]
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
  },
)
