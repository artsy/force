import * as React from "react"
import { BoxProps } from "@artsy/palette"
import { BackLink } from "v2/Components/Links/BackLink"
import { ShowNavigationBanner_show$data } from "v2/__generated__/ShowNavigationBanner_show.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface ShowNavigationBannerProps {
  show: ShowNavigationBanner_show$data
}

const ShowNavigationBanner: React.FC<ShowNavigationBannerProps & BoxProps> = ({
  show,
  ...rest
}) => {
  const { fair, partner } = show

  if (!fair?.name) {
    return null
  }

  return (
    <BackLink
      {...rest}
      to={`${fair?.href}/exhibitors?focused_exhibitor=${partner?.internalID}`}
    >
      Back to {fair.name}
    </BackLink>
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
