import { Column, GridColumns, Join, Separator, Spacer } from "@artsy/palette"
import type { ViewingRoomStatementRoute_viewingRoom$data } from "__generated__/ViewingRoomStatementRoute_viewingRoom.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewWorksButton } from "./Components/ViewWorksButton"
import { ViewingRoomBodyFragmentContainer as ViewingRoomBody } from "./Components/ViewingRoomBody"
import { ViewingRoomIntroFragmentContainer as ViewingRoomIntro } from "./Components/ViewingRoomIntro"
import { ViewingRoomPullQuoteFragmentContainer as ViewingRoomPullQuote } from "./Components/ViewingRoomPullQuote"
import { ViewingRoomSubsectionsFragmentContainer as ViewingRoomSubsections } from "./Components/ViewingRoomSubsections"
import { ViewingRoomWorksFragmentContainer as ViewingRoomWorks } from "./Components/ViewingRoomWorks"

interface ViewingRoomStatementRouteProps {
  viewingRoom: ViewingRoomStatementRoute_viewingRoom$data
}

const StatementRoute: React.FC<
  React.PropsWithChildren<ViewingRoomStatementRouteProps>
> = ({ viewingRoom }) => {
  return (
    <GridColumns gridRowGap={4}>
      <Column span={6} start={4}>
        <Join separator={<Spacer y={4} />}>
          <ViewingRoomIntro viewingRoom={viewingRoom} />

          <ViewingRoomWorks viewingRoom={viewingRoom} />

          <Separator />

          <ViewingRoomPullQuote viewingRoom={viewingRoom} />

          <ViewingRoomBody viewingRoom={viewingRoom} />

          {viewingRoom.subsections.length > 0 && (
            <ViewingRoomSubsections viewingRoom={viewingRoom} />
          )}
        </Join>
      </Column>

      <Column start={4} span={2}>
        <ViewWorksButton
          artworksCount={viewingRoom.artworksConnection?.totalCount ?? 0}
        />
      </Column>
    </GridColumns>
  )
}

export const ViewingRoomStatementRouteFragmentContainer =
  createFragmentContainer(StatementRoute, {
    viewingRoom: graphql`
      fragment ViewingRoomStatementRoute_viewingRoom on ViewingRoom {
        ...ViewingRoomIntro_viewingRoom
        ...ViewingRoomWorks_viewingRoom
        ...ViewingRoomPullQuote_viewingRoom
        ...ViewingRoomBody_viewingRoom
        ...ViewingRoomSubsections_viewingRoom
        artworksConnection(first: 2) {
          totalCount
        }
        subsections {
          internalID
        }
      }
    `,
  })
