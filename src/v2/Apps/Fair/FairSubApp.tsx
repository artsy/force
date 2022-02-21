import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairSubApp_fair$data } from "v2/__generated__/FairSubApp_fair.graphql"
import { BackLink } from "v2/Components/Links/BackLink"
import { FairMetaFragmentContainer as FairMeta } from "./Components/FairMeta"
import { useSystemContext } from "v2/System"
import { userIsAdmin } from "v2/Utils/user"
import { HttpError } from "found"

interface FairAppProps {
  fair: FairSubApp_fair$data
}

const FairApp: React.FC<FairAppProps> = ({ children, fair }) => {
  // If a fair's profile is inaccessible, that means it's private, which in turn means
  // the fair is only visible to admins.
  const { user } = useSystemContext()
  if (!fair.profile && !userIsAdmin(user)) {
    throw new HttpError(404)
  }

  return (
    <>
      <FairMeta fair={fair} />

      <BackLink my={2} to={`/fair/${fair.slug}`}>
        Back to {fair.name}
      </BackLink>

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
      slug
      profile {
        __typename
      }
    }
  `,
})
