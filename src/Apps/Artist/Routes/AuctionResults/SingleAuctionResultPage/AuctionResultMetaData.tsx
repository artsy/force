import { Box, Flex, Join, Separator, Text } from "@artsy/palette"
import { AuctionResultMetaData_auctionResult$key } from "__generated__/AuctionResultMetaData_auctionResult.graphql"
import { MetadataField } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSidebar/MyCollectionArtworkSidebarMetadata"
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
          <MetadataField label="Pre-sale estimate" value={estimate?.display} />
        )}
        <MetadataField label="Medium" value={mediumText} />
        <MetadataField label="Dimensions" value={dimensionText} />
        <MetadataField label="Sale Date" value={formattedSaleDate} />
        <MetadataField label="Auction house" value={organization} />
        <MetadataField label="Sale location" value={location} />
        <MetadataField label="Sale name" value={saleTitle} />
        <MetadataField label="Lot" value={lotNumber} />
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
