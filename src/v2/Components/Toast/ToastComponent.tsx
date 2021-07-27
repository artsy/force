import styled from "styled-components"
import colors from "../../Assets/Colors"
import { color, Flex, Link, Text } from "@artsy/palette"
import React, { useEffect, useState } from "react"

const Header = styled.div<{
  isOpen: boolean
}>`
  width: 100%;
  padding: 14px 20px 12px;
  background-color: ${colors.greenToast};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  border-bottom: 1px solid ${color("black10")};
  transition: 0.4s;
  position: fixed;
  bottom: 0;
  left: 0;
  ${({ isOpen }) =>
    isOpen
      ? `
    transform: translate3d(0, 0, 0);
  `
      : `
    transform: translate3d(-100%, 0, 0);
  `};
`

const ToastComponent = props => {
  // const { isOpen } = props
  const [isOpen, setisOpen] = useState(false)
  console.log("reendeeeeer -------------------")

  useEffect(() => {
    setTimeout(() => {
      setisOpen(true)
    }, 2000)
    // setTimeout(() => {
    //   setisOpen(false)
    // }, 15000)
  }, [])

  const [touchStart, setTouchStart] = React.useState(0)
  const [touchEnd, setTouchEnd] = React.useState(0)

  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX)
  }

  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  function handleTouchEnd() {
    if (touchStart - touchEnd > 60) {
      // do your stuff here for left swipe
      setisOpen(false)
    }

    if (touchStart - touchEnd < -60) {
      // do your stuff here for right swipe
      alert("swipe right")
    }
  }

  return (
    <div style={{ position: "fixed", bottom: "10px", right: "10px" }}>
      <Header
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        isOpen={isOpen}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Text color="white100" variant="subtitle">
            Address Successfully Saved
          </Text>
          <Link
            color="white"
            href="https://github.com"
            underlineBehavior="none"
          >
            <Text color="white100" variant="subtitle">
              Undo
            </Text>
          </Link>
        </Flex>
      </Header>
    </div>
  )
}

export default ToastComponent
