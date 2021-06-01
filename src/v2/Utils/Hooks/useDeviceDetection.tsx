import { useEffect, useState } from "react"

export enum Device {
  iPhone,
  Android,
}

export const useDeviceDetection = () => {
  // @ts-expect-error STRICT_NULL_CHECK
  const [device, setDevice] = useState<Device>(undefined)
  // @ts-expect-error STRICT_NULL_CHECK
  const [downloadAppUrl, setDownloadAppUrl] = useState<string>(undefined)

  useEffect(() => {
    if (window.navigator.userAgent.match(/Android/)) {
      setDevice(Device.Android)
      setDownloadAppUrl(
        "https://play.google.com/store/apps/details?id=net.artsy.app"
      )
    } else if (window.navigator.userAgent.match(/iPhone/)) {
      setDevice(Device.iPhone)
      setDownloadAppUrl(
        "https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080"
      )
    }
  }, [])

  return { device, downloadAppUrl }
}
