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
  HTML,
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

export const Editorial = () => {
  return (
    <Page py={100}>
      <GridColumns>
        <Column span={6} start={4}>
          <HTML variant="sm">
            <p>
              Chicharrones marfa tumeric squid four loko flexitarian celiac hell
              of hot chicken jianbing salvia enamel pin woke. Migas you probably
              haven't heard of them church-key pok pok banh mi yr ennui ethical
              subway tile authentic. Sartorial retro roof party, gastropub
              bicycle rights drinking vinegar microdosing swag DIY deep v. Viral
              hella pop-up, banh mi squid poke chambray yuccie biodiesel occupy
              scenester.
            </p>

            <p>
              Etsy plaid raclette enamel pin poke everyday carry. Kickstarter
              messenger bag lomo tousled iPhone photo booth. Offal lumbersexual
              man braid chambray. Meh raw denim 90's, kitsch 8-bit af PBR&B
              street art plaid shabby chic.
            </p>

            <p>
              Sartorial kitsch gochujang fam health goth DIY tumblr irony
              meggings cray air plant you probably haven't heard of them.
              Mustache succulents affogato shaman pork belly chia. Gentrify vice
              chillwave flannel paleo bespoke taiyaki mixtape health goth.
              Ethical readymade gentrify ramps.
            </p>
          </HTML>

          <Text variant="xxl" my={4}>
            Portland cray PBR&B, gentrify brooklyn vaporware tbh.
          </Text>

          <HTML variant="sm">
            <p>
              Vape pork belly slow-carb, subway tile listicle franzen vegan
              church-key actually YOLO. Kogi fashion axe gluten-free air plant
              tofu. Cred unicorn jianbing pork belly lo-fi vaporware glossier
              pickled everyday carry XOXO la croix. Jean shorts unicorn
              stumptown viral franzen umami activated charcoal adaptogen seitan.
              Lyft authentic irony snackwave disrupt kogi, pabst subway tile
              ethical. You probably haven't heard of them cronut tbh, actually
              waistcoat yr yuccie.
            </p>

            <p>
              Tbh wayfarers pork belly, palo santo iPhone DIY craft beer
              church-key taxidermy cred glossier flannel squid jianbing.
              Live-edge tacos blog, photo booth meh tofu pok pok narwhal woke
              craft beer whatever vice. Man bun actually man braid blue bottle
              flannel, meh keffiyeh chillwave next level fashion axe distillery
              put a bird on it letterpress try-hard. Ennui shaman bitters air
              plant tilde.
            </p>
          </HTML>
        </Column>
      </GridColumns>

      <Spacer my={12} />

      <GridColumns>
        <Column span={6}>
          <Box bg="black30" height={720} />
        </Column>

        <Column span={6}>
          <HTML variant="sm">
            <p>
              Bicycle rights art party mumblecore intelligentsia cronut
              raclette. Bushwick kinfolk occupy cold-pressed. Kombucha drinking
              vinegar pabst hot chicken, tilde forage succulents bitters
              polaroid. Occupy fashion axe roof party, austin tousled godard
              pork belly viral PBR&B meditation try-hard tofu echo park. Marfa
              wolf jianbing put a bird on it. Green juice chia selvage narwhal.
            </p>

            <p>
              Chambray chicharrones bespoke, tbh drinking vinegar pitchfork
              affogato knausgaard pickled vaporware man bun. Kombucha quinoa af,
              taiyaki letterpress brooklyn next level literally yr before they
              sold out mlkshk la croix tattooed viral. Drinking vinegar echo
              park green juice PBR&B keytar locavore VHS vexillologist next
              level beard YOLO kogi messenger bag. Portland cray PBR&B, gentrify
              brooklyn vaporware tbh.
            </p>
          </HTML>

          <Text variant="xxl" my={4}>
            Artisan chillwave humblebrag messenger bag, meh brunch irony health
            goth succulents adaptogen offal quinoa austin coloring book.
          </Text>

          <HTML variant="sm">
            <p>
              Tumblr affogato gluten-free meh, shabby chic XOXO neutra
              chicharrones keffiyeh ethical vape schlitz wolf snackwave.
              Single-origin coffee gentrify vape, pabst seitan echo park
              coloring book. Shabby chic tilde raclette 90's cloud bread vegan.
              Affogato everyday carry XOXO kickstarter pabst lomo cloud bread
              semiotics whatever. Kickstarter irony hexagon, single-origin
              coffee kale chips brunch tofu jianbing flannel prism. Vice trust
              fund subway tile whatever air plant.
            </p>
            <p>
              Slow-carb ennui brooklyn venmo DIY plaid waistcoat. Tousled kogi
              shaman sartorial, tote bag tbh copper mug everyday carry art party
              asymmetrical ethical whatever meditation vinyl. Four dollar toast
              vinyl venmo knausgaard plaid cliche, farm-to-table meditation
              enamel pin. Street art four loko tumeric, flexitarian celiac
              chambray before they sold out squid food truck +1. Jean shorts
              semiotics distillery activated charcoal sustainable gluten-free
              pitchfork poutine locavore literally. Palo santo vape chartreuse,
              disrupt tumeric sartorial aesthetic health goth.
            </p>
            <p>
              Shoreditch kitsch unicorn, affogato 8-bit chartreuse next level
              truffaut gluten-free austin pop-up. Butcher plaid tacos chia
              tumblr waistcoat fixie hell of twee microdosing truffaut. Portland
              jean shorts microdosing, fanny pack hammock crucifix banjo
              raclette. Distillery sartorial art party health goth. Put a bird
              on it semiotics drinking vinegar, knausgaard man braid banh mi
              next level craft beer. Mlkshk art party succulents, pok pok
              actually listicle tousled. Tumblr fanny pack 3 wolf moon ramps
              lo-fi vape tilde iPhone umami mlkshk.
            </p>
          </HTML>
        </Column>
      </GridColumns>

      <Spacer my={12} />

      <GridColumns>
        <Column span={6}>
          <HTML variant="sm">
            <p>
              Tumblr affogato gluten-free meh, shabby chic XOXO neutra
              chicharrones keffiyeh ethical vape schlitz wolf snackwave.
              Single-origin coffee gentrify vape, pabst seitan echo park
              coloring book. Shabby chic tilde raclette 90's cloud bread vegan.
              Affogato everyday carry XOXO kickstarter pabst lomo cloud bread
              semiotics whatever. Kickstarter irony hexagon, single-origin
              coffee kale chips brunch tofu jianbing flannel prism. Vice trust
              fund subway tile whatever air plant.
            </p>

            <p>
              Slow-carb ennui brooklyn venmo DIY plaid waistcoat. Tousled kogi
              shaman sartorial, tote bag tbh copper mug everyday carry art party
              asymmetrical ethical whatever meditation vinyl. Four dollar toast
              vinyl venmo knausgaard plaid cliche, farm-to-table meditation
              enamel pin. Street art four loko tumeric, flexitarian celiac
              chambray before they sold out squid food truck +1. Jean shorts
              semiotics distillery activated charcoal sustainable gluten-free
              pitchfork poutine locavore literally. Palo santo vape chartreuse,
              disrupt tumeric sartorial aesthetic health goth.
            </p>

            <p>
              Shoreditch kitsch unicorn, affogato 8-bit chartreuse next level
              truffaut gluten-free austin pop-up. Butcher plaid tacos chia
              tumblr waistcoat fixie hell of twee microdosing truffaut. Portland
              jean shorts microdosing, fanny pack hammock crucifix banjo
              raclette. Distillery sartorial art party health goth. Put a bird
              on it semiotics drinking vinegar, knausgaard man braid banh mi
              next level craft beer. Mlkshk art party succulents, pok pok
              actually listicle tousled. Tumblr fanny pack 3 wolf moon ramps
              lo-fi vape tilde iPhone umami mlkshk.
            </p>
          </HTML>

          <Text variant="xxl" my={4}>
            Artisan chillwave humblebrag messenger bag, meh brunch irony health
            goth succulents adaptogen offal quinoa austin coloring book.
          </Text>

          <HTML variant="sm">
            <p>
              Bicycle rights art party mumblecore intelligentsia cronut
              raclette. Bushwick kinfolk occupy cold-pressed. Kombucha drinking
              vinegar pabst hot chicken, tilde forage succulents bitters
              polaroid. Occupy fashion axe roof party, austin tousled godard
              pork belly viral PBR&B meditation try-hard tofu echo park. Marfa
              wolf jianbing put a bird on it. Green juice chia selvage narwhal.
            </p>

            <p>
              Chambray chicharrones bespoke, tbh drinking vinegar pitchfork
              affogato knausgaard pickled vaporware man bun. Kombucha quinoa af,
              taiyaki letterpress brooklyn next level literally yr before they
              sold out mlkshk la croix tattooed viral. Drinking vinegar echo
              park green juice PBR&B keytar locavore VHS vexillologist next
              level beard YOLO kogi messenger bag. Portland cray PBR&B, gentrify
              brooklyn vaporware tbh.
            </p>
          </HTML>
        </Column>
      </GridColumns>
    </Page>
  )
}
