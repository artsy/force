import {
  Box,
  Column,
  FullBleed,
  GridColumns,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { MOBILE_NAV_HEIGHT, DESKTOP_NAV_BAR_HEIGHT } from "../NavBar"
import { Sticky } from "./Sticky"
import { StickyProvider } from "./StickyProvider"

export default {
  title: "Components/Sticky",
}

const HeaderPlaceholder: React.FC = () => {
  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        height={[MOBILE_NAV_HEIGHT, DESKTOP_NAV_BAR_HEIGHT]}
        p={1}
        bg="black5"
      >
        <Text variant="sm">Header placeholder</Text>
      </Box>

      <Spacer height={[MOBILE_NAV_HEIGHT, DESKTOP_NAV_BAR_HEIGHT]} />
    </>
  )
}

const Filler: React.FC<{ amount?: number }> = ({ amount = 10 }) => {
  return (
    <>
      {[...new Array(amount)].map((_, i) => {
        return (
          <Text variant="sm" key={i}>
            Static content
          </Text>
        )
      })}
    </>
  )
}

export const Example = () => {
  return (
    <StickyProvider>
      <HeaderPlaceholder />

      <Filler />

      <Sticky>
        <Box bg="black10" p={1}>
          <Text variant="sm">Sticky content</Text>
        </Box>
      </Sticky>

      <Filler />

      <Sticky>
        {({ stuck }) => {
          return (
            <Box bg={stuck ? "blue10" : "red10"} p={1} height={250}>
              <Text variant="sm">More sticky content</Text>
              <Text variant="sm">Of a different height</Text>
              <Text variant="sm">Changes color when stuck</Text>
            </Box>
          )
        }}
      </Sticky>

      <Filler />

      <Sticky>
        <Box bg="green10" p={1}>
          <Text variant="sm">More sticky content</Text>
        </Box>
      </Sticky>

      <Filler amount={100} />
    </StickyProvider>
  )
}

export const ContainedExample = () => {
  return (
    <AppContainer>
      <HorizontalPadding>
        <HeaderPlaceholder />

        <Filler />

        <GridColumns my={2}>
          <Column span={6}>
            <Sticky proportional>
              <Box bg="black10" height={400} width="100%" />
            </Sticky>
          </Column>

          <Column span={6}>
            <Filler amount={30} />
          </Column>
        </GridColumns>

        <Filler amount={100} />
      </HorizontalPadding>
    </AppContainer>
  )
}

export const GridExample = () => {
  return (
    <AppContainer>
      <HorizontalPadding>
        <HeaderPlaceholder />

        <Text variant="sm">
          This is a bit verbose but we currently don't match{" "}
          <code>position: sticky;</code>
          exactly. One of the side effects of this is that content when stuck
          will break out of the container completely. At the moment this is
          desireable though we may revisit in the future. In the meantime simply
          break out of the container with the <code>FullBleed</code> component,
          then wrap it in our <code>AppContainer</code>, which controls
          max-width; and <code>HorizontalPadding</code> which controls the
          page's padding.
        </Text>

        <Separator my={1} />

        <Filler />

        <Sticky>
          <FullBleed>
            <AppContainer bg="black100">
              <HorizontalPadding>
                <Text variant="sm" color="white100">
                  Is aligned with underlying content
                </Text>
              </HorizontalPadding>
            </AppContainer>
          </FullBleed>
        </Sticky>

        {[...new Array(100)].map((_, i) => {
          return (
            <Text variant="sm" key={i}>
              Static content
            </Text>
          )
        })}
      </HorizontalPadding>
    </AppContainer>
  )
}

GridExample.story = {
  parameters: {
    layout: "fullscreen",
  },
}
