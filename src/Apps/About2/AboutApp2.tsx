import {
  Box,
  BoxProps,
  Button,
  Column,
  Flex,
  GridColumns,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import { RouterLink } from "System/Router/RouterLink"
import { resized } from "Utils/resized"
import { AboutArtworksRail2QueryRenderer } from "./AboutArtworksRail2"
import {
  FullBleedHeader,
  FullBleedHeaderOverlay,
} from "Components/FullBleedHeader"
import { scrollIntoView } from "Utils/scrollHelpers"

export const AboutApp2: React.FC = () => {
  return (
    <>
      <MetaTags
        title="About | Artsy"
        description="Artsy’s mission is to make all of the world’s art accessible to anyone with an Internet connection."
        pathname="/about"
      />

      <FullBleedHeader src="https://files.artsy.net/images/0-aboutHero.png">
        <FullBleedHeaderOverlay
          alignItems="center"
          color="white100"
          p={4}
          position="relative"
        >
          <Flex width="100%" flexDirection="column">
            <Text variant="xxl" as="h1">
              The Future of Art Collecting
            </Text>
          </Flex>
          <Text position="absolute" bottom={0} right={0} p={1} color="white100">
            Nicolas Party, Trees, 2019. Damien Cifelli, May You Live in
            Interesting Times, 2022. Anna Park, It's Good For You, 2020
          </Text>
        </FullBleedHeaderOverlay>
      </FullBleedHeader>

      <Spacer mt={4} />

      <Box textAlign="center">
        <Text as="h1" variant="lg-display">
          Artsy is for art collectors.
        </Text>
        <Text variant={["sm-display", "lg-display"]} mt={2}>
          As the leading marketplace for the world’s in-demand and emerging
          artists, we’ve made it easy for new and seasoned collectors alike to
          discover, buy, and sell art. And so much more. Everything you’ll ever
          need to collect art, you’ll find on Artsy.
        </Text>
      </Box>

      <Spacer mt={6} />

      <GridColumns>
        {SECTION_DATA.map((section, index) => {
          return (
            <Column span={6}>
              <Section {...section} key={index} mb={2} />
            </Column>
          )
        })}
      </GridColumns>

      <Spacer mt={6} />

      <AboutArtworksRail2QueryRenderer />

      <Spacer my={12} />
    </>
  )
}

interface SectionProps {
  imageUrl: string
  title: string
  description: string
  caption: string
  href: string
  onClick?: (event: React.MouseEvent) => void
}

const Section: React.FC<SectionProps & BoxProps> = ({
  imageUrl,
  title,
  description,
  caption,
  href,
  onClick,
  ...rest
}) => {
  const image = resized(imageUrl, {
    width: 640,
  })
  return (
    <RouterLink
      to={href}
      textDecoration="none"
      display="block"
      onClick={onClick}
    >
      <Box {...rest}>
        <ResponsiveBox
          aspectWidth={640}
          aspectHeight={480}
          maxWidth="100%"
          position="relative"
        >
          <Image
            src={image.src}
            width="100%"
            height="100%"
            srcSet={image.srcSet}
            lazyLoad
            alt=""
          />
          <Text position="absolute" bottom={0} right={0} p={1} color="white100">
            {caption}
          </Text>
        </ResponsiveBox>

        <Spacer my={1} />

        <Flex
          justifyContent="space-between"
          flexDirection="row"
          alignItems="center"
        >
          <Box>
            <Text variant={["lg", "xl"]}>{title}</Text>
            <Text variant="sm">{description}</Text>
          </Box>
          <Button
            // @ts-ignore
            as={RouterLink}
            to={href}
            variant="secondaryNeutral"
            size={["small", "large"]}
            ml={1}
          >
            View
          </Button>
        </Flex>
      </Box>
    </RouterLink>
  )
}

const SECTION_DATA: SectionProps[] = [
  {
    title: "Find the Art you Want",
    description:
      "Be the first to know when the art you’re looking for is available with custom alerts.",
    caption: "Angela Heisch, Diving for Pearls, 2021",
    href: "/collect",
    imageUrl: "https://files.artsy.net/images/1-aboutFind.png",
  },
  {
    title: "Buy Art with Ease",
    description: "Buy art simply and safely, from purchase to delivery. ",
    caption: "Andy Warhol, Flowers F&S ll.64, 1970.",
    href: "/collect",
    imageUrl: "https://files.artsy.net/images/2-aboutBuy.png",
  },
  {
    title: "Bid in Global Auctions",
    description: "Bid in leading global auctions, from wherever you are.",
    caption: "Anna Park, Brenda, 2019.",
    href: "/auctions",
    imageUrl: "https://files.artsy.net/images/3-aboutBid.png",
  },
  {
    title: "Track the Art Market",
    description: "Invest smarter with our free auction results database.",
    caption: "Harold Ancart, Untitled, 2016.",
    href: "/price-database",
    imageUrl: "https://files.artsy.net/images/4-aboutTrack.png",
  },
  {
    title: "Manage your Collection",
    description:
      "Get insight into the market value of artworks in your collection.",
    caption: "John Baldessari, Marina Abramovic, 2018.",
    href: "#",
    imageUrl: "https://files.artsy.net/images/5-aboutManage.png",
    onClick: () => {
      scrollIntoView({
        selector: "#download-app-banner",
        behavior: "smooth",
        offset: 100,
      })
    },
  },
  {
    title: "Sell Artwork from Your Collection",
    description:
      "Sell art from your collection to the right buyer with the help of our experts. ",
    caption: "John Baldessari, Marina Abramovic, 2018.",
    href: "/sell",
    imageUrl: "https://files.artsy.net/images/6-aboutSell.png",
  },
  {
    title: "Discover New Talents",
    description:
      "Get to know today’s up-and-coming artists and trends in the art world.",
    caption: "Evie O'Connor, Delivery Down The Grand Canal, 2021.",
    href: "/articles",
    imageUrl: "https://files.artsy.net/images/7-aboutDiscover.png",
  },
  {
    title: "Follow your Favorite Artists",
    description:
      "Follow artists for updates on their latest works and career milestones. ",
    caption: "Kerry James Marshall, Vignette 13, 2008.",
    href: "/artists",
    imageUrl: "https://files.artsy.net/images/8-aboutFollow.png",
  },
]
