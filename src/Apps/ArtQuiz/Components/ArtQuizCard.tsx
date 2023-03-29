import { Box, BoxProps } from "@artsy/palette"
import { FC, ReactNode, useReducer } from "react"
import styled, { css } from "styled-components"

export enum Mode {
  Pending,
  Active,
  Liked,
  Disliked,
}

interface ArtQuizCardProps extends BoxProps {
  children: ReactNode
  mode: Mode
}

export const ArtQuizCard: FC<ArtQuizCardProps> = ({
  children,
  mode = Mode.Pending,
  ...rest
}) => {
  return (
    <Container mode={mode} {...rest}>
      {children}
    </Container>
  )
}

const Container = styled(Box)<{ mode: Mode }>`
  transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;

  ${({ mode }) => {
    switch (mode) {
      case Mode.Pending:
        return css`
          transform: translateX(0) scale(0.75) rotate(0deg);
          opacity: 0;
          z-index: 0;
        `
      case Mode.Active:
        return css`
          transform: translateX(0) scale(1) rotate(0deg);
          opacity: 1;
          z-index: 1;
        `
      case Mode.Liked:
        return css`
          transform: translateX(150%) scale(1) rotate(-5deg);
          opacity: 0;
          z-index: 1;
        `
      case Mode.Disliked:
        return css`
          transform: translateX(-150%) scale(1) rotate(5deg);
          opacity: 0;
          z-index: 1;
        `
    }
  }}
`

interface State<T> {
  index: number
  cards: (T & { mode: Mode })[]
}

type Action =
  | { type: "Next" }
  | { type: "Previous" }
  | { type: "Like" }
  | { type: "Dislike" }

const reducer = <T,>(state: State<T>, action: Action) => {
  switch (action.type) {
    case "Next":
      return {
        ...state,
        index: state.index + 1,
      }

    case "Previous":
      return {
        ...state,
        index: state.index - 1,
      }

    case "Like":
      return {
        ...state,
        index: state.index + 1,
        cards: state.cards.map((card, i) => {
          if (i === state.index) {
            return { ...card, mode: Mode.Liked }
          }

          return card
        }),
      }

    case "Dislike":
      return {
        ...state,
        index: state.index + 1,
        cards: state.cards.map((card, i) => {
          if (i === state.index) {
            return { ...card, mode: Mode.Disliked }
          }

          return card
        }),
      }
  }
}

interface UseArtQuizCards<T> {
  //** An array of card objects */
  cards: T[]
  startingIndex?: number
}

export const useArtQuizCards = <T extends object>({
  cards = [],
  startingIndex,
}: UseArtQuizCards<T>) => {
  const [state, dispatch] = useReducer(reducer, {
    cards: cards.map(card => ({ ...card, mode: Mode.Pending })),
    index: startingIndex || 0,
  })

  return {
    activeCard: state.cards[state.index] as T & { mode: Mode },
    activeIndex: state.index,
    cards: state.cards as (T & { mode: Mode })[],
    dispatch,
  }
}
