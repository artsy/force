import type { ClickedNavigationDropdownItem } from "@artsy/cohesion"
import type * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  Column,
  Flex,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { compact } from "lodash"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { NavBarMenuItemFeaturedLinkColumn_featuredLinkData$key } from "__generated__/NavBarMenuItemFeaturedLinkColumn_featuredLinkData.graphql"

export interface NavBarMenuItemFeaturedLinkColumnProps {
  orderedSet: NavBarMenuItemFeaturedLinkColumn_featuredLinkData$key
  contextModule: DeprecatedAnalyticsSchema.ContextModule
  label: string
  headerText?: string
  /** Whether the dropdown is currently visible - used to defer image loading */
  isVisible?: boolean
}

export const NavBarMenuItemFeaturedLinkColumn: React.FC<
  NavBarMenuItemFeaturedLinkColumnProps
> = ({
  orderedSet: orderedSetKey,
  contextModule,
  label,
  headerText,
  isVisible,
}) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const orderedSetData = useFragment(FEATURED_LINK_DATA_FRAGMENT, orderedSetKey)

  const featuredLinks = compact(orderedSetData.items).flatMap(item =>
    item.__typename === "FeaturedLink" ? [item] : [],
  )
  const item = featuredLinks[0]

  if (!item || !item.image?.cropped) {
    return null
  }

  const handleClick = () => {
    trackEvent({
      action: "click",
      flow: "Header",
      // @ts-expect-error - ContextModule types between deprecated and new schema
      context_module: contextModule,
      context_page_owner_type: contextPageOwnerType!,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      parent_navigation_item: label,
      dropdown_group: headerText,
      subject: item.title || "",
      destination_path: item.href || "",
    } satisfies ClickedNavigationDropdownItem)
  }

  return (
    <Column span={4} px={2}>
      <Flex
        borderLeftWidth={1}
        borderLeftColor="mono30"
        borderLeftStyle="solid"
        gap={1}
        pl={4}
        pr={[0, 0, 4]}
        pb={4}
        flexDirection="column"
      >
        <Text variant={["xs", "xs", "sm"]} mb={0.5}>
          {headerText}
        </Text>

        <RouterLink
          to={item.href ?? ""}
          display="flex"
          flexDirection="column"
          textDecoration="none"
          onClick={handleClick}
        >
          <ResponsiveBox
            aspectWidth={item.image.cropped.width ?? 1}
            aspectHeight={item.image.cropped.height ?? 1}
            maxWidth="100%"
            bg="mono10"
          >
            {isVisible && (
              <Image
                src={item.image.cropped.src}
                srcSet={item.image.cropped.srcSet}
                width="100%"
                height="100%"
              />
            )}
          </ResponsiveBox>

          <Spacer y={2} />

          <Text color="mono60" variant={["xs", "xs", "sm"]}>
            {item.subtitle}
          </Text>

          <Text color="mono100" variant={["xs", "xs", "sm"]}>
            {item.title}
          </Text>
        </RouterLink>
      </Flex>
    </Column>
  )
}

const FEATURED_LINK_DATA_FRAGMENT = graphql`
  fragment NavBarMenuItemFeaturedLinkColumn_featuredLinkData on OrderedSet {
    items {
      __typename
      ... on FeaturedLink {
        title
        subtitle(format: PLAIN)
        href
        image {
          cropped(
            width: 400
            height: 400
            version: ["main", "wide", "large_rectangle"]
          ) {
            src
            srcSet
            width
            height
          }
        }
      }
    }
  }
`
