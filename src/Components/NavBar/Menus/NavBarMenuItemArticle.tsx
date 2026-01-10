import {
  ActionType,
  type ClickedArticleGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Flex, Image, ResponsiveBox, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { getENV } from "Utils/getENV"
import type { NavBarMenuItemArticleQuery } from "__generated__/NavBarMenuItemArticleQuery.graphql"
import type { NavBarMenuItemArticle_article$key } from "__generated__/NavBarMenuItemArticle_article.graphql"
import type { FC, PropsWithChildren } from "react"
import { graphql, useFragment, useLazyLoadQuery } from "react-relay"
import { useTracking } from "react-tracking"

interface NavBarMenuItemArticleProps {
  text: string
  articles: NavBarMenuItemArticle_article$key
}

const NavBarMenuItemArticle: FC<
  PropsWithChildren<NavBarMenuItemArticleProps>
> = ({ articles, text }) => {
  const { trackEvent } = useTracking()
  const data = useFragment(fragment, articles)
  const article = data?.[0]

  if (!article.thumbnailImage?.cropped) {
    return null
  }

  const image = article.thumbnailImage.cropped

  return (
    <RouterLink
      key={article.internalID}
      to={article.href ?? ""}
      display="block"
      textDecoration="none"
      onClick={() => {
        const trackingEvent: ClickedArticleGroup = {
          action: ActionType.clickedArticleGroup,
          context_module: ContextModule.navBar,
          // TODO: check with data the best owner type, navBar is not in Cohesion as OwnerType
          context_page_owner_type: OwnerType.home,
          context_page_owner_id: article.internalID,
          destination_page_owner_type: OwnerType.article,
          type: "thumbnail",
        }
        trackEvent(trackingEvent)
      }}
    >
      <Flex
        borderLeftWidth={1}
        borderLeftColor="mono60"
        borderLeftStyle="solid"
        gap={1}
        paddingLeft={2}
        flexDirection="column"
        maxWidth={360}
      >
        <Text>{text}</Text>

        <ResponsiveBox
          aspectWidth={image.width}
          aspectHeight={image.height}
          maxWidth={360}
          maxHeight={400}
        >
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
            height="100%"
            lazyLoad
          />
        </ResponsiveBox>

        <Text color="mono60" variant="xs">
          {article.vertical}
        </Text>
        <Text variant="xs">{article.title}</Text>
      </Flex>
    </RouterLink>
  )
}

const fragment = graphql`
  fragment NavBarMenuItemArticle_article on Article @relay(plural: true) {
    internalID
    href
    vertical
    title
    thumbnailImage {
      cropped(width: 670, height: 720) {
        width
        height
        src
        srcSet
      }
    }
  }
`

const query = graphql`
  query NavBarMenuItemArticleQuery($isMobile: Boolean!) {
    articles(
      featured: true
      published: true
      sort: PUBLISHED_AT_DESC
      limit: 1
    ) @skip(if: $isMobile) {
      ...NavBarMenuItemArticle_article
    }
  }
`

export const NavBarMenuItemArticleQueryRenderer: FC<{ text: string }> = ({
  text,
}) => {
  const isMobile = getENV("IS_MOBILE")
  const data = useLazyLoadQuery<NavBarMenuItemArticleQuery>(query, {
    isMobile,
  })

  if (isMobile || !data.articles) {
    return null
  }

  return <NavBarMenuItemArticle articles={data.articles} text={text} />
}
