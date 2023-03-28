import {
  CarouselNext,
  DROP_SHADOW,
  Flex,
  Pill,
  ShelfNavigationProps,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { Carousel, CarouselPrevious } from "Components/Carousel"
import styled, { css } from "styled-components"

const SearchPills = [
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

const ChevronStyle = css`
  transform: "translateX(0)";
  background-color: "white";
  color: ${themeGet("colors.black60")};
  height: 30px;
  width: 30px;
  border: 1px solid ${themeGet("colors.black5")};
  border-radius: 50%;
  pointer-events: auto;

  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: opacity 250ms, color 250ms, border-color 250ms,
    box-shadow 0.25s ease;

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

  @media (hover: none) {
    display: none;
  }
`

export const SearchBarPills = () => {
  return (
    <Flex p={2}>
      <Carousel
        Previous={props => <Previous {...props} />}
        Next={props => <Next {...props} />}
        paginateBy="cell"
      >
        {SearchPills.map(pill => (
          <Pill key={pill}>{pill}</Pill>
        ))}
      </Carousel>
    </Flex>
  )
}

const Previous = styled(CarouselPrevious)<ShelfNavigationProps>`
  ${ChevronStyle}
`

const Next = styled(CarouselNext)<ShelfNavigationProps>`
  ${ChevronStyle}
`
