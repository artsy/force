import { createFragmentContainer, graphql } from "react-relay"
import { FullBleedBanner } from "Components/FullBleedBanner"
import { getENV } from "Utils/getENV"
import { CascadingEndTimesBanner_sale$data } from "__generated__/CascadingEndTimesBanner_sale.graphql"

interface CascadingEndTimesBannerProps {
  sale: CascadingEndTimesBanner_sale$data
}

const CascadingEndTimesBanner: React.FC<CascadingEndTimesBannerProps> = ({
  sale,
}) => {
  const helpArticleLink = getENV("CASCADING_AUCTION_HELP_ARTICLE_LINK")

  const getMessage = () => {
    const {
      cascadingEndTimeIntervalMinutes,
      extendedBiddingIntervalMinutes,
    } = sale

    if (extendedBiddingIntervalMinutes) {
      return "Closing times may be extended due to last-minute competitive bidding"
    }

    if (sale.artworksConnection?.totalCount === 1) {
      return `Lot close at ${cascadingEndTimeIntervalMinutes}-minute intervals`
    }

    return `Lots close at ${cascadingEndTimeIntervalMinutes}-minute intervals`
  }

  if (!sale.cascadingEndTimeIntervalMinutes) {
    return null
  }

  return (
    <FullBleedBanner variant="brand" dismissable>
      {getMessage()}.
      {!!helpArticleLink && (
        <>
          &nbsp;
          <a target="_blank" href={helpArticleLink}>
            Learn More
          </a>
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
        artworksConnection(first: 0) {
          totalCount
        }
      }
    `,
  }
)
