import {
  Box,
  Flex,
  Pill,
  ShelfNavigationProps,
  ShelfNext,
  ShelfPrevious,
} from "@artsy/palette"
import { useRef, useState } from "react"
import styled, { css } from "styled-components"

const PILLS_OPTIONS = [
  "TOP",
  "ARTWORK",
  "ARTIST",
  "ARTICLE",
  "SALE",
  "ARTIST_SERIES",
  "COLLECTION",
  "FAIR",
  "SHOW",
  "GALLERY",
]

const ChevronStyle = css`
  position: absolute;
  width: 30px;
  height: 30px;
  @media (hover: none) {
    display: none;
  }
`

const PreviousChevron = styled(ShelfPrevious)<ShelfNavigationProps>`
  ${ChevronStyle}
`

const NextChevron = styled(ShelfNext)<ShelfNavigationProps>`
  ${ChevronStyle}
`

interface GradientBgProps {
  placement: "right" | "left"
}

const GradientBg = styled(Box)<GradientBgProps>`
  position: "absolute";
  right: 0;
  width: 100px;
  height: 30px;
  background: transparent;
  background-image: linear-gradient(
    to ${props => props.placement},
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 40%
  );
`

const PillsContainer = styled(Flex)`
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const NewSearchInputPillsContainer = () => {
  const pillsRef = useRef<HTMLDivElement>(null)
  const [showPreviousChevron, setShowPreviousChevron] = useState<boolean>(false)
  const [showNextChevron, setShowNextChevron] = useState<boolean>(true)

  const scrollToLeft = () => {
    if (pillsRef.current) {
      pillsRef.current.scrollBy({
        left: -100,
        behavior: "smooth",
      })
    }
  }

  const scrollToRight = () => {
    if (pillsRef.current) {
      pillsRef.current.scrollBy({
        left: 100,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (pillsRef.current) {
      const currentPosition = pillsRef.current.scrollLeft
      const maxScroll =
        pillsRef.current.scrollWidth - pillsRef.current.clientWidth

      // Check if the scroll position is at the beginning or end
      if (currentPosition === 0) {
        // Hide PreviousChevron when pills is at the beginning
        setShowPreviousChevron(false)
        setShowNextChevron(true)
      } else if (currentPosition === maxScroll) {
        // Hide NextChevron when pills reaches the end
        setShowPreviousChevron(true)
        setShowNextChevron(false)
      } else {
        // Show both chevrons otherwise
        setShowPreviousChevron(true)
        setShowNextChevron(true)
      }
    }
  }

  return (
    <Flex alignItems="center" bg="white">
      <Flex position="absolute" left={0} zIndex={showPreviousChevron ? 0 : -1}>
        <PreviousChevron onClick={scrollToLeft} left={2} />
        <GradientBg placement="left" />
      </Flex>

      <PillsContainer
        ref={pillsRef as any}
        px={2}
        py={2}
        onScroll={handleScroll}
      >
        {PILLS_OPTIONS.map(pill => (
          <Flex key={pill}>
            <Pill mr={1}>{pill}</Pill>
          </Flex>
        ))}
      </PillsContainer>
      <Flex position="absolute" right={0} zIndex={showNextChevron ? 0 : -1}>
        <NextChevron onClick={scrollToRight} right={2} />
        <GradientBg placement="right" />
      </Flex>
    </Flex>
  )
}
