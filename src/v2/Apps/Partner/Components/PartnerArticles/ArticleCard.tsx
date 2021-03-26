import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { Image, ResponsiveBox, Text } from "@artsy/palette"
import React from "react"
import helpers from "./helpers"

const { getAuthors } = helpers

interface ArticleCardProps {
  readonly channelID: string | null
  readonly title: string | null
  readonly href: string | null
  readonly author: {
    readonly name: string | null
  } | null
  readonly contributingAuthors: ReadonlyArray<{
    readonly name: string | null
  } | null> | null
  readonly thumbnailImage: {
    readonly medium: {
      readonly width: number
      readonly height: number
      readonly src: string
      readonly srcSet: string
    } | null
  } | null
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  author,
  href,
  channelID,
  thumbnailImage,
  contributingAuthors,
}): JSX.Element => {
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
              width={thumbnailImage.medium.width}
              height={thumbnailImage.medium.height}
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

export default ArticleCard
