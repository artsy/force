import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "@artsy/palette"
import { ShowSubApp_show$data } from "__generated__/ShowSubApp_show.graphql"
import { ShowMetaFragmentContainer as ShowMeta } from "./Components/ShowMeta"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { TopContextBar } from "Components/TopContextBar"

interface ShowAppProps {
  show: ShowSubApp_show$data
}

const ShowApp: React.FC<ShowAppProps> = ({ children, show }) => {
  return (
    <>
      <ShowMeta show={show} />

      <Analytics contextPageOwnerId={show.internalID}>
        <TopContextBar displayBackArrow href={show.href}>
          Back to {show.name}
          {!show.isFairBooth && show.partner?.name && (
            <> at {show.partner.name}</>
          )}
        </TopContextBar>

        <Box minHeight="50vh">{children}</Box>
      </Analytics>
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export const ShowSubAppFragmentContainer = createFragmentContainer(ShowApp, {
  show: graphql`
    fragment ShowSubApp_show on Show {
      id
      internalID
      slug
      name
      href
      isFairBooth
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
