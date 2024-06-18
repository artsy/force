import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairSubApp_fair$data } from "__generated__/FairSubApp_fair.graphql"
import { FairMetaFragmentContainer } from "./Components/FairMeta"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { userIsAdmin } from "Utils/user"
import { HttpError } from "found"
import { TopContextBar } from "Components/TopContextBar"

interface FairAppProps {
  fair: FairSubApp_fair$data
}

const FairApp: React.FC<FairAppProps> = ({ children, fair }) => {
  const { user } = useSystemContext()

  // If a fair's profile is inaccessible, that means it's private, which in turn means
  // the fair is only visible to admins.
  if (!fair.profile && !userIsAdmin(user)) {
    throw new HttpError(404)
  }

  return (
    <>
      <FairMetaFragmentContainer fair={fair} />

      <TopContextBar href={fair.href} displayBackArrow>
        Back to {fair.name}
      </TopContextBar>

      {children}
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export const FairSubAppFragmentContainer = createFragmentContainer(FairApp, {
  fair: graphql`
    fragment FairSubApp_fair on Fair {
      ...FairMeta_fair
      id
      name
      href
      profile {
        __typename
      }
    }
  `,
})
