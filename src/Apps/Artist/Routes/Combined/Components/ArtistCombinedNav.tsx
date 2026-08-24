import { ActionType, type ClickedHeader, ContextModule } from "@artsy/cohesion"
import { BaseTab, Box, Clickable, FullBleed } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { RouteTabs } from "Components/RouteTabs"
import { Sticky, StickyNavRetractionSentinel } from "Components/Sticky"
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
  hasSocial: boolean
}

const ARTIST_COMBINED_NAV_ITEMS = [
  {
    activeSection: "artistArtworksTop",
    label: "Artworks",
    section: "artworks",
    subject: "artworks",
  },
  {
    activeSection: "marketSignalsTop",
    label: "Auction Results",
    section: "auction",
    subject: "auction results",
  },
  {
    activeSection: "artistAboutTop",
    label: "About",
    section: "about",
    subject: "about",
  },
  {
    activeSection: "artistEditorialTop",
    label: "Editorial",
    section: "editorial",
    subject: "editorial",
  },
  {
    activeSection: "artistSocialTop",
    label: "Social",
    section: "social",
    subject: "social",
  },
] as const

export const ArtistCombinedNav = ({
  waitUntil,
  navigating,
  hasSocial,
}: ArtistCombinedNavProps) => {
  const navItems = ARTIST_COMBINED_NAV_ITEMS.filter(item => {
    return item.section !== "social" || hasSocial
  })

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

      {/* Retract the global nav slightly early */}
      <Box mt={-12} pb={12}>
        <StickyNavRetractionSentinel />
      </Box>

      <Sticky>
        {({ scrollDirection }) => {
          return (
            <FullBleed style={backdrop[scrollDirection]} {...containerProps}>
              <AppContainer>
                <HorizontalPadding pb={2}>
                  <RouteTabs data-test="navigationTabs" pt={2}>
                    {navItems.map((item, index) => {
                      return (
                        <BaseTab
                          key={item.section}
                          as={Clickable}
                          active={active === item.activeSection}
                          disabled={navigating[item.section]}
                          onClick={async () => {
                            // The first section is already loaded, so it can jump immediately.
                            if (index > 0) {
                              await waitUntil(item.section)
                            }

                            jumpTo(item.activeSection)
                            handleClick(item.subject)
                          }}
                        >
                          {item.label}
                        </BaseTab>
                      )
                    })}
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
