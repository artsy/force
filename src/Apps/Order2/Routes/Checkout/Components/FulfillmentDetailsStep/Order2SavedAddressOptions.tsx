import AddIcon from "@artsy/icons/AddIcon"
import {
  BorderedRadio,
  Box,
  Button,
  Clickable,
  Flex,
  Spacer,
  Text,
} from "@artsy/palette"
import {
  type ProcessedUserAddress,
  countryNameFromAlpha2,
  deliveryAddressValidationSchema,
} from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/utils"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useOrder2CreateUserAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2CreateUserAddressMutation"
import { useOrder2UpdateUserAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UpdateUserAddressMutation"
import { formatPhoneNumber } from "Apps/Order2/Utils/addressUtils"
import {
  AddressFormFields,
  type FormikContextWithAddress,
} from "Components/Address/AddressFormFields"
import createLogger from "Utils/logger"
import { Formik, useFormikContext } from "formik"
import { useState } from "react"
import styled from "styled-components"

const logger = createLogger("Order2SavedAddressOptions")

interface SavedAddressOptionsProps {
  savedAddresses: ProcessedUserAddress[]
  initialSelectedAddress?: ProcessedUserAddress
  onSelectAddress: (address: FormikContextWithAddress) => Promise<void>
  newAddressInitialValues: FormikContextWithAddress
}
export const SavedAddressOptions = ({
  savedAddresses,
  initialSelectedAddress,
  onSelectAddress,
  newAddressInitialValues,
}: SavedAddressOptionsProps) => {
  const { setUserAddressMode, userAddressMode } = useCheckoutContext()
  const parentFormikContext = useFormikContext<FormikContextWithAddress>()

  const updateUserAddress = useOrder2UpdateUserAddressMutation()
  const createUserAddress = useOrder2CreateUserAddressMutation()

  const [selectedAddressID, setSelectedAddressID] = useState(
    initialSelectedAddress?.internalID || "",
  )

  if (userAddressMode?.mode === "add") {
    return (
      <Formik
        initialValues={newAddressInitialValues}
        validationSchema={deliveryAddressValidationSchema}
        onSubmit={async (values: FormikContextWithAddress) => {
          try {
            const result = await createUserAddress.submitMutation({
              variables: {
                input: {
                  attributes: {
                    name: values.address.name,
                    addressLine1: values.address.addressLine1,
                    addressLine2: values.address.addressLine2,
                    city: values.address.city,
                    region: values.address.region,
                    postalCode: values.address.postalCode,
                    country: values.address.country,
                    phoneNumber: values.phoneNumber,
                    phoneNumberCountryCode: values.phoneNumberCountryCode,
                  },
                },
              },
            })

            if (result.createUserAddress?.userAddressOrErrors?.internalID) {
              await onSelectAddress(values)
              setSelectedAddressID(
                result.createUserAddress?.userAddressOrErrors.internalID,
              )
              setUserAddressMode(null)
              return
            }

            if (result.createUserAddress?.userAddressOrErrors?.errors) {
              throw new Error(
                `Failed to create address: ${JSON.stringify(
                  result.createUserAddress.userAddressOrErrors.errors,
                )}`,
              )
            }
            throw new Error("Failed to create address: Unknown error")
          } catch (error) {
            logger.error("Error creating address:", error)
          }
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <>
            <AddressFormFields withPhoneNumber />
            <Spacer y={4} />
            <Button
              width="100%"
              type="submit"
              loading={isSubmitting}
              onClick={() => handleSubmit()}
            >
              Add Address
            </Button>
            <Spacer y={1} />
            <Button
              width="100%"
              variant="secondaryBlack"
              onClick={() => setUserAddressMode(null)}
            >
              Cancel
            </Button>
          </>
        )}
      </Formik>
    )
  }

  if (userAddressMode?.mode === "edit") {
    return (
      <Formik
        initialValues={userAddressMode.address}
        validationSchema={deliveryAddressValidationSchema}
        onSubmit={async (values: FormikContextWithAddress) => {
          try {
            const result = await updateUserAddress.submitMutation({
              variables: {
                input: {
                  userAddressID: userAddressMode.address.internalID,
                  attributes: {
                    name: values.address.name,
                    addressLine1: values.address.addressLine1,
                    addressLine2: values.address.addressLine2,
                    city: values.address.city,
                    region: values.address.region,
                    postalCode: values.address.postalCode,
                    country: values.address.country,
                    phoneNumber: values.phoneNumber,
                    phoneNumberCountryCode: values.phoneNumberCountryCode,
                  },
                },
              },
            })

            if (result.updateUserAddress?.userAddressOrErrors?.internalID) {
              await onSelectAddress(values)
              setSelectedAddressID(
                result.updateUserAddress?.userAddressOrErrors.internalID,
              )
              setUserAddressMode(null)
              return
            }

            if (result.updateUserAddress?.userAddressOrErrors?.errors) {
              throw new Error(
                `Failed to update address: ${JSON.stringify(
                  result.updateUserAddress.userAddressOrErrors.errors,
                )}`,
              )
            }
            throw new Error("Failed to update address: Unknown error")
          } catch (error) {
            logger.error("Error updating address:", error)
          }
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <>
            <AddressFormFields withPhoneNumber />
            <Spacer y={4} />
            <Button
              width="100%"
              type="submit"
              loading={isSubmitting}
              onClick={() => handleSubmit()}
            >
              Save Address
            </Button>
            <Spacer y={1} />
            <Button
              width="100%"
              variant="secondaryBlack"
              onClick={() => setUserAddressMode(null)}
            >
              Cancel
            </Button>
          </>
        )}
      </Formik>
    )
  }

  return (
    <Flex flexDirection="column">
      {savedAddresses.map(processedAddress => {
        const { address, isValid, internalID } = processedAddress
        const isSelected = selectedAddressID === internalID
        const backgroundColor = isSelected ? "mono5" : "mono0"
        const textColor = isSelected ? "mono100" : "mono60"

        return (
          <Box key={internalID} position="relative">
            <UnBorderedRadio
              width="100%"
              backgroundColor={backgroundColor}
              value={internalID}
              flex={0}
              disabled={!isValid}
              alignSelf="center"
              selected={isSelected}
              onClick={async () => {
                setSelectedAddressID(internalID)
                await onSelectAddress(processedAddress)
              }}
              label={<Text variant="sm-display">{address.name || ""}</Text>}
            >
              <Flex flexDirection="column" width="100%" ml={0.4}>
                {address.addressLine1 && (
                  <Text variant="xs" fontWeight="normal" color={textColor}>
                    {address.addressLine1}
                  </Text>
                )}
                {address.addressLine2 && (
                  <Text variant="xs" fontWeight="normal" color={textColor}>
                    {address.addressLine2}
                  </Text>
                )}
                {(address.city || address.region || address.postalCode) && (
                  <Text variant="xs" fontWeight="normal" color={textColor}>
                    {[address.city, address.region, address.postalCode]
                      .filter(Boolean)
                      .join(", ")}
                  </Text>
                )}
                {address.country && (
                  <Text variant="xs" fontWeight="normal" color={textColor}>
                    {countryNameFromAlpha2(address.country)}
                  </Text>
                )}

                {address.phoneNumber && (
                  <Text variant="xs" fontWeight="normal" color={textColor}>
                    {formatPhoneNumber(address)}
                  </Text>
                )}
              </Flex>
            </UnBorderedRadio>
            <Clickable
              position="absolute"
              top={2}
              right={2}
              onClick={async () => {
                setUserAddressMode({
                  mode: "edit",
                  address: processedAddress,
                })
              }}
            >
              <Text variant="xs" fontWeight="normal" color={textColor}>
                Edit
              </Text>
            </Clickable>
          </Box>
        )
      })}
      <Spacer y={2} />
      <Clickable onClick={() => setUserAddressMode({ mode: "add" })}>
        <Text>
          <AddIcon display="inline-block" py="4px" />
          Add new address
        </Text>
      </Clickable>
      <Spacer y={4} />
      <Button
        type="submit"
        loading={parentFormikContext.isSubmitting}
        onClick={() => parentFormikContext.handleSubmit()}
      >
        See Shipping Methods
      </Button>
    </Flex>
  )
}
const UnBorderedRadio = styled(BorderedRadio)`
  border: 0;
`
