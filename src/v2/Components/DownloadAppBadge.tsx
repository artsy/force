import React from "react"
import track, { useTracking } from "react-tracking"
import { clickedAppDownload, ContextModule } from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/System"
import Events from "v2/Utils/Events"
import { Link, LinkProps } from "@artsy/palette"
import { Device } from "v2/Utils/Hooks/useDeviceDetection"

// SVGs are referenced as files because:
// - We don't need flexibility here; never changing color, etc.
// - Avoids adding ~15kb to every page load
// - Can be cached
// - Can be lazyloaded

const DOWNLOAD_IOS_APP_BADGE =
  "https://files.artsy.net/images/download-ios-app.svg"

const DOWNLOAD_ANDROID_APP_BADGE =
  "https://files.artsy.net/images/download-android-app.svg"

interface DownloadAppBadgeProps extends LinkProps {
  contextModule: ContextModule
  device: Device
  downloadAppUrl: string
}

// @ts-expect-error STRICT_NULL_CHECK
export const DownloadAppBadge: React.FC<DownloadAppBadgeProps> = track(null, {
  dispatch: data => Events.postEvent(data),
})(({ contextModule, device, downloadAppUrl, ...rest }) => {
  const tracking = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const handleClick = () => {
    tracking.trackEvent(
      clickedAppDownload({
        context_module: contextModule,
        context_page_owner_type: contextPageOwnerType!,
        context_page_owner_slug: contextPageOwnerSlug,
        context_page_owner_id: contextPageOwnerId,
        destination_path: downloadAppUrl,
        subject: "Download on the App Store",
      })
    )
  }

  if (device === Device.Unknown) {
    return null
  }

  return (
    <Link
      display="block"
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
          width={136}
          height={40}
          alt="Get it on Google Play"
          loading="lazy"
        />
      )}
    </Link>
  )
})
