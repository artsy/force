import {
  Column,
  GridColumns,
  Text,
  Image,
  Separator,
  Flex,
  themeProps,
} from "@artsy/palette"
import React from "react"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"

export const PriceDatabaseBenefits: React.FC = () => {
  const isMobile = useMatchMedia(themeProps.mediaQueries.xs)

  return (
    <Flex py={[1, 4]} flexDirection="column">
      <GridColumns my={4} gridRowGap={[2, 0]}>
        <Column span={12}>
          <Text as="h1" variant="xl">
            The Benefits of the
            <br />
            Artsy Price Database
          </Text>
        </Column>
      </GridColumns>
      <GridColumns mb={4} gridRowGap={[2, 0]}>
        <Column span={6}>
          <Image style={{ maxWidth: "100%" }} src={"images/browse.jpg"} />
        </Column>
        <Column span={6}>
          <Text as="h1" variant="xl">
            340,000 Artists
          </Text>
          <Text lineHeight={1.5}>
            From well-known to niche auction houses, find sale results from your
            favourite artists.
          </Text>
        </Column>
      </GridColumns>

      <Separator />

      <GridColumns my={4} gridRowGap={[2, 0]}>
        {isMobile && (
          <Column span={6}>
            <Image style={{ maxWidth: "100%" }} src={"images/browse.jpg"} />
          </Column>
        )}
        <Column span={6}>
          <Text as="h1" variant="xl">
            1 Database
          </Text>
          <Text lineHeight={1.5}>
            Quickly and easily find Design, Fine and Decorative Art results all
            in one place.
          </Text>
        </Column>
        {!isMobile && (
          <Column span={6}>
            <Image style={{ maxWidth: "100%" }} src={"images/browse.jpg"} />
          </Column>
        )}
      </GridColumns>

      <Separator />

      <GridColumns my={4} gridRowGap={[2, 0]}>
        <Column span={6}>
          <Image style={{ maxWidth: "100%" }} src={"images/browse.jpg"} />
        </Column>
        <Column span={6}>
          <Text as="h1" variant="xl">
            Search for Free
          </Text>
          <Text lineHeight={1.5}>
            No search limits, no results limits, no subscriptions, and no
            obligations.
          </Text>
        </Column>
      </GridColumns>
    </Flex>
  )
}
