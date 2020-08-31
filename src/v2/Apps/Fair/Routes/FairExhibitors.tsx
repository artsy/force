import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairExhibitors_fair } from "v2/__generated__/FairExhibitors_fair.graphql"
import { FairExhibitorRailFragmentContainer as FairExhibitorRail } from "../Components/FairExhibitorRail"

interface FairExhibitorsProps {
  fair: FairExhibitors_fair
}

const FairExhibitors: React.FC<FairExhibitorsProps> = ({ fair }) => {
  return (
    <>
      {fair.exhibitors.edges.map(({ show }) => {
        if (show.counts.artworks === 0) {
          // Skip rendering of booths without artworks
          return null
        }

        return <FairExhibitorRail key={show.id} show={show} my={3} />
      })}
    </>
  )
}

export const FairExhibitorsFragmentContainer = createFragmentContainer(
  FairExhibitors,
  {
    fair: graphql`
      fragment FairExhibitors_fair on Fair {
        id
        exhibitors: showsConnection(first: 30, sort: FEATURED_ASC) {
          edges {
            show: node {
              id
              counts {
                artworks
              }
              ...FairExhibitorRail_show
            }
          }
        }
      }
    `,
  }
)

// Top-level route needs to be exported for bundle splitting in the router
export default FairExhibitorsFragmentContainer
