import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Masonry } from "../Masonry"
import { Box, BoxProps, Sans } from "@artsy/palette"

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min

const Example: React.FC<Omit<BoxProps, "color">> = props => (
  <Box
    bg="black10"
    mb={2}
    p={2}
    width="100%"
    height={rand(300, 500)}
    {...props}
  />
)

storiesOf("Components/Masonry", module).add("Masonry", () => (
  <Masonry columnCount={3} gridColumnGap={20}>
    {[...Array(25)].map((_, i) => (
      <Example key={i}>
        <Sans size="6">{i}</Sans>
      </Example>
    ))}
  </Masonry>
))
