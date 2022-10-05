import { Button, Separator, Text } from "@artsy/palette"
import { Media } from "Utils/Responsive"

export const MyCollectionArtworkRequestPriceEstimateSection: React.FC<{}> = () => {
  return (
    <>
      <Separator my={2} />
      <Text mb={0.5} variant="sm-display">
        Get a Free Price Estimate
      </Text>
      <Text mb={2} color="black60">
        This artwork is eligible for a free evaluation from an Artsy specialist.
      </Text>
      <Button variant="primaryBlack" width="100%">
        Request a Price Estimate
      </Button>
      <Media lessThan="sm">
        <Separator my={2} />
      </Media>
    </>
  )
}
