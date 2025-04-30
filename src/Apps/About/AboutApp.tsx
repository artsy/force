import {
  Box,
  type BoxProps,
  Button,
  Column,
  Flex,
  GridColumns,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import {
  FullBleedHeader,
  FullBleedHeaderOverlay,
} from "Components/FullBleedHeader/FullBleedHeader"
import { MetaTags } from "Components/MetaTags"
import { StructuredData } from "Components/Seo/StructuredData"
import { RouterLink } from "System/Components/RouterLink"
import { DOWNLOAD_APP_URLS, Device } from "Utils/Hooks/useDeviceDetection"
import { resized } from "Utils/resized"
import styled from "styled-components"
import { AboutArtworksRailQueryRenderer } from "./AboutArtworksRail"

const DESCRIPTION =
  "Artsy’s mission is to expand the art market to support more artists and art in the world."

export const AboutApp: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <>
      <MetaTags
        title="About | Artsy"
        description={DESCRIPTION}
        imageURL="https://files.artsy.net/images/00_CVP_About_Hero_og.png"
        pathname="/about"
      />

      <FullBleedHeader
        src="https://files.artsy.net/images/00_CVP_About_Hero%20(1).png"
        caption="Detail of Cassi Namoda, A Strange Song, 2022. Detail of Alex Katz,
            Day Lily 1, 1969."
      >
        <FullBleedHeaderOverlay display={["flex", "none"]} zIndex={1} />

        <Flex
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent={["center", "flex-start"]}
          p={4}
          zIndex={1}
        >
          <Text
            variant={["xl", "xxl"]}
            as="h1"
            color="mono0"
            textAlign={["center", "left"]}
          >
            The Future of Art Collecting
          </Text>
        </Flex>
      </FullBleedHeader>

      <Spacer y={4} />

      <Box textAlign="center" width="100%">
        <Box maxWidth={950} margin="auto">
          <Text as="h1" variant={["lg", "xl"]}>
            Artsy is for art collecting.
          </Text>

          <Text variant={["sm-display", "lg-display"]} mt={2}>
            As the leading marketplace for art by the world’s emerging and
            established artists, we’ve made it easy for new and experienced
            collectors to discover and buy art—and so much more. Everything
            you’ll ever need to collect art, you’ll find on Artsy.
          </Text>
        </Box>
      </Box>

      <Spacer y={6} />

      <GridColumns gridRowGap={4}>
        {SECTION_DATA.map((section, index) => {
          return (
            <Column key={section.title} span={6}>
              <Section {...section} key={index} />
            </Column>
          )
        })}
      </GridColumns>

      <Spacer y={6} />

      <AboutArtworksRailQueryRenderer />

      <StructuredData
        schemaData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Artsy",
          url: "https://www.artsy.net",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "Web",
          browserRequirements: "Requires JavaScript",
          description: DESCRIPTION,
          downloadUrl: [
            DOWNLOAD_APP_URLS[Device.iPhone],
            DOWNLOAD_APP_URLS[Device.Android],
          ],
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            category: "free",
          },
          inLanguage: "en",
          author: {
            "@type": "Organization",
            name: "Artsy",
            url: "https://www.artsy.net",
          },
          hasPart: [
            {
              "@type": "MobileApplication",
              name: "Artsy",
              operatingSystem: "iOS 16.6 or later",
              applicationCategory: "LifestyleApplication",
              downloadUrl: DOWNLOAD_APP_URLS[Device.iPhone],
              installUrl: DOWNLOAD_APP_URLS[Device.iPhone],
              contentRating: "17+",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                category: "free",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "5500",
              },
            },
            {
              "@type": "MobileApplication",
              name: "Artsy",
              applicationCategory: "LifestyleApplication",
              downloadUrl: DOWNLOAD_APP_URLS[Device.Android],
              installUrl: DOWNLOAD_APP_URLS[Device.Android],
              contentRating: "Teen",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                category: "free",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.5",
                reviewCount: "1230",
              },
            },
          ],
        }}
      />

      <StructuredData
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Artsy",
          alternateName: "Artsy.net",
          url: "https://www.artsy.net",
          description: DESCRIPTION,
          logo: "https://files.artsy.net/images/og_image.jpeg",
          foundingDate: "2009",
          foundingLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "New York",
              addressRegion: "NY",
              addressCountry: "US",
            },
          },
          founders: [
            {
              "@type": "Person",
              name: "Carter Cleveland",
              jobTitle: "Founder",
              sameAs: "https://www.linkedin.com/in/cartercleveland",
            },
          ],
          employees: [
            {
              "@type": "Person",
              name: "Jeffrey Yin",
              jobTitle: "Chief Executive Officer",
              sameAs: "https://www.linkedin.com/in/jeffreyjyin/",
            },
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "401 Broadway",
            addressLocality: "New York",
            addressRegion: "NY",
            postalCode: "10013",
            addressCountry: "US",
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              email: "support@artsy.net",
              contactType: "customer support",
            },
          ],
          brand: {
            "@type": "Brand",
            name: "Artsy",
            logo: "https://files.artsy.net/images/og_image.jpeg",
            slogan: "Discover and Buy Fine Art",
          },
          sameAs: [
            "https://www.instagram.com/artsy",
            "https://x.com/artsy",
            "https://www.linkedin.com/company/artsyinc/",
            "https://www.facebook.com/artsy",
            "https://www.youtube.com/artsy",
            "https://www.threads.com/@artsy",
            "https://www.tiktok.com/@artsy",
            "https://www.pinterest.com/artsy/",
            "https://soundcloud.com/artsypodcast",
            "https://podcasts.apple.com/us/podcast/the-artsy-podcast/id1096194516",
            "https://open.spotify.com/show/3Wc2AVcebdEf0yC7NoFQgt",
            DOWNLOAD_APP_URLS[Device.iPhone],
            DOWNLOAD_APP_URLS[Device.Android],
            "https://en.wikipedia.org/wiki/Artsy_(website)",
            "https://github.com/artsy",
            "https://artsy.github.io/",
          ],
          keywords:
            "online art, art marketplace, buy art, art auctions, contemporary art, art galleries, emerging artists",
          knowsAbout: [
            "Contemporary Art",
            "Fine Art Auctions",
            "Art Galleries",
            "Emerging Artists",
            "Art Market Trends",
          ],
        }}
      />
    </>
  )
}

interface SectionProps {
  imageUrl: string
  title: string
  description: string
  caption: string
  href: string
}

const Section: React.FC<React.PropsWithChildren<SectionProps & BoxProps>> = ({
  imageUrl,
  title,
  description,
  caption,
  href,
  ...rest
}) => {
  const image = resized(imageUrl, { width: 640 })

  return (
    <Box {...rest}>
      <RouterLink to={href} textDecoration="none" display="block">
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

          <SectionOverlay>
            <Text
              variant={["xs", "sm"]}
              position="absolute"
              bottom={0}
              right={0}
              p={1}
              color="mono0"
              fontStyle="italic"
            >
              {caption}
            </Text>
          </SectionOverlay>
        </ResponsiveBox>
      </RouterLink>

      <Spacer y={1} />

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
  )
}

const SECTION_DATA: SectionProps[] = [
  {
    title: "Find the art you want",
    description:
      "Be the first to know when the art you’re looking for is available with custom alerts.",
    caption: "Angela Heisch, Diving for Pearls, 2021",
    href: "/collect",
    imageUrl: "https://files.artsy.net/images/01_CVP_About_Find.png",
  },
  {
    title: "Buy art with ease",
    description: "Buy art simply and safely, from purchase to delivery.",
    caption: "Andy Warhol, Flowers F&S ll.64, 1970.",
    href: "/collect",
    imageUrl: "https://files.artsy.net/images/02_CVP_About_Buy.png",
  },
  {
    title: "Bid in global auctions",
    description: "Bid in leading global auctions, from wherever you are.",
    caption: "Anna Park, Ready Set, 2020.",
    href: "/auctions",
    imageUrl: "https://files.artsy.net/images/03_CVP_About_Bid.png",
  },
  {
    title: "Track the art market",
    description: "Invest smarter with our free auction results database.",
    caption: "Harold Ancart, Untitled, 2016.",
    href: "/price-database",
    imageUrl: "https://files.artsy.net/images/04_CVP_About_Track.png",
  },
  {
    title: "Manage your collection",
    description:
      "Get insight into the market value of artworks in your collection.",
    caption: "John Baldessari, Marina Abramovic, 2018.",
    href: "/meet-your-new-art-advisor",
    imageUrl: "https://files.artsy.net/images/05_CVP_About_Manage.png",
  },
  {
    title: "Discover new talents",
    description:
      "Get to know today’s up-and-coming artists and trends in the art world.",
    caption: "Evie O'Connor, Delivery Down The Grand Canal, 2021.",
    href: "/articles",
    imageUrl: "https://files.artsy.net/images/07_CVP_About_Discover.png",
  },
  {
    title: "Follow your favorite artists",
    description:
      "Follow artists for updates on their latest works and career milestones.",
    caption: "Amy Beager, Pixie Dust, 2022.",
    href: "/artists",
    imageUrl: "https://files.artsy.net/images/08_CVP_About_Follow (2).png",
  },
]

const SectionOverlay = styled(Flex)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-shadow: ${themeGet("effects.textShadow")};
  background: ${themeGet("effects.overlayGradient")};
  z-index: 1;
`
