import {
  Box,
  Column,
  GridColumns,
  ResponsiveBox,
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
        bg="black10"
        zIndex={2}
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
            <Sticky proportional contained>
              <ResponsiveBox
                aspectWidth={6}
                aspectHeight={4}
                maxWidth="100%"
                bg="black60"
              >
                <img
                  src="https://picsum.photos/seed/example/600/400"
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                  }}
                />
              </ResponsiveBox>
            </Sticky>
          </Column>

          <Column span={6}>
            <Filler amount={25} />
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

        <Filler />

        <Sticky proportional>
          <Text variant="sm" color="white100" bg="black100" px={2} mx={-2}>
            Is aligned with underlying content
          </Text>
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

export const SidebarStory = () => {
  return (
    <AppContainer>
      <HorizontalPadding>
        <HeaderPlaceholder />
        <GridColumns>
          <Column span={3}>
            <Sticky proportional>
              {({ stuck }) => {
                return (
                  <Box bg={stuck ? "black10" : "black5"} height="100%">
                    Sidebar example
                    <br />
                    Etcetera
                    <br />
                    Etc.
                    <br />
                    &c.
                    <br />
                  </Box>
                )
              }}
            </Sticky>
          </Column>

          <Column span={9}>
            <Filler amount={100} />
          </Column>
        </GridColumns>
      </HorizontalPadding>
    </AppContainer>
  )
}
