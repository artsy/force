import {
  ActionType,
  ClickedShowGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CellShowFragmentContainer } from "Components/Cells/CellShow"
import { useTracking } from "react-tracking"
import { HomeFeaturedShow_show$data } from "__generated__/HomeFeaturedShow_show.graphql"

interface HomeFeaturedShowProps {
  show: HomeFeaturedShow_show$data
}

const HomeFeaturedShow: React.FC<HomeFeaturedShowProps> = ({ show }) => {
  const { trackEvent } = useTracking()

  return (
    <CellShowFragmentContainer
      show={show}
      displayStatus
      onClick={() => {
        const trackingEvent: ClickedShowGroup = {
          action: ActionType.clickedShowGroup,
          context_module: ContextModule.featuredShowsRail,
          context_page_owner_type: OwnerType.home,
          destination_page_owner_id: show.internalID,
          destination_page_owner_slug: show.slug,
          destination_page_owner_type: OwnerType.show,
          type: "thumbnail",
        }
        trackEvent(trackingEvent)
      }}
    />
  )
}

export const HomeFeaturedShowFragmentContainer = createFragmentContainer(
  HomeFeaturedShow,
  {
    show: graphql`
      fragment HomeFeaturedShow_show on Show {
        ...CellShow_show
        internalID
        slug
      }
    `,
  }
)
