import React from "react"
import { Box, Flex, Image, Join, Spacer, Text, color } from "@artsy/palette"
import { usePriceEstimateContext } from "./ConsignPriceEstimateContext"
import { ArtistInsightResult } from "./ArtistInsightResult"
import styled from "styled-components"

export const EstimateResults: React.FC = () => {
  const { artistInsights, isFetching } = usePriceEstimateContext()

  return (
    <Flex
      width={["100%", "100%", "100%", "60%"]}
      alignItems="center"
      justifyContent="center"
    >
      {isFetching ? (
        <LoadingPlaceholderItems />
      ) : artistInsights ? (
        <ArtistInsightResult />
      ) : (
        <ArtistInsightExample />
      )}
    </Flex>
  )
}

const ArtistInsightExample: React.FC = () => {
  return (
    <>
      <Join separator={<Spacer mr={5} />}>
        <ArtworkItem
          image={
            <Image
              width={165}
              height="auto"
              src="https://d32dm0rphc51dk.cloudfront.net/3mOXPUFZdK7G6kejFVBSbA/large.jpg"
            />
          }
          artistName="Andy Warhol"
          salePrice="300k"
        />

        <ArtworkItem
          image={
            <Image
              width={200}
              height="auto"
              src="https://d32dm0rphc51dk.cloudfront.net/rc-gsfGM9zs2aDXTKY9pOg/large.jpg"
            />
          }
          artistName="Katharina Grosse"
          salePrice="220k"
        />

        <ArtworkItem
          image={
            <Image
              width={163}
              height="auto"
              src="https://d32dm0rphc51dk.cloudfront.net/_5zMF8NB0M49MMqCqVBcSg/large.jpg"
            />
          }
          artistName="George Condo"
          salePrice="120k"
        />
      </Join>
    </>
  )
}

const ArtworkItem: React.FC<{
  image: JSX.Element
  artistName: string
  salePrice: string
}> = ({ image, artistName, salePrice }) => {
  return (
    <Box>
      {image}
      <Spacer my={1} />
      <Text variant="small">{artistName}</Text>
      <Text variant="small">Average Sale Price:</Text>
      <Text variant="largeTitle">{salePrice}</Text>
    </Box>
  )
}

const PlaceholderText = styled(Box)`
  background-color: ${color("black10")}
  height: 20px
  width: 75%
  margin-bottom: 10px
`

const LoadingPlaceholderItems: React.FC = () => {
  return (
    <Box height="100%" width="100%">
      <Box mb={2} height="80px" width="80px" bg="black10" />
      <PlaceholderText />
      <PlaceholderText />
      <PlaceholderText />
    </Box>
  )
}
