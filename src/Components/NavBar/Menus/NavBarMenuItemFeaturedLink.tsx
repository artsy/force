import type { ClickedNavigationDropdownItem } from "@artsy/cohesion"
import {
  Column,
  Flex,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { NavBarMenuItemFeaturedLinkQuery } from "__generated__/NavBarMenuItemFeaturedLinkQuery.graphql"
import type { NavBarMenuItemFeaturedLink_orderedSet$key } from "__generated__/NavBarMenuItemFeaturedLink_orderedSet.graphql"
import { compact } from "lodash"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface NavBarMenuItemFeaturedLinkProps {
  setKey: string
  headerText: string
  contextModule: string
  parentNavigationItem: string
  /** Whether the dropdown is currently visible - used to defer image loading */
  isVisible?: boolean
}

export const NavBarMenuItemFeaturedLinkQueryRenderer: FC<
  NavBarMenuItemFeaturedLinkProps
> = ({ setKey, headerText, contextModule, parentNavigationItem }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<NavBarMenuItemFeaturedLinkQuery>
      environment={relayEnvironment}
      query={query}
      variables={{ key: setKey }}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return null
        }

        const orderedSet = props.orderedSets?.[0]

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
      }}
    />
  )
}

interface NavBarMenuItemFeaturedLinkInnerProps {
  orderedSet: NavBarMenuItemFeaturedLink_orderedSet$key
  headerText: string
  contextModule: string
  parentNavigationItem: string
  /** Whether the dropdown is currently visible - used to defer image loading */
  isVisible?: boolean
}

const NavBarMenuItemFeaturedLink: FC<NavBarMenuItemFeaturedLinkInnerProps> = ({
  orderedSet: orderedSetKey,
  headerText,
  contextModule,
  parentNavigationItem,
  isVisible,
}) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()
  const orderedSet = useFragment(fragment, orderedSetKey)

  const featuredLinks = compact(orderedSet.items).flatMap(item =>
    item.__typename === "FeaturedLink" ? [item] : [],
  )
  const featuredLink = featuredLinks[0]

  if (!featuredLink || !featuredLink.image?.cropped) {
    return null
  }

  return (
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
        to={featuredLink.href ?? ""}
        display="flex"
        flexDirection="column"
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
        <ResponsiveBox
          aspectWidth={featuredLink.image.cropped.width ?? 1}
          aspectHeight={featuredLink.image.cropped.height ?? 1}
          maxWidth="100%"
          bg="mono10"
        >
          {isVisible && (
            <Image
              src={featuredLink.image.cropped.src}
              srcSet={featuredLink.image.cropped.srcSet}
              width="100%"
              height="100%"
            />
          )}
        </ResponsiveBox>

        <Spacer y={2} />

        <Text color="mono60" variant={["xs", "xs", "sm"]} lineHeight="20px">
          {featuredLink.subtitle}
        </Text>

        <Text color="mono100" variant={["xs", "xs", "sm"]} lineHeight="20px">
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

const query = graphql`
  query NavBarMenuItemFeaturedLinkQuery($key: String!) {
    orderedSets(key: $key) {
      ...NavBarMenuItemFeaturedLink_orderedSet
    }
  }
`

export const NavBarMenuItemFeaturedLinkWithColumn: FC<
  NavBarMenuItemFeaturedLinkProps & {
    onDataLoaded?: (hasData: boolean) => void
  }
> = props => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<NavBarMenuItemFeaturedLinkQuery>
      environment={relayEnvironment}
      query={query}
      variables={{ key: props.setKey }}
      render={({ error, props: data }) => {
        if (error) {
          console.error(error)
          props.onDataLoaded?.(false)
          return null
        }

        if (!data) {
          return <Column span={4} />
        }

        const orderedSet = data.orderedSets?.[0]

        if (!orderedSet) {
          props.onDataLoaded?.(false)
          return null
        }

        props.onDataLoaded?.(true)

        return (
          <Column span={4} px={2}>
            <NavBarMenuItemFeaturedLink
              orderedSet={orderedSet}
              headerText={props.headerText}
              contextModule={props.contextModule}
              parentNavigationItem={props.parentNavigationItem}
              isVisible={props.isVisible}
            />
          </Column>
        )
      }}
    />
  )
}
