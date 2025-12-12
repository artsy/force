import { ActionType, type ClickedHeader, ContextModule } from "@artsy/cohesion"
import { BaseTab, Clickable, FullBleed } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { RouteTabs } from "Components/RouteTabs"
import { Sticky } from "Components/Sticky"
import { useNavInteractionBlocker } from "Components/Sticky/useNavInteractionBlocker"
import { useStickyBackdrop } from "Components/Sticky/useStickyBackdrop"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useJump } from "Utils/Hooks/useJump"
import { useSectionNav } from "Utils/Hooks/useSectionNav"
import { useCallback } from "react"
import { useTracking } from "react-tracking"

interface ArtistCombinedNavProps {
  waitUntil: (section: string) => Promise<void>
  navigating: Record<string, boolean>
}

export const ArtistCombinedNav = ({
  waitUntil,
  navigating,
}: ArtistCombinedNavProps) => {
  const backdrop = useStickyBackdrop()

  const { jumpTo } = useJump()

  const { active } = useSectionNav()

  const tracking = useTracking()

  const { contextPageOwnerType } = useAnalyticsContext()

  const { containerProps, NavBlocker } = useNavInteractionBlocker()

  const handleClick = useCallback(
    (subject: string) => {
      const payload: ClickedHeader = {
        action: ActionType.clickedHeader,
        context_module: ContextModule.artistHeader,
        context_page_owner_type: contextPageOwnerType,
        subject,
      }

      tracking.trackEvent(payload)
    },
    [tracking, contextPageOwnerType],
  )

  return (
    <>
      <NavBlocker />

      <Sticky retractGlobalNav>
        {({ scrollDirection }) => {
          return (
            <FullBleed style={backdrop[scrollDirection]} {...containerProps}>
              <AppContainer>
                <HorizontalPadding pb={2}>
                  <RouteTabs data-test="navigationTabs" pt={2}>
                    <BaseTab
                      as={Clickable}
                      active={active === "artistArtworksTop"}
                      disabled={navigating.artworks}
                      onClick={async () => {
                        jumpTo("artistArtworksTop")
                        handleClick("artworks")
                      }}
                    >
                      Artworks
                    </BaseTab>

                    <BaseTab
                      as={Clickable}
                      active={active === "marketSignalsTop"}
                      disabled={navigating.auction}
                      onClick={async () => {
                        await waitUntil("auction")
                        jumpTo("marketSignalsTop")
                        handleClick("auction results")
                      }}
                    >
                      Auction Results
                    </BaseTab>

                    <BaseTab
                      as={Clickable}
                      active={active === "artistAboutTop"}
                      disabled={navigating.about}
                      onClick={async () => {
                        await waitUntil("about")
                        jumpTo("artistAboutTop")
                        handleClick("about")
                      }}
                    >
                      About
                    </BaseTab>
                  </RouteTabs>
                </HorizontalPadding>
              </AppContainer>
            </FullBleed>
          )
        }}
      </Sticky>
    </>
  )
}
