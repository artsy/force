import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { FairSubApp_fair } from "v2/__generated__/FairSubApp_fair.graphql"
import { Separator } from "@artsy/palette"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import { BackLink } from "v2/Components/Links/BackLink"
import { FairMetaFragmentContainer as FairMeta } from "./Components/FairMeta"
import { useSystemContext } from "v2/Artsy"
import { userIsAdmin } from "v2/Utils/user"
import { HttpError } from "found"

interface FairAppProps {
  fair: FairSubApp_fair
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

      <AppContainer>
        <HorizontalPadding>
          <BackLink my={3} to={`/fair/${fair.slug}`}>
            Back to {fair.name}
          </BackLink>

          {children}

          <Separator as="hr" my={3} />

          <Footer />
        </HorizontalPadding>
      </AppContainer>
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default createFragmentContainer(FairApp, {
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
