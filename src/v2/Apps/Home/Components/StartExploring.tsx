import {
  GridColumns,
  Column,
  ResponsiveBox,
  Image,
  Flex,
  Text,
  Spacer,
} from "@artsy/palette"
import { cropped } from "v2/Utils/resized"
import { RouterLink } from "v2/System/Router/RouterLink"

export const StartExploring: React.FC = ({}) => {
  const entities = [
    {
      title: "Trending This Week",
      to: "/gene/trending-this-week",
      thumbnail:
        "https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=1250&height=1600&quality=50&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FY4FsPqiK1oVfGNIAwkbjzQ%2Fnormalized.jpg",
    },
    {
      title: "Top Auction Lots",
      to: "/gene/top-auction-lots",
      thumbnail:
        "https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=1600&height=1144&quality=50&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FdgJroWxCRvo2pcHU8CGI9w%2Fnormalized.jpg",
    },
    {
      title: "Black Painters on Our Radar",
      to: "/gene/black-painters-on-our-radar",
      thumbnail:
        "https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=1266&height=1600&quality=50&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FYhMD3Evi6WEJOFQtm2pq8w%2Fnormalized.jpg",
    },
    {
      title: "Finds Under $1,000",
      to: "/gene/finds-under-1000",
      thumbnail:
        "https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=1600&height=1600&quality=50&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FonvIY25cEehm2OXShdFmEA%2Fnormalized.jpg",
    },
    {
      title: "Trove: Editor's Picks",
      to: "/gene/trove",
      thumbnail:
        "https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=1600&height=1600&quality=50&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F0h8z2W8NgfRA_b3S-Bj7jQ%2Fnormalized.jpg",
    },
    {
      title: "Iconic Prints",
      to: "/gene/iconic-prints",
      thumbnail:
        "https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=1200&height=1600&quality=50&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FLGB3d1MycE0S3Yiwq9Rb4w%2Fnormalized.jpg",
    },
  ]
  return (
    <>
      <Flex flexDirection={"column"} justifyContent={"center"}>
        <Text variant="lg">Start Exploring</Text>
        <Spacer mt={[1, 2]} />
        <GridColumns as="aside">
          {entities.map(entity => {
            const image = cropped(entity.thumbnail, { width: 387, height: 218 })

            return (
              <Column span={[6, 4, 4]} key="key">
                <RouterLink
                  display="block"
                  textDecoration="none"
                  to={entity.to}
                >
                  <ResponsiveBox
                    aspectWidth={387}
                    aspectHeight={218}
                    maxWidth="100%"
                    bg="black10"
                  >
                    {image && (
                      <Image
                        {...image}
                        width="100%"
                        height="100%"
                        alt=""
                        lazyLoad
                      />
                    )}
                  </ResponsiveBox>

                  <Text variant="xs" mt={0.5}>
                    {entity.title}
                  </Text>
                </RouterLink>
              </Column>
            )
          })}
        </GridColumns>
      </Flex>
    </>
  )
}
