import {
  Box,
  Text,
  GridColumns,
  Column,
  Button,
  Spacer,
  ProgressDots,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled from "styled-components"
import { FullBleed } from "../FullBleed"

export default {
  title: "Molecules/Kitchen Sink",
  parameters: {
    layout: "fullscreen",
  },
}

const AppContainer = styled(Box)`
  max-width: ${themeGet("breakpoints.lg")};
`

AppContainer.defaultProps = {
  mx: "auto",
  px: [2, 4],
}

const Page: React.FC = ({ children }) => {
  return <AppContainer>{children}</AppContainer>
}

const MetadataExample = () => {
  return (
    <>
      {/* TODO: Mixin a textTransform prop to text */}
      <Text variant="xs" style={{ textTransform: "uppercase" }} mb={1}>
        Category Title
      </Text>

      <Text variant="xl">Section Title or Headline</Text>

      <Text variant="xl" color="black60" mb={1}>
        Secondary Text
      </Text>

      <Text variant="lg" mb={1}>
        Sub Headline
      </Text>

      <Text variant="sm" mb={4}>
        Knausgaard vexillologist shabby chic, bitters vape vaporware live-edge
        mixtape ennui raclette
      </Text>

      {/* TODO: Support n-column grids with a context provider as an alternative to sub-grid support? */}
      <GridColumns>
        <Column span={8}>
          <Button width="100%">Button Title</Button>
        </Column>
      </GridColumns>
    </>
  )
}

const BioExample = () => {
  return (
    <>
      <Text variant="xs" style={{ textTransform: "uppercase" }} mb={1}>
        Bio
      </Text>

      <Text variant="sm" mb={2}>
        With titles such as Susanne, No Bra (2006) and Anders pulling splinter
        from his foot (2004), Wolfgang Tillmans’s oeuvre is distinguished by
        unabashed emotion and a tension between strangeness and familiarity.
        Using all the photographic technology at his disposal, Tillmans shoots
        portraits, still-lifes, and landscapes in which the subjects range from
        partially-nude friends in seemingly private moments to modest
        arrangements of domestic items on windowsills. Tillmans’s abstractions
        reveal studies in color, as seen in the magenta liquid lines of Urgency
        XXIV (2006).
      </Text>

      <Text variant="xs" style={{ textTransform: "uppercase" }} mb={1}>
        Stats
      </Text>

      <Text variant="sm">
        £549k Auction Record
        <br />
        Blue Chip Representation
      </Text>
    </>
  )
}

export const Headers = () => {
  return (
    <Page>
      <FullBleed>
        <Box bg="black30" height={600} mb={4} />
      </FullBleed>

      <GridColumns>
        <Column span={6}>
          <Box size={80} border="1px solid" borderColor="black30" mb={1} />

          <MetadataExample />
        </Column>

        <Column span={6}>
          <BioExample />
        </Column>
      </GridColumns>

      <Spacer my={12} />

      <GridColumns>
        <Column span={6}>
          <MetadataExample />
        </Column>

        <Column span={6}>
          <Box bg="black30" width="100%" height={480} />
        </Column>
      </GridColumns>

      <ProgressDots variant="dash" amount={5} activeIndex={1} my={6} />

      <Spacer my={12} />

      <GridColumns>
        <Column span={6}>
          <Text variant="xl">Wolfgang Tillmans</Text>

          <Text variant="xl" color="black60" mb={2}>
            German, b. 1968
          </Text>

          <GridColumns>
            <Column span={[6, 6, 3]}>
              <Button variant="secondaryOutline" width="100%">
                Follow
              </Button>
            </Column>

            <Column span={[6, 6, 9]} display="flex" alignItems="center">
              <Text variant="xs" color="black60">
                10k Following
              </Text>
            </Column>
          </GridColumns>
        </Column>

        <Column span={6}>
          <BioExample />
        </Column>
      </GridColumns>

      <Spacer my={12} />

      <GridColumns>
        <Column span={6}>
          <MetadataExample />
        </Column>

        <Column span={6}>
          <BioExample />
        </Column>
      </GridColumns>

      <Spacer my={12} />

      <GridColumns>
        <Column span={6}>
          <Box bg="black30" width="100%" height={800} />
        </Column>

        <Column span={6}>
          <MetadataExample />
        </Column>
      </GridColumns>

      <Spacer my={12} />

      <GridColumns>
        <Column span={6}>
          <MetadataExample />
        </Column>

        <Column span={6}>
          <Box bg="black30" width="100%" height={800} />
        </Column>
      </GridColumns>
    </Page>
  )
}
