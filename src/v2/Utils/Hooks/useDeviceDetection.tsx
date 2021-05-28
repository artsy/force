import { useEffect, useState } from "react"

export enum Device {
  iPhone,
  Android,
}

export const useDeviceDetection = () => {
  // @ts-expect-error STRICT_NULL_CHECK
  const [device, setDevice] = useState<Device>(undefined)

  useEffect(() => {
    if (window.navigator.userAgent.match(/Android/)) {
      setDevice(Device.Android)
    } else if (window.navigator.userAgent.match(/iPhone/)) {
      setDevice(Device.iPhone)
    }
  }, [])

  return device
}
