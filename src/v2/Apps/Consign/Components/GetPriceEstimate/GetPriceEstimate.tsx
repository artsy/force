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
          justifyContent="center"
        >
          <Flex
            width={["100%", "100%", "100%", "40%"]}
            flexDirection="column"
            alignItems={["center", "center", "center", "normal"]}
            textAlign={["center", "center", "center", "left"]}
          >
            <Text variant="largeTitle">Get a Price Estimate</Text>
            <Spacer my={1} />
            <Text variant="subtitle" color="black60">
              Discover the potential of reselling an <br />
              artwork you own.
            </Text>

            <Spacer mt={3} />

            {/* TODO: Wire up search bar */}
            <Flex position="relative" maxWidth={360} width="100%">
              <ConsignArtistAutosuggest />
            </Flex>
          </Flex>

          <Spacer mb={[4, 4, 4, 0]} />

          <EstimateResults />
        </Flex>
      </SectionContainer>
    </PriceEstimateContextProvider>
  )
}
