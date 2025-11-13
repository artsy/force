import { FullBleedBanner } from "Components/FullBleedBanner"
import { RouterLink } from "System/Components/RouterLink"
import { getENV } from "Utils/getENV"
import type { CascadingEndTimesBanner_sale$data } from "__generated__/CascadingEndTimesBanner_sale.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface CascadingEndTimesBannerProps {
  sale: CascadingEndTimesBanner_sale$data
}

const CascadingEndTimesBanner: React.FC<
  React.PropsWithChildren<CascadingEndTimesBannerProps>
> = ({ sale }) => {
  const helpArticleLink = getENV("CASCADING_AUCTION_HELP_ARTICLE_LINK")

  if (!sale.cascadingEndTimeIntervalMinutes || sale.isClosed) {
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
        isClosed
        cascadingEndTimeIntervalMinutes
        extendedBiddingIntervalMinutes
      }
    `,
  }
)
