import React from "react"
import { Box, Flex, Image, Join, Spacer, Text } from "@artsy/palette"
import { usePriceEstimateContext } from "./ConsignPriceEstimateContext"
import { ArtistInsightResult } from "./ArtistInsightResult"

export const EstimateResults: React.FC = () => {
  const { artistInsights, isFetching } = usePriceEstimateContext()

  return (
    <Flex
      width={["100%", "100%", "100%", "60%"]}
      alignItems="center"
      justifyContent="center"
    >
      {isFetching && <Box>fetching...</Box>}
      {artistInsights ? <ArtistInsightResult /> : <PlaceholderItems />}
    </Flex>
  )
}

const PlaceholderItems: React.FC = () => {
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
