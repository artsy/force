import { RouterLink, type RouterLinkProps } from "System/Components/RouterLink"
import { Box, type BoxProps, Flex, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import type * as React from "react"
import styled from "styled-components"

export const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

interface ArtistsLetterNavProps extends BoxProps {}

export const ArtistsLetterNav: React.FC<
  React.PropsWithChildren<ArtistsLetterNavProps>
> = ({ ...rest }) => {
  return (
    <Flex flexWrap="wrap" justifyContent={["flex-start", "flex-end"]} {...rest}>
      {LETTERS.map((letter, i) => {
        return (
          <Text key={letter} variant="sm-display" color="mono60">
            <Letter
              key={letter}
              activeClassName="active"
              to={`/artists/artists-starting-with-${letter.toLowerCase()}`}
              title={`View artists starting with “${letter}”`}
            >
              <Box
                p={0.5}
                pl={i === 0 ? 0 : undefined}
                pr={i === LETTERS.length - 1 ? 0 : undefined}
              >
                {letter}
              </Box>
            </Letter>
          </Text>
        )
      })}
    </Flex>
  )
}

const Letter = styled(RouterLink)<RouterLinkProps>`
  display: block;
  text-align: center;
  text-decoration: none;
  transition: color 250ms;
  color: ${themeGet("colors.mono60")};

  &:hover {
    text-decoration: underline;
    color: ${themeGet("colors.mono100")};
  }

  &.active {
    color: ${themeGet("colors.mono100")};
  }
`
