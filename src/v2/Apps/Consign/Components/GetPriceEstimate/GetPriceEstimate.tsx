import React from "react"
import { SectionContainer } from "../SectionContainer"
import { ConsignArtistAutosuggest } from "./ConsignArtistAutosuggest"
import { PriceEstimateContextProvider } from "./ConsignPriceEstimateContext"
import { Flex, Spacer, Text } from "@artsy/palette"
import { EstimateResults } from "./EstimateResults"

export const GetPriceEstimate: React.FC = () => {
  return (
    <PriceEstimateContextProvider>
      <SectionContainer background="black5">
        <Flex
          flexDirection={["column", "column", "column", "row"]}
          alignItems={["center", "center", "center", "start"]}
          justifyContent="center"
        >
          <Flex
            flexDirection="column"
            pr={[0, 0, 0, 5]}
            mb={4}
            width="100%"
            maxWidth={360}
            alignItems={["center", "center", "center", "start"]}
          >
            <Text variant="largeTitle">Get a Price Estimate</Text>
            <Spacer my={1} />
            <Text
              variant="subtitle"
              color="black60"
              textAlign={["center", "center", "left"]}
            >
              Our proprietary market data allows us to price your artwork
              accurately and quickly
            </Text>

            <Spacer mt={3} />

            <Flex position="relative" width="100%">
              <ConsignArtistAutosuggest />
            </Flex>
          </Flex>

          <EstimateResults
            alignItems="center"
            justifyContent="center"
            flex="1"
            px={[0, 0, 0, 3]}
            width={["100%", "100%", "100%", "auto"]}
          />
        </Flex>
      </SectionContainer>
    </PriceEstimateContextProvider>
  )
}
