import {
  Column,
  GridColumns,
  Text,
  Image,
  Separator,
  Flex,
} from "@artsy/palette"
import React from "react"

export const Benefits: React.FC = () => {
  return (
    <Flex py={4} flexDirection="column">
      <GridColumns my={4} gridRowGap={[2, 0]}>
        <Column span={6}>
          <Text as="h1" variant="xl">
            The Benefits of the
            <br />
            Artsy Price Database
          </Text>
        </Column>
      </GridColumns>
      <GridColumns my={4} gridRowGap={[2, 0]}>
        <Column span={6}>
          <Image style={{ maxWidth: "100%" }} src={"images/browse.jpg"} />
        </Column>
        <Column span={6}>
          <Text as="h1" variant="xl">
            340,000 Artists
          </Text>
          <Text>
            From well-known to niche auction houses, find sale results from your
            favourite artists.
          </Text>
        </Column>
      </GridColumns>

      <Separator />

      <GridColumns my={4} gridRowGap={[2, 0]}>
        <Column span={6}>
          <Text as="h1" variant="xl">
            1 Database
          </Text>
          <Text>
            Quickly and easily find Design, Fine and Decorative Art results all
            in one place.
          </Text>
        </Column>
        <Column span={6}>
          <Image style={{ maxWidth: "100%" }} src={"images/browse.jpg"} />
        </Column>
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
          <Text>
            No search limits, no results limits, no subscriptions, and no
            obligations.
          </Text>
        </Column>
      </GridColumns>
    </Flex>
  )
}
