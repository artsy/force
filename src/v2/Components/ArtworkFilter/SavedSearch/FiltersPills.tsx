import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Box, Flex, Spacer } from "@artsy/palette"
import { growAndFadeIn, shrinkAndFadeOut } from "v2/Assets/Animations"
import { CreateAlertButton } from "./CreateAlertButton"
import { SavedSearchAlertFormPropsBase } from "v2/Components/SavedSearchAlert/SavedSearchAlertModel"

const WRAPPER_HEIGHT = 70

interface FilterPillsProps extends SavedSearchAlertFormPropsBase {
  show: boolean
}

export const FiltersPills: React.FC<FilterPillsProps> = ({
  show,
  artistId,
  artistName,
  aggregations,
  filters,
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
          <Flex>
            <CreateAlertButton
              artistId={artistId}
              artistName={artistName}
              aggregations={aggregations}
              filters={filters}
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
