import { Box, Image, Text, Spacer, Shelf } from "@artsy/palette"
import { compact } from "lodash"
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
  const events = compact(orderedSet.items).flatMap(item =>
    item.__typename === "FeaturedLink" ? [item] : []
  )

  if (events.length === 0) return null

  return (
    <>
      <Text variant="xl">Featured events</Text>

      <Spacer mt={4} />

      <Shelf>
        {events.map((event, i) => {
          const image = event.image?.cropped

          return (
            <RouterLink
              key={event.internalID ?? i}
              to={event.href ?? ""}
              style={{ display: "block", textDecoration: "none" }}
            >
              {image ? (
                <Image
                  src={image.src}
                  srcSet={image.srcSet}
                  width={325}
                  height={244}
                  alt=""
                  lazyLoad
                />
              ) : (
                <Box bg="black10" width={325} height={244} />
              )}

              <Spacer mt={1} />

              <Text variant="xs" textTransform="uppercase">
                {event.title}
              </Text>

              <Text variant="lg" mr={1} width={325}>
                {event.subtitle}
              </Text>
            </RouterLink>
          )
        })}
      </Shelf>
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
              cropped(width: 325, height: 244) {
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
