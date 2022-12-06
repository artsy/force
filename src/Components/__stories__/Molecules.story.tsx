import { Spacer, Join } from "@artsy/palette"

import {
  HeaderWithCoverImage,
  HeaderWithCarousel,
  HeaderArtist,
  HeaderGeneral,
  HeaderImageLeft,
  HeaderImageRight,
} from "./Headers.story"

import {
  Content2Up,
  Content4Up,
  ContentFixedLeftScrollRight,
  ContentScrollLeftFixedRight,
} from "./Content.story"

import {
  CarouselArtworkLarge,
  CarouselArtworkMedium,
  CarouselArtworkSmall,
  CarouselEditorial,
  CarouselAuctions,
  CarouselViewingRoomsGrid,
  CarouselGalleries,
  CarouselArtists,
  CarouselShows,
} from "./Carousels.story"

import {
  TextCentered,
  TextFixedLeftScrollRight,
  TextScrollLeftFixedRight,
} from "./Editorial.story"
import { Page } from "./Components/Page"

export default {
  title: "Molecules/Kitchen Sink",
  parameters: {
    layout: "fullscreen",
  },
}

export const Headers = () => {
  return (
    <Page>
      <Join separator={<Spacer y={12} />}>
        <HeaderWithCoverImage />
        <HeaderWithCarousel />
        <HeaderArtist />
        <HeaderGeneral />
        <HeaderImageLeft />
        <HeaderImageRight />
      </Join>
    </Page>
  )
}

export const Content = () => {
  return (
    <Page>
      <Join separator={<Spacer y={12} />}>
        <Content2Up />
        <Content4Up />
        <ContentFixedLeftScrollRight />
        <ContentScrollLeftFixedRight />
      </Join>
    </Page>
  )
}

export const Carousels = () => {
  return (
    <Page>
      <Join separator={<Spacer y={12} />}>
        <CarouselArtworkLarge />
        <CarouselArtworkMedium />
        <CarouselArtworkSmall />
        <CarouselEditorial />
        <CarouselAuctions />
        <CarouselViewingRoomsGrid />
        <CarouselGalleries />
        <CarouselArtists />
        <CarouselShows />
      </Join>
    </Page>
  )
}

export const Editorial = () => {
  return (
    <Page>
      <Join separator={<Spacer y={12} />}>
        <TextCentered />
        <TextFixedLeftScrollRight />
        <TextScrollLeftFixedRight />
      </Join>
    </Page>
  )
}
