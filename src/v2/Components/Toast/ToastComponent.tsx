import { Banner, Box, Text, themeProps } from "@artsy/palette"
import React, { useEffect, useState } from "react"
import { useNavBarHeight } from "../NavBar/useNavBarHeight"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"

interface ToastComponentProps {
  showNotification: boolean
  notificationAction: string
  duration: number
  title: string
  onCloseToast: () => void
}

const ToastComponent: React.FC<ToastComponentProps> = ({
  notificationAction,
  showNotification,
  title,
  duration,
  onCloseToast,
}) => {
  const isMobile = useMatchMedia(themeProps.mediaQueries.xs)
  const navHeight = useNavBarHeight()

  useEffect(() => {
    setTimeout(() => {
      showNotification && onCloseToast()
    }, duration)
  }, [showNotification])

  const [touchStart, setTouchStart] = React.useState(0)
  const [touchEnd, setTouchEnd] = React.useState(0)
  const [isMoveToRight, setIsMoveToRight] = useState(false)

  const handleTouchStart = e => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = e => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd < -30) {
      setIsMoveToRight(true)
    }
  }
  return (
    <Box
      paddingX={[10, 0]}
      style={{
        top: isMobile ? `${navHeight.mobile}px` : `${navHeight.desktop}px`,
        transition: "all 0.5s",
        boxShadow:
          "0px 0px 1px 2rgba (0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.12)",
        left: isMoveToRight ? "100%" : 0,
      }}
      borderRadius={2}
      position="fixed"
      left={0}
      width="100%"
      opacity={showNotification ? 1 : 0}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Banner variant="success" dismissable={false}>
        <Text variant="text">{`${title} ${notificationAction}`}</Text>
      </Banner>
    </Box>
  )
}

export default ToastComponent
