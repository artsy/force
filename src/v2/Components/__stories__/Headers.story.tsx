import {
  Box,
  Text,
  GridColumns,
  Column,
  Button,
  ProgressDots,
  FullBleed,
} from "@artsy/palette"
import { Page } from "./Components/Page"

export default {
  title: "Molecules/Headers",
  parameters: {
    layout: "fullscreen",
  },
}

export const HeaderWithCoverImage = () => {
  return (
    <Page title="<HeaderWithCoverImage />">
      <FullBleed>
        <Box bg="black30" height={600} mb={4} />
      </FullBleed>

      <GridColumns>
        <Column span={6}>
          <Box size={80} border="1px solid" borderColor="black30" mb={1} />

          <HeadersMetadataExample />
        </Column>

        <Column span={6}>
          <BioExample />
        </Column>
      </GridColumns>
    </Page>
  )
}

export const HeaderWithCarousel = () => {
  return (
    <Page title="<HeaderWithCarousel />">
      <GridColumns>
        <Column span={6}>
          <HeadersMetadataExample />
        </Column>

        <Column span={6}>
          <Box bg="black30" height={480} />
        </Column>
      </GridColumns>

      <ProgressDots variant="dash" amount={5} activeIndex={1} my={6} />
    </Page>
  )
}

export const HeaderArtist = () => {
  return (
    <Page title="<HeaderArtist />">
      <GridColumns>
        <Column span={6}>
          <Text variant="xl">Wolfgang Tillmans</Text>

          <Text variant="xl" color="black60" mb={2}>
            German, b. 1968
          </Text>

          <GridColumns>
            <Column span={[6, 6, 3]}>
              <Button variant="secondaryBlack" width="100%">
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
    </Page>
  )
}

export const HeaderGeneral = () => {
  return (
    <Page title="<HeaderGeneral />">
      <GridColumns>
        <Column span={6}>
          <HeadersMetadataExample />
        </Column>

        <Column span={6}>
          <BioExample />
        </Column>
      </GridColumns>
    </Page>
  )
}

export const HeaderImageLeft = () => {
  return (
    <Page title="<HeaderImageLeft />">
      <GridColumns>
        <Column span={6}>
          <Box bg="black30" height={800} />
        </Column>

        <Column span={6}>
          <HeadersMetadataExample />
        </Column>
      </GridColumns>
    </Page>
  )
}

export const HeaderImageRight = () => {
  return (
    <Page title="<HeaderImageRight />">
      <GridColumns>
        <Column span={6}>
          <HeadersMetadataExample />
        </Column>

        <Column span={6}>
          <Box bg="black30" height={800} />
        </Column>
      </GridColumns>
    </Page>
  )
}

const HeadersMetadataExample = () => {
  return (
    <>
      <Text variant="xs" mb={1}>
        Category Title
      </Text>

      <Text variant="xl">Section Title or Headline</Text>

      <Text variant="xl" color="black60" mb={1}>
        Secondary Text
      </Text>

      <Text variant="lg-display" mb={1}>
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
      <Text variant="xs" mb={1}>
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

      <Text variant="xs" mb={1}>
        Stats
      </Text>

      <Text variant="sm">
        £549k Auction Record
        <br />
        Blue-Chip Representation
      </Text>
    </>
  )
}
