import {
  ActionType,
  ClickedShowGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import {
  ResponsiveBox,
  Text,
  Spacer,
  Flex,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Shelf,
  Sup,
} from "@artsy/palette"
import { compact, take } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext, useTracking } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useLazyLoadComponent } from "v2/Utils/Hooks/useLazyLoadComponent"
import { HomeFeaturedShowsRailQuery } from "v2/__generated__/HomeFeaturedShowsRailQuery.graphql"
import { HomeFeaturedShowsRail_orderedSet } from "v2/__generated__/HomeFeaturedShowsRail_orderedSet.graphql"
import { HomeFeaturedShowFragmentContainer } from "./HomeFeaturedShow"

const SHOWS_LIMIT = 6

interface HomeFeaturedShowsRailProps {
  orderedSet: HomeFeaturedShowsRail_orderedSet
}

const HomeFeaturedShowsRail: React.FC<HomeFeaturedShowsRailProps> = ({
  orderedSet,
}) => {
  const shows = take(
    compact(orderedSet.items).flatMap(item =>
      item.__typename === "Show" ? [item] : []
    ),
    SHOWS_LIMIT
  )

  if (shows.length === 0) return null

  return (
    <HomeFeaturedShowsRailContainer showsCount={shows.length}>
      <Shelf alignItems="flex-start">
        {shows.map((show, index) => {
          return (
            <React.Fragment key={index}>
              <HomeFeaturedShowFragmentContainer show={show} />
            </React.Fragment>
          )
        })}
      </Shelf>
    </HomeFeaturedShowsRailContainer>
  )
}

const HomeFeaturedShowsRailContainer: React.FC<{ showsCount: number }> = ({
  children,
  showsCount,
}) => {
  const { trackEvent } = useTracking()

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="lg">
          Featured shows{" "}
          {showsCount > 1 && <Sup color="brand">{showsCount}</Sup>}
        </Text>

        <Text
          variant="sm"
          as={RouterLink}
          // @ts-ignore
          to="/shows"
          onClick={() => {
            const trackingEvent: ClickedShowGroup = {
              action: ActionType.clickedShowGroup,
              context_module: ContextModule.featuredShowsRail,
              context_page_owner_type: OwnerType.home,
              destination_page_owner_type: OwnerType.shows,
              type: "viewAll",
            }
            trackEvent(trackingEvent)
          }}
        >
          Explore All Shows
        </Text>
      </Flex>

      <Spacer mt={4} />

      {children}
    </>
  )
}

export const HomeFeaturedShowsRailFragmentContainer = createFragmentContainer(
  HomeFeaturedShowsRail,
  {
    orderedSet: graphql`
      fragment HomeFeaturedShowsRail_orderedSet on OrderedSet {
        items {
          __typename
          ... on Show {
            internalID
            ...HomeFeaturedShow_show
          }
        }
      }
    `,
  }
)

const PLACEHOLDER = (
  <HomeFeaturedShowsRailContainer showsCount={0}>
    <Skeleton>
      <Shelf>
        {[...new Array(6)].map((_, i) => {
          return (
            <React.Fragment key={i}>
              <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
                <SkeletonBox width="100%" height="100%" />
              </ResponsiveBox>

              <Spacer mt={2} />

              <SkeletonText variant="lg" mr={1}>
                Show Title Typically Two Lines
              </SkeletonText>

              <SkeletonText variant="sm">Partner name</SkeletonText>

              <SkeletonText variant="sm">Jan 1–31</SkeletonText>
            </React.Fragment>
          )
        })}
      </Shelf>
    </Skeleton>
  </HomeFeaturedShowsRailContainer>
)

export const HomeFeaturedShowsRailQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeFeaturedShowsRailQuery>
      environment={relayEnvironment}
      query={graphql`
        query HomeFeaturedShowsRailQuery {
          orderedSet(id: "530ebe92139b21efd6000071") {
            ...HomeFeaturedShowsRail_orderedSet
          }
        }
      `}
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return PLACEHOLDER
        }

        if (props.orderedSet) {
          return (
            <HomeFeaturedShowsRailFragmentContainer
              orderedSet={props.orderedSet}
            />
          )
        }

        return null
      }}
    />
  )
}

export const HomeFeaturedShowsRailLazyQueryRenderer: React.FC = () => {
  const { Waypoint, isEnteredView } = useLazyLoadComponent()

  return (
    <>
      <Waypoint />

      {isEnteredView ? <HomeFeaturedShowsRailQueryRenderer /> : PLACEHOLDER}
    </>
  )
}
