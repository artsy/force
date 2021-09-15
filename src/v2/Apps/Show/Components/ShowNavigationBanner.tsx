import { BoxProps } from "@artsy/palette"
import React from "react"
import { BackLink } from "v2/Components/Links/BackLink"
import { ShowNavigationBanner_show } from "v2/__generated__/ShowNavigationBanner_show.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface ShowNavigationBannerProps {
  show: ShowNavigationBanner_show
}

const ShowNavigationBanner: React.FC<ShowNavigationBannerProps & BoxProps> = ({
  show,
  ...rest
}) => {
  const { name, fair, isFairBooth, partner } = show

  if (!fair?.href) {
    return null
  }

  return (
    <BackLink {...rest} to={`${fair.href}/exhibitors`}>
      Back to {name}
      {!isFairBooth && partner?.name && `at ${partner.name}`}
    </BackLink>
  )
}

export const ShowNavigationBannerFragmentContainer = createFragmentContainer(
  ShowNavigationBanner,
  {
    show: graphql`
      fragment ShowNavigationBanner_show on Show {
        name
        isFairBooth
        partner {
          ... on Partner {
            name
          }
          ... on ExternalPartner {
            name
          }
        }
        fair {
          href
        }
      }
    `,
  }
)
