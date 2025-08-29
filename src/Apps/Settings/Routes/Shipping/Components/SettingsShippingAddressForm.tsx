import {
  Button,
  Checkbox,
  Column,
  GridColumns,
  Message,
  ModalDialog,
  VisuallyHidden,
  useToasts,
} from "@artsy/palette"
import { useAddAddress } from "Apps/Settings/Routes/Shipping/useAddAddress"
import { useEditAddress } from "Apps/Settings/Routes/Shipping/useEditAddress"
import { useSetDefaultAddress } from "Apps/Settings/Routes/Shipping/useSetDefaultAddress"
import { AddressFormFields } from "Components/Address/AddressFormFields"
import {
  richRequiredPhoneValidators,
  yupAddressValidator,
} from "Components/Address/utils"
import { sortCountriesForCountryInput } from "Components/Address/utils/sortCountriesForCountryInput"
import { useInitialLocationValues } from "Components/Address/utils/useInitialLocationValues"
import { countries as countryPhoneOptions } from "Utils/countries"
import { Form, Formik } from "formik"
import type { FC } from "react"
import { useEffect } from "react"
import * as Yup from "yup"

export const INITIAL_ADDRESS = {
  name: "",
  country: "US",
  addressLine1: "",
  addressLine2: "",
  city: "",
  postalCode: "",
  region: "",
  phoneNumber: "",
  phoneNumberCountryCode: "us",
}

const INITIAL_VALUES = {
  address: {
    name: INITIAL_ADDRESS.name,
    country: INITIAL_ADDRESS.country,
    addressLine1: INITIAL_ADDRESS.addressLine1,
    addressLine2: INITIAL_ADDRESS.addressLine2,
    city: INITIAL_ADDRESS.city,
    postalCode: INITIAL_ADDRESS.postalCode,
    region: INITIAL_ADDRESS.region,
  },
  phoneNumber: INITIAL_ADDRESS.phoneNumber,
  phoneNumberCountryCode: INITIAL_ADDRESS.phoneNumberCountryCode,
  isDefault: false,
}

type AddressAttributes = typeof INITIAL_ADDRESS

const VALIDATION_SCHEMA = Yup.object().shape({
  address: yupAddressValidator,
  ...richRequiredPhoneValidators,
  isDefault: Yup.boolean().optional(),
})

interface SettingsShippingAddressFormProps {
  onClose(): void
  address?: {
    internalID: string
    isDefault: boolean
    attributes: AddressAttributes
  }
}

export const SettingsShippingAddressForm: FC<
  React.PropsWithChildren<SettingsShippingAddressFormProps>
> = ({ onClose, address }) => {
  const { submitMutation: submitAddAddress } = useAddAddress()
  const { submitMutation: submitEditAddress } = useEditAddress()
  const { submitMutation: submitSetDefaultAddress } = useSetDefaultAddress()
  const { sendToast } = useToasts()

  const isEditing = !!address
  const countryInputOptions = sortCountriesForCountryInput(countryPhoneOptions)
  const locationBasedInitialValues =
    useInitialLocationValues(countryInputOptions)

  const getInitialValues = () => {
    if (!address) {
      const defaultPhoneCountryCode =
        locationBasedInitialValues.phoneNumberCountryCode || "us"
      return {
        ...INITIAL_VALUES,
        phoneNumberCountryCode: defaultPhoneCountryCode,
      }
    }

    const { phoneNumber, phoneNumberCountryCode, ...addressWithoutPhone } =
      address.attributes

    return {
      isDefault: address.isDefault,
      address: addressWithoutPhone,
      phoneNumber: phoneNumber || "",
      phoneNumberCountryCode:
        phoneNumberCountryCode ||
        locationBasedInitialValues.phoneNumberCountryCode ||
        addressWithoutPhone.country?.toLowerCase() ||
        "us",
    }
  }

  return (
    <Formik
      validateOnMount
      validationSchema={VALIDATION_SCHEMA}
      initialValues={getInitialValues()}
      onSubmit={async (
        {
          isDefault,
          address: addressData,
          phoneNumber,
          phoneNumberCountryCode,
        },
        { setStatus, resetForm },
      ) => {
        try {
          const attributes = {
            ...addressData,
            phoneNumber,
            phoneNumberCountryCode,
          }

          if (isEditing) {
            await submitEditAddress({
              variables: {
                input: { userAddressID: address!.internalID, attributes },
              },
            })

            if (isDefault) {
              await submitSetDefaultAddress({
                variables: {
                  input: { userAddressID: address!.internalID },
                },
              })
            }

            sendToast({
              variant: "success",
              message: "Address updated successfully.",
            })
          } else {
            // Adding new address
            const response = await submitAddAddress({
              variables: { input: { attributes } },
            })
            const id =
              response.createUserAddress?.userAddressOrErrors.internalID

            if (isDefault && id) {
              await submitSetDefaultAddress({
                variables: { input: { userAddressID: id } },
              })
            }

            sendToast({
              variant: "success",
              message: "Address added successfully.",
            })
          }

          resetForm()
          onClose()
        } catch (err) {
          console.error(err)

          const error = Array.isArray(err) ? err[0] : err

          setStatus({ error: true, message: error.message })
        }
      }}
    >
      {({
        values,
        status,
        setFieldValue,
        isValid,
        isSubmitting,
        submitForm,
      }) => {
        useEffect(() => {
          if (
            !isEditing &&
            locationBasedInitialValues.phoneNumberCountryCode &&
            values.phoneNumberCountryCode === "us" &&
            !values.phoneNumber
          ) {
            setFieldValue(
              "phoneNumberCountryCode",
              locationBasedInitialValues.phoneNumberCountryCode,
            )
          }
        }, [
          locationBasedInitialValues.phoneNumberCountryCode,
          isEditing,
          values.phoneNumberCountryCode,
          values.phoneNumber,
          setFieldValue,
        ])

        return (
          <ModalDialog
            title={isEditing ? "Edit Address" : "Add New Address"}
            width={800}
            onClose={onClose}
            footer={
              <Button
                width="100%"
                type="submit"
                disabled={!isValid}
                loading={isSubmitting}
                onClick={submitForm}
              >
                Save
              </Button>
            }
          >
            <Form>
              <AddressFormFields withPhoneNumber />
              <GridColumns>
                <Column span={12}>
                  <Checkbox
                    mt={2}
                    selected={values.isDefault}
                    onSelect={value => {
                      setFieldValue("isDefault", value)
                    }}
                  >
                    Set as Default
                  </Checkbox>
                </Column>

                {status?.error && (
                  <Column span={12}>
                    <Message variant="error">
                      {status.message ||
                        "Something went wrong. Please try again."}
                    </Message>
                  </Column>
                )}

                {/* Modal footer button is outside the form element. Hidden button supports <enter> */}
                <VisuallyHidden>
                  <button type="submit" tabIndex={-1} disabled={!isValid}>
                    Save
                  </button>
                </VisuallyHidden>
              </GridColumns>
            </Form>
          </ModalDialog>
        )
      }}
    </Formik>
  )
}
