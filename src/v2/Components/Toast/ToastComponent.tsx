import styled from "styled-components"
import colors from "../../Assets/Colors"
import { color, Flex, Text, themeProps } from "@artsy/palette"
import React, { useEffect, useState } from "react"
import { useNavBarHeight } from "../NavBar/useNavBarHeight"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"

const ToastContainer = styled.div<{
  isOpen: boolean
  isMoveToRight: boolean
}>`
  width: 100%;
  z-index: 10000;
  padding: 7px 20px 7px;
  background-color: ${colors.greenToast};
  box-shadow: 0px 0px 1px 2rgba (0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  border-bottom: 1px solid ${color("black10")};
  transition: 0.6s;
  opacity: 0;
  position: fixed;
  left: 0;
  ${({ isOpen }) => isOpen && "opacity:1; transform: translate3d(0,0,0); "};
  ${({ isMoveToRight }) => isMoveToRight && "transform: translate3d(100%,0,0);"}
`
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
      // do your stuff here for right swipe
      setIsMoveToRight(true)
    }
  }

  return (
    <ToastContainer
      style={{
        top: isMobile ? `${navHeight.mobile}px` : `${navHeight.desktop}px`,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      isOpen={showNotification}
      isMoveToRight={isMoveToRight}
    >
      <Flex alignItems="center" justifyContent="center">
        <Text color="white100" variant="subtitle" textAlign="center">
          {`${title} ${notificationAction}`}
        </Text>
      </Flex>
    </ToastContainer>
  )
}

export default ToastComponent
