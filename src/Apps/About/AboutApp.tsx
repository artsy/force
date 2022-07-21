import {
  Box,
  Button,
  Column,
  Flex,
  FullBleed,
  GridColumns,
  Image,
  Join,
  ResponsiveBox,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import { AppContainer } from "Apps/Components/AppContainer"
import styled from "styled-components"
import { HorizontalPadding } from "../Components/HorizontalPadding"
import { RouterLink } from "System/Router/RouterLink"
import { resized } from "Utils/resized"
import { AboutArtworksRailQueryRenderer } from "./AboutArtworksRail"

export const AboutApp: React.FC = () => {
  return (
    <>
      <MetaTags
        title="About | Artsy"
        description="Artsy’s mission is to make all of the world’s art accessible to anyone with an Internet connection."
        pathname="/about"
      />

      <Spacer mt={4} />

      <GridColumns>
        <Column span={6}>
          <Text as="h1" variant="xl">
            For the Love of Art
          </Text>
        </Column>

        <Column span={6}>
          <Text variant="sm">
            Artsy envisions a future where everyone is moved by art every day.
            To get there, we’re expanding the art market to support more artists
            and art around the world. As the leading marketplace to discover,
            buy, and sell fine art, Artsy believes that the process of buying
            art should be as brilliant as art itself. That’s why we’re dedicated
            to making a joyful, welcoming experience that connects collectors
            with the artists and artworks they love.
          </Text>
        </Column>
      </GridColumns>

      <Spacer mt={6} />

      <AboutArtworksRailQueryRenderer />

      <Spacer my={12} />

      <Join separator={<Spacer mt={6} />}>
        <SellWithArtsy />
        <AppDownload />
        <CollectorInfo />
        <Separator />
        <ArtsySpecialists />
      </Join>
    </>
  )
}

const SellWithArtsy: React.FC = () => {
  const image = resized(
    "https://files.artsy.net/images/molly_green_original.jpeg",
    { width: 640 }
  )

  return (
    <Container bg="black100" color="white100">
      {image.src && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100%"
          height="100%"
          opacity={0.4}
          style={{
            transform: "scale(1.3)",
            pointerEvents: "none",
            filter: "blur(3px)",
          }}
        >
          <Image
            src={image.src}
            lazyLoad
            width="100%"
            height="100%"
            style={{
              objectFit: "cover",
            }}
            alt=""
          />
        </Box>
      )}

      <AppContainer
        position="relative"
        display="flex"
        alignItems="start"
        py={6}
      >
        <HorizontalPadding>
          <GridColumns gridRowGap={[2, 4]}>
            <Column span={6}>
              <Text variant="xxl">Interested in Partnering with Artsy?</Text>
            </Column>

            <Column span={4} start={9}>
              <Button
                variant="primaryWhite"
                width="100%"
                //@ts-ignore
                as={RouterLink}
                to="https://partners.artsy.net/gallery-partnerships/"
                mb={2}
              >
                Apply to Become a Partner
              </Button>

              <Button
                bg="transparent"
                width="100%"
                borderColor="white100"
                // @ts-ignore
                as={RouterLink}
                to="https://partners.artsy.net/"
                mb={2}
              >
                Partnership Overview
              </Button>

              <Button
                bg="transparent"
                width="100%"
                border="none"
                // @ts-ignore
                as={RouterLink}
                to="/galleries"
              >
                See Full List of Partners
              </Button>
            </Column>
          </GridColumns>
        </HorizontalPadding>
      </AppContainer>
    </Container>
  )
}

const AppDownload: React.FC = () => {
  const image = resized(
    "https://files.artsy.net/images/about2/appstore_image_highres.png",
    {
      width: 910,
      height: 652,
    }
  )

  return (
    <GridColumns gridRowGap={4}>
      <Column span={6}>
        <Text variant="xs">Artsy App</Text>

        <Text variant="xl" mt={1}>
          The Art Market at Your Fingertips
        </Text>

        <Text variant="sm" mt={1} mb={4}>
          Discover artworks just for you, get market insights, and buy and sell
          with confidence—all on the Artsy app.
        </Text>

        <Flex>
          <Box
            width={120}
            height={40}
            as="a"
            // @ts-ignore
            href="https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://files.artsy.net/images/download-ios-app.svg"
              width="100%"
              height="100%"
              alt=""
              loading="lazy"
            />
          </Box>

          <Spacer ml={2} />

          <Box
            width={120}
            height={40}
            as="a"
            // @ts-ignore
            href="https://play.google.com/store/apps/details?id=net.artsy.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://files.artsy.net/images/download-android-app.svg"
              width="100%"
              height="100%"
              alt=""
              loading="lazy"
            />
          </Box>
        </Flex>
      </Column>

      <Column span={6}>
        <ResponsiveBox aspectHeight={652} aspectWidth={910} maxWidth="100%">
          <Image
            src={image.src}
            width="100%"
            height="100%"
            srcSet={image.srcSet}
            lazyLoad
            alt=""
          />
        </ResponsiveBox>
      </Column>
    </GridColumns>
  )
}

const CollectorInfo: React.FC = () => {
  const image = resized(
    "https://files.artsy.net/about2_page_collector_img.jpg",
    {
      width: 910,
      height: 652,
    }
  )

  return (
    <GridColumns gridRowGap={[4, 6]}>
      <Column span={12}>
        <Text variant="xl">Collecting</Text>
      </Column>

      <Column span={6}>
        <ResponsiveBox aspectHeight={652} aspectWidth={910} maxWidth="100%">
          <Image
            src={image.src}
            width="100%"
            height="100%"
            srcSet={image.srcSet}
            lazyLoad
            alt=""
          />
        </ResponsiveBox>

        <Text variant="xs" textColor="black60" mt={0.5}>
          The Collection for Carole Server by Emily Johnston for Artsy 2015.
          Courtesy of Carole Server.
        </Text>
      </Column>

      <Column span={6}>
        <Text variant="xs">On Artsy</Text>

        <Text variant="xl" mt={1}>
          Where Collectors Belong
        </Text>

        <Text variant="sm" mt={1}>
          Artsy lets collectors find their favorite artists—and discover some
          new ones—all in one place. We bring together over 1 million artworks
          from our network of 4,000+ partners, including the world’s leading
          galleries, auction houses, fairs, and institutions. To connect
          collectors to the art they care about, we feature the largest
          selection of international emerging, established, and blue-chip
          artists.
        </Text>
      </Column>
    </GridColumns>
  )
}

const ArtsySpecialists: React.FC = () => {
  return (
    <GridColumns gridRowGap={4}>
      <Column span={6}>
        <Text variant="xs">Artsy Specialists</Text>

        <Text variant="xl" mt={1}>
          Here to Help You Find the Art You Love
        </Text>

        <Text variant="sm" mt={1}>
          Artsy specialists are available to all Artsy members, wherever you are
          in your collector’s journey. Our specialists join Artsy from leading
          auction houses, galleries, and museums, and are ready to help you find
          works that you love—with your price range, taste, and current
          collection in mind.
        </Text>

        <Text variant="sm" mt={4}>
          More questions about collecting?
        </Text>

        <Flex flexDirection={["column", "column", "column", "row"]} mt={4}>
          <Button
            variant="primaryBlack"
            // @ts-ignore
            as={RouterLink}
            to="/meet-the-specialists"
          >
            Contact Specialist
          </Button>

          <Spacer ml={[0, 0, 0, 2]} mt={[2, 2, 2, 0]} />

          <Button
            variant="secondaryBlack"
            // @ts-ignore
            as={RouterLink}
            to="https://support.artsy.net/hc/en-us"
          >
            Collector Resources
          </Button>
        </Flex>
      </Column>
    </GridColumns>
  )
}

const Container = styled(FullBleed)`
  overflow: hidden;
  clip-path: inset(0);
`
