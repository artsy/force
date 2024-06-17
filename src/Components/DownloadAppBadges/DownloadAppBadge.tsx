import * as React from "react"
import { useTracking } from "react-tracking"
import { ActionType, ClickedAppDownload, ContextModule } from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { Link, LinkProps } from "@artsy/palette"
import { Device } from "Utils/Hooks/useDeviceDetection"

// SVGs are referenced as files because:
// - We don't need flexibility here; never changing color, etc.
// - Avoids adding ~15kb to every page load
// - Can be cached
// - Can be lazyloaded
const DOWNLOAD_IOS_APP_BADGE =
  "https://files.artsy.net/images/download-ios_cropped_optimized.svg"
const DOWNLOAD_ANDROID_APP_BADGE =
  "https://files.artsy.net/images/download-google-play_cropped_optimized.svg"

interface DownloadAppBadgeProps extends LinkProps {
  contextModule: ContextModule
  device: Device
  downloadAppUrl: string
}

export const DownloadAppBadge: React.FC<DownloadAppBadgeProps> = ({
  contextModule,
  device,
  downloadAppUrl,
  ...rest
}) => {
  const tracking = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const handleClick = () => {
    const clickedAppDownload: ClickedAppDownload = {
      action: ActionType.clickedAppDownload,
      context_module: contextModule,
      context_page_owner_type: contextPageOwnerType,
      context_page_owner_slug: contextPageOwnerSlug,
      context_page_owner_id: contextPageOwnerId,
      destination_path: downloadAppUrl,
      subject: "Download on the App Store",
    }

    tracking.trackEvent(clickedAppDownload)
  }

  if (device === Device.Unknown) {
    return null
  }

  return (
    <Link
      display="flex"
      justifyContent="center"
      alignItems="center"
      href={downloadAppUrl}
      onClick={handleClick}
      title="Download on the App Store"
      {...rest}
    >
      {device === Device.iPhone && (
        <img
          src={DOWNLOAD_IOS_APP_BADGE}
          width={120}
          height={40}
          alt="Download on the App Store"
          loading="lazy"
        />
      )}

      {device === Device.Android && (
        <img
          src={DOWNLOAD_ANDROID_APP_BADGE}
          width={131}
          height={40}
          alt="Get it on Google Play"
          loading="lazy"
        />
      )}
    </Link>
  )
}
