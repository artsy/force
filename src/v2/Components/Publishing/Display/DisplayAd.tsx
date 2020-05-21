import { Box, color, Flex, FlexProps, Sans } from "@artsy/palette"
import { track } from "v2/Artsy/Analytics"
import * as AnalyticsSchema from "v2/Artsy/Analytics/Schema"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { is300x50AdUnit } from "v2/Components/Publishing/Display/DisplayTargeting"
import { AdDimension, AdUnit } from "v2/Components/Publishing/Typings"
import React, { useState } from "react"
import { Bling as GPT } from "react-gpt"
import styled from "styled-components"
import Events from "v2/Utils/Events"

export interface DisplayAdProps extends FlexProps {
  trackImpression?: {
    id: string
    slug: string
  }
  adUnit: AdUnit
  adDimension: AdDimension
  targetingData: {
    is_testing: boolean
    page_type: string
    post_id: string
    tags: string
  }
  isSeries?: boolean
  isStandard?: boolean
  articleSlug: string
}

export interface DisplayAdContainerProps extends FlexProps {
  isSeries?: boolean
  isStandard?: boolean
  adDimension?: AdDimension
  isAdEmpty?: boolean
}

GPT.syncCorrelator(true)

export const DisplayAd = track(
  {
    context_page: AnalyticsSchema.PageName.ArticlePage,
    context_module: AnalyticsSchema.ContextModule.AdServer,
    context_page_owner_type: AnalyticsSchema.OwnerType.Article,
  },
  { dispatch: data => Events.postEvent(data) }
)((props: DisplayAdProps) => {
  const { trackEvent } = useTracking()
  const [isAdEmpty, setIsAdEmpty] = useState<boolean | null>(null)

  const {
    adDimension,
    adUnit,
    targetingData,
    articleSlug,
    ...otherProps
  } = props

  function trackImpression() {
    trackEvent({
      context_page_owner_id: targetingData.post_id,
      context_page_owner_slug: articleSlug,
      action_type: AnalyticsSchema.ActionType.Impression,
    })
  }

  function trackClick() {
    trackEvent({
      context_page_owner_id: targetingData.post_id,
      context_page_owner_slug: articleSlug,
      action_type: AnalyticsSchema.ActionType.Click,
    })
  }

  const [width, height] = adDimension.split("x").map(a => parseInt(a))
  const isMobileLeaderboardAd = is300x50AdUnit(adDimension)

  const ad = (
    <GPT
      collapseEmptyDiv
      adUnitPath={`/21805539690/${adUnit}`}
      targeting={targetingData}
      slotSize={[width, height]}
      onSlotRenderEnded={event => {
        setIsAdEmpty(event.isEmpty)
      }}
      onImpressionViewable={() => {
        trackImpression()
      }}
    />
  )

  if (isAdEmpty) {
    return null
  }
  return (
    <>
      <DisplayAdContainer
        onClick={() => trackClick()}
        flexDirection="column"
        pt={isMobileLeaderboardAd ? 2 : 4}
        pb={isMobileLeaderboardAd ? 2 : 1}
        height={
          isAdEmpty || isAdEmpty === null
            ? "1px" // on initial render OR when no ad content returned from Google, set 1px height to ad container to prevent jarring UX effect
            : isMobileLeaderboardAd
              ? "100px" // on mobile 300x50 ads reduce ad container height to 100px
              : "334px"
        }
        isAdEmpty={isAdEmpty}
        {...otherProps}
      >
        <Box m="auto">
          {ad}
          <Sans size="1" color="black30" m={1}>
            Advertisement
          </Sans>
        </Box>
      </DisplayAdContainer>
    </>
  )
})

export const DisplayAdContainer = styled(Flex) <DisplayAdContainerProps>`
  margin: ${p => (p.isStandard ? "0" : "0 auto")};
  border-top: ${p => (p.isSeries ? `1px solid ${color("black10")}` : "none")};
  background: ${p => (p.isSeries ? color("black100") : color("black5"))};
  text-align: center;
  width: 100%;
  visibility: ${p =>
    p.isAdEmpty || p.isAdEmpty === null ? "hidden" : "visible"};
`
