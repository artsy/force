import {
  Box,
  Text,
  Button,
  Flex,
  Tabs,
  Tab,
  Swiper,
  SwiperProps,
  CarouselBar,
  splitBoxProps,
  SwiperRail,
  FullBleed,
} from "@artsy/palette"
import { random } from "lodash"
import { useState } from "react"
import * as React from "react"
import { ContentHeaderExample } from "./Components/ContentHeaderExample"
import { Page } from "./Components/Page"
import { TombstoneExample } from "./Components/TombstoneExample"

export default {
  title: "Molecules/Carousels",
  parameters: {
    layout: "fullscreen",
  },
}

export const CarouselArtworkLarge = () => {
  return (
    <Page title="<CarouselArtworkLarge />">
      <Tabs initialTabIndex={1} mb={4}>
        <Tab name="Tab 01" />
        <Tab name="Tab 02" />
        <Tab name="Tab 03" />
      </Tabs>

      <ContentHeaderExample mb={4} />

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
    </Page>
  )
}

export const CarouselArtworkMedium = () => {
  return (
    <Page title="<CarouselArtworkMedium />">
      <ContentHeaderExample mb={4} />

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
    </Page>
  )
}

export const CarouselArtworkSmall = () => {
  return (
    <Page title="<CarouselArtworkSmall />">
      <ContentHeaderExample mb={4} />

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
    </Page>
  )
}

export const CarouselEditorial = () => {
  return (
    <Page title="<CarouselEditorial />">
      <ContentHeaderExample mb={4} />

      <SwiperWithProgress verticalAlign="top">
        <Box width={220}>
          <Box bg="black30" height={122} mb={1} />

          <Text variant="xs" mb={0.5}>
            Category
          </Text>

          <Text variant="lg-display" mb={0.5}>
            ‘The Season’s Been Extended Indefinitely’: Manhattan Dealers Who
            Opened Hamptons Outposts This Summer Are There to Stay
          </Text>

          <Text variant="sm-display" mb={0.5}>
            By Author Name
          </Text>

          <Text variant="sm-display" color="black60">
            Time Date Year
          </Text>
        </Box>

        <Box width={340}>
          <Text variant="xs" mb={0.5}>
            Category
          </Text>

          <Text variant="xl" mb={0.5}>
            Arts Sector Is Facing a Brain Drain as Ambitious Workers Seek
            Greener Pastures
          </Text>

          <Text variant="sm-display" mb={0.5}>
            By Author Name
          </Text>

          <Text variant="sm-display" color="black60">
            Time Date Year
          </Text>
        </Box>

        <Box width={220}>
          <Box bg="black30" height={223} mb={1} />

          <Text variant="xs" mb={0.5}>
            Category
          </Text>

          <Text variant="lg-display" mb={0.5}>
            FIAC Has Canceled Its 2020 Fair in Paris, Saying It Could Not Meet
            the ‘Legitimate Expectations’ of Visitors
          </Text>

          <Text variant="sm-display" mb={0.5}>
            By Author Name
          </Text>

          <Text variant="sm-display" color="black60">
            Time Date Year
          </Text>
        </Box>

        <Box width={220}>
          <Box bg="black30" height={268} mb={1} />

          <Text variant="xs" mb={0.5}>
            Category
          </Text>

          <Text variant="lg-display" mb={0.5}>
            This Artwork Changed My Life: Sally Mann’s “Untitled Film Stills”
          </Text>

          <Text variant="sm-display" mb={0.5}>
            By Author Name
          </Text>

          <Text variant="sm-display" color="black60">
            Time Date Year
          </Text>
        </Box>

        <Box width={340}>
          <Text variant="xs" mb={0.5}>
            Category
          </Text>

          <Text variant="xl" mb={0.5}>
            5 Must-See Shows from Gallery Weekend Berlin
          </Text>

          <Text variant="sm-display" mb={0.5}>
            By Author Name
          </Text>

          <Text variant="sm-display" color="black60">
            Time Date Year
          </Text>
        </Box>

        <Box width={220}>
          <Box bg="black30" height={169} mb={1} />

          <Text variant="xs" mb={0.5}>
            Category
          </Text>

          <Text variant="lg-display" mb={0.5}>
            Why Painter Eddie Martinez Is Having His Biggest Market Year Yet
          </Text>

          <Text variant="sm-display" mb={0.5}>
            By Author Name
          </Text>

          <Text variant="sm-display" color="black60">
            Time Date Year
          </Text>
        </Box>
      </SwiperWithProgress>
    </Page>
  )
}

export const CarouselAuctions = () => {
  return (
    <Page title="<CarouselAuctions />">
      <ContentHeaderExample mb={4} />

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

              <Text variant="sm-display">Primary Text</Text>
              <Text variant="sm-display" color="black60">
                Secondary Text
              </Text>
              <Text variant="xs">Status</Text>
            </Box>
          )
        })}
      </SwiperWithProgress>
    </Page>
  )
}

export const CarouselViewingRoomsGrid = () => {
  return (
    <Page title="<CarouselViewingRoomsGrid />">
      <ContentHeaderExample mb={4} />

      <SwiperWithProgress>
        {[...new Array(10)].map((_, i) => {
          return (
            <Box key={i} width={340}>
              <Flex mb={1} justifyContent="space-between" alignItems="center">
                <Box>
                  <Text variant="sm-display">Gallery</Text>
                  <Text variant="sm-display" color="black60">
                    City
                  </Text>
                </Box>

                <Button size="small" variant="secondaryBlack">
                  Follow
                </Button>
              </Flex>

              <Box height={222} bg="black30" />
            </Box>
          )
        })}
      </SwiperWithProgress>
    </Page>
  )
}

export const CarouselGalleries = () => {
  return (
    <Page title="<CarouselGalleries />">
      <ContentHeaderExample mb={4} />

      <SwiperWithProgress>
        {[...new Array(10)].map((_, i) => {
          return (
            <Box key={i} width={340}>
              <Box height={222} bg="black30" mb={1} />

              <Flex justifyContent="space-between" alignItems="center">
                <Flex flex={1} alignItems="center">
                  <Box bg="black15" borderRadius="50%" size={50} mr={2} />

                  <Box flex={1}>
                    <Text variant="sm-display">Artist Name</Text>
                    <Text variant="sm-display" color="black60">
                      Nationality, b. 1970
                    </Text>
                  </Box>
                </Flex>

                <Button size="small" variant="secondaryBlack">
                  Follow
                </Button>
              </Flex>
            </Box>
          )
        })}
      </SwiperWithProgress>
    </Page>
  )
}

export const CarouselArtists = () => {
  return (
    <Page title="<CarouselArtists />">
      <ContentHeaderExample mb={4} />

      <SwiperWithProgress>
        {[...new Array(10)].map((_, i) => {
          return (
            <Box key={i} width={340}>
              <Box height={220} bg="black30" mb={1} />
              <Text variant="sm-display">Primary Text</Text>
              <Text variant="sm-display" color="black60">
                Secondary Text
              </Text>
            </Box>
          )
        })}
      </SwiperWithProgress>
    </Page>
  )
}

export const CarouselShows = () => {
  return (
    <Page title="<CarouselShows />">
      <ContentHeaderExample mb={4} />

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
                <Text variant="sm-display" color="white100">
                  Primary Text
                </Text>
                <Text variant="sm-display" color="black15">
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
