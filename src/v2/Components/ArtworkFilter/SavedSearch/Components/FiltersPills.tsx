import React, { FC, useEffect, useState } from "react"
import styled from "styled-components"
import { Box, CloseIcon, Flex, Pill, Spacer } from "@artsy/palette"
import { growAndFadeIn, shrinkAndFadeOut } from "v2/Assets/Animations"
import { CreateAlertButton } from "./CreateAlertButton"
import { SavedSearchAttributes } from "../types"

const WRAPPER_HEIGHT = 70
const PILL_HORIZONTAL_MARGIN_SIZE = 0.5
const CLOSE_ICON_SIZE = 15

interface FilterPill {
  name: string
  isDefault: boolean
}

interface FiltersPillsProps {
  show: boolean
  pills: FilterPill[]
  savedSearchAttributes: SavedSearchAttributes
}

export const FiltersPills: FC<FiltersPillsProps> = ({
  show,
  pills,
  savedSearchAttributes,
}) => {
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
          <Flex flexWrap="wrap" mx={-PILL_HORIZONTAL_MARGIN_SIZE}>
            {pills.map((pill, index) => (
              <Pill
                key={`filter-label-${index}`}
                variant="textSquare"
                mx={PILL_HORIZONTAL_MARGIN_SIZE}
                mb={1}
              >
                {pill.name}
                {!pill.isDefault && (
                  <CloseIcon
                    fill="currentColor"
                    width={CLOSE_ICON_SIZE}
                    height={CLOSE_ICON_SIZE}
                    ml={0.5}
                  />
                )}
              </Pill>
            ))}
            <CreateAlertButton
              savedSearchAttributes={savedSearchAttributes}
              ml={PILL_HORIZONTAL_MARGIN_SIZE}
            />
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
