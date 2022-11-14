import {
  Box,
  Clickable,
  Flex,
  Separator,
  Text,
  useToasts,
} from "@artsy/palette"
import { pick } from "lodash"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { compactObject } from "Utils/compactObject"
import { useMode } from "Utils/Hooks/useMode"
import { SettingsShippingAddress_address$data } from "__generated__/SettingsShippingAddress_address.graphql"
import { useDeleteAddress } from "Apps/Settings/Routes/Shipping/useDeleteAddress"
import {
  INITIAL_ADDRESS,
  SettingsShippingAddressForm,
} from "./SettingsShippingAddressForm"

interface SettingsShippingAddressProps {
  address: SettingsShippingAddress_address$data
}

type Mode = "Pending" | "Editing" | "Deleting"

const SettingsShippingAddress: FC<SettingsShippingAddressProps> = ({
  address,
}) => {
  const [mode, setMode] = useMode<Mode>("Pending")
  const { submitMutation } = useDeleteAddress()
  const { sendToast } = useToasts()

  const lines = [
    address.addressLine1,
    address.addressLine2,
    [address.city, address.region, address.country, address.postalCode]
      .filter(Boolean)
      .join(", "),
    address.phoneNumber,
  ].filter(Boolean)

  const handleEdit = () => {
    setMode("Editing")
  }

  const handleDelete = async () => {
    setMode("Deleting")
    try {
      await submitMutation({
        variables: { input: { userAddressID: address.internalID } },
        rejectIf: res => {
          return res.deleteUserAddress?.userAddressOrErrors.errors?.[0].message
        },
      })

      sendToast({
        variant: "success",
        message: "Successfully deleted address.",
      })
    } catch (err) {
      console.error(err)

      const error = Array.isArray(err) ? err[0] : err

      sendToast({
        variant: "error",
        message: "Something went wrong.",
        description: error.message,
      })
    }
  }

  const handleClose = () => {
    setMode("Pending")
  }

  return (
    <>
      {mode === "Editing" && (
        <SettingsShippingAddressForm
          onClose={handleClose}
          address={{
            internalID: address.internalID,
            isDefault: address.isDefault,
            attributes: {
              // Backfill incase missing fields
              ...INITIAL_ADDRESS,
              // Remove null fields; select out only editable fields
              ...compactObject(pick(address, Object.keys(INITIAL_ADDRESS))),
            },
          }}
        />
      )}

      <Box border="1px solid" borderColor="black10" p={2}>
        <Text variant="sm" mb={1}>
          {address.name}
        </Text>

        {lines.map((line, i) => {
          return (
            <Text key={i} variant="sm" color="black60">
              {line}
            </Text>
          )
        })}

        <Separator my={2} />

        <Flex justifyContent="space-between">
          {address.isDefault ? (
            <Text variant="xs">Default Address</Text>
          ) : (
            // Pushes actions to the right
            <div />
          )}

          <Text variant="sm-display" display="flex">
            <Clickable
              mr={1}
              onClick={handleEdit}
              disabled={mode === "Editing"}
            >
              {mode === "Editing" ? "Editing" : "Edit"}
            </Clickable>

            <Clickable
              color="red100"
              onClick={handleDelete}
              disabled={mode === "Deleting"}
            >
              {mode === "Deleting" ? "Deleting" : "Delete"}
            </Clickable>
          </Text>
        </Flex>
      </Box>
    </>
  )
}

export const SettingsShippingAddressFragmentContainer = createFragmentContainer(
  SettingsShippingAddress,
  {
    address: graphql`
      fragment SettingsShippingAddress_address on UserAddress {
        internalID
        addressLine1
        addressLine2
        city
        country
        isDefault
        name
        phoneNumber
        phoneNumberCountryCode
        postalCode
        region
      }
    `,
  }
)
