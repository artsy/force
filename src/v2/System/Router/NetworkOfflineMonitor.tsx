import { Banner, Box } from "@artsy/palette"
import { throttle } from "lodash"
import { useEffect, useState } from "react";
import * as React from "react";

export const NetworkOfflineMonitor: React.FC = () => {
  const [showOfflineModal, toggleOfflineModal] = useState(false)
  const setOffline = throttle(() => toggleOfflineModal(true), 200)
  const setOnline = throttle(() => toggleOfflineModal(false), 200)

  useEffect(() => {
    window.addEventListener("offline", setOffline)
    window.addEventListener("online", setOnline)

    return () => {
      window.removeEventListener("offline", setOffline)
      window.removeEventListener("online", setOnline)
    }
  }, [setOffline, setOnline])

  if (!showOfflineModal) {
    return null
  }

  return (
    <Box
      position="fixed"
      left={0}
      top={58}
      width="100%"
      style={{ opacity: 0.9 }}
    >
      <Banner variant="defaultLight">Network offline</Banner>
    </Box>
  )
}
