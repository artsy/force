import React from "react"
import {
  Box,
  Flex,
  FlexProps,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { usePriceEstimateContext } from "./ConsignPriceEstimateContext"
import { ArtistInsightResult } from "./ArtistInsightResult"
import { Media } from "v2/Utils/Responsive"

export const EstimateResults: React.FC<FlexProps> = ({ ...rest }) => {
  const { artistInsights, isFetching } = usePriceEstimateContext()

  return (
    <Flex {...rest}>
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
      <ArtworkItem
        image={
          <ResponsiveBox aspectWidth={508} aspectHeight={640} maxWidth="100%">
            <Image
              width="100%"
              height="100%"
              src="https://files.artsy.net/consign/price-estimate-1.jpg"
            />
          </ResponsiveBox>
        }
        artistName="Andy Warhol"
        salePrice="300k"
      />

      <ArtworkItem
        image={
          <ResponsiveBox aspectWidth={640} aspectHeight={473} maxWidth="100%">
            <Image
              width="100%"
              height="100%"
              src="https://files.artsy.net/consign/price-estimate-2.jpg"
            />
          </ResponsiveBox>
        }
        artistName="Katharina Grosse"
        salePrice="220k"
      />

      <ArtworkItem
        image={
          <ResponsiveBox aspectWidth={526} aspectHeight={640} maxWidth="100%">
            <Image
              width="100%"
              height="100%"
              src="https://files.artsy.net/consign/price-estimate-3.jpg"
            />
          </ResponsiveBox>
        }
        artistName="George Condo"
        salePrice="120k"
      />
    </>
  )
}

const ArtworkItem: React.FC<{
  image: JSX.Element
  artistName: string
  salePrice: string
}> = ({ image, artistName, salePrice }) => {
  return (
    <Box flex="1" mx={[0.5, 2]}>
      {image}
      <Spacer my={1} />
      <Text variant="small">{artistName}</Text>
      <Media greaterThanOrEqual="sm">
        <Text variant="small">Average Sale Price:</Text>
      </Media>
      <Media lessThan="sm">
        <Text variant="small">Avg Sale Price:</Text>
      </Media>
      <Text variant="largeTitle">{salePrice}</Text>
    </Box>
  )
}
