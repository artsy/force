import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { FairSubApp_fair } from "v2/__generated__/FairSubApp_fair.graphql"
import { Separator } from "@artsy/palette"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import { ErrorPage } from "v2/Components/ErrorPage"
import { BackLink } from "v2/Components/Links/BackLink"

interface FairAppProps {
  fair: FairSubApp_fair
}

const FairApp: React.FC<FairAppProps> = ({ children, fair }) => {
  if (!fair) return <ErrorPage code={404} />

  return (
    <>
      <AppContainer>
        <HorizontalPadding>
          <BackLink my={3} to={`/fair2/${fair.slug}`}>
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
      id
      name
      slug
    }
  `,
})
