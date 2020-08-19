import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairOverview_fair } from "v2/__generated__/FairOverview_fair.graphql"
import { FairAboveFoldFragmentContainer as FairAboveFold } from "../Components/FairAboveFold"

interface FairOverviewProps {
  fair: FairOverview_fair
}

const FairOverview: React.FC<FairOverviewProps> = ({ fair }) => {
  return (
    <>
      <FairAboveFold fair={fair} />
    </>
  )
}

export const FairOverviewFragmentContainer = createFragmentContainer(
  FairOverview,
  {
    fair: graphql`
      fragment FairOverview_fair on Fair {
        ...FairAboveFold_fair
      }
    `,
  }
)

// Top-level route needs to be exported for bundle splitting in the router
export default FairOverviewFragmentContainer
