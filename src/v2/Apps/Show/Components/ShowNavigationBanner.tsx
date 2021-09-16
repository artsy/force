import React from "react"
import { BoxProps } from "@artsy/palette"
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
  const { fair } = show

  if (!fair?.name) {
    return null
  }

  return (
    <BackLink {...rest} to={`${fair?.href}/exhibitors`}>
      Back to {fair.name}
    </BackLink>
  )
}

export const ShowNavigationBannerFragmentContainer = createFragmentContainer(
  ShowNavigationBanner,
  {
    show: graphql`
      fragment ShowNavigationBanner_show on Show {
        fair {
          name
          href
        }
      }
    `,
  }
)
