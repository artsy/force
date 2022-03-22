import { Banner, FullBleed } from "@artsy/palette"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { getENV } from "v2/Utils/getENV"

interface CascadingEndTimesBannerProps {
  intervalMessage: string
}

export const CascadingEndTimesBanner: React.FC<CascadingEndTimesBannerProps> = ({
  intervalMessage,
}) => {
  const helpArticleLink = getENV("CASCADING_AUCTION_HELP_ARTICLE_LINK")

  const hasLink = !!helpArticleLink

  return (
    <FullBleed backgroundColor={"blue100"}>
      <AppContainer>
        <HorizontalPadding>
          <Banner dismissable pl={0} variant="brand">
            This auction has staggered closing times.&nbsp;
            {intervalMessage}.
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
