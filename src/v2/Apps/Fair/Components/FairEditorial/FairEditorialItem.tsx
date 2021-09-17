import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { FairEditorialItem_article } from "v2/__generated__/FairEditorialItem_article.graphql"
import {
  Box,
  Text,
  Image,
  Spacer,
  ResponsiveBox,
  TextVariant,
  BoxProps,
} from "@artsy/palette"
import {
  ActionType,
  ClickedArticleGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/System/Analytics/AnalyticsContext"
import { RouterLink } from "v2/System/Router/RouterLink"

export interface FairEditorialItemProps extends BoxProps {
  article: FairEditorialItem_article
  size?: "large" | "small"
  isResponsive?: boolean
}

interface ItemImageProps {
  width?: number | string
  height?: number | string
}

export const FairEditorialItem: React.FC<FairEditorialItemProps> = ({
  article,
  size = "small",
  isResponsive = false,
  ...rest
}) => {
  const tracking = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const clickedArticleTrackingData: ClickedArticleGroup = {
    context_module: ContextModule.relatedArticles,
    context_page_owner_type: contextPageOwnerType!,
    context_page_owner_id: contextPageOwnerId,
    context_page_owner_slug: contextPageOwnerSlug,
    destination_page_owner_type: OwnerType.article,
    destination_page_owner_id: article.internalID,
    destination_page_owner_slug: article.slug!,
    type: "thumbnail",
    action: ActionType.clickedArticleGroup,
  }

  const image = article.thumbnailImage?.[size]!
  const variants = {
    large: {
      primary: ["xl", "xxl"] as TextVariant[],
    },
    small: {
      primary: ["lg", "lg", "xl"] as TextVariant[],
    },
  }[size]

  const ItemImage: React.FC<ItemImageProps> = ({
    width = "100%",
    height = "100%",
  }) => (
    <Image
      width={width}
      height={height}
      src={image.src}
      srcSet={image.srcSet}
      lazyLoad={true}
      alt={article.thumbnailTitle!}
    />
  )

  const ItemLink = ({ children }) => {
    return (
      <RouterLink
        to={article.href!}
        aria-label={`${article.title} (${article.publishedAt})`}
        textDecoration="none"
        style={{ display: "block" }}
        onClick={() => tracking.trackEvent(clickedArticleTrackingData)}
      >
        {children}
      </RouterLink>
    )
  }

  return (
    <Box {...rest}>
      {/* Devided link into separate parts in order to avoid linking via empty
        space when responsive box is applied */}
      <ItemLink>
        {isResponsive ? (
          <ResponsiveBox
            aspectWidth={image.width}
            aspectHeight={image.height}
            maxWidth="100%"
          >
            <ItemImage />
          </ResponsiveBox>
        ) : (
          <ItemImage width={image.width} height={image.height} />
        )}
      </ItemLink>

      <ItemLink>
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
      </ItemLink>
    </Box>
  )
}

export const FairEditorialItemFragmentContainer = createFragmentContainer(
  FairEditorialItem,
  {
    article: graphql`
      fragment FairEditorialItem_article on Article {
        id
        internalID
        slug
        title
        href
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
      }
    `,
  }
)
