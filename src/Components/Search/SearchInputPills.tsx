import {
  Box,
  Flex,
  Pill,
  ShelfNavigationProps,
  ShelfNext,
  ShelfPrevious,
} from "@artsy/palette"
import { FC, useEffect, useRef, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled, { css } from "styled-components"
import { SearchInputPills_viewer$data } from "__generated__/SearchInputPills_viewer.graphql"
import { PILLS, PillType, TOP_PILL } from "./constants"

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
  ${({ placement, theme }) => {
    const rgb = theme.name === "dark" ? "0, 0, 0" : "255, 255, 255"
    return css`
      background-image: linear-gradient(
        to ${placement},
        rgba(${rgb}, 0) 0%,
        rgba(${rgb}, 1) 40%
      );
    `
  }}
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

interface SearchInputPillsProps {
  viewer: SearchInputPills_viewer$data
  selectedPill: PillType
  enableChevronNavigation?: boolean
  forceDisabled?: boolean
  onPillClick: (pill: PillType) => void
}

const SearchInputPills: FC<SearchInputPillsProps> = ({
  viewer,
  selectedPill,
  enableChevronNavigation = true,
  forceDisabled = false,
  onPillClick,
}) => {
  const pillsRef = useRef<HTMLDivElement>(null)
  const [showPreviousChevron, setShowPreviousChevron] = useState<boolean>(false)
  const [showNextChevron, setShowNextChevron] = useState<boolean>(false)

  const aggregation = viewer.searchConnectionAggregation?.aggregations?.[0]

  const isPillDisabled = (key: string) => {
    if (key === TOP_PILL.key) {
      return false
    }

    if (forceDisabled) return true

    return !aggregation?.counts?.find(agg => agg?.name === key)
  }

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
    return scroll("left")
  }

  const scrollToRight = () => {
    return scroll("right")
  }

  // TODO: comments
  const scroll = (direction: "left" | "right") => {
    if (!pillsRef.current) {
      return undefined
    }

    const pillsContainer = pillsRef.current
    const pills = Array.from(pillsContainer.children)
    const currentScroll = pillsContainer.scrollLeft
    const visibleWidth = pillsContainer.offsetWidth
    const sortedPills = direction === "left" ? pills.reverse() : pills

    const currentPill = sortedPills.find((pill: HTMLElement) =>
      direction === "left"
        ? pill.offsetLeft + pill.offsetWidth <= currentScroll + visibleWidth
        : pill.offsetLeft >= currentScroll
    )

    if (currentPill) {
      const nextPill = (direction === "left"
        ? currentPill.previousElementSibling
        : currentPill.nextElementSibling) as HTMLElement
      let scrollBy = nextPill.offsetWidth + GRADIENT_BG_WIDTH
      scrollBy = direction == "left" ? -scrollBy : scrollBy

      pillsContainer.scrollBy({
        left: scrollBy,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (pillsRef.current) {
      const currentPosition = pillsRef.current.scrollLeft
      const maxScroll =
        pillsRef.current.scrollWidth - pillsRef.current.clientWidth

      const isAtStart = currentPosition === 0
      // currentPosition can vary a bit when user has browser zoomed in or out
      // this is why we use a range instead of exact value
      const isAtEnd = Math.abs(currentPosition - maxScroll) < 10

      setShowPreviousChevron(!isAtStart)
      setShowNextChevron(!isAtEnd)
    }
  }

  return (
    <Flex alignItems="center" bg="white100">
      {enableChevronNavigation && (
        <Flex
          position="absolute"
          left={0}
          opacity={showPreviousChevron ? 1 : 0}
          zIndex={showPreviousChevron ? 1 : -1}
        >
          <PreviousChevron onClick={scrollToLeft} left={2} />
          <GradientBg placement="left" />
        </Flex>
      )}

      <PillsContainer
        ref={pillsRef as any}
        px={2}
        py={2}
        onScroll={handleScroll}
      >
        {PILLS.map(pill => {
          const { key, displayName } = pill
          const selected = selectedPill.key === pill.key
          const disabled = isPillDisabled(key)

          return (
            <Pill
              key={key}
              mr={1}
              selected={selected}
              disabled={disabled}
              onClick={() => onPillClick(pill)}
            >
              {displayName}
            </Pill>
          )
        })}
      </PillsContainer>

      {enableChevronNavigation && (
        <Flex
          position="absolute"
          right={0}
          opacity={showNextChevron ? 1 : 0}
          zIndex={showNextChevron ? 1 : -1}
        >
          <NextChevron onClick={scrollToRight} right={2} />
          <GradientBg placement="right" />
        </Flex>
      )}
    </Flex>
  )
}

export const SearchInputPillsFragmentContainer = createFragmentContainer(
  SearchInputPills,
  {
    viewer: graphql`
      fragment SearchInputPills_viewer on Viewer
        @argumentDefinitions(term: { type: "String!", defaultValue: "" }) {
        searchConnectionAggregation: searchConnection(
          first: 0
          mode: AUTOSUGGEST
          query: $term
          aggregations: [TYPE]
        ) {
          aggregations {
            counts {
              count
              name
            }
          }
        }
      }
    `,
  }
)
