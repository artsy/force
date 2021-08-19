import React from "react"
import { ConsignArtistAutosuggest } from "./ConsignArtistAutosuggest"
import { PriceEstimateContextProvider } from "./ConsignPriceEstimateContext"
import { Column, FullBleed, GridColumns, Spacer, Text } from "@artsy/palette"
import { EstimateResults } from "./EstimateResults"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"

export const GetPriceEstimate: React.FC = () => {
  return (
    <PriceEstimateContextProvider>
      <FullBleed bg="black5">
        <AppContainer>
          <HorizontalPadding py={[2, 4]}>
            <GridColumns>
              <Column
                span={3}
                pt={[2, 4]}
                pr={[2, 0]}
                pb={[2, 4]}
                pl={[2, 4]}
                textAlign={["center", "left"]}
              >
                <Text variant="xl">Get a Price Estimate</Text>

                <Spacer my={1} />

                <Text variant="sm" color="black60" maxWidth="40ch" mx="auto">
                  Our proprietary market data allows us to price your artwork
                  accurately and quickly
                </Text>

                <Spacer mt={2} />

                <ConsignArtistAutosuggest />
              </Column>

              <Column span={9} p={[2, 4]}>
                <EstimateResults />
              </Column>
            </GridColumns>
          </HorizontalPadding>
        </AppContainer>
      </FullBleed>
    </PriceEstimateContextProvider>
  )
}
