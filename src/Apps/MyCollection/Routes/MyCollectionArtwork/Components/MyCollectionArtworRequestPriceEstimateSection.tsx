import { Button, Flex, Separator, Text, WinningBidIcon } from "@artsy/palette"
import { useState } from "react"
import { RouterLink } from "System/Router/RouterLink"
import { Media } from "Utils/Responsive"

export const MyCollectionArtworkRequestPriceEstimateSection: React.FC<{}> = () => {
  const [isPriceEstimteRequested, setIsPriceEstimteRequested] = useState<
    boolean
  >(false)
  return (
    <>
      <Separator my={2} />
      {isPriceEstimteRequested ? (
        <Flex alignItems="center" flexDirection={"row"} mb={2} mt={2}>
          <WinningBidIcon />
          <Text variant="sm" ml={0.5}>
            Price estimate request sent
          </Text>
        </Flex>
      ) : (
        <>
          <Text mb={0.5} variant="sm-display">
            Get a Free Price Estimate
          </Text>
          <Text mb={2} color="black60">
            This artwork is eligible for a free evaluation from an Artsy
            specialist.
          </Text>
          <RouterLink
            onClick={() => setIsPriceEstimteRequested(true)}
            to={null}
          >
            <Button variant="primaryBlack" width="100%">
              Request a Price Estimate
            </Button>
          </RouterLink>
        </>
      )}
      <Media lessThan="sm">
        <Separator my={2} />
      </Media>
    </>
  )
}
