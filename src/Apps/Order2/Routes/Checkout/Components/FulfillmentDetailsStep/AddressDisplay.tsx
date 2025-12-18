import { Spacer, Text } from "@artsy/palette"
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
 * Follows US address standards where state and zip are formatted with space (no comma).
 */
export const AddressDisplay: React.FC<AddressDisplayProps> = ({
  address,
  phoneNumber,
  textColor = "mono100",
}) => {
  return (
    <>
      {address.name && (
        <Text variant="sm-display" fontWeight="normal" color={textColor}>
          {address.name}
        </Text>
      )}

      <Spacer y={0.5} />

      {address.addressLine1 && (
        <Text variant="sm" fontWeight="normal" color={textColor}>
          {address.addressLine1}
        </Text>
      )}

      {address.addressLine2 && (
        <Text variant="sm" fontWeight="normal" color={textColor}>
          {address.addressLine2}
        </Text>
      )}

      {(address.city || address.region || address.postalCode) && (
        <Text variant="sm" fontWeight="normal" color={textColor}>
          {(() => {
            const parts: string[] = []
            if (address.city) parts.push(address.city)
            // Format state and zip with space (no comma) per US standards
            if (address.region && address.postalCode) {
              parts.push(`${address.region} ${address.postalCode}`)
            } else {
              if (address.region) parts.push(address.region)
              if (address.postalCode) parts.push(address.postalCode)
            }
            return parts.join(", ")
          })()}
        </Text>
      )}

      {address.country && (
        <Text variant="sm" fontWeight="normal" color={textColor}>
          {countryNameFromAlpha2(address.country)}
        </Text>
      )}

      {phoneNumber && (
        <Text variant="sm" fontWeight="normal" color={textColor}>
          {phoneNumber}
        </Text>
      )}
    </>
  )
}
