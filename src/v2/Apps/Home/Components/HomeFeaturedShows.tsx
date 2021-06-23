import {
  GridColumns,
  Column,
  ResponsiveBox,
  Image,
  Text,
  Spacer,
  Flex,
  Skeleton,
  SkeletonBox,
  SkeletonText,
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
    <HomeFeaturedShowsContainer>
      <GridColumns gridRowGap={6}>
        {shows.map(show => {
          const image = show.coverImage?.cropped

          return (
            <Column key={show.internalID} span={4}>
              <RouterLink
                to={show.href ?? ""}
                style={{ display: "block", textDecoration: "none" }}
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
                    />
                  )}
                </ResponsiveBox>

                <Spacer mt={2} />

                <Text variant="xl" mr={1}>
                  {show.name}
                </Text>

                <Text variant="xl" color="black60">
                  {show.partner?.name}
                </Text>

                <Spacer mt={1} />

                <Text variant="sm">
                  {[show.startAt, show.endAt].filter(Boolean).join("–")}
                </Text>
              </RouterLink>
            </Column>
          )
        })}
      </GridColumns>
    </HomeFeaturedShowsContainer>
  )
}

const HomeFeaturedShowsContainer: React.FC = ({ children }) => {
  return (
    <>
      <Flex justifyContent="space-between">
        <Text variant="xl">Featured shows</Text>

        <Text
          variant="sm"
          as={RouterLink}
          // @ts-ignore
          to="/shows"
        >
          Explore all shows
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
            name
            href
            startAt(format: "MMM D")
            endAt(format: "D")
            partner {
              ... on Partner {
                name
              }
              ... on ExternalPartner {
                name
              }
            }
            coverImage {
              cropped(width: 600, height: 450) {
                src
                srcSet
              }
            }
          }
        }
      }
    `,
  }
)

const PLACEHOLDER = (
  <HomeFeaturedShowsContainer>
    <Skeleton>
      <GridColumns gridRowGap={6}>
        {[...new Array(6)].map((_, i) => {
          return (
            <Column key={i} span={4}>
              <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
                <SkeletonBox width="100%" height="100%" />
              </ResponsiveBox>

              <Spacer mt={2} />

              <SkeletonText variant="xl" mr={1}>
                Show Title Typically Two Lines
              </SkeletonText>

              <SkeletonText variant="xl">Partner name</SkeletonText>

              <Spacer mt={1} />

              <SkeletonText variant="sm">Jan 1–31</SkeletonText>
            </Column>
          )
        })}
      </GridColumns>
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
