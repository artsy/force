import { Box, Text } from "@artsy/palette"
import { FC, useEffect } from "react"
import ChevronSmallRightIcon from "@artsy/icons/ChevronSmallRightIcon"
import { useCursor } from "use-cursor"
import { useDeviceDetection } from "Utils/Hooks/useDeviceDetection"
import { useTracking } from "react-tracking"
import { ActionType, ClickedDownloadAppHeader } from "@artsy/cohesion"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"

const TEXTS = [
  "Get the app, get the art.",
  "Get the app, and find the art you love.",
  "Get the app, and artworks tailored to you.",
  "Get the app, and discover works our curators love.",
  "Get the app, and keep up with your favorite artists",
  "Get the app, and be alerted about new artworks.",
  "Get the app, and stay connected with galleries.",
  "Get the app, and build your art world profile.",
  "Get the app, and keep track of your collection.",
  "Get the app, and keep track of artists’ markets.",
]

export interface AppDownloadBannerProps {
  transitionDuration?: number
  idleDuration?: number
}

export const AppDownloadBanner: FC<AppDownloadBannerProps> = ({
  transitionDuration = 1500,
  idleDuration = 4000,
}) => {
  const { downloadAppUrl } = useDeviceDetection()
  const { user } = useSystemContext()
  const {
    contextPageOwnerType,
    contextPageOwnerId,
    contextPageOwnerSlug,
  } = useAnalyticsContext()

  const { index, handleNext } = useCursor({ max: TEXTS.length })
  const { trackEvent } = useTracking()

  useEffect(() => {
    const interval = setInterval(handleNext, transitionDuration + idleDuration)
    return () => {
      clearInterval(interval)
    }
  }, [handleNext, idleDuration, transitionDuration])

  const trackDownloadBanner = () => {
    const trackingEvent: ClickedDownloadAppHeader = {
      action: ActionType.clickedDownloadAppHeader,
      context_page_owner_type: contextPageOwnerType,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      user_id: user?.id,
    }

    trackEvent(trackingEvent)
  }

  return (
    <Text
      as="a"
      variant="xs"
      bg="black100"
      color="white100"
      py={1}
      px={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      // @ts-ignore
      href={downloadAppUrl}
      onClick={trackDownloadBanner}
      target="_blank"
      style={{ textDecoration: "none" }}
    >
      <Box position="relative" flex={1}>
        {TEXTS.map((text, i) => {
          return (
            <Box
              key={i}
              aria-hidden={i !== index}
              top={0}
              left={0}
              right={0}
              bottom={0}
              style={{
                transition: `opacity ${transitionDuration}ms`,
                ...(i === index
                  ? { opacity: 1, position: "relative" }
                  : { opacity: 0, position: "absolute" }),
              }}
            >
              {text}
            </Box>
          )
        })}
      </Box>

      <ChevronSmallRightIcon />
    </Text>
  )
}
