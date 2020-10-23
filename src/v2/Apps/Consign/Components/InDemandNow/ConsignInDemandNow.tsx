import React from "react"
import {
  Text as BaseText,
  BlueChipIcon,
  Box,
  Column,
  Flex,
  GridColumns,
  Image,
  Separator,
  Spacer,
} from "@artsy/palette"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { useSystemContext } from "v2/Artsy"
import { graphql } from "react-relay"

import { ConsignInDemandNowQuery } from "v2/__generated__/ConsignInDemandNowQuery.graphql"
import { ConsignTopArtists } from "./ConsignTopArtists"
import styled from "styled-components"
import { DemandRank } from "./DemandRank"
import { formatCentsToDollars } from "../../Utils/formatCentsToDollars"
import { SectionContainer } from "../SectionContainer"
import { Media } from "v2/Utils/Responsive"

export const ConsignInDemandNow = () => {
  return (
    <SectionContainer background="black100">
      <Box textAlign="left" width="100%">
        <Text textAlign={"left"} mb={2} variant="largeTitle">
          In Demand Now
        </Text>
        <Separator />
      </Box>

      <Spacer my={3} />
      <ConsignInDemandNowQueryRenderer />
      <Spacer my={4} />
      <ConsignTopArtists />
    </SectionContainer>
  )
}

const ConsignInDemandNowQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<ConsignInDemandNowQuery>
      environment={relayEnvironment}
      variables={{
        artistInternalId: "4ed901b755a41e0001000a9f", // Kehinde Wiley
        artistSlug: "kehinde-wiley",
        medium: "PAINTING",
      }}
      // FIXME: Must be logged in for diffusion data to work
      query={graphql`
        query ConsignInDemandNowQuery(
          $artistInternalId: ID!
          $artistSlug: String!
          $medium: String!
        ) {
          artist(id: $artistSlug) {
            birthday
            nationality
            auctionResultsConnection(first: 1, sort: DATE_DESC) {
              edges {
                node {
                  internalID
                  title
                  dimensionText
                  images {
                    thumbnail {
                      url
                    }
                  }
                  description
                  dateText
                  organization
                  saleDate
                  priceRealized {
                    display
                    centsUSD
                  }
                }
              }
            }
          }

          marketPriceInsights(artistId: $artistInternalId, medium: $medium) {
            annualLotsSold
            annualValueSoldCents
            artistId
            artistName
            artsyQInventory
            createdAt
            demandRank
            demandTrend
            highRangeCents
            largeHighRangeCents
            largeLowRangeCents
            largeMidRangeCents
            liquidityRank
            lowRangeCents
            medianSaleToEstimateRatio
            medium
            mediumHighRangeCents
            mediumLowRangeCents
            mediumMidRangeCents
            midRangeCents
            sellThroughRate
            smallHighRangeCents
            smallLowRangeCents
            smallMidRangeCents
            updatedAt
          }
        }
      `}
      render={({ props, error }) => {
        // FIXME: Error handling
        if (error) {
          return null
        }

        return (
          <>
            <Media greaterThanOrEqual="md">
              <InDemandNowLarge {...props} />
            </Media>
            <Media lessThan="md">
              <InDemandNowSmall {...props} />
            </Media>
          </>
        )
      }}
    />
  )
}

const InDemandNowSmall: React.FC<
  ConsignInDemandNowQuery["response"]
> = props => {
  // FIXME: Add skeleton loading state
  if (!props?.marketPriceInsights || !props?.artist) {
    return null
  }

  const {
    artistName,
    averageSalePrice,
    birthday,
    demandRank,
    highRangeDollars,
    lastAuctionResult,
    medianSaleToEstimateRatio,
    nationality,
    sellThroughRate,
  } = computeProps(props)

  return (
    <>
      <Box>
        <Text textAlign={"left"} variant="largeTitle">
          {artistName}
        </Text>
        <Spacer mt={1} />
        <Text variant="text">
          {nationality}, b. {birthday}
        </Text>
        <Flex>
          <BlueChipIcon width={15} height={15} fill="white100" mr={0.3} />{" "}
          <Text variant="small">Blue Chip Representation</Text>
        </Flex>

        <Spacer mt={3} />
      </Box>

      <Flex justifyContent="space-between">
        <Box>
          <Box>
            <Image
              src={lastAuctionResult.images.thumbnail.url}
              width={100}
              height="auto"
            />
            <Spacer my={0.5} />
            <Text variant="caption">
              {lastAuctionResult.title}, {lastAuctionResult.dateText}
            </Text>
            <Text variant="caption">{lastAuctionResult.saleDate}</Text>
            <Text variant="caption">{lastAuctionResult.organization}</Text>
          </Box>
          <Box>
            <Text color="black30">Realized Price</Text>
            <Text variant="largeTitle">
              {lastAuctionResult.priceRealized.display}
            </Text>
          </Box>
        </Box>
        <Box>
          <Box>
            <Text>Highest Realized Price</Text>
            <Text variant="largeTitle">{highRangeDollars}</Text>
          </Box>

          <Spacer my={1} />

          <Box>
            <Text>Sell-Through Rate</Text>
            <Text variant="largeTitle">{sellThroughRate}</Text>
          </Box>

          <Spacer my={1} />

          <Box>
            <Text>Realized Price/Estimate</Text>
            {/* TODO: Follow-up on how real diffusion number (1.84) maps to designs (184%) */}
            <Text variant="largeTitle">{medianSaleToEstimateRatio * 100}%</Text>
          </Box>
        </Box>
      </Flex>

      <Spacer mt={5} />
      <DemandRank demandRank={demandRank} />
      <Spacer mt={5} />

      <Box>
        <Box>
          <Text>Average Sale Price, 2010–2020</Text>
          <Text variant="largeTitle">{averageSalePrice}</Text>
        </Box>

        <Image
          width={370}
          height="auto"
          // FIXME: Move to vanity.artsy.net
          src="https://user-images.githubusercontent.com/236943/97058779-9a42e700-1543-11eb-808d-654c0b2f7130.png"
        />
      </Box>
    </>
  )
}

const InDemandNowLarge: React.FC<
  ConsignInDemandNowQuery["response"]
> = props => {
  // FIXME: Add skeleton loading state
  if (!props?.marketPriceInsights || !props?.artist) {
    return null
  }

  const {
    artistName,
    averageSalePrice,
    birthday,
    demandRank,
    highRangeDollars,
    lastAuctionResult,
    medianSaleToEstimateRatio,
    nationality,
    sellThroughRate,
  } = computeProps(props)

  return (
    <>
      <Box>
        <Text textAlign={"left"} variant="largeTitle">
          {artistName}
        </Text>
        <Spacer mt={1} />
        <Text variant="text">
          {nationality}, b. {birthday}
        </Text>
        <Flex>
          <BlueChipIcon width={15} height={15} fill="white100" mr={0.3} />{" "}
          <Text variant="small">Blue Chip Representation</Text>
        </Flex>

        <Spacer mt={4} />
      </Box>
      <GridColumns>
        <Column span={[12, 12, 4]}>
          <DemandRank demandRank={demandRank} />

          <Spacer mt={4} />

          <Box>
            <Text>Highest Realized Price</Text>
            <Text variant="largeTitle">{highRangeDollars}</Text>
          </Box>

          <Spacer my={1} />

          <Box>
            <Text>Sell-Through Rate</Text>
            <Text variant="largeTitle">{sellThroughRate}</Text>
          </Box>

          <Spacer my={1} />

          <Box>
            <Text>Realized Price/Estimate</Text>
            {/* TODO: Follow-up on how real diffusion number (1.84) maps to designs (184%) */}
            <Text variant="largeTitle">{medianSaleToEstimateRatio * 100}%</Text>
          </Box>
        </Column>
        <Column span={[12, 12, 4]}>
          <Flex alignItems="center" flexDirection="column">
            <Box>
              <Text>Recent Auction Result</Text>
              <Text variant="largeTitle">
                {lastAuctionResult.priceRealized.display}
              </Text>
            </Box>

            <Box>
              <Image
                src={lastAuctionResult.images.thumbnail.url}
                width={211}
                height="auto"
              />
              <Spacer my={0.5} />
              <Text variant="caption">
                {lastAuctionResult.title}, {lastAuctionResult.dateText}
              </Text>
              <Text variant="caption">{lastAuctionResult.saleDate}</Text>
              <Text variant="caption">{lastAuctionResult.organization}</Text>
            </Box>
          </Flex>
        </Column>
        <Column span={[12, 12, 4]}>
          <Flex flexDirection="column">
            <Box>
              <Text>Average Sale Price, 2010–2020</Text>
              <Text variant="largeTitle">{averageSalePrice}</Text>
            </Box>

            <Image
              width={370}
              height="auto"
              // FIXME: Move to vanity.artsy.net
              src="https://user-images.githubusercontent.com/236943/97058779-9a42e700-1543-11eb-808d-654c0b2f7130.png"
            />
          </Flex>
        </Column>
      </GridColumns>
    </>
  )
}

const Text = styled(BaseText)`
  color: white;
`

const computeProps = ({ artist, marketPriceInsights }) => {
  const {
    artistName,
    demandRank,
    lowRangeCents,
    highRangeCents,
    medianSaleToEstimateRatio,
    sellThroughRate,
  } = marketPriceInsights

  const { birthday, nationality, auctionResultsConnection } = artist
  const lastAuctionResult = auctionResultsConnection?.edges?.[0].node

  // TODO: Follow-up if this maps correctly to Highest Realized Price
  const highRangeDollars = formatCentsToDollars(Number(highRangeCents))
  const averageSalePrice = formatCentsToDollars(
    (Number(lowRangeCents) + Number(highRangeCents)) / 2
  )

  return {
    artistName,
    averageSalePrice,
    birthday,
    demandRank,
    highRangeDollars,
    lastAuctionResult,
    medianSaleToEstimateRatio,
    nationality,
    sellThroughRate,
  }
}
