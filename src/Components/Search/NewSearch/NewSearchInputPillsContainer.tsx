import {
  Box,
  Flex,
  Pill,
  ShelfNavigationProps,
  ShelfNext,
  ShelfPrevious,
} from "@artsy/palette"
import { useEffect, useRef, useState } from "react"
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

const GRADIENT_BG_WIDTH = 30

export const NewSearchInputPillsContainer = () => {
  const pillsRef = useRef<HTMLDivElement>(null)
  const [showPreviousChevron, setShowPreviousChevron] = useState<boolean>(false)
  const [showNextChevron, setShowNextChevron] = useState<boolean>(false)

  const showNextChevronHandler = () => {
    if (pillsRef.current) {
      const pillsContainer = pillsRef.current
      setShowNextChevron(
        pillsContainer.scrollWidth > pillsContainer.clientWidth
      )
    }
  }

  useEffect(() => {
    showNextChevronHandler()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      showNextChevronHandler()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const scrollToLeft = () => {
    if (pillsRef.current) {
      const pillsContainer = pillsRef.current
      const pills = pillsContainer.children
      const currentScroll = pillsContainer.scrollLeft
      const visibleWidth = pillsContainer.offsetWidth

      const lastVisiblePill = Array.from(pills)
        .reverse()
        .find(
          (pill: HTMLElement) =>
            pill.offsetLeft + pill.offsetWidth <= currentScroll + visibleWidth
        )

      if (lastVisiblePill) {
        const prevPill = lastVisiblePill.previousElementSibling as HTMLElement
        const scrollBy = -prevPill.offsetWidth - GRADIENT_BG_WIDTH

        pillsContainer.scrollBy({
          left: scrollBy,
          behavior: "smooth",
        })
      }
    }
  }

  const scrollToRight = () => {
    if (pillsRef.current) {
      const pillsContainer = pillsRef.current
      const pills = pillsContainer.children
      const currentScroll = pillsContainer.scrollLeft

      const firstInvisiblePill = Array.from(pills).find(
        (pill: HTMLElement) => pill.offsetLeft >= currentScroll
      )

      if (firstInvisiblePill) {
        const nextPill = firstInvisiblePill.nextElementSibling as HTMLElement
        const scrollBy = nextPill.offsetWidth + GRADIENT_BG_WIDTH

        pillsContainer.scrollBy({
          left: scrollBy,
          behavior: "smooth",
        })
      }
    }
  }

  const handleScroll = () => {
    if (pillsRef.current) {
      const currentPosition = pillsRef.current.scrollLeft
      const maxScroll =
        pillsRef.current.scrollWidth - pillsRef.current.clientWidth

      const isAtStart = currentPosition === 0
      const isAtEnd = currentPosition === maxScroll

      setShowPreviousChevron(!isAtStart)
      setShowNextChevron(!isAtEnd)
    }
  }

  return (
    <Flex alignItems="center" bg="white">
      <Flex position="absolute" left={0} opacity={showPreviousChevron ? 1 : 0}>
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
          <Pill key={pill} mr={1}>
            {pill}
          </Pill>
        ))}
      </PillsContainer>
      <Flex position="absolute" right={0} opacity={showNextChevron ? 1 : 0}>
        <NextChevron onClick={scrollToRight} right={2} />
        <GradientBg placement="right" />
      </Flex>
    </Flex>
  )
}
