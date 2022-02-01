import { Box, Column, GridColumns, Image, Text } from "@artsy/palette"
import { MetaTags } from "v2/Components/MetaTags"
import { Rail } from "v2/Components/Rail"

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
            // Add a 4th artist img to rail
          ]

          return items.map(item => {
            return <RailComponent {...item} />
          })
        }}
      />
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
