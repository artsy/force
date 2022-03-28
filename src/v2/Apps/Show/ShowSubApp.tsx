import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "@artsy/palette"
import { ShowSubApp_show } from "v2/__generated__/ShowSubApp_show.graphql"
import { BackLink } from "v2/Components/Links/BackLink"
import { ShowMetaFragmentContainer as ShowMeta } from "./Components/ShowMeta"
import {
  AnalyticsContext,
  useAnalyticsContext,
} from "v2/System/Analytics/AnalyticsContext"

interface ShowAppProps {
  show: ShowSubApp_show
}

const ShowApp: React.FC<ShowAppProps> = ({ children, show }) => {
  const { contextPageOwnerSlug, contextPageOwnerType } = useAnalyticsContext()

  return (
    <>
      <ShowMeta show={show} />

      <>
        <AnalyticsContextProvider
          value={{
            contextPageOwnerId: show.internalID,
            contextPageOwnerSlug,
            contextPageOwnerType,
          }}
        >
          <BackLink my={2} to={show.href}>
            Back to {show.name}
            {!show.isFairBooth && show.partner?.name && (
              <> at {show.partner.name}</>
            )}
          </BackLink>

          <Box minHeight="50vh">{children}</Box>
        </AnalyticsContextProvider>
      </>
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
