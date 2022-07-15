import { FullBleedBanner } from "v2/Components/FullBleedBanner"
import { getENV } from "v2/Utils/getENV"

interface CascadingEndTimesBannerProps {
  cascadingEndTimeIntervalMinutes: number
  extendedBiddingIntervalMinutes: number | null
}

export const CascadingEndTimesBanner: React.FC<CascadingEndTimesBannerProps> = ({
  cascadingEndTimeIntervalMinutes,
  extendedBiddingIntervalMinutes,
}) => {
  const helpArticleLink = getENV("CASCADING_AUCTION_HELP_ARTICLE_LINK")

  return (
    <FullBleedBanner variant="brand" dismissable>
      {extendedBiddingIntervalMinutes
        ? "Closing times may be extended due to last minute competitive bidding"
        : `Lots close at ${cascadingEndTimeIntervalMinutes}-minute intervals`}
      .
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
