import { BoxProps } from "@artsy/palette"
import { BackToFairBanner_show$data } from "__generated__/BackToFairBanner_show.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { TopContextBar } from "Components/TopContextBar"
import { useRouter } from "System/Hooks/useRouter"
import { sanitizeURL } from "Utils/sanitizeURL"

interface BackToFairBannerProps {
  show: BackToFairBanner_show$data
}

const BackToFairBanner: React.FC<BackToFairBannerProps & BoxProps> = ({
  show,
}) => {
  const { match } = useRouter()
  const { back_to_fair_href } = match.location.query
  const { fair } = show

  const link = back_to_fair_href ? sanitizeURL(back_to_fair_href) : fair?.href

  if (!fair?.name) {
    return null
  }

  return (
    <TopContextBar href={link} displayBackArrow>
      Back to {fair.name}
    </TopContextBar>
  )
}

export const BackToFairBannerFragmentContainer = createFragmentContainer(
  BackToFairBanner,
  {
    show: graphql`
      fragment BackToFairBanner_show on Show {
        fair {
          name
          href
        }
      }
    `,
  }
)
