import {
  Button,
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
import * as Yup from "yup"

const DEFAULT_PHONE_COUNTRY_CODE = "us"

export const INITIAL_ADDRESS = {
  name: "",
  country: DEFAULT_PHONE_COUNTRY_CODE.toUpperCase(),
  addressLine1: "",
  addressLine2: "",
  city: "",
  postalCode: "",
  region: "",
  phoneNumber: "",
  phoneNumberCountryCode: DEFAULT_PHONE_COUNTRY_CODE,
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
  setAsDefault: false,
}

type AddressAttributes = typeof INITIAL_ADDRESS

const VALIDATION_SCHEMA = Yup.object().shape({
  address: yupAddressValidator,
  ...richRequiredPhoneValidators,
  setAsDefault: Yup.boolean().optional(),
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
        locationBasedInitialValues.phoneNumberCountryCode ||
        DEFAULT_PHONE_COUNTRY_CODE
      return {
        ...INITIAL_VALUES,
        phoneNumberCountryCode: defaultPhoneCountryCode,
      }
    }

    const { phoneNumber, phoneNumberCountryCode, ...addressWithoutPhone } =
      address.attributes

    return {
      setAsDefault: address.isDefault,
      address: addressWithoutPhone,
      phoneNumber: phoneNumber || "",
      phoneNumberCountryCode:
        phoneNumberCountryCode ||
        locationBasedInitialValues.phoneNumberCountryCode ||
        addressWithoutPhone.country?.toLowerCase() ||
        DEFAULT_PHONE_COUNTRY_CODE,
    }
  }

  return (
    <Formik
      validateOnMount
      enableReinitialize={true}
      validationSchema={VALIDATION_SCHEMA}
      initialValues={getInitialValues()}
      onSubmit={async (
        {
          setAsDefault,
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

            if (setAsDefault) {
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

            if (setAsDefault && id) {
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
      {({ status, isValid, isSubmitting, submitForm }) => {
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
              <AddressFormFields
                withPhoneNumber
                withSetAsDefault={!address?.isDefault}
              />
              {status?.error && (
                <GridColumns>
                  <Column span={12}>
                    <Message variant="error">
                      {status.message ||
                        "Something went wrong. Please try again."}
                    </Message>
                  </Column>
                </GridColumns>
              )}

              {/* Modal footer button is outside the form element. Hidden button supports <enter> */}
              <VisuallyHidden>
                <button type="submit" tabIndex={-1} disabled={!isValid}>
                  Save
                </button>
              </VisuallyHidden>
            </Form>
          </ModalDialog>
        )
      }}
    </Formik>
  )
}
