import { Box, Flex } from "@artsy/palette"
import { range } from "lodash"
import { ReactNode, useEffect, useRef } from "react"
import { Media, valuesWithBreakpointProps } from "Utils/Responsive"

export interface GridProps {
  aspectRatios: (number | undefined | null)[]
  children: ReactNode[]
  columnCount?: number[]
  onLoadMore?: () => any
  sectionMargin?: number
  style?: React.CSSProperties | undefined
}

export const Grid: React.FC<GridProps> = ({
  columnCount = [2, 3, 4],
  style,
  onLoadMore,
  ...props
}) => {
  const containerRef = useRef<HTMLElement>(null)

  useLoadMore(onLoadMore, containerRef)

  const breakpointProps = valuesWithBreakpointProps(columnCount)

  const breakpoints = breakpointProps.map(([columnCount, mediaProps], i) => {
    return (
      <Box ref={containerRef as any} style={style}>
        <Media {...mediaProps} key={i}>
          <GridForBreakpoint {...props} columnCount={columnCount} />
        </Media>
      </Box>
    )
  })

  return <>{breakpoints}</>
}

export interface GridForBreakpointProps {
  columnCount: number
  aspectRatios?: (number | undefined | null)[]
  children: ReactNode[]
  sectionMargin?: number
  style?: React.CSSProperties | undefined
}

export const GridForBreakpoint: React.FC<GridForBreakpointProps> = ({
  aspectRatios = [],
  children,
  columnCount = 4,
  sectionMargin = 10,
}) => {
  const sectionedElements = createSectionedElements(
    children,
    columnCount,
    aspectRatios
  )

  const sections: JSX.Element[] = []

  sectionedElements.forEach((section, column) => {
    const elementComponents: ReactNode[] = []

    section.forEach((element, row) => {
      elementComponents.push(element)
    })

    const sectionSpecificStyle = {
      flex: 1,
      minWidth: 0,
      marginRight: column === columnCount - 1 ? 0 : sectionMargin,
    }

    sections.push(
      <div style={sectionSpecificStyle} key={column}>
        {elementComponents}
      </div>
    )
  })

  return <Flex width="100%">{sections}</Flex>
}

const useLoadMore = (
  onLoadMore: (() => any) | undefined,
  ref: React.MutableRefObject<HTMLElement | null>
) => {
  const maybeLoadMore = () => {
    if (!ref.current) return

    const threshold = window.innerHeight + window.scrollY

    if (threshold >= ref.current.clientHeight + ref.current.scrollTop) {
      onLoadMore?.()
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      maybeLoadMore()
    }, 150)

    return () => clearInterval(interval)
  })
}

const createSectionedElements = (
  elements: ReactNode[],
  columnCount: number,
  aspectRatios: (number | undefined | null)[]
): Array<ReactNode[]> => {
  const sectionedElements: Array<ReactNode[]> = []
  const sectionRatioSums: number[] = []

  range(columnCount).forEach(() => {
    sectionedElements.push([])
    sectionRatioSums.push(0)
  })

  elements.forEach((element, index) => {
    if (!element) return

    // Find section with lowest *inverted* aspect ratio sum, which is the shortest column.
    let lowestRatioSum = Number.MAX_VALUE
    let sectionIndex: number | null = null

    range(sectionRatioSums.length).forEach(j => {
      const ratioSum = sectionRatioSums[j]
      if (ratioSum < lowestRatioSum) {
        sectionIndex = j
        lowestRatioSum = ratioSum
      }
    })

    if (sectionIndex != null) {
      const section = sectionedElements[sectionIndex]
      section.push(element)

      // Keep track of total section aspect ratio
      // Invert the aspect ratio so that a lower value means a shorter section.
      const aspectRatio = aspectRatios[index] || 1
      sectionRatioSums[sectionIndex] += 1 / aspectRatio
    }
  })

  return sectionedElements
}
