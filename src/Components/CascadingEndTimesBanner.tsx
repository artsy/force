import { createFragmentContainer, graphql } from "react-relay"
import { FullBleedBanner } from "Components/FullBleedBanner"
import { getENV } from "Utils/getENV"
import { CascadingEndTimesBanner_sale$data } from "__generated__/CascadingEndTimesBanner_sale.graphql"
import { RouterLink } from "System/Components/RouterLink"

interface CascadingEndTimesBannerProps {
  sale: CascadingEndTimesBanner_sale$data
}

const CascadingEndTimesBanner: React.FC<CascadingEndTimesBannerProps> = ({
  sale,
}) => {
  const helpArticleLink = getENV("CASCADING_AUCTION_HELP_ARTICLE_LINK")

  if (!sale.cascadingEndTimeIntervalMinutes) {
    return null
  }

  return (
    <FullBleedBanner variant="brand" dismissable>
      {sale.extendedBiddingIntervalMinutes
        ? "Closing times may be extended due to last-minute competitive bidding"
        : `Lots close at ${sale.cascadingEndTimeIntervalMinutes}-minute intervals`}
      .
      {!!helpArticleLink && (
        <>
          &nbsp;
          <RouterLink target="_blank" to={helpArticleLink}>
            Learn More
          </RouterLink>
        </>
      )}
    </FullBleedBanner>
  )
}

export const CascadingEndTimesBannerFragmentContainer = createFragmentContainer(
  CascadingEndTimesBanner,
  {
    sale: graphql`
      fragment CascadingEndTimesBanner_sale on Sale {
        cascadingEndTimeIntervalMinutes
        extendedBiddingIntervalMinutes
      }
    `,
  }
)
