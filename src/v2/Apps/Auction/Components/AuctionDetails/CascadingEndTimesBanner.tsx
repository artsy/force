import { Banner, FullBleed } from "@artsy/palette"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
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

  const hasLink = !!helpArticleLink
  function getBannerText(extendedBiddingIntervalMinutes) {
    let bannerText
    if (extendedBiddingIntervalMinutes) {
      bannerText =
        "Closing times may be extended due to last minute competitive bidding"
    } else {
      bannerText = `Lots close at ${cascadingEndTimeIntervalMinutes}-minute intervals`
    }
    return bannerText
  }

  return (
    <FullBleed backgroundColor={"blue100"}>
      <AppContainer>
        <HorizontalPadding>
          <Banner dismissable pl={0} variant="brand">
            {getBannerText(extendedBiddingIntervalMinutes)}.
            {hasLink && (
              <>
                &nbsp;
                <a target="_blank" href={helpArticleLink}>
                  Learn More
                </a>
              </>
            )}
          </Banner>
        </HorizontalPadding>
      </AppContainer>
    </FullBleed>
  )
}
