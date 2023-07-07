import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnerViewingRooms_currentViewingRooms$data } from "__generated__/PartnerViewingRooms_currentViewingRooms.graphql"
import { PartnerViewingRooms_upcomingViewingRooms$data } from "__generated__/PartnerViewingRooms_upcomingViewingRooms.graphql"
import { PartnerViewingRooms_pastViewingRooms$data } from "__generated__/PartnerViewingRooms_pastViewingRooms.graphql"
import { PartnerViewingRoomsGridFragmentContainer } from "Apps/Partner/Components/PartnerViewingRooms/PartnerViewingRoomsGrid"
import { Spacer } from "@artsy/palette"

interface PartnerViewingRoomsProps {
  currentViewingRooms: PartnerViewingRooms_currentViewingRooms$data
  upcomingViewingRooms: PartnerViewingRooms_upcomingViewingRooms$data
  pastViewingRooms: PartnerViewingRooms_pastViewingRooms$data
}

export const PartnerViewingRooms: React.FC<PartnerViewingRoomsProps> = ({
  currentViewingRooms,
  upcomingViewingRooms,
  pastViewingRooms,
}) => {
  return (
    <>
      <Spacer y={4} />
      <PartnerViewingRoomsGridFragmentContainer
        viewingRoomsConnection={currentViewingRooms}
        sectionTitle="Current Viewing Rooms"
      />
      <Spacer y={6} />
      <PartnerViewingRoomsGridFragmentContainer
        viewingRoomsConnection={upcomingViewingRooms}
        sectionTitle="Upcoming Viewing Rooms"
      />
      <Spacer y={6} />
      <PartnerViewingRoomsGridFragmentContainer
        viewingRoomsConnection={pastViewingRooms}
        sectionTitle="Past Viewing Rooms"
      />
    </>
  )
}

export const PartnerViewingRoomsFragmentContainer = createFragmentContainer(
  PartnerViewingRooms,
  {
    currentViewingRooms: graphql`
      fragment PartnerViewingRooms_currentViewingRooms on Partner {
        ...PartnerViewingRoomsGrid_viewingRoomsConnection
          @arguments(count: 12, statuses: [live])
      }
    `,
    upcomingViewingRooms: graphql`
      fragment PartnerViewingRooms_upcomingViewingRooms on Partner {
        ...PartnerViewingRoomsGrid_viewingRoomsConnection
          @arguments(count: 12, statuses: [scheduled])
      }
    `,
    pastViewingRooms: graphql`
      fragment PartnerViewingRooms_pastViewingRooms on Partner {
        ...PartnerViewingRoomsGrid_viewingRoomsConnection
          @arguments(count: 12, statuses: [closed])
      }
    `,
  }
)
