import { useEffect, useState } from "react"

export enum Device {
  iPhone,
  Android,
  Unknown,
}

export const DOWNLOAD_APP_URLS = {
  [Device.iPhone]:
    "https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080",
  [Device.Android]:
    "https://play.google.com/store/apps/details?id=net.artsy.app",
  [Device.Unknown]:
    "https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080", // Default to the iOS app
}

export const useDeviceDetection = () => {
  const [device, setDevice] = useState<Device>(Device.Unknown)

  useEffect(() => {
    if (window.navigator.userAgent.match(/Android/)) {
      setDevice(Device.Android)
    } else if (window.navigator.userAgent.match(/iPhone/)) {
      setDevice(Device.iPhone)
    }
  }, [])

  return { device, downloadAppUrl: DOWNLOAD_APP_URLS[device] }
}
