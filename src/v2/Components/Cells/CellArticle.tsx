import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CellArticle_article } from "v2/__generated__/CellArticle_article.graphql"
import {
  Box,
  Image,
  ResponsiveBox,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { RouterLink, RouterLinkProps } from "v2/System/Router/RouterLink"
import { DEFAULT_CELL_WIDTH } from "./constants"

export interface CellArticleProps extends Omit<RouterLinkProps, "to"> {
  article: CellArticle_article
  /** Defaults to `"RAIL"` */
  mode?: "GRID" | "RAIL"
}

const CellArticle: FC<CellArticleProps> = ({ article, mode, ...rest }) => {
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

      <Text variant="xs" textTransform="uppercase" mt={1}>
        {article.vertical}
      </Text>

      <Text variant="lg" mt={0.5} lineClamp={3}>
        {article.title}
      </Text>

      <Text variant="md" mt={0.5} lineClamp={1}>
        By {article.byline}
      </Text>

      <Text variant="md" color="black60" mt={0.5}>
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

type CellArticlePlaceholderProps = Pick<CellArticleProps, "mode">

export const CellArticlePlaceholder: FC<CellArticlePlaceholderProps> = ({
  mode = "RAIL",
}) => {
  const width = mode === "GRID" ? "100%" : DEFAULT_CELL_WIDTH

  return (
    <Box width={width}>
      <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
        <SkeletonBox width="100%" height="100%" />
      </ResponsiveBox>

      <SkeletonText variant="xs" textTransform="uppercase" mt={1}>
        Vertical
      </SkeletonText>

      <SkeletonText variant="lg" mt={0.5} lineClamp={3}>
        The Example Article Title Longer Than The Line
      </SkeletonText>

      <SkeletonText variant="md" mt={0.5} lineClamp={1}>
        By Example Name
      </SkeletonText>

      <SkeletonText variant="md" mt={0.5}>
        Jan 1, 1970
      </SkeletonText>
    </Box>
  )
}
