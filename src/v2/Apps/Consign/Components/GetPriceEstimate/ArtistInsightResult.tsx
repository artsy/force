import React from "react"
import { usePriceEstimateContext } from "./ConsignPriceEstimateContext"
import { formatCentsToDollars } from "../../Utils/formatCentsToDollars"

import { Box, Button, Flex, Image, Spacer, Text, color } from "@artsy/palette"
import styled from "styled-components"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { Media } from "v2/Utils/Responsive"

export const ArtistInsightResult: React.FC = () => {
  const {
    artistInsights,
    isFetching,
    selectedSuggestion,
  } = usePriceEstimateContext()

  if (isFetching) {
    return <LoadingPlaceholder />
  }

  if (!artistInsights?.priceInsights?.edges?.[0]?.node) {
    return <ZeroState />
  }

  const { node } = artistInsights.priceInsights.edges[0]

  // TODO: Look into why we need to coerce these types from mp
  const lowRangeCents: number = Number(node.lowRangeCents)
  const midRangeCents: number = Number(node.midRangeCents)
  const highRangeCents: number = Number(node.highRangeCents)

  const lowEstimateDollars = formatCentsToDollars(lowRangeCents)
  const highEstimateDollars = formatCentsToDollars(highRangeCents)
  const medianEstimateDollars = formatCentsToDollars(midRangeCents)

  const imageUrl = selectedSuggestion?.node?.imageUrl
  const artistSlug = selectedSuggestion?.node?.slug
  const { artistName, medium } = node

  return (
    <Box>
      <Container>
        <Flex flexDirection={["column", "column", "row", "row"]}>
          <Box pr={4} mb={[2, 2, 0]}>
            <Image
              src={imageUrl}
              width={[80, 80, 120]}
              height={[80, 80, 120]}
            />
          </Box>
          <Box>
            <Text
              variant="largeTitle"
              borderBottom={`1px solid ${color("black60")}`}
              pb={0.5}
              mb={2}
            >
              {artistName}
            </Text>
            <Text variant="small" color="black60">
              Based on {medium.toLowerCase()} auction data
            </Text>
            <Text variant="largeTitle">
              {lowEstimateDollars} – {highEstimateDollars}
            </Text>
            <Text variant="text">Median: {medianEstimateDollars}</Text>
          </Box>
        </Flex>

        <Spacer mb={3} />

        <Box>
          <Text>
            An Artsy specialist can provide a custom valuation for your work.
          </Text>
          <Spacer mb={2} />
          <Media greaterThanOrEqual="md">
            <RouterLink to={`/artist/${artistSlug}/auction-results`}>
              <Button width={230} variant="secondaryOutline" mr={2}>
                Explore auction data
              </Button>
            </RouterLink>
            <RouterLink to="/consign/submission">
              <Button width={230}>Get a valuation</Button>
            </RouterLink>
          </Media>
          <Media lessThan="md">
            <RouterLink to="/consign/submission">
              <Button mb={2} width="100%" block size="large">
                Get a valuation
              </Button>
            </RouterLink>
            <Box textAlign="center">
              <RouterLink
                noUnderline
                to={`/artist/${artistSlug}/auction-results`}
              >
                <Text variant="mediumText">Explore auction data</Text>
              </RouterLink>
            </Box>
          </Media>
        </Box>
      </Container>

      <Spacer my={3} />

      <Flex width="100%" justifyContent="center">
        <Text variant="small" color="black60" maxWidth={495}>
          Price estimate is based on 36 months of secondary market data for this
          artist + category combination.
        </Text>
      </Flex>
    </Box>
  )
}

const ZeroState: React.FC = () => {
  const { selectedSuggestion } = usePriceEstimateContext()

  return (
    <Container>
      <Text variant="small" color="black60">
        Price estimate for works by
      </Text>
      <Text
        variant="largeTitle"
        borderBottom={`1px solid ${color("black60")}`}
        pb={0.5}
        mb={2}
      >
        {selectedSuggestion.node.displayLabel}
      </Text>
      <Text variant="small" color="black60">
        Sorry, there isn’t enough secondary market data to provide a price
        estimate for this artist.
      </Text>
      <Spacer mb={3} />
      <Text variant="text">Try searching for another artist.</Text>
    </Container>
  )
}

const Container = styled(Box).attrs({
  width: ["100%", 550],
  p: 3,
})`
  background: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`

const PlaceholderText = styled(Box)`
  background-color: ${color("black10")};
  height: 20px;
  width: 75%;
  margin-bottom: 10px;
`

const LoadingPlaceholder: React.FC = () => {
  return (
    <Container>
      <Box mb={2} height="80px" width="80px" bg="black10" />
      <PlaceholderText />
      <PlaceholderText />
      <PlaceholderText />
    </Container>
  )
}
