import {
  Box,
  Carousel,
  DROP_SHADOW,
  Flex,
  Pill,
  ShelfNavigationProps,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { Shelf, ShelfNext, ShelfPrevious } from "Components/Shelf"
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

const ChevronContainer = styled(Flex)`
  position: absolute;
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

interface ChevronButtonProps extends ShelfNavigationProps {
  placement: "left" | "right"
}

const ChevronButton = ({ placement, ...rest }: ChevronButtonProps) => {
  const handlePress = (props: ShelfNavigationProps) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation()
    event.preventDefault()
    props.onClick?.(event)
  }

  if (rest.disabled) {
    return null
  }

  if (placement === "left") {
    return (
      <ChevronContainer left={0}>
        <PreviousChevron {...rest} onClick={handlePress(rest)} left={2} />
        <GradientBg placement="left" />
      </ChevronContainer>
    )
  }

  return (
    <ChevronContainer right={0}>
      <NextChevron {...rest} onClick={handlePress(rest)} right={2} />
      <GradientBg placement="right" />
    </ChevronContainer>
  )
}

export const SearchBarPills = () => {
  // This is with local Shelf component with some custome changes
  // Lot of code changes required

  return (
    <Shelf
      showProgress={false}
      noFullBleed
      my={2}
      Previous={props => <ChevronButton placement="left" {...props} />}
      Next={props => <ChevronButton placement="right" {...props} />}
      paginateBy="cell"
    >
      {SearchPills.map((pill, index) => {
        const isFirst = index === 0

        return (
          <Pill key={index} ml={isFirst ? 2 : 0}>
            {pill}
          </Pill>
        )
      })}
    </Shelf>
  )

  // This is with Carousel from palette latest version.
  // No scroll on mouse/track event
  // Chevron icons with z-index

  return (
    <Flex p={2} overflowX="scroll">
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
