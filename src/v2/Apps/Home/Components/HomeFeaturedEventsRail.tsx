import {
  Box,
  Image,
  Text,
  GridColumns,
  Column,
  ResponsiveBox,
  Flex,
} from "@artsy/palette"
import { compact, take } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { Media } from "v2/Utils/Responsive"
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
    <>
      <Text variant="lg" mb={4}>
        Featured
      </Text>

      <GridColumns gridRowGap={2}>
        {events.map((event, i) => {
          const image = event.image

          return (
            <Column key={event.internalID ?? i} span={3}>
              <RouterLink
                to={event.href ?? ""}
                style={{ display: "block", textDecoration: "none" }}
              >
                <Media lessThan="sm">
                  <Flex>
                    {image?.small ? (
                      <Image
                        src={image.small.src}
                        srcSet={image.small.srcSet}
                        width={image.small.width}
                        height={image.small.height}
                        alt=""
                        lazyLoad
                      />
                    ) : (
                      <Box bg="black10" width={95} height={63} />
                    )}

                    <Box ml={2}>
                      <Text variant="xs" textTransform="uppercase">
                        {event.title}
                      </Text>

                      <Text variant="lg">{event.subtitle}</Text>
                    </Box>
                  </Flex>
                </Media>

                <Media greaterThanOrEqual="sm">
                  <ResponsiveBox
                    aspectWidth={3}
                    aspectHeight={2}
                    maxWidth="100%"
                  >
                    {image?.large ? (
                      <Image
                        src={image.large.src}
                        srcSet={image.large.srcSet}
                        width="100%"
                        height="100%"
                        alt=""
                        lazyLoad
                      />
                    ) : (
                      <Box bg="black10" width="100%" height="100%" />
                    )}
                  </ResponsiveBox>

                  <Text variant="xs" textTransform="uppercase" mt={1}>
                    {event.title}
                  </Text>

                  <Text variant="lg">{event.subtitle}</Text>
                </Media>
              </RouterLink>
            </Column>
          )
        })}
      </GridColumns>
    </>
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
              small: cropped(width: 95, height: 63) {
                src
                srcSet
                width
                height
              }
              large: cropped(width: 445, height: 297) {
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
