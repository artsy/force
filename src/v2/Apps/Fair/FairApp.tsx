import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { FairApp_fair } from "v2/__generated__/FairApp_fair.graphql"
import { Separator } from "@artsy/palette"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import { FairHeaderFragmentContainer } from "./Components/FairHeader"
import { ErrorPage } from "v2/Components/ErrorPage"

interface FairAppProps {
  fair: FairApp_fair
}

const FairApp: React.FC<FairAppProps> = ({ fair }) => {
  if (!fair) return <ErrorPage code={404} />

  return (
    <>
      <AppContainer>
        <HorizontalPadding>
          <FairHeaderFragmentContainer fair={fair} />

          <Separator my={3} />

          <Footer />
        </HorizontalPadding>
      </AppContainer>
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default createFragmentContainer(FairApp, {
  fair: graphql`
    fragment FairApp_fair on Fair {
      ...FairHeader_fair
    }
  `,
})
