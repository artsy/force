import { ActionType } from "@artsy/cohesion"
import ArtsyMarkIcon from "@artsy/icons/ArtsyMarkIcon"
import CloseIcon from "@artsy/icons/CloseIcon"
import {
  Box,
  Button,
  Clickable,
  Stack,
  Text,
  useDidMount,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { Z } from "Apps/Components/constants"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useDeviceDetection } from "Utils/Hooks/useDeviceDetection"
import Cookies from "cookies-js"
import { type FC, useEffect, useRef } from "react"
import { useTracking } from "react-tracking"
import styled from "styled-components"

const APP_DOWNLOAD_FOOTER_KEY = "AppDownloadFooter"

type AppDownloadFooterProps = {}

export const AppDownloadFooter: FC<
  React.PropsWithChildren<AppDownloadFooterProps>
> = () => {
  const isMounted = useDidMount()

  const { user } = useSystemContext()

  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()
  const { trackEvent } = useTracking()

  const ref = useRef<HTMLDivElement | null>(null)

  const { downloadAppUrl } = useDeviceDetection()
  const { match } = useRouter()

  const isVisible = useRef(false)
  const routeChanges = useRef(-1)

  useEffect(() => {
    const showBanner = async () => {
      if (!ref.current || !("animate" in ref.current) || isVisible.current) {
        return
      }

      const animation = ref.current.animate(
        [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
        { duration: 250, easing: "ease-out", fill: "forwards" },
      )

      await animation.finished
      isVisible.current = true
    }

    // Increment route changes counter when pathname changes
    if (match.location.pathname) {
      routeChanges.current++
    }

    // Show banner after second route change
    if (routeChanges.current === 2) {
      showBanner()
    }
  }, [match.location.pathname])

  const trackAppDownload = () => {
    const trackingEvent = {
      action: ActionType.clickedDownloadAppFooter,
      context_page_owner_type: contextPageOwnerType,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      user_id: user?.id,
    }

    trackEvent(trackingEvent)
  }

  const handleDismiss = async () => {
    Cookies.set(APP_DOWNLOAD_FOOTER_KEY, 1, { expires: 0 })

    if (!ref.current) return

    const animation = ref.current.animate(
      [{ transform: "translateY(0)" }, { transform: "translateY(100%)" }],
      { duration: 250, easing: "ease-out", fill: "forwards" },
    )

    await animation.finished
  }

  if (!isMounted || Cookies.get(APP_DOWNLOAD_FOOTER_KEY)) {
    return null
  }

  return (
    <AppDownloadFooterPanel ref={ref as any}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={1}
      >
        <Stack gap={1} flexDirection="row" alignItems="center">
          <Box bg="black100" color="white100" p={0.5} borderRadius={3}>
            <ArtsyMarkIcon width={30} height={30} />
          </Box>

          <Text variant="md">Get the app, get the art.</Text>
        </Stack>

        <Clickable onClick={handleDismiss}>
          <CloseIcon />
        </Clickable>
      </Box>

      <Button
        variant="primaryBlack"
        width="100%"
        size="small"
        // @ts-ignore
        as="a"
        href={downloadAppUrl}
        target="_blank"
        onClick={trackAppDownload}
      >
        Download Artsy
      </Button>
    </AppDownloadFooterPanel>
  )
}

const AppDownloadFooterPanel = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${themeGet("space.2")};
  padding: ${themeGet("space.2")};
  background-color: ${themeGet("colors.white100")};
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Z.appDownloadFooter};
  box-shadow: ${themeGet("effects.dropShadow")};
  transform: translateY(100%);
`
