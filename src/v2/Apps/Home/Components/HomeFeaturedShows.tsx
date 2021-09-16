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
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useLazyLoadComponent } from "v2/Utils/Hooks/useLazyLoadComponent"
import { HomeFeaturedShowsQuery } from "v2/__generated__/HomeFeaturedShowsQuery.graphql"
import { HomeFeaturedShows_orderedSet } from "v2/__generated__/HomeFeaturedShows_orderedSet.graphql"
import { HomeFeaturedShowFragmentContainer } from "./HomeFeaturedShow"

const SHOWS_LIMIT = 6

interface HomeFeaturedShowsProps {
  orderedSet: HomeFeaturedShows_orderedSet
}

const HomeFeaturedShows: React.FC<HomeFeaturedShowsProps> = ({
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
    <HomeFeaturedShowsContainer showsCount={shows.length}>
      <Shelf alignItems="flex-start">
        {shows.map((show, index) => {
          return (
            <React.Fragment key={index}>
              <HomeFeaturedShowFragmentContainer show={show} />
            </React.Fragment>
          )
        })}
      </Shelf>
    </HomeFeaturedShowsContainer>
  )
}

const HomeFeaturedShowsContainer: React.FC<{ showsCount: number }> = ({
  children,
  showsCount,
}) => {
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
        >
          Explore All Shows
        </Text>
      </Flex>

      <Spacer mt={4} />

      {children}
    </>
  )
}

export const HomeFeaturedShowsFragmentContainer = createFragmentContainer(
  HomeFeaturedShows,
  {
    orderedSet: graphql`
      fragment HomeFeaturedShows_orderedSet on OrderedSet {
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
  <HomeFeaturedShowsContainer>
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
  </HomeFeaturedShowsContainer>
)

export const HomeFeaturedShowsQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeFeaturedShowsQuery>
      environment={relayEnvironment}
      query={graphql`
        query HomeFeaturedShowsQuery {
          orderedSet(id: "530ebe92139b21efd6000071") {
            ...HomeFeaturedShows_orderedSet
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
            <HomeFeaturedShowsFragmentContainer orderedSet={props.orderedSet} />
          )
        }

        return null
      }}
    />
  )
}

export const HomeFeaturedShowsLazyQueryRenderer: React.FC = () => {
  const { Waypoint, isEnteredView } = useLazyLoadComponent()

  return (
    <>
      <Waypoint />

      {isEnteredView ? <HomeFeaturedShowsQueryRenderer /> : PLACEHOLDER}
    </>
  )
}
