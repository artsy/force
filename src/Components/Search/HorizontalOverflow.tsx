import {
  Box,
  BoxProps,
  ChevronIcon,
  Clickable,
  DROP_SHADOW,
  Flex,
  ShelfNavigationProps,
  Spacer,
  visuallyDisableScrollbar,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { forwardRef, useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"
import composeRefs from "@seznam/compose-react-refs"
import {
  border,
  BorderProps,
  compose,
  justifyContent,
  JustifyContentProps,
  padding,
  PaddingProps,
} from "styled-system"
import { splitProps } from "Components/Search/splitProps"

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

const splitRailProps = splitProps<
  PaddingProps & JustifyContentProps & BorderProps
>(compose(padding, justifyContent, border))

const Overlay = styled(Box)<{ atEnd: boolean }>`
  position: relative;

  /* Fade-out gradient */
  &::after {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    right: 8%;
    bottom: 0;
    width: ${themeGet("space.6")};
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );

    /* Hide when scrolled all the way over */
    transition: opacity 250ms;
    opacity: ${({ atEnd }) => (atEnd ? 0 : 1)};
  }
`

const Viewport = styled(Box)`
  height: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  ${visuallyDisableScrollbar}
`

const Rail = styled(Box)`
  white-space: nowrap;
  min-width: 80%;
  height: 100%;
`

const ShelfNext: React.FC<ShelfNavigationProps> = props => {
  return (
    <Arrow {...props}>
      <ChevronIcon direction="right" width={15} height={15} />
    </Arrow>
  )
}

/**
 * Default previous button
 */
// eslint-disable-next-line no-redeclare
const ShelfPrevious: React.FC<ShelfNavigationProps> = props => {
  return (
    <Arrow {...props}>
      <ChevronIcon direction="left" width={15} height={15} />
    </Arrow>
  )
}

export type HorizontalOverflowProps = BoxProps & { children: React.ReactNode }

export const HorizontalOverflow: React.ForwardRefExoticComponent<
  HorizontalOverflowProps & React.RefAttributes<HTMLDivElement>
> = forwardRef(({ children, ...rest }, forwardedRef) => {
  const ref = useRef<HTMLDivElement | null>()

  useEffect(() => {
    updateAtEnd()
    window.addEventListener("resize", updateAtEnd)
    return () => {
      window.removeEventListener("resize", updateAtEnd)
    }
  }, [])

  const [railProps, { ref: _ref, ...boxProps }] = splitRailProps(rest)

  const [atEnd, setAtEnd] = useState(false)

  const updateAtEnd = () => {
    if (!ref.current) return

    const {
      current: { scrollLeft, scrollWidth, clientWidth },
    } = ref

    // Check if we're at the end of the scroll (within 1px)
    if (Math.abs(scrollLeft + clientWidth - scrollWidth) <= 1) {
      setAtEnd(true)
      return
    }

    setAtEnd(false)
  }

  return (
    <>
      <Overlay atEnd={atEnd} {...boxProps}>
        <Viewport
          ref={composeRefs(ref, forwardedRef) as any}
          onScroll={updateAtEnd}
          marginRight={100}
        >
          <Rail display="inline-flex" verticalAlign="top" {...railProps}>
            {children}
          </Rail>
        </Viewport>
      </Overlay>

      <Flex flex={1} position={"absolute"} right={2} top={2} zIndex={10}>
        <ShelfPrevious
          onClick={() => {
            console.log("Check Left clicked")
          }}
        />
        <Spacer x={1} />
        <ShelfNext
          onClick={() => {
            console.log("Check rigth clicked")
          }}
        />
      </Flex>
    </>
  )
})
