import {
  Box,
  Button,
  Column,
  FullBleed,
  GridColumns,
  Image,
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
      <GridColumns mt={4}>
        <Column span={6}>
          <Text as="h1" variant="xl">
            For the Love of Art
          </Text>
        </Column>
        <Column span={6}>
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

      <SellWithArtsyComponent />
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
      <Image width={props.width} height={props.height} src={props.imgUrl} />
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

const SellWithArtsyComponent: React.FC = () => {
  const image = resized(
    "http://files.artsy.net/images/molly_green_img_for_about2.jpeg",
    { width: 310, height: 1440 }
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
          />
        </Box>
      )}

      <AppContainer
        position="relative"
        minHeight={360}
        display="flex"
        alignItems="start"
        py={50}
      >
        <HorizontalPadding>
          <GridColumns gridRowGap={[2, 4]}>
            <Column span={6} start={1}>
              <Text variant="xxl">Interested in Partnering with Artsy?</Text>
            </Column>

            <Column span={4} start={9}>
              <Button
                variant="primaryWhite"
                width="100%"
                // @ts-ignore
                as={RouterLink}
                to=""
              >
                Apply to Become a Partner
              </Button>
              <Spacer my={2} />
              <Button
                bg="transparent"
                width="100%"
                borderColor="white100"
                // @ts-ignore
                as={RouterLink}
                to=""
              >
                Partnership Overview
              </Button>
              <Spacer my={4} />
              <Button
                bg="transparent"
                width="100%"
                border="none"
                // @ts-ignore
                as={RouterLink}
                to=""
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

const Container = styled(FullBleed)`
  overflow: hidden;
  clip-path: inset(0);
`
