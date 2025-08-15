import {
  BorderedRadio,
  Clickable,
  Flex,
  RadioGroup,
  Text,
} from "@artsy/palette"
import {
  type ProcessedUserAddress,
  countryNameFromAlpha2,
  deliveryAddressValidationSchema,
} from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/utils"
import { useOrder2UpdateUserAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UpdateUserAddressMutation"
import { formatPhoneNumber } from "Apps/Order2/Utils/addressUtils"
import {
  AddressFormFields,
  type FormikContextWithAddress,
} from "Components/Address/AddressFormFields"
import { Formik, type FormikHelpers, useFormikContext } from "formik"
import { useState } from "react"
import styled from "styled-components"

interface SavedAddressOptionsProps {
  savedAddresses: ProcessedUserAddress[]
  initialSelectedAddress?: ProcessedUserAddress
}
export const SavedAddressOptions = ({
  savedAddresses,
  initialSelectedAddress,
}: SavedAddressOptionsProps) => {
  const formikContext = useFormikContext<FormikContextWithAddress>()
  const useOrder2UpdateUerAddress = useOrder2UpdateUserAddressMutation()

  const [selectedAddressID, setSelectedAddressID] = useState(
    initialSelectedAddress?.internalID || "",
  )

  const [addressFormMode, setAddressFormMode] = useState<{
    mode: "edit"
    address: ProcessedUserAddress
  } | null>(null)

  if (addressFormMode) {
    if (addressFormMode.mode === "edit") {
      return (
        <Formik<FormikContextWithAddress>
          initialValues={addressFormMode.address}
          validationSchema={deliveryAddressValidationSchema}
          onSubmit={async (
            values: FormikContextWithAddress,
            formikHelpers: FormikHelpers<FormikContextWithAddress>,
          ) => {
            console.log("Submitting edited address", values)

            await useOrder2UpdateUerAddress.submitMutation({
              variables: {
                input: {
                  userAddressID: addressFormMode.address.internalID,
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
          }}
        >
          <AddressFormFields withPhoneNumber />
        </Formik>
      )
    }
  }

  return (
    <Flex flexDirection="column">
      <RadioGroup
        defaultValue={initialSelectedAddress}
        onSelect={(processedAddress: ProcessedUserAddress) => {
          formikContext.setValues(processedAddress)
          setSelectedAddressID(processedAddress.internalID)
          // TODO: Somehow handle validation errors that won't be visible on a saved address
        }}
      >
        {savedAddresses.map(processedAddress => {
          const { address, isValid, internalID } = processedAddress
          const isSelected = selectedAddressID === internalID
          const backgroundColor = isSelected ? "mono5" : "mono0"
          const textColor = isSelected ? "mono100" : "mono60"
          return (
            <UnBorderedRadio
              width="100%"
              backgroundColor={backgroundColor}
              key={internalID}
              value={processedAddress}
              flex={0}
              disabled={!isValid}
              alignSelf="center"
              label={
                <Flex flexDirection="column" width="100%" ml={1}>
                  <Flex justifyContent="space-between">
                    {address.name && (
                      <Text variant="sm-display" color={textColor}>
                        {address.name}
                      </Text>
                    )}
                    <Clickable
                      onClick={e => {
                        e.stopPropagation()
                        setAddressFormMode({
                          mode: "edit",
                          address: processedAddress,
                        })
                      }}
                    >
                      <Text variant="xs" fontWeight="normal" color={textColor}>
                        Edit
                      </Text>
                    </Clickable>
                  </Flex>
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
              }
            />
          )
        })}
      </RadioGroup>
    </Flex>
  )
}
const UnBorderedRadio = styled(BorderedRadio)`
  border: 0;
`
