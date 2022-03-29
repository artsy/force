import { Banner, FullBleed } from "@artsy/palette"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { getENV } from "v2/Utils/getENV"

interface CascadingEndTimesBannerProps {
  cascadingEndTimeInterval: number
}

export const CascadingEndTimesBanner: React.FC<CascadingEndTimesBannerProps> = ({
  cascadingEndTimeInterval,
}) => {
  const helpArticleLink = getENV("CASCADING_AUCTION_HELP_ARTICLE_LINK")

  const hasLink = !!helpArticleLink

  return (
    <FullBleed backgroundColor={"blue100"}>
      <AppContainer>
        <HorizontalPadding>
          <Banner dismissable pl={0} variant="brand">
            {`Lots close at ${cascadingEndTimeInterval / 60}-minute intervals`}.
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
