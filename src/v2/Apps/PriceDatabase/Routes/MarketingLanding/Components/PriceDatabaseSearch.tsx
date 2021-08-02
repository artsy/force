import { Button, Column, Flex, GridColumns, Input, Text } from "@artsy/palette"
import React from "react"
import { ArtistAutosuggest } from "./ArtistAutosuggest"

export const PriceDatabaseSearch: React.FC = () => {
  return (
    <>
      <GridColumns my={4} gridRowGap={[2, 0]}>
        <Column span={6}>
          <Text as="h1" variant="xl">
            Artsy Price Database
          </Text>
          <Text mb={2}>
            Search auction results for more than 340,000 artists FOR FREE
          </Text>
        </Column>
      </GridColumns>
      <Flex
        alignItems="center"
        justifyContent="center"
        maxWidth="800px"
        width="100%"
        mx="auto"
        flexDirection="column"
        pb={4}
      >
        <GridColumns pb={[2, 0]} gridRowGap={[2, 0]} width="100%" mx="auto">
          <Column span={12} pb={[1, 4]}>
            <ArtistAutosuggest />
          </Column>
          <Column span={4} pb={[1, 4]}>
            <Input placeholder="Medium" />
          </Column>
          <Column span={4} pb={[1, 4]}>
            <Input placeholder="Size" />{" "}
          </Column>
          <Column span={4} pb={[1, 4]}>
            <Input placeholder="Time Period" />{" "}
          </Column>
        </GridColumns>
        <Button width="100%" maxWidth="440px">
          Search
        </Button>
      </Flex>
    </>
  )
}
