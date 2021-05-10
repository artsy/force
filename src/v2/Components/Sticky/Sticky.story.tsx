import { Box, Spacer, Text } from "@artsy/palette"
import React from "react"
import { MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT } from "../NavBar"
import { Sticky } from "./Sticky"
import { StickyProvider } from "./StickyProvider"

export default {
  title: "Components/Sticky",
}

export const Example = () => {
  return (
    <StickyProvider>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        height={[MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT]}
        p={1}
        bg="black5"
      >
        <Text variant="md">Header placeholder</Text>
      </Box>

      <Spacer height={[MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT]} />

      {[...new Array(10)].map((_, i) => {
        return (
          <Text variant="md" key={i}>
            Static content
          </Text>
        )
      })}

      <Sticky>
        <Box bg="black10" p={1}>
          <Text variant="md">Sticky content</Text>
        </Box>
      </Sticky>

      {[...new Array(10)].map((_, i) => {
        return (
          <Text variant="md" key={i}>
            Static content
          </Text>
        )
      })}

      <Sticky>
        {({ stuck }) => {
          return (
            <Box bg={stuck ? "blue10" : "red10"} p={1} height={250}>
              <Text variant="md">More sticky content</Text>
              <Text variant="md">Of a different height</Text>
              <Text variant="md">Changes color when stuck</Text>
            </Box>
          )
        }}
      </Sticky>

      {[...new Array(10)].map((_, i) => {
        return (
          <Text variant="md" key={i}>
            Static content
          </Text>
        )
      })}

      <Sticky>
        <Box bg="green10" p={1}>
          <Text variant="md">More sticky content</Text>
        </Box>
      </Sticky>

      {[...new Array(100)].map((_, i) => {
        return (
          <Text variant="md" key={i}>
            Static content
          </Text>
        )
      })}
    </StickyProvider>
  )
}
