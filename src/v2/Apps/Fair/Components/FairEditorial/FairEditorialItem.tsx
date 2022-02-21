import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairEditorialItem_article$data } from "v2/__generated__/FairEditorialItem_article.graphql"
import {
  Box,
  Text,
  Image,
  Spacer,
  ResponsiveBox,
  TextVariant,
  BoxProps,
} from "@artsy/palette"
import { FairEditorialItemLinkFragmentContainer as FairEditorialItemLink } from "./FairEditorialItemLink"

export interface FairEditorialItemProps extends BoxProps {
  article: FairEditorialItem_article$data
  size?: "large" | "small"
  isResponsive?: boolean
}

interface ItemImageProps {
  image: {
    src: string
    srcSet: string
  }
  thumbnailTitle: string | null
  width?: number | string
  height?: number | string
}

const ItemImage: React.FC<ItemImageProps> = ({
  image,
  thumbnailTitle,
  width = "100%",
  height = "100%",
}) => (
  <Image
    width={width}
    height={height}
    src={image.src}
    srcSet={image.srcSet}
    lazyLoad={true}
    alt={thumbnailTitle ?? ""}
  />
)

export const FairEditorialItem: React.FC<FairEditorialItemProps> = ({
  article,
  size = "small",
  isResponsive = false,
  ...rest
}) => {
  const image = article.thumbnailImage?.[size]!
  const variants = {
    large: {
      primary: ["xl", "xxl"] as TextVariant[],
    },
    small: {
      primary: ["lg", "lg", "xl"] as TextVariant[],
    },
  }[size]

  return (
    <Box {...rest}>
      {/* Devided link into separate parts in order to avoid linking via empty
        space when responsive box is applied */}
      <FairEditorialItemLink article={article}>
        {isResponsive ? (
          <ResponsiveBox
            aspectWidth={image.width}
            aspectHeight={image.height}
            maxWidth="100%"
          >
            <ItemImage thumbnailTitle={article.thumbnailTitle} image={image} />
          </ResponsiveBox>
        ) : (
          <ItemImage
            thumbnailTitle={article.thumbnailTitle}
            image={image}
            width={image.width}
            height={image.height}
          />
        )}
      </FairEditorialItemLink>

      <FairEditorialItemLink article={article}>
        <Spacer mt={1} />

        <Box pr={10}>
          <Text variant={variants.primary} as="h4">
            {article.title}
          </Text>

          <Spacer mt={5} />

          <Text variant="md" color="black60">
            {article.publishedAt}
          </Text>
        </Box>
      </FairEditorialItemLink>
    </Box>
  )
}

export const FairEditorialItemFragmentContainer = createFragmentContainer(
  FairEditorialItem,
  {
    article: graphql`
      fragment FairEditorialItem_article on Article {
        id
        title
        publishedAt(format: "MMMM D, YYYY")
        thumbnailTitle
        thumbnailImage {
          large: cropped(width: 670, height: 720) {
            width
            height
            src
            srcSet
          }
          small: cropped(width: 325, height: 240) {
            width
            height
            src
            srcSet
          }
        }
        ...FairEditorialItemLink_article
      }
    `,
  }
)
