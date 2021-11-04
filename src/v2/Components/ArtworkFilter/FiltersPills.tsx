import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Box, Flex, Spacer } from "@artsy/palette"
import { growAndFadeIn, shrinkAndFadeOut } from "v2/Assets/Animations"
import { CreateAlertButton } from "./CreateAlertButton"

const WRAPPER_HEIGHT = 70

export const FiltersPills: React.FC<{ show: boolean }> = ({ show }) => {
  const [showBlock, setShowBlock] = useState(show)

  useEffect(() => {
    if (show) {
      setShowBlock(true)
    }
  }, [show])

  return (
    <>
      {showBlock && (
        <AnimatedBox show={show}>
          <Flex>
            <CreateAlertButton />
          </Flex>
          <Spacer mt={4} />
        </AnimatedBox>
      )}
    </>
  )
}

const AnimatedBox = styled(Box)<{ show: boolean }>`
  opacity: ${p => (p.show ? 1 : 0)};
  height: ${p => (p.show ? WRAPPER_HEIGHT : 0)};
  animation: ${p =>
      p.show
        ? growAndFadeIn(`${WRAPPER_HEIGHT}px`)
        : shrinkAndFadeOut(`${WRAPPER_HEIGHT}px`)}
    0.3s linear;
`
