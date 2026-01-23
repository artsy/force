import type { ClickedNavigationDropdownItem } from "@artsy/cohesion"
import { Box, Flex, Image, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { NavBarMenuItemFeaturedLinkQuery } from "__generated__/NavBarMenuItemFeaturedLinkQuery.graphql"
import type { NavBarMenuItemFeaturedLink_orderedSet$key } from "__generated__/NavBarMenuItemFeaturedLink_orderedSet.graphql"
import { compact } from "lodash"
import type { FC } from "react"
import { graphql, useFragment, useLazyLoadQuery } from "react-relay"
import { useTracking } from "react-tracking"

interface NavBarMenuItemFeaturedLinkProps {
  setKey: string
  headerText: string
  contextModule: string
  parentNavigationItem: string
}

export const NavBarMenuItemFeaturedLinkQueryRenderer: FC<
  NavBarMenuItemFeaturedLinkProps
> = ({ setKey, headerText, contextModule, parentNavigationItem }) => {
  const data = useLazyLoadQuery<NavBarMenuItemFeaturedLinkQuery>(query, {
    key: setKey,
  })

  // Get first ordered set from the array
  const orderedSet = data.orderedSets?.[0]

  if (!orderedSet) {
    return null
  }

  return (
    <NavBarMenuItemFeaturedLink
      orderedSet={orderedSet}
      headerText={headerText}
      contextModule={contextModule}
      parentNavigationItem={parentNavigationItem}
    />
  )
}

interface NavBarMenuItemFeaturedLinkInnerProps {
  orderedSet: NavBarMenuItemFeaturedLink_orderedSet$key
  headerText: string
  contextModule: string
  parentNavigationItem: string
}

const NavBarMenuItemFeaturedLink: FC<NavBarMenuItemFeaturedLinkInnerProps> = ({
  orderedSet: orderedSetKey,
  headerText,
  contextModule,
  parentNavigationItem,
}) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()
  const orderedSet = useFragment(fragment, orderedSetKey)

  // Extract first FeaturedLink (pattern from HomeFeaturedEventsRail)
  const featuredLinks = compact(orderedSet.items).flatMap(item =>
    item.__typename === "FeaturedLink" ? [item] : [],
  )
  const featuredLink = featuredLinks[0]

  if (!featuredLink || !featuredLink.image?.resized) {
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
        to={featuredLink.href ?? ""}
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
            subject: featuredLink.title || "",
            destination_path: featuredLink.href || "",
          } satisfies ClickedNavigationDropdownItem)
        }}
      >
        <Box maxHeight={400} mb={2}>
          <Image
            src={featuredLink.image.resized.src}
            srcSet={featuredLink.image.resized.srcSet}
            width="100%"
            height="auto"
            style={{ objectFit: "contain", objectPosition: "left" }}
            maxHeight={400}
            alt=""
          />
        </Box>

        <Text color="mono60" variant="sm">
          {featuredLink.subtitle}
        </Text>
        <Text color="mono100" variant="sm">
          {featuredLink.title}
        </Text>
      </RouterLink>
    </Flex>
  )
}

const fragment = graphql`
  fragment NavBarMenuItemFeaturedLink_orderedSet on OrderedSet {
    internalID
    itemType
    items {
      __typename
      ... on FeaturedLink {
        internalID
        title
        subtitle(format: PLAIN)
        href
        image {
          resized(height: 400, version: ["main", "wide", "large_rectangle"]) {
            src
            srcSet
          }
        }
      }
    }
  }
`

const query = graphql`
  query NavBarMenuItemFeaturedLinkQuery($key: String!) {
    orderedSets(key: $key) {
      ...NavBarMenuItemFeaturedLink_orderedSet
    }
  }
`
