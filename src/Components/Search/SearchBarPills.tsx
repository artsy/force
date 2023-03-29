import { Box, Flex, Pill, ShelfNavigationProps } from "@artsy/palette"
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
  return (
    <Shelf
      showProgress={false}
      my={2}
      noFullBleed
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
}
