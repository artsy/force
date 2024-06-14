import {
  ActionType,
  ClickedPromoSpace,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import {
  Box,
  Image,
  Text,
  GridColumns,
  Column,
  ResponsiveBox,
  Stack,
} from "@artsy/palette"
import { compact, take } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { RouterLink } from "System/Components/RouterLink"
import { Media } from "Utils/Responsive"
import { HomeFeaturedEventsRail_orderedSet$data } from "__generated__/HomeFeaturedEventsRail_orderedSet.graphql"

interface HomeFeaturedEventsRailProps {
  orderedSet: HomeFeaturedEventsRail_orderedSet$data
}

const HomeFeaturedEventsRail: React.FC<HomeFeaturedEventsRailProps> = ({
  orderedSet,
}) => {
  const { trackEvent } = useTracking()

  const events = take(
    compact(orderedSet.items).flatMap(item =>
      item.__typename === "FeaturedLink" ? [item] : []
    ),
    4
  )

  if (events.length === 0) return null

  return (
    <>
      <Text variant="lg-display" mb={4}>
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
                onClick={() => {
                  const trackingEvent: ClickedPromoSpace = {
                    action: ActionType.clickedPromoSpace,
                    context_module: ContextModule.featuredRail,
                    context_screen_owner_type: OwnerType.home,
                    destination_path: event.href ?? "",
                    subject: "clicking on an item in featured rail",
                  }
                  trackEvent(trackingEvent)
                }}
              >
                <Media lessThan="sm">
                  <Stack gap={2} flexDirection="row">
                    <Box flexShrink={0}>
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
                        <Box bg="black10" width={80} height={80} />
                      )}
                    </Box>

                    <Box>
                      <Text variant="xs">{event.title}</Text>

                      <Text variant="lg-display" lineClamp={2}>
                        {event.subtitle}
                      </Text>
                    </Box>
                  </Stack>
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

                  <Text variant="xs" mt={1}>
                    {event.title}
                  </Text>

                  <Text variant="lg-display">{event.subtitle}</Text>
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
              small: cropped(
                width: 80
                height: 80
                version: ["main", "wide", "large_rectangle"]
              ) {
                src
                srcSet
                width
                height
              }
              large: cropped(
                width: 445
                height: 297
                version: ["main", "wide", "large_rectangle"]
              ) {
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
