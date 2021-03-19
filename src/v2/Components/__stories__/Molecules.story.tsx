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
  Tabs,
  Tab,
  Swiper,
  SwiperProps,
  CarouselBar,
  splitBoxProps,
  SwiperRail,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { random } from "lodash"
import React, { useState } from "react"
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

const HeaderExample: React.FC<BoxProps> = props => {
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
      <HeaderExample mb={4} />

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

      <HeaderExample mb={4} />

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

const SwiperWithProgress: React.FC<
  SwiperProps & { verticalAlign?: "top" | "bottom" }
> = ({ children, verticalAlign = "bottom", ...rest }) => {
  const count = React.Children.count(children)
  const [boxProps, swiperProps] = splitBoxProps(rest)
  const [index, setIndex] = useState(0)
  const progress = (index * 100) / (count - 1)

  return (
    <Box {...boxProps}>
      <FullBleed>
        <Swiper
          onChange={setIndex}
          mb={6}
          Rail={props => {
            return (
              <SwiperRail
                {...props}
                alignItems={verticalAlign === "top" ? "flex-start" : "flex-end"}
                px={4}
                mx={4}
              />
            )
          }}
          {...swiperProps}
        >
          {React.Children.map(children, (child: any, i) => {
            return React.cloneElement(child, {
              ml: i === 0 ? [2, 4] : undefined,
              mr: i === count - 1 ? [2, 4] : undefined,
            })
          })}
        </Swiper>
      </FullBleed>

      <CarouselBar percentComplete={progress} />
    </Box>
  )
}

export const Carousels = () => {
  return (
    <Page py={100}>
      <Tabs initialTabIndex={1} mb={4}>
        <Tab name="Tab 01" />
        <Tab name="Tab 02" />
        <Tab name="Tab 03" />
      </Tabs>

      <HeaderExample mb={4} />

      <SwiperWithProgress>
        {[...new Array(10)].map((_, i) => {
          return (
            <Box key={i} width={460}>
              <Box bg="black30" height={random(200, 500)} mb={1} />
              <TombstoneExample />
            </Box>
          )
        })}
      </SwiperWithProgress>

      <Spacer my={12} />

      <Tabs initialTabIndex={1} mb={4}>
        <Tab name="Tab 01" />
        <Tab name="Tab 02" />
        <Tab name="Tab 03" />
      </Tabs>

      <HeaderExample mb={4} />

      <SwiperWithProgress>
        {[...new Array(10)].map((_, i) => {
          return (
            <Box key={i} width={340}>
              <Box bg="black30" height={random(200, 500)} mb={1} />
              <TombstoneExample />
            </Box>
          )
        })}
      </SwiperWithProgress>

      <Spacer my={12} />

      <Tabs initialTabIndex={1} mb={4}>
        <Tab name="Tab 01" />
        <Tab name="Tab 02" />
        <Tab name="Tab 03" />
      </Tabs>

      <HeaderExample mb={4} />

      <SwiperWithProgress>
        {[...new Array(10)].map((_, i) => {
          return (
            <Box key={i} width={220}>
              <Box bg="black30" height={random(175, 400)} mb={1} />
              <TombstoneExample />
            </Box>
          )
        })}
      </SwiperWithProgress>

      <Spacer my={12} />

      <Tabs initialTabIndex={1} mb={4}>
        <Tab name="Tab 01" />
        <Tab name="Tab 02" />
        <Tab name="Tab 03" />
      </Tabs>

      <HeaderExample mb={4} />

      <SwiperWithProgress verticalAlign="top">
        <Box width={220}>
          <Box bg="black30" height={122} mb={1} />

          <Text variant="xs" style={{ textTransform: "uppercase" }} mb={0.5}>
            Category
          </Text>

          <Text variant="lg" mb={0.5}>
            ‘The Season’s Been Extended Indefinitely’: Manhattan Dealers Who
            Opened Hamptons Outposts This Summer Are There to Stay
          </Text>

          <Text variant="md" mb={0.5}>
            By Author Name
          </Text>

          <Text variant="md" color="black60">
            Time Date Year
          </Text>
        </Box>

        <Box width={340}>
          <Text variant="xs" style={{ textTransform: "uppercase" }} mb={0.5}>
            Category
          </Text>

          <Text variant="xl" mb={0.5}>
            Arts Sector Is Facing a Brain Drain as Ambitious Workers Seek
            Greener Pastures
          </Text>

          <Text variant="md" mb={0.5}>
            By Author Name
          </Text>

          <Text variant="md" color="black60">
            Time Date Year
          </Text>
        </Box>

        <Box width={220}>
          <Box bg="black30" height={223} mb={1} />

          <Text variant="xs" style={{ textTransform: "uppercase" }} mb={0.5}>
            Category
          </Text>

          <Text variant="lg" mb={0.5}>
            FIAC Has Canceled Its 2020 Fair in Paris, Saying It Could Not Meet
            the ‘Legitimate Expectations’ of Visitors
          </Text>

          <Text variant="md" mb={0.5}>
            By Author Name
          </Text>

          <Text variant="md" color="black60">
            Time Date Year
          </Text>
        </Box>

        <Box width={220}>
          <Box bg="black30" height={268} mb={1} />

          <Text variant="xs" style={{ textTransform: "uppercase" }} mb={0.5}>
            Category
          </Text>

          <Text variant="lg" mb={0.5}>
            This Artwork Changed My Life: Sally Mann’s “Untitled Film Stills”
          </Text>

          <Text variant="md" mb={0.5}>
            By Author Name
          </Text>

          <Text variant="md" color="black60">
            Time Date Year
          </Text>
        </Box>

        <Box width={340}>
          <Text variant="xs" style={{ textTransform: "uppercase" }} mb={0.5}>
            Category
          </Text>

          <Text variant="xl" mb={0.5}>
            5 Must-See Shows from Gallery Weekend Berlin
          </Text>

          <Text variant="md" mb={0.5}>
            By Author Name
          </Text>

          <Text variant="md" color="black60">
            Time Date Year
          </Text>
        </Box>

        <Box width={220}>
          <Box bg="black30" height={169} mb={1} />

          <Text variant="xs" style={{ textTransform: "uppercase" }} mb={0.5}>
            Category
          </Text>

          <Text variant="lg" mb={0.5}>
            Why Painter Eddie Martinez Is Having His Biggest Market Year Yet
          </Text>

          <Text variant="md" mb={0.5}>
            By Author Name
          </Text>

          <Text variant="md" color="black60">
            Time Date Year
          </Text>
        </Box>
      </SwiperWithProgress>

      <Spacer my={12} />

      <Tabs initialTabIndex={1} mb={4}>
        <Tab name="Tab 01" />
        <Tab name="Tab 02" />
        <Tab name="Tab 03" />
      </Tabs>

      <HeaderExample mb={4} />

      <SwiperWithProgress>
        {[...new Array(10)].map((_, i) => {
          return (
            <Box key={i}>
              <Flex alignItems="flex-end" mb={1}>
                <Box
                  position="relative"
                  bg="black30"
                  width={random(150, 225)}
                  height={random(150, 225)}
                  zIndex={2}
                />
                <Box
                  bg="black15"
                  width={random(150, 225)}
                  height={random(150, 225)}
                  position="relative"
                  ml={-2}
                  zIndex={1}
                />
                <Box
                  bg="black10"
                  width={random(150, 225)}
                  height={random(150, 225)}
                  position="relative"
                  ml={-2}
                />
              </Flex>

              <Text variant="md">Primary Text</Text>
              <Text variant="md" color="black60">
                Secondary Text
              </Text>
              <Text variant="xs">Status</Text>
            </Box>
          )
        })}
      </SwiperWithProgress>

      <Spacer my={12} />

      <Tabs initialTabIndex={1} mb={4}>
        <Tab name="Tab 01" />
        <Tab name="Tab 02" />
        <Tab name="Tab 03" />
      </Tabs>

      <HeaderExample mb={4} />

      <SwiperWithProgress>
        {[...new Array(10)].map((_, i) => {
          return (
            <Box key={i} width={340}>
              <Flex mb={1} justifyContent="space-between" alignItems="center">
                <Box>
                  <Text variant="md">Gallery</Text>
                  <Text variant="md" color="black60">
                    City
                  </Text>
                </Box>

                <Button size="small" variant="secondaryOutline">
                  Follow
                </Button>
              </Flex>

              <Box height={222} bg="black30" />
            </Box>
          )
        })}
      </SwiperWithProgress>

      <Spacer my={12} />

      <Tabs initialTabIndex={1} mb={4}>
        <Tab name="Tab 01" />
        <Tab name="Tab 02" />
        <Tab name="Tab 03" />
      </Tabs>

      <HeaderExample mb={4} />

      <SwiperWithProgress>
        {[...new Array(10)].map((_, i) => {
          return (
            <Box key={i} width={340}>
              <Box height={222} bg="black30" mb={1} />

              <Flex justifyContent="space-between" alignItems="center">
                <Flex flex={1} alignItems="center">
                  <Box bg="black15" borderRadius="50%" size={50} mr={2} />

                  <Box flex={1}>
                    <Text variant="md">Artist Name</Text>
                    <Text variant="md" color="black60">
                      Nationality, b. 1970
                    </Text>
                  </Box>
                </Flex>

                <Button size="small" variant="secondaryOutline">
                  Follow
                </Button>
              </Flex>
            </Box>
          )
        })}
      </SwiperWithProgress>

      <Spacer my={12} />

      <Tabs initialTabIndex={1} mb={4}>
        <Tab name="Tab 01" />
        <Tab name="Tab 02" />
        <Tab name="Tab 03" />
      </Tabs>

      <HeaderExample mb={4} />

      <SwiperWithProgress>
        {[...new Array(10)].map((_, i) => {
          return (
            <Box key={i} width={340}>
              <Box height={220} bg="black30" mb={1} />
              <Text variant="md">Primary Text</Text>
              <Text variant="md" color="black60">
                Secondary Text
              </Text>
            </Box>
          )
        })}
      </SwiperWithProgress>

      <Spacer my={12} />

      <Tabs initialTabIndex={1} mb={4}>
        <Tab name="Tab 01" />
        <Tab name="Tab 02" />
        <Tab name="Tab 03" />
      </Tabs>

      <HeaderExample mb={4} />

      <SwiperWithProgress>
        {[...new Array(10)].map((_, i) => {
          return (
            <Box
              key={i}
              width={340}
              height={475}
              position="relative"
              bg="black30"
            >
              <Box
                p={1}
                width="100%"
                height="100%"
                background="linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);"
              >
                <Text variant="md" color="white100">
                  Primary Text
                </Text>
                <Text variant="md" color="black15">
                  Secondary Text
                </Text>
                <Text variant="xs" color="white100">
                  Status
                </Text>
              </Box>
            </Box>
          )
        })}
      </SwiperWithProgress>
    </Page>
  )
}
