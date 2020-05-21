import {
  ArrowRightIcon,
  Box,
  Button,
  Flex,
  Image,
  Link,
  Sans,
  Separator,
  Serif,
  space,
} from "@artsy/palette"
import { ArticleData } from "v2/Components/Publishing/Typings"
import React from "react"
import { Media } from "v2/Utils/Responsive"

export const ClassicPromotedContent: React.SFC<{
  article: ArticleData
}> = props => {
  const {
    article: { partner, sale },
  } = props
  const name = partner ? partner.name : sale && sale.name
  const image = partner
    ? partner.profile.image.cropped.url
    : sale && sale.cover_image.cropped.url
  const href = partner ? partner.profile.href : sale && sale.href

  return (
    <Box px={space(2)} maxWidth={[1250]} mx="auto">
      <Flex justifyContent="space-between" mb={space(2)} alignItems="center">
        <Flex>
          <Media greaterThan="xs">
            <a href={href}>
              <Image src={image} width="100px" mr={space(2)} />
            </a>
          </Media>

          <Flex flexDirection="column">
            <Sans size={["3", "4"]} weight="medium">
              <Link href={href} underlineBehavior="none">
                Promoted Content
              </Link>
            </Sans>
            <Serif size={["4", "5"]}>
              <Link href={href} noUnderline>
                {name}
              </Link>
            </Serif>
          </Flex>
        </Flex>

        <Media greaterThan="xs">
          <a href={href}>
            <Button variant="secondaryOutline">
              Explore {partner ? "Gallery" : "Auction"}
            </Button>
          </a>
        </Media>
        <Media at="xs">
          <a href={href}>
            <ArrowRightIcon />
          </a>
        </Media>
      </Flex>
      <Separator color="black60" />
    </Box>
  )
}
