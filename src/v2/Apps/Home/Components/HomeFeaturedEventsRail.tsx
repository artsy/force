import {
  Flex,
  Box,
  Image,
  Text,
  Spacer,
  GridColumns,
  Column,
} from "@artsy/palette"
import { compact, take } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { HomeFeaturedEventsRail_orderedSet } from "v2/__generated__/HomeFeaturedEventsRail_orderedSet.graphql"

interface HomeFeaturedEventsRailProps {
  orderedSet: HomeFeaturedEventsRail_orderedSet
}

const HomeFeaturedEventsRail: React.FC<HomeFeaturedEventsRailProps> = ({
  orderedSet,
}) => {
  const events = take(
    compact(orderedSet.items).flatMap(item =>
      item.__typename === "FeaturedLink" ? [item] : []
    ),
    4
  )

  if (events.length === 0) return null

  return (
    <GridColumns>
      {events.map((event, i) => {
        const image = event.image?.cropped

        return (
          <Column key={event.internalID ?? i} span={3}>
            <RouterLink
              to={event.href ?? ""}
              style={{ display: "block", textDecoration: "none" }}
            >
              <Flex alignItems="center">
                <Box flexShrink={0}>
                  {image ? (
                    <Image
                      src={image.src}
                      srcSet={image.srcSet}
                      width={95}
                      height={63}
                      alt=""
                      lazyLoad
                    />
                  ) : (
                    <Box bg="black10" width={95} height={63} />
                  )}
                </Box>

                <Spacer ml={2} />

                <Flex flexDirection="column" justifyContent="center">
                  <Text variant="xs" color="black60">
                    {event.title}
                  </Text>

                  <Text variant="md">{event.subtitle}</Text>
                </Flex>
              </Flex>
            </RouterLink>
          </Column>
        )
      })}
    </GridColumns>
  )
}

export const HomeFeaturedEventsRailFragmentContainer = createFragmentContainer(
  HomeFeaturedEventsRail,
  {
    orderedSet: graphql`
      fragment HomeFeaturedEventsRail_orderedSet on OrderedSet {
        items {
          __typename
          ... on FeaturedLink {
            internalID
            title
            subtitle
            href
            image {
              # 3:2
              cropped(width: 95, height: 63) {
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
