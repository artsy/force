import {
  Avatar,
  Box,
  Button,
  Column,
  Flex,
  FullBleed,
  GridColumns,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { MetaTags } from "v2/Components/MetaTags"
import { Rail } from "v2/Components/Rail"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import styled from "styled-components"
import { HorizontalPadding } from "../Components/HorizontalPadding"
import { RouterLink } from "v2/System/Router/RouterLink"
import { resized } from "v2/Utils/resized"

export const AboutApp: React.FC = () => {
  return (
    <>
      <MetaTags
        title="About | Artsy"
        description="Artsy’s mission is to make all of the world’s art accessible to anyone with an Internet connection."
        pathname="/about"
      />
      <GridColumns>
        <Column span={6} my={4}>
          <Text as="h1" variant="xl">
            For the Love of Art
          </Text>
        </Column>
        <Column span={6} my={4}>
          <Text variant="md">
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
      <Rail
        title="Discover Artworks Just for You"
        subTitle="On Artsy"
        getItems={() => {
          const items: RailComponentProps[] = [
            {
              imgUrl:
                "https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FoOhfzetWDyPIdRYLVRBy8A%2Flarge.jpg&width=890&height=1046&quality=80",
              name: "Caleb Hahne",
              artworkTitle: "Carry Me Home, 2019",
              gallery: "1969 Gallery",
              width: 340,
              height: 500,
            },
            {
              imgUrl:
                "https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FSbbu7kX5gzxEUfL4Jwyk6Q%2Flarge.jpg&width=890&height=1112&quality=80",
              name: "Amy Sherald",
              artworkTitle: "The Make Believer (Monet's Garden), 2016",
              gallery: "The Studio Museum in Harlem",
              width: 300,
              height: 375,
            },
            {
              imgUrl:
                "https://d7hftxdivxxvm.cloudfront.net/?resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FE_tdYYu4XOeuVK8ZHFwJSw%2Flarge.jpg&width=890&height=890&quality=80",
              name: "Frank Stella",
              artworkTitle:
                "Sinjerli Variations Squared with Colored Grounds VI, 1981",
              gallery: "Heritage Auctions",
              width: 300,
              height: 300,
            },
            {
              imgUrl:
                "https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fm4kmYLBKSkExMXlxjQ4i8A%2Flarge.jpg&width=890&height=1046&quality=80",
              name: "Inka Essenhigh",
              artworkTitle: "Old Trees in Fall, 2018",
              gallery: "Miles McEnery Gallery",
              width: 340,
              height: 500,
            },
          ]

          return items.map(item => {
            return <RailComponent {...item} />
          })
        }}
      />

      <SellWithArtsySection />
      <Spacer mt={4} />
      <AppDownloadSection />
      <CollectorInfoSection />
      <ArtsySpecialistsSection />
    </>
  )
}

interface RailComponentProps {
  imgUrl: string
  name: string
  artworkTitle: string
  gallery: string
  width: number
  height: number
}

const RailComponent: React.FC<RailComponentProps> = props => {
  return (
    <Box>
      <Image
        width={props.width}
        height={props.height}
        src={props.imgUrl}
        alt=""
      />
      <Text variant="md">{props.name}</Text>
      <Text variant="md" color="black60">
        {props.artworkTitle}
      </Text>
      <Text variant="xs" color="black60">
        {props.gallery}
      </Text>
    </Box>
  )
}

const SellWithArtsySection: React.FC = () => {
  const image = resized(
    "http://files.artsy.net/images/molly_green_original.jpeg",
    { width: 640 }
  )

  return (
    <Container bg="black100" color="white100" mt={100}>
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

const AppDownloadSection: React.FC = () => {
  const image = resized("http://files.artsy.net/download_artsy_apps_img.jpg", {
    width: 910,
    height: 652,
  })

  return (
    <GridColumns>
      <Column span={6} mt={6}>
        <Text variant="xs" textTransform="uppercase">
          Artsy App
        </Text>
        <Text variant="xl" mt={1}>
          The Art Market at Your Fingertips
        </Text>
        <Text variant="sm" mt={1} mb={4}>
          Discover artworks just for you, get market insights, and buy and sell
          with confidence—all on the Artsy app.
        </Text>
        <Flex>
          <RouterLink to="https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080">
            <Image
              src="http://files.artsy.net/images/download-ios-app-transparent.svg"
              mr={4}
            />
          </RouterLink>
          <RouterLink to="https://play.google.com/store/apps/details?id=net.artsy.app">
            <Image src="http://files.artsy.net/images/download-android-app-transparent.svg" />
          </RouterLink>
        </Flex>
      </Column>

      <Column span={6} mt={6}>
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

const CollectorInfoSection: React.FC = () => {
  const image = resized(
    "http://files.artsy.net/about2_page_collector_img.jpg",
    {
      width: 910,
      height: 652,
    }
  )

  return (
    <GridColumns>
      <Column span={12}>
        <Text variant="xl" my={6}>
          Collecting
        </Text>
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
        <Text variant="xs" textColor="black60">
          The Collection fo Carole Server by Emily Johnston for Artsy 2015.
          Courtesy of Carole Server.
        </Text>
      </Column>

      <Column span={6}>
        <Text variant="xs" textTransform="uppercase">
          On Artsy
        </Text>
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
      <Column span={12}>
        <Spacer my={6} />
        <Text borderBottom="1px solid" borderBottomColor="black15" />
        <Spacer my={6} />
      </Column>
    </GridColumns>
  )
}

const ArtsySpecialistsSection: React.FC = () => {
  return (
    <GridColumns>
      <Column span={6}>
        <Text variant="xs" textTransform="uppercase">
          Artsy Specialists
        </Text>
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
        <Flex>
          <Button
            variant="primaryBlack"
            width="40%"
            // @ts-ignore
            as={RouterLink}
            to="/meet-the-specialists"
            mt={4}
            mr={1}
          >
            Contact Specialist
          </Button>
          <Button
            variant="primaryWhite"
            width="40%"
            // @ts-ignore
            as={RouterLink}
            to="https://support.artsy.net/hc/en-us"
            mt={4}
            borderColor="black15"
          >
            Collector Resources
          </Button>
        </Flex>
      </Column>
      <Column span={6} mt={6}>
        {AdvisorySpecialists.map(specialist => (
          <Box width="100%">
            <Flex flexDirection="row">
              <Avatar size="md" src={specialist.photo.url} mr={2} />
              <Flex flexDirection="column">
                <Text variant="lg">{specialist.name}</Text>
                <Text variant="md">{specialist.title}</Text>
                <Text variant="md" color="black60" mb={2}>
                  {specialist.location}
                </Text>
                <RouterLink to={`mailto:${specialist.email}`}>
                  {specialist.email}
                </RouterLink>
              </Flex>
            </Flex>
            <Spacer my={2} />
            <Text borderBottom="1px solid" borderBottomColor="black15" />
            <Spacer my={2} />
          </Box>
        ))}
      </Column>
    </GridColumns>
  )
}

const AdvisorySpecialists = [
  {
    name: "Robin Roche",
    title: "Senior Advisor",
    location: "New York",
    email: "robin.roche@artsy.net",
    phone: "+1 646 707 9450",
    photo: { url: "http://files.artsy.net/images/robin.jpeg" },
  },
  {
    name: "Itziar Ramos Ricoy",
    title: "Advisor",
    location: "London",
    email: "itziar.ramos@artsy.net",
    phone: "+44 7429 093319",
    photo: { url: "http://files.artsy.net/images/itziar.jpeg" },
  },
  {
    name: "Caroline Perkins",
    title: "Advisor",
    location: "New York",
    email: "caroline.perkins@artsy.net",
    phone: "+1 540 588 1371",
    photo: { url: "http://files.artsy.net/images/cperkins_headshot-copy.jpg" },
  },
]

const Container = styled(FullBleed)`
  overflow: hidden;
  clip-path: inset(0);
`
