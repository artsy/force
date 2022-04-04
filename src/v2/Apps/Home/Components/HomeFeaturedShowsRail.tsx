import {
  ActionType,
  ClickedShowGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Skeleton } from "@artsy/palette"
import { compact, take } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CellShowPlaceholder } from "v2/Components/Cells/CellShow"
import { Rail } from "v2/Components/Rail"
import { useSystemContext, useTracking } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
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
  const { trackEvent } = useTracking()

  const shows = take(
    compact(orderedSet.items).flatMap(item =>
      item.__typename === "Show" ? [item] : []
    ),
    SHOWS_LIMIT
  )

  if (shows.length === 0) {
    return null
  }

  return (
    <Rail
      alignItems="flex-start"
      title="Featured shows"
      countLabel={shows.length}
      viewAllLabel="Explore All Shows"
      viewAllHref="/shows"
      viewAllOnClick={() => {
        const trackingEvent: ClickedShowGroup = {
          action: ActionType.clickedShowGroup,
          context_module: ContextModule.featuredShowsRail,
          context_page_owner_type: OwnerType.home,
          destination_page_owner_type: OwnerType.shows,
          type: "viewAll",
        }

        trackEvent(trackingEvent)
      }}
      getItems={() => {
        return shows.map(show => {
          return (
            <HomeFeaturedShowFragmentContainer
              key={show.internalID}
              show={show}
            />
          )
        })
      }}
    />
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
            ...HomeFeaturedShow_show
            internalID
          }
        }
      }
    `,
  }
)

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Featured shows"
      viewAllLabel="Explore All Shows"
      viewAllHref="/shows"
      getItems={() => {
        return [...new Array(6)].map((_, i) => {
          return <CellShowPlaceholder key={i} />
        })
      }}
    />
  </Skeleton>
)

export const HomeFeaturedShowsRailQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeFeaturedShowsRailQuery>
      lazyLoad
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
