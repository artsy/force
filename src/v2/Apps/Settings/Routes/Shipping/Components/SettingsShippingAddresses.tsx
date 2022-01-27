import { Button, Column, GridColumns, Message, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { SettingsShippingAddresses_me } from "v2/__generated__/SettingsShippingAddresses_me.graphql"
import { SettingsShippingAddressForm } from "./SettingsShippingAddressForm"
import { SettingsShippingAddressFragmentContainer } from "./SettingsShippingAddress"
import { useMode } from "v2/Utils/Hooks/useMode"

interface SettingsShippingAddressesProps {
  me: SettingsShippingAddresses_me
}

type Mode = "Pending" | "Adding"

export const SettingsShippingAddresses: FC<SettingsShippingAddressesProps> = ({
  me,
}) => {
  const addresses = extractNodes(me.addresses)

  const [mode, setMode] = useMode<Mode>("Pending")

  const handleClick = () => {
    setMode("Adding")
  }

  const handleClose = () => {
    setMode("Pending")
  }

  return (
    <>
      {mode === "Adding" && (
        <SettingsShippingAddressForm onClose={handleClose} />
      )}

      <Text variant="lg" mb={4}>
        Saved Addresses
      </Text>

      {addresses.length === 0 ? (
        <Message variant="info">
          Please add an address for a faster checkout experience in future.
        </Message>
      ) : (
        <GridColumns>
          {addresses.map(address => {
            return (
              <Column key={address.internalID} span={4}>
                <SettingsShippingAddressFragmentContainer address={address} />
              </Column>
            )
          })}
        </GridColumns>
      )}

      <Button mt={4} onClick={handleClick}>
        Add a New Address
      </Button>
    </>
  )
}

export const SettingsShippingAddressesFragmentContainer = createFragmentContainer(
  SettingsShippingAddresses,
  {
    me: graphql`
      fragment SettingsShippingAddresses_me on Me {
        addresses: addressConnection {
          edges {
            node {
              internalID
              ...SettingsShippingAddress_address
            }
          }
        }
      }
    `,
  }
)
