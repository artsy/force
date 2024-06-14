import {
  ActionType,
  ClickedShowGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Skeleton } from "@artsy/palette"
import { compact } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CellShowPlaceholder } from "Components/Cells/CellShow"
import { Rail } from "Components/Rail/Rail"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useTracking } from "react-tracking"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { HomeFeaturedShowsRailQuery } from "__generated__/HomeFeaturedShowsRailQuery.graphql"
import { HomeFeaturedShowsRail_orderedSet$data } from "__generated__/HomeFeaturedShowsRail_orderedSet.graphql"
import { HomeFeaturedShowFragmentContainer } from "./HomeFeaturedShow"

interface HomeFeaturedShowsRailProps {
  orderedSet: HomeFeaturedShowsRail_orderedSet$data
}

const HomeFeaturedShowsRail: React.FC<HomeFeaturedShowsRailProps> = ({
  orderedSet,
}) => {
  const { trackEvent } = useTracking()

  const shows = compact(orderedSet.items).flatMap(item =>
    item.__typename === "Show" ? [item] : []
  )

  if (shows.length === 0) {
    return null
  }

  return (
    <Rail
      alignItems="flex-start"
      title="Featured Shows"
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
      title="Featured Shows"
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
