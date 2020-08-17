import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairOverview_fair } from "v2/__generated__/FairOverview_fair.graphql"
import { FairHeaderFragmentContainer } from "../Components/FairHeader"

interface FairOverviewProps {
  fair: FairOverview_fair
}

const FairOverview: React.FC<FairOverviewProps> = ({ fair }) => {
  return (
    <>
      <FairHeaderFragmentContainer fair={fair} />
    </>
  )
}

export const FairOverviewFragmentContainer = createFragmentContainer(
  FairOverview,
  {
    fair: graphql`
      fragment FairOverview_fair on Fair {
        ...FairHeader_fair
      }
    `,
  }
)

// Top-level route needs to be exported for bundle splitting in the router
export default FairOverviewFragmentContainer
