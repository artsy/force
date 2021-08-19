import React from "react"
import {
  Box,
  BoxProps,
  Flex,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { usePriceEstimateContext } from "./ConsignPriceEstimateContext"
import { ArtistInsightResult } from "./ArtistInsightResult"

export const EstimateResults: React.FC<BoxProps> = ({ ...rest }) => {
  const { artistInsights, isFetching } = usePriceEstimateContext()

  return (
    <Box display="block" {...rest}>
      {isFetching || artistInsights != null ? (
        <ArtistInsightResult />
      ) : (
        <ArtistInsightExample />
      )}
    </Box>
  )
}

const ArtistInsightExample: React.FC = () => {
  return (
    <Flex>
      <ArtworkItem
        image={
          <ResponsiveBox aspectWidth={508} aspectHeight={640} maxWidth="100%">
            <Image
              lazyLoad
              alt=""
              width="100%"
              height="100%"
              // TODO: Resize these images
              src="https://files.artsy.net/consign/price-estimate-1.jpg"
            />
          </ResponsiveBox>
        }
        artistName="Andy Warhol"
        salePrice="$298k"
      />

      <ArtworkItem
        image={
          <ResponsiveBox aspectWidth={508} aspectHeight={640} maxWidth="100%">
            <Image
              lazyLoad
              alt=""
              width="100%"
              height="100%"
              src="https://files.artsy.net/consign/price-estimate-2.jpg"
            />
          </ResponsiveBox>
        }
        artistName="Yayoi Kusama"
        salePrice="$88k"
      />

      <ArtworkItem
        image={
          <ResponsiveBox aspectWidth={508} aspectHeight={640} maxWidth="100%">
            <Image
              lazyLoad
              alt=""
              width="100%"
              height="100%"
              src="https://files.artsy.net/consign/price-estimate-3.jpg"
            />
          </ResponsiveBox>
        }
        artistName="George Condo"
        salePrice="$260k"
      />
    </Flex>
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
      <Text variant="xs">{artistName}</Text>
      <Text variant="xs">Median:</Text>
      <Text variant={["lg", "xl"]}>{salePrice}</Text>
    </Box>
  )
}
