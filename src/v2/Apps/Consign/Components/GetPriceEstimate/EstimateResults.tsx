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
      {isFetching || artistInsights ? (
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
              src="https://files.artsy.net/consign/price-estimate-1.jpg"
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
              src="https://files.artsy.net/consign/price-estimate-2.jpg"
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
              src="https://files.artsy.net/consign/price-estimate-3.jpg"
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
