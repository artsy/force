import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  DROP_SHADOW,
  Flex,
  Pill,
  ShelfNavigationProps,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
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
  background-color: white;
  color: ${themeGet("colors.black60")};
  height: 30px;
  width: 30px;
  border: 1px solid ${themeGet("colors.black5")};
  border-radius: 50%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);

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

const PreviousChevron = styled(CarouselPrevious)<ShelfNavigationProps>`
  margin-left: 20px;
  ${ChevronStyle}
`

const NextChevron = styled(CarouselNext)<ShelfNavigationProps>`
  margin-right: 20px;
  ${ChevronStyle}
`

export const SearchBarPills = () => {
  const handlePress = (e, props) => {
    e.stopPropagation()
    e.preventDefault()
    props.onClick && props.onClick(e)
  }
  return (
    <Flex p={2}>
      <Carousel
        Previous={props => (
          <PreviousChevron {...props} onClick={e => handlePress(e, props)} />
        )}
        Next={props => (
          <NextChevron {...props} onClick={e => handlePress(e, props)} />
        )}
        paginateBy="cell"
      >
        {SearchPills.map((pill, index) => {
          const isLast = index === SearchPills.length - 1
          return (
            <Pill key={index} mr={isLast ? 0 : -1}>
              {pill}
            </Pill>
          )
        })}
      </Carousel>
    </Flex>
  )
}
