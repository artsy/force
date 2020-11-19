import { Box, BoxProps, space, Text } from "@artsy/palette"
import React from "react"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

interface ArtistsLetterNavProps extends BoxProps {}

export const ArtistsLetterNav: React.FC<ArtistsLetterNavProps> = ({
  ...rest
}) => {
  return (
    <Box
      display="flex"
      flexDirection={["column", "row"]}
      justifyContent="space-between"
      alignItems="center"
      borderTop={["none", "1px solid"]}
      borderBottom={["none", "1px solid"]}
      borderColor={["transparent", "black10"]}
      py={[0, 2]}
      px={[2, 0]}
      {...rest}
    >
      <Text>Browse over 100,000 artists</Text>

      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {LETTERS.map(letter => {
          return (
            <Text key={letter}>
              <RouterLink
                key={letter}
                to={`/artists/${letter}`}
                style={{ padding: space(0.5), textDecoration: "none" }}
                title={`View artists starting with “${letter}”`}
              >
                {letter}
              </RouterLink>
            </Text>
          )
        })}
      </Box>
    </Box>
  )
}
