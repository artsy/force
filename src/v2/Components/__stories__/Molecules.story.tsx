import {
  Box,
  Text,
  GridColumns,
  Column,
  Button,
  Spacer,
  ProgressDots,
  Flex,
  BoxProps,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled from "styled-components"
import { FullBleed } from "../FullBleed"
import { Masonry } from "../Masonry"

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

const Page: React.FC<BoxProps> = ({ children, ...rest }) => {
  return <AppContainer {...rest}>{children}</AppContainer>
}

const HeadersMetadataExample = () => {
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

          <HeadersMetadataExample />
        </Column>

        <Column span={6}>
          <BioExample />
        </Column>
      </GridColumns>

      <Spacer my={12} />

      <GridColumns>
        <Column span={6}>
          <HeadersMetadataExample />
        </Column>

        <Column span={6}>
          <Box bg="black30" height={480} />
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
          <HeadersMetadataExample />
        </Column>

        <Column span={6}>
          <BioExample />
        </Column>
      </GridColumns>

      <Spacer my={12} />

      <GridColumns>
        <Column span={6}>
          <Box bg="black30" height={800} />
        </Column>

        <Column span={6}>
          <HeadersMetadataExample />
        </Column>
      </GridColumns>

      <Spacer my={12} />

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

const ContentHeader: React.FC<BoxProps> = props => {
  return (
    <Box {...props}>
      <Flex justifyContent="space-between">
        <Text variant="lg">Headline Text</Text>

        <Text variant="sm">
          <a href="#example">Text Link</a>
        </Text>
      </Flex>

      <Text variant="lg" color="black60">
        Supporting Copy Line
      </Text>
    </Box>
  )
}

const ContentMetadataExample = () => {
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

      <Text variant="sm" mb={4}>
        Mixtape tumeric edison bulb roof party, chambray street art portland
        live-edge. Normcore flannel crucifix tattooed. Microdosing hexagon
        flannel readymade beard hashtag, chillwave woke fixie. Franzen ethical
        organic, kale chips readymade echo park scenester art party chambray
        cred raclette.
      </Text>
    </>
  )
}

const TombstoneExample = () => {
  return (
    <>
      <Text variant="md">Artist Name</Text>
      <Text variant="md" color="black60">
        Artwork Title, 1900
      </Text>
      <Text variant="xs" fontWeight="bold">
        $100
      </Text>
    </>
  )
}

export const Content = () => {
  return (
    <Page py={100}>
      <ContentHeader mb={4} />

      <GridColumns>
        <Column span={6}>
          <Box bg="black30" height={480} mb={2} />

          <ContentMetadataExample />

          <GridColumns>
            <Column span={8}>
              <Button width="100%">Button Title</Button>
            </Column>
          </GridColumns>
        </Column>

        <Column span={6}>
          <Box bg="black30" height={480} mb={2} />

          <ContentMetadataExample />

          <GridColumns>
            <Column span={8}>
              <Button width="100%">Button Title</Button>
            </Column>
          </GridColumns>
        </Column>
      </GridColumns>

      <Spacer my={12} />

      <ContentHeader mb={4} />

      <GridColumns>
        <Column span={[12, 6, 3]}>
          <Box bg="black30" height={420} mb={2} />
          <ContentMetadataExample />
          <Button width="100%">Button Title</Button>
        </Column>

        <Column span={[12, 6, 3]}>
          <Box bg="black30" height={420} mb={2} />
          <ContentMetadataExample />
          <Button width="100%">Button Title</Button>
        </Column>

        <Column span={[12, 6, 3]}>
          <Box bg="black30" height={420} mb={2} />
          <ContentMetadataExample />
          <Button width="100%">Button Title</Button>
        </Column>

        <Column span={[12, 6, 3]}>
          <Box bg="black30" height={420} mb={2} />
          <ContentMetadataExample />
          <Button width="100%">Button Title</Button>
        </Column>
      </GridColumns>

      <Spacer my={12} />

      <GridColumns>
        <Column span={6}>
          <Box bg="black30" height={720} mb={2} />

          <ContentMetadataExample />

          <GridColumns>
            <Column span={8}>
              <Button width="100%">Button Title</Button>
            </Column>
          </GridColumns>
        </Column>

        <Column span={6}>
          <Masonry columnCount={2}>
            <Box mb={4}>
              <Box bg="black30" height={214} mb={1} />
              <TombstoneExample />
            </Box>

            <Box mb={4}>
              <Box bg="black30" height={234} mb={1} />
              <TombstoneExample />
            </Box>

            <Box mb={4}>
              <Box bg="black30" height={484} mb={1} />
              <TombstoneExample />
            </Box>

            <Box mb={4}>
              <Box bg="black30" height={272} mb={1} />
              <TombstoneExample />
            </Box>

            <Box mb={4}>
              <Box bg="black30" height={414} mb={1} />
              <TombstoneExample />
            </Box>

            <Box mb={4}>
              <Box bg="black30" height={478} mb={1} />
              <TombstoneExample />
            </Box>
          </Masonry>
        </Column>
      </GridColumns>

      <Spacer my={12} />

      <GridColumns>
        <Column span={6}>
          <Masonry columnCount={2}>
            <Box mb={6}>
              <Box bg="black30" height={420} mb={1} />

              <Text variant="xs" style={{ textTransform: "uppercase" }} mb={1}>
                Category
              </Text>

              <Text variant="lg" mb={1}>
                This Artwork Changed My Life: Sally Mann’s “Untitled Film
                Stills”
              </Text>

              <Text variant="xs">By Author Name</Text>
            </Box>

            <Box mb={6}>
              <Text variant="xs" style={{ textTransform: "uppercase" }} mb={1}>
                Category
              </Text>

              <Text variant="xl" mb={1}>
                5 Must-See Shows from Gallery Weekend Berlin
              </Text>

              <Text variant="xs">By Author Name</Text>
            </Box>

            <Box mb={6}>
              <Box bg="black30" height={320} mb={1} />

              <Text variant="xs" style={{ textTransform: "uppercase" }} mb={1}>
                Category
              </Text>

              <Text variant="lg" mb={1}>
                Why Painter Eddie Martinez Is Having His Biggest Market Year Yet
              </Text>

              <Text variant="xs">By Author Name</Text>
            </Box>

            <Box mb={6}>
              <Box bg="black30" height={260} mb={1} />

              <Text variant="xs" style={{ textTransform: "uppercase" }} mb={1}>
                Category
              </Text>

              <Text variant="lg" mb={1}>
                ‘The Season’s Been Extended Indefinitely’: Manhattan Dealers Who
                Opened Hamptons Outposts This Summer Are There to Stay
              </Text>

              <Text variant="xs">By Author Name</Text>
            </Box>

            <Box mb={6}>
              <Text variant="xs" style={{ textTransform: "uppercase" }} mb={1}>
                Category
              </Text>

              <Text variant="xl" mb={1}>
                Arts Sector Is Facing a Brain Drain as Ambitious Workers Seek
                Greener Pastures
              </Text>

              <Text variant="xs">By Author Name</Text>
            </Box>

            <Box mb={6}>
              <Box bg="black30" height={200} mb={1} />

              <Text variant="xs" style={{ textTransform: "uppercase" }} mb={1}>
                Category
              </Text>

              <Text variant="lg" mb={1}>
                FIAC Has Canceled Its 2020 Fair in Paris, Saying It Could Not
                Meet the ‘Legitimate Expectations’ of Visitors
              </Text>

              <Text variant="xs">By Author Name</Text>
            </Box>
          </Masonry>
        </Column>

        <Column span={6}>
          <Box bg="black30" height={720} mb={2} />

          <ContentMetadataExample />

          <GridColumns>
            <Column span={8}>
              <Button width="100%">Button Title</Button>
            </Column>
          </GridColumns>
        </Column>
      </GridColumns>
    </Page>
  )
}
