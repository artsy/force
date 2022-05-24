import { useMemo } from "react"
import { BoxProps } from "@artsy/palette"
import { ShowNavigationBanner_show } from "v2/__generated__/ShowNavigationBanner_show.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { TopContextBar } from "v2/Components/TopContextBar"
import { useRouter } from "v2/System/Router/useRouter"

interface ShowNavigationBannerProps {
  show: ShowNavigationBanner_show
}

const ShowNavigationBanner: React.FC<ShowNavigationBannerProps & BoxProps> = ({
  show,
}) => {
  const { match } = useRouter()
  const { from_fair } = match.location.query
  const { fair, partner } = show
  let link = fair?.href

  /**
   * useMemo is used to ensure that the banner does not disappear immediately
   * after clicking on the back link, since `from_fair` query param will be removed from url
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const arrivedFromFair = useMemo(() => from_fair ?? false, [])

  if (arrivedFromFair) {
    link = `${fair?.href}/exhibitors?focused_exhibitor=${partner?.internalID}`
  }

  if (!fair?.name) {
    return null
  }

  return (
    <TopContextBar href={link} displayBackArrow>
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
