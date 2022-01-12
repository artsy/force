import { RouterLink } from "v2/System/Router/RouterLink"
import { Image, ResponsiveBox, Text } from "@artsy/palette"
import * as React from "react"
import { getAuthors } from "./helpers"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleCard_article } from "v2/__generated__/ArticleCard_article.graphql"

interface ArticleCardProps {
  article: ArticleCard_article
  isResponsive?: boolean
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  isResponsive,
}): JSX.Element => {
  const {
    thumbnailTitle,
    author,
    href,
    channelID,
    thumbnailImage,
    contributingAuthors,
  } = article
  const { authorName, editorialName } = getAuthors(
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    channelID,
    author,
    contributingAuthors
  )

  return (
    <>
      <RouterLink to={href} textDecoration="none">
        {thumbnailImage &&
          (isResponsive ? (
            <ResponsiveBox
              aspectWidth={thumbnailImage.medium?.width ?? 4}
              aspectHeight={thumbnailImage.medium?.height ?? 3}
              maxWidth="100%"
            >
              <Image
                lazyLoad
                alt=""
                width="100%"
                height="100%"
                src={thumbnailImage.medium?.src}
                srcSet={thumbnailImage.medium?.srcSet}
              />
            </ResponsiveBox>
          ) : (
            <Image
              lazyLoad
              alt=""
              src={thumbnailImage.medium?.src}
              srcSet={thumbnailImage.medium?.srcSet}
              width={thumbnailImage.medium?.width}
              height={thumbnailImage.medium?.height}
            />
          ))}
      </RouterLink>

      {channelID && (
        <Text textTransform="capitalize" color="black" variant="md" mt={1}>
          {editorialName}
        </Text>
      )}

      <RouterLink to={href} textDecoration="none">
        <Text as="h3" variant="lg" color="black" mt={1}>
          {thumbnailTitle}
        </Text>
      </RouterLink>

      {author && (
        <Text textTransform="capitalize" color="black60" variant="sm" mt={1}>
          {authorName}
        </Text>
      )}
    </>
  )
}

export const ArticleCardFragmentContainer = createFragmentContainer(
  ArticleCard,
  {
    article: graphql`
      fragment ArticleCard_article on Article {
        channelID
        thumbnailTitle
        href
        author {
          name
        }
        contributingAuthors {
          name
        }
        thumbnailImage {
          medium: cropped(width: 400, height: 300) {
            width
            height
            src
            srcSet
          }
        }
      }
    `,
  }
)
