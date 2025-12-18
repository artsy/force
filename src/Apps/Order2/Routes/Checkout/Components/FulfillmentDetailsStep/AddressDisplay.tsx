import { Flex, Spacer, Text } from "@artsy/palette"
import { countryNameFromAlpha2 } from "./utils"

export interface AddressDisplayProps {
  address: {
    name?: string | null
    addressLine1?: string | null
    addressLine2?: string | null
    city?: string | null
    region?: string | null
    postalCode?: string | null
    country?: string | null
  }
  phoneNumber?: string | null
  textColor?: string
}

/**
 * Reusable component for displaying addresses with consistent formatting.
 */
export const AddressDisplay: React.FC<AddressDisplayProps> = ({
  address,
  phoneNumber,
  textColor = "mono100",
}) => {
  const {
    name,
    addressLine1,
    addressLine2,
    city,
    region,
    postalCode,
    country,
  } = address

  return (
    <Flex flexDirection="column">
      {name && (
        <Text variant="sm-display" fontWeight="normal" color={textColor}>
          {name}
        </Text>
      )}

      <Spacer y={0.5} />

      {addressLine1 && (
        <Text variant="sm" fontWeight="normal" color={textColor}>
          {addressLine1}
        </Text>
      )}

      {addressLine2 && (
        <Text variant="sm" fontWeight="normal" color={textColor}>
          {addressLine2}
        </Text>
      )}

      {(city || region || postalCode) && (
        <Text variant="sm" fontWeight="normal" color={textColor}>
          {[city, [region, postalCode].filter(Boolean).join(" ")]
            .filter(Boolean)
            .join(", ")}
        </Text>
      )}

      {country && (
        <Text variant="sm" fontWeight="normal" color={textColor}>
          {countryNameFromAlpha2(country)}
        </Text>
      )}

      {phoneNumber && (
        <Text variant="sm" fontWeight="normal" color={textColor}>
          {phoneNumber}
        </Text>
      )}
    </Flex>
  )
}
