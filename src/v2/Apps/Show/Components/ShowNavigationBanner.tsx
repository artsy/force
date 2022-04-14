import * as React from "react"
import { BoxProps } from "@artsy/palette"
import { ShowNavigationBanner_show } from "v2/__generated__/ShowNavigationBanner_show.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { TopContextBar } from "v2/Components/TopContextBar"

interface ShowNavigationBannerProps {
  show: ShowNavigationBanner_show
}

const ShowNavigationBanner: React.FC<ShowNavigationBannerProps & BoxProps> = ({
  show,
}) => {
  const { fair, partner } = show

  if (!fair?.name) {
    return null
  }

  return (
    <TopContextBar
      href={`${fair?.href}/exhibitors?focused_exhibitor=${partner?.internalID}`}
      displayBackArrow
    >
      Back to {fair.name}
    </TopContextBar>
  )
}

export const ShowNavigationBannerFragmentContainer = createFragmentContainer(
  ShowNavigationBanner,
  {
    show: graphql`
      fragment ShowNavigationBanner_show on Show {
        partner {
          ... on Partner {
            internalID
          }
          ... on ExternalPartner {
            internalID
          }
        }
        fair {
          name
          href
        }
      }
    `,
  }
)
