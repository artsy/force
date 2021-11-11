import React, { FC, useEffect, useState } from "react"
import styled from "styled-components"
import { Box, Clickable, CloseIcon, Flex, Spacer, Text } from "@artsy/palette"
import { growAndFadeIn, shrinkAndFadeOut } from "v2/Assets/Animations"
import { CreateAlertButton } from "./CreateAlertButton"
import { SavedSearchAttributes } from "../types"

const WRAPPER_HEIGHT = 70

interface FilterPill {
  name: string
  isDefault: boolean
}

interface FiltersPillsProps {
  show: boolean
  pills: FilterPill[]
  savedSearchAttributes: SavedSearchAttributes
}

const Pill: FC<{ enableRemoveButton: boolean }> = ({
  children,
  enableRemoveButton,
}) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      m={0.5}
      px={1}
      py={0.5}
      border="1px solid"
      borderColor="black60"
    >
      <Text variant="xs" overflowEllipsis>
        {children}
      </Text>
      {enableRemoveButton && (
        <>
          <Spacer ml={0.5} />
          <Clickable display="flex">
            <CloseIcon />
          </Clickable>
        </>
      )}
    </Flex>
  )
}

export const FiltersPills: React.FC<FiltersPillsProps> = ({
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
          <Flex flexWrap="wrap">
            {pills.map((pill, index) => (
              <Pill
                key={`filter-label-${index}`}
                enableRemoveButton={!pill.isDefault}
              >
                {pill.name}
              </Pill>
            ))}
            <CreateAlertButton
              savedSearchAttributes={savedSearchAttributes}
              m={0.5}
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
