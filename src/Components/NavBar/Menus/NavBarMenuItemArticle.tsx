import type { ClickedNavigationDropdownItem } from "@artsy/cohesion"
import { Box, Flex, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { NavBarMenuItemArticleQuery } from "__generated__/NavBarMenuItemArticleQuery.graphql"
import type { NavBarMenuItemArticle_article$key } from "__generated__/NavBarMenuItemArticle_article.graphql"
import type { FC } from "react"
import { graphql, useFragment, useLazyLoadQuery } from "react-relay"
import { useTracking } from "react-tracking"

interface NavBarMenuItemArticleProps {
  articleId: string
  headerText: string
  contextModule: string
  parentNavigationItem: string
}

export const NavBarMenuItemArticleQueryRenderer: FC<
  NavBarMenuItemArticleProps
> = ({ articleId, headerText, contextModule, parentNavigationItem }) => {
  const data = useLazyLoadQuery<NavBarMenuItemArticleQuery>(query, {
    articleId,
  })

  if (!data.article) {
    return null
  }

  return (
    <NavBarMenuItemArticle
      article={data.article}
      headerText={headerText}
      contextModule={contextModule}
      parentNavigationItem={parentNavigationItem}
    />
  )
}

interface NavBarMenuItemArticleInnerProps {
  article: NavBarMenuItemArticle_article$key
  headerText: string
  contextModule: string
  parentNavigationItem: string
}

const NavBarMenuItemArticle: FC<NavBarMenuItemArticleInnerProps> = ({
  article: articleKey,
  headerText,
  contextModule,
  parentNavigationItem,
}) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()
  const article = useFragment(fragment, articleKey)

  const image = article.thumbnailImage?.resized

  if (!image) {
    return null
  }

  return (
    <Flex
      borderLeftWidth={1}
      borderLeftColor="mono30"
      borderLeftStyle="solid"
      gap={1}
      pl={4}
      pb={4}
      flexDirection="column"
    >
      <Text variant="sm-display" mb={0.5}>
        {headerText}
      </Text>

      <RouterLink
        to={article.href ?? ""}
        display="block"
        textDecoration="none"
        onClick={() => {
          trackEvent({
            action: "click",
            flow: "Header",
            // @ts-expect-error - ContextModule types between deprecated and new schema
            context_module: contextModule,
            context_page_owner_type: contextPageOwnerType!,
            context_page_owner_id: contextPageOwnerId,
            context_page_owner_slug: contextPageOwnerSlug,
            parent_navigation_item: parentNavigationItem,
            dropdown_group: headerText,
            subject: article.title || "",
            destination_path: article.href || "",
          } satisfies ClickedNavigationDropdownItem)
        }}
      >
        <Box maxHeight={400} overflow="hidden" mb={2}>
          <img
            src={image.src}
            srcSet={image.srcSet}
            alt=""
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </Box>

        <Text color="mono60" variant="sm">
          {article.vertical}
        </Text>
        <Text color="mono100" variant="sm">
          {article.title}
        </Text>
      </RouterLink>
    </Flex>
  )
}

const fragment = graphql`
  fragment NavBarMenuItemArticle_article on Article {
    internalID
    href
    vertical
    title
    thumbnailImage {
      resized(height: 400) {
        src
        srcSet
      }
    }
  }
`

const query = graphql`
  query NavBarMenuItemArticleQuery($articleId: String!) {
    article(id: $articleId) {
      ...NavBarMenuItemArticle_article
    }
  }
`
