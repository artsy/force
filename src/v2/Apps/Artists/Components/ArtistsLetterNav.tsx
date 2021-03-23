import { Box, BoxProps, color, space, Text } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { RouterLink, RouterLinkProps } from "v2/Artsy/Router/RouterLink"

export const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

const Container = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
`

const Letter = styled(RouterLink)<RouterLinkProps>`
  display: block;
  padding: ${space(0.5)}px ${space(1)}px;
  text-align: center;
  text-decoration: none;
  border-radius: 2px;

  &.active {
    color: ${color("black100")};
    background-color: ${color("black5")};
    font-weight: bold;
  }
`

interface ArtistsLetterNavProps extends BoxProps {}

export const ArtistsLetterNav: React.FC<ArtistsLetterNavProps> = ({
  ...rest
}) => {
  return (
    <Container {...rest}>
      {LETTERS.map(letter => {
        return (
          <Text key={letter} variant="text" color="black60">
            <Letter
              key={letter}
              activeClassName="active"
              to={`/artists/artists-starting-with-${letter.toLowerCase()}`}
              title={`View artists starting with “${letter}”`}
            >
              {letter}
            </Letter>
          </Text>
        )
      })}
    </Container>
  )
}
