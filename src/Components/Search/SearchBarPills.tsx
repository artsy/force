import {
  ChevronIcon,
  Clickable,
  DROP_SHADOW,
  Flex,
  HorizontalOverflow,
  paginateCarousel,
  Pill,
  ShelfNavigationProps,
  Text,
  visuallyDisableScrollbar,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { SearchPills } from "Components/Search/SearchBar"
import { Shelf } from "Components/Shelf"
import {
  Children,
  createRef,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import styled, { css } from "styled-components"
import { useCursor } from "use-cursor"

const STATES = {
  hover: css`
    outline: 0;
    color: ${themeGet("colors.black100")};
    box-shadow: ${DROP_SHADOW};
  `,
  focus: css`
    outline: 0;
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.brand")};
  `,
  disabled: css`
    opacity: 0;
    cursor: default;
  `,
}

const Arrow = styled(Clickable)<ShelfNavigationProps>`
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: opacity 250ms, color 250ms, border-color 250ms,
    box-shadow 0.25s ease;
  color: ${themeGet("colors.black60")};
  background-color: ${themeGet("colors.white100")};
  border: 1px solid ${themeGet("colors.black5")};
  border-radius: 50%;
  pointer-events: auto;

  > svg {
    fill: currentColor;
  }

  ${props => {
    return css`
      ${props.hover && STATES.hover}
      ${props.focus && STATES.focus}
      ${props.disabled && STATES.focus}
    `
  }}

  &:hover {
    ${STATES.hover}
  }
  &:focus {
    ${STATES.focus}
  }

  &:disabled {
    ${STATES.disabled}
  }
`
// eslint-disable-next-line no-redeclare
const ShelfNext: React.FC<ShelfNavigationProps> = props => {
  return (
    <Arrow {...props}>
      <ChevronIcon direction="right" width={15} height={15} />
    </Arrow>
  )
}

// eslint-disable-next-line no-redeclare
const ShelfPrevious: React.FC<ShelfNavigationProps> = props => {
  return (
    <Arrow {...props}>
      <ChevronIcon direction="left" width={15} height={15} />
    </Arrow>
  )
}

export const SearchBarPills = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const cells = useMemo(
    () =>
      Children.toArray(children)
        .filter(isValidElement)
        .map(child => ({ child, ref: createRef<HTMLLIElement>() })),
    [children]
  )

  const containerRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)

  const [atStart, setAtStart] = useState(true)
  const [pages, setPages] = useState([0])
  const [offset, setOffset] = useState(0)

  const init = useCallback(() => {
    if (containerRef.current === null) return

    const { current: container } = containerRef

    // Set page-stops
    const values = cells.map(({ ref }, i) => {
      // If we have an offset we actually want to subtract it from
      // the first and last elements.
      if (offset !== 0 && (i === 0 || i === cells.length - 1)) {
        return Math.ceil(ref.current!.clientWidth - offset)
      }

      return ref.current!.clientWidth
    })

    setPages(
      paginateCarousel({
        // Here we use the container width instead of the viewport width.
        // The viewport has been extended to the full width of the window;
        // we want to scroll to the parent boundaries instead.
        viewport: container.clientWidth,
        values,
      })
    )

    // Set offset to accomodate full-bleed and line up initially with page-margins
    const { x } = container.getBoundingClientRect()
    setOffset(x)
  }, [cells, offset])

  useEffect(() => {
    init()

    window.addEventListener("resize", init)
    return () => {
      window.removeEventListener("resize", init)
    }
  }, [init])

  const { index: pageIndex, setCursor } = useCursor({
    max: pages.length,
  })

  useEffect(() => {
    if (viewportRef.current === null) return

    const { current: viewport } = viewportRef

    const handler = () => {
      const nearestPage = pages.find((currentPage, i) => {
        const nextPage = pages[i + 1] ?? Infinity
        return (
          viewport.scrollLeft >= currentPage && viewport.scrollLeft < nextPage
        )
      })

      setCursor(pages.indexOf(nearestPage!))
      setAtStart(viewport.scrollLeft === 0)
    }

    viewport.addEventListener("scroll", handler, { passive: true })
  }, [pages, setCursor])

  // Scroll to a specific page-stop
  const scrollToPage = (index: number) => {
    const xPosition = pages[index]
    scrollTo(xPosition)
  }

  const scrollTo = (xPosition: number) => {
    if (viewportRef.current === null) return

    const { current: viewport } = viewportRef

    if (viewport.scrollTo) {
      viewport.scrollTo({ left: xPosition, behavior: "smooth" })
      return
    }

    viewport.scrollLeft = xPosition
  }

  const handleNext = () => {
    scrollToPage(pageIndex + 1)
  }

  const handlePrev = () => {
    if (pageIndex === 0) {
      scrollTo(0)
      return
    }

    scrollToPage(pageIndex - 1)
  }

  return (
    <Flex alignItems="center" width={"80%"} backgroundColor="yellow">
      <Flex>
        <Previous
          onClick={handlePrev}
          disabled={atStart}
          aria-label="Previous page"
        />
      </Flex>
      <Viewport ref={viewportRef as any}>
        {SearchPills.map(pill => (
          <Pill mr={1} key={pill}>
            {pill}
          </Pill>
        ))}
      </Viewport>
      <Flex>
        <Next
          onClick={handleNext}
          disabled={pageIndex === pages.length - 1}
          aria-label="Next page"
        />
      </Flex>
    </Flex>
  )
}

const Viewport = styled(Flex)`
  background-color: "yellow";
  width: "80%";
  list-style: none;
  overflow-y: hidden;
  overflow-x: scroll;
  ${visuallyDisableScrollbar}
`

const Previous = styled(ShelfPrevious)`
  @media (hover: none) {
    display: none;
  }
`

const Next = styled(ShelfNext)`
  @media (hover: none) {
    display: none;
  }
`
