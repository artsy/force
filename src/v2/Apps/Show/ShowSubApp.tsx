import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { Separator } from "@artsy/palette"
import { ShowSubApp_show } from "v2/__generated__/ShowSubApp_show.graphql"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import { ErrorPage } from "v2/Components/ErrorPage"
import { BackLink } from "v2/Components/Links/BackLink"
import { ShowMetaFragmentContainer as ShowMeta } from "./Components/ShowMeta"

interface ShowAppProps {
  show: ShowSubApp_show
}

const ShowApp: React.FC<ShowAppProps> = ({ children, show }) => {
  if (!show) return <ErrorPage code={404} />

  return (
    <>
      <ShowMeta show={show} />

      <AppContainer>
        <HorizontalPadding>
          <BackLink my={3} to={show.href.replace("/show", "/show2")}>
            Back to {show.name}
            {show.partner?.name && <> at {show.partner.name}</>}
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
export default createFragmentContainer(ShowApp, {
  show: graphql`
    fragment ShowSubApp_show on Show {
      id
      name
      href
      partner {
        ... on Partner {
          name
        }
        ... on ExternalPartner {
          name
        }
      }
      ...ShowMeta_show
    }
  `,
})
