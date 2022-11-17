import { createFragmentContainer, graphql } from "react-relay"
import { FullBleedBanner } from "Components/FullBleedBanner"
import { getENV } from "Utils/getENV"
import { CascadingEndTimesBanner_sale$data } from "__generated__/CascadingEndTimesBanner_sale.graphql"
import { CascadingEndTimesBanner_viewer$data } from "__generated__/CascadingEndTimesBanner_viewer.graphql"

interface CascadingEndTimesBannerProps {
  sale: CascadingEndTimesBanner_sale$data
  viewer: CascadingEndTimesBanner_viewer$data | null
}

const CascadingEndTimesBanner: React.FC<CascadingEndTimesBannerProps> = ({
  sale,
  viewer,
}) => {
  const helpArticleLink = getENV("CASCADING_AUCTION_HELP_ARTICLE_LINK")

  if (!sale.cascadingEndTimeIntervalMinutes) {
    return null
  }

  const getMessage = () => {
    if (sale.extendedBiddingIntervalMinutes) {
      return "Closing times may be extended due to last-minute competitive bidding"
    }

    if (viewer?.cascadingBannerSaleArtworks?.counts?.total === 1) {
      return `Lot close at ${sale.cascadingEndTimeIntervalMinutes}-minute intervals`
    }

    return `Lots close at ${sale.cascadingEndTimeIntervalMinutes}-minute intervals`
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
      }
    `,
    viewer: graphql`
      fragment CascadingEndTimesBanner_viewer on Viewer
        @argumentDefinitions(saleID: { type: "String" }) {
        cascadingBannerSaleArtworks: saleArtworksConnection(
          saleSlug: $saleID
          aggregations: [TOTAL]
        ) {
          counts {
            total
          }
        }
      }
    `,
  }
)
