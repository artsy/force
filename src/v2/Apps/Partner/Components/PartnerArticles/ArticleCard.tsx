import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { Image, ResponsiveBox, Text } from "@artsy/palette"
import React from "react"
import { getAuthors } from "./helpers"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleCard_article } from "v2/__generated__/ArticleCard_article.graphql"

interface ArticleCardProps {
  article: ArticleCard_article
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }): JSX.Element => {
  const {
    title,
    author,
    href,
    channelID,
    thumbnailImage,
    contributingAuthors,
  } = article
  const { authorName, editorialName } = getAuthors(
    channelID,
    author,
    contributingAuthors
  )

  return (
    <>
      <RouterLink to={href} style={{ textDecoration: "none" }}>
        {thumbnailImage && (
          <ResponsiveBox
            aspectWidth={thumbnailImage.medium.width}
            aspectHeight={thumbnailImage.medium.height}
            maxWidth="100%"
          >
            <Image
              src={thumbnailImage.medium.src}
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

      <RouterLink to={href} style={{ textDecoration: "none" }}>
        <Text as="h3" variant="title" color="black" mt={1}>
          {title}
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
        title
        href
        author {
          name
        }
        contributingAuthors {
          name
        }
        thumbnailImage {
          medium: cropped(width: 357, height: 320) {
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
