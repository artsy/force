import { Box, Flex, Join, Separator, Text } from "@artsy/palette"
import { AuctionResultMetaData_auctionResult$key } from "__generated__/AuctionResultMetaData_auctionResult.graphql"
import { MyCollectionArtworkDetailField } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkDetailField"
import { graphql, useFragment } from "react-relay"
import { Media } from "Utils/Responsive"

interface AuctionResultMetaDataProps {
  auctionResult: AuctionResultMetaData_auctionResult$key
}

export const AuctionResultMetaData: React.FC<AuctionResultMetaDataProps> = ({
  auctionResult,
}) => {
  const data = useFragment(auctionResultMetaDataFragment, auctionResult)

  const {
    mediumText,
    dimensionText,
    formattedSaleDate,
    organization,
    location,
    saleTitle,
    lotNumber,
    isUpcoming,
    estimate,
  } = data

  return (
    <Box>
      <Media greaterThan="xs">
        {!isUpcoming && (
          <MyCollectionArtworkDetailField
            label="Pre-sale estimate"
            value={estimate?.display}
          />
        )}
        <MyCollectionArtworkDetailField label="Medium" value={mediumText} />
        <MyCollectionArtworkDetailField
          label="Dimensions"
          value={dimensionText}
        />
        <MyCollectionArtworkDetailField
          label="Sale Date"
          value={formattedSaleDate}
        />
        <MyCollectionArtworkDetailField
          label="Auction house"
          value={organization}
        />
        <MyCollectionArtworkDetailField
          label="Sale location"
          value={location}
        />
        <MyCollectionArtworkDetailField label="Sale name" value={saleTitle} />
        <MyCollectionArtworkDetailField label="Lot" value={lotNumber} />
      </Media>

      <Media at="xs">
        <Join separator={<Separator my={1} />}>
          {!isUpcoming && (
            <Field label="Pre-sale estimate" value={estimate?.display} />
          )}
          <Field label="Medium" value={mediumText} />
          <Field label="Dimensions" value={dimensionText} />
          <Field label="Sale Date" value={formattedSaleDate} />
          <Field label="Auction house" value={organization} />
          <Field label="Sale location" value={location} />
          <Field label="Sale name" value={saleTitle} />
          <Field label="Lot" value={lotNumber} />
        </Join>
      </Media>
    </Box>
  )
}

const Field = ({ label, value }) => {
  return (
    <Flex justifyContent="space-between">
      <Text minWidth={128} color="black60" variant="xs">
        {label}
      </Text>

      <Text
        color={value ? "black100" : "black60"}
        variant="xs"
        textAlign="right"
      >
        {value || "----"}
      </Text>
    </Flex>
  )
}

const auctionResultMetaDataFragment = graphql`
  fragment AuctionResultMetaData_auctionResult on AuctionResult {
    mediumText
    dimensionText
    formattedSaleDate: saleDate(format: "MMM DD, YYYY")
    organization
    location
    saleTitle
    lotNumber
    estimate {
      display
    }
    isUpcoming
  }
`
