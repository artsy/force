import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CellArticle_article$data } from "__generated__/CellArticle_article.graphql"
import {
  Box,
  BoxProps,
  Image,
  ResponsiveBox,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { RouterLink, RouterLinkProps } from "System/Components/RouterLink"
import { DEFAULT_CELL_WIDTH } from "./constants"

export interface CellArticleProps extends Omit<RouterLinkProps, "to"> {
  article: CellArticle_article$data
  /** Defaults to `"RAIL"` */
  mode?: "GRID" | "RAIL"
  displayByline?: boolean
}

const CellArticle: FC<CellArticleProps> = ({
  article,
  mode,
  displayByline = true,
  ...rest
}) => {
  const width = mode === "GRID" ? "100%" : DEFAULT_CELL_WIDTH
  const image = article.thumbnailImage?.cropped

  return (
    <RouterLink
      to={article.href}
      display="block"
      textDecoration="none"
      width={width}
      {...rest}
    >
      <ResponsiveBox
        aspectWidth={4}
        aspectHeight={3}
        maxWidth="100%"
        bg="black10"
      >
        {image && (
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
            height="100%"
            alt=""
            lazyLoad
          />
        )}
      </ResponsiveBox>

      <Text variant="xs" fontWeight="bold" mt={1}>
        {article.vertical}
      </Text>

      <Text variant="lg-display" mt={0.5} lineClamp={3}>
        {article.thumbnailTitle ?? article.title}
      </Text>

      {displayByline && (
        <Text variant="sm-display" mt={0.5} lineClamp={1}>
          By {article.byline}
        </Text>
      )}

      <Text variant="sm-display" color="black60" mt={0.5}>
        {article.publishedAt}
      </Text>
    </RouterLink>
  )
}

export const CellArticleFragmentContainer = createFragmentContainer(
  CellArticle,
  {
    article: graphql`
      fragment CellArticle_article on Article {
        vertical
        title
        thumbnailTitle
        byline
        href
        publishedAt(format: "MMM D, YYYY")
        thumbnailImage {
          cropped(width: 445, height: 334) {
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

type CellArticlePlaceholderProps = Pick<CellArticleProps, "mode"> & BoxProps

export const CellArticlePlaceholder: FC<CellArticlePlaceholderProps> = ({
  mode = "RAIL",
  ...rest
}) => {
  const width = mode === "GRID" ? "100%" : DEFAULT_CELL_WIDTH

  return (
    <Box width={width} {...rest}>
      <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
        <SkeletonBox width="100%" height="100%" />
      </ResponsiveBox>

      <SkeletonText variant="xs" mt={1}>
        Vertical
      </SkeletonText>

      <SkeletonText variant="lg-display" mt={0.5} lineClamp={3}>
        The Example Article Title Longer Than The Line
      </SkeletonText>

      <SkeletonText variant="sm-display" mt={0.5} lineClamp={1}>
        By Example Name
      </SkeletonText>

      <SkeletonText variant="sm-display" mt={0.5}>
        Jan 1, 1970
      </SkeletonText>
    </Box>
  )
}
