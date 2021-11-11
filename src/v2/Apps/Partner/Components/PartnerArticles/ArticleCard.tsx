import { RouterLink } from "v2/System/Router/RouterLink"
import { Image, ResponsiveBox, Text } from "@artsy/palette"
import * as React from "react"
import { getAuthors } from "./helpers"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleCard_article } from "v2/__generated__/ArticleCard_article.graphql"

interface ArticleCardProps {
  article: ArticleCard_article
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }): JSX.Element => {
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
        {thumbnailImage && (
          <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
            <Image
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              src={thumbnailImage.medium.src}
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              srcSet={thumbnailImage.medium.srcSet}
              alt=""
              width="100%"
              height="100%"
              lazyLoad
            />
          </ResponsiveBox>
        )}
      </RouterLink>

      {channelID && (
        <Text
          textTransform="capitalize"
          color="black"
          variant="mediumText"
          mt={1}
        >
          {editorialName}
        </Text>
      )}

      <RouterLink to={href} textDecoration="none">
        <Text as="h3" variant="title" color="black" mt={1}>
          {thumbnailTitle}
        </Text>
      </RouterLink>

      {author && (
        <Text textTransform="capitalize" color="black60" variant="text" mt={1}>
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
