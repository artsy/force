import * as Yup from "yup"
import {
  Button,
  Checkbox,
  Column,
  GridColumns,
  Input,
  Message,
  ModalDialog,
  useToasts,
  VisuallyHidden,
} from "@artsy/palette"
import { Formik, Form } from "formik"
import { FC } from "react"
import { CountrySelect } from "Components/CountrySelect"
import { useAddAddress } from "Apps/Settings/Routes/Shipping/useAddAddress"
import { useEditAddress } from "Apps/Settings/Routes/Shipping/useEditAddress"
import { useSetDefaultAddress } from "Apps/Settings/Routes/Shipping/useSetDefaultAddress"
import { PhoneNumberInput } from "Apps/Consign/Routes/SubmissionFlow/ContactInformation/Components/PhoneNumberInput"
import { getPhoneNumberInformation } from "Apps/Consign/Routes/SubmissionFlow/Utils/phoneNumberUtils"
import { useSystemContext } from "System"

export const INITIAL_ADDRESS = {
  name: "",
  country: "US",
  addressLine1: "",
  addressLine2: "",
  city: "",
  phoneNumber: "",
  phoneNumberCountryCode: "",
  postalCode: "",
  region: "",
}

const INITIAL_VALUES = {
  attributes: INITIAL_ADDRESS,
  isDefault: false,
}

type Address = typeof INITIAL_ADDRESS

const validationSchema = Yup.object().shape({
  attributes: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    country: Yup.string().required("Country is required"),
    addressLine1: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    region: Yup.string().required("Region is required"),
    postalCode: Yup.string().required("Postal Code is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    phoneNumberCountryCode: Yup.string().required("Phone Number is required"),
  }),
  isDefault: Yup.boolean().optional(),
})

interface SettingsShippingAddressFormProps {
  onClose(): void
  address?: {
    internalID: string
    isDefault: boolean
    attributes: Address
  }
}

export const SettingsShippingAddressForm: FC<SettingsShippingAddressFormProps> = ({
  onClose,
  address,
}) => {
  const { submitMutation: submitAddAddress } = useAddAddress()
  const { submitMutation: submitEditAddress } = useEditAddress()
  const { submitMutation: submitSetDefaultAddress } = useSetDefaultAddress()
  const { sendToast } = useToasts()

  // If an address is passed in, we are editing an existing address
  const isEditing = !!address

  const { relayEnvironment } = useSystemContext()

  return (
    <Formik
      validateOnMount
      validationSchema={validationSchema}
      initialValues={address ?? INITIAL_VALUES}
      onSubmit={async ({ isDefault, attributes }, { setStatus, resetForm }) => {
        try {
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
              message: `Address updated successfully.`,
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
        errors,
        touched,
        status,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldError,
        isValid,
        isSubmitting,
        submitForm,
      }) => {
        const handlePhoneNumberChange = async (region, number) => {
          if (region && number && relayEnvironment) {
            const phoneInformation = await getPhoneNumberInformation(
              number,
              relayEnvironment,
              region
            )

            if (!phoneInformation?.isValid) {
              setFieldError(
                "attributes.phoneNumber",
                "Phone Number is required"
              )
              setFieldError(
                "attributes.phoneNumberCountryCode",
                "Phone Number is required"
              )
              return
            }

            setFieldError("attributes.phoneNumber", "")
            setFieldError("attributes.phoneNumberCountryCode", "")

            setFieldValue("attributes.phoneNumber", phoneInformation?.national)
            setFieldValue("attributes.phoneNumberCountryCode", region)
          }
        }

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
              <GridColumns>
                <Column span={12}>
                  <Input
                    name="attributes.name"
                    title="Full Name"
                    placeholder="Enter name"
                    autoComplete="name"
                    autoFocus
                    value={values.attributes.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.attributes?.name && errors.attributes?.name}
                    required
                  />
                </Column>

                <Column span={6}>
                  <CountrySelect
                    title="Country"
                    name="attributes.country"
                    // TODO: Accept a value prop in Select
                    // @ts-ignore
                    value={values.attributes.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.attributes?.country && errors.attributes?.country
                    }
                    required
                  />
                </Column>

                <Column span={6}>
                  <Input
                    name="attributes.postalCode"
                    title="Postal Code"
                    placeholder="Add postal code"
                    autoComplete="postal-code"
                    value={values.attributes.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.attributes?.postalCode &&
                      errors.attributes?.postalCode
                    }
                    required
                  />
                </Column>

                <Column span={6}>
                  <Input
                    name="attributes.addressLine1"
                    title="Address Line 1"
                    placeholder="Add address"
                    autoComplete="address-line1"
                    value={values.attributes.addressLine1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.attributes?.addressLine1 &&
                      errors.attributes?.addressLine1
                    }
                    required
                  />
                </Column>

                <Column span={6}>
                  <Input
                    name="attributes.addressLine2"
                    title="Address Line 2"
                    placeholder="Add address line 2"
                    autoComplete="address-line2"
                    value={values.attributes.addressLine2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.attributes?.addressLine2 &&
                      errors.attributes?.addressLine2
                    }
                  />
                </Column>

                <Column span={6}>
                  <Input
                    name="attributes.city"
                    title="City"
                    placeholder="Enter city"
                    autoComplete="address-level2"
                    value={values.attributes.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.attributes?.city && errors.attributes?.city}
                    required
                  />
                </Column>

                <Column span={6}>
                  <Input
                    name="attributes.region"
                    title="State, Province, or Region"
                    placeholder="Add state, province, or region"
                    autoComplete="address-level1"
                    value={values.attributes.region}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.attributes?.region && errors.attributes?.region
                    }
                    required
                  />
                </Column>

                <Column span={12}>
                  <PhoneNumberInput
                    phoneNumber={{
                      isValid: false,
                      national: values.attributes.phoneNumber,
                      regionCode: values.attributes.phoneNumberCountryCode,
                    }}
                    onChange={handlePhoneNumberChange}
                    inputProps={{
                      maxLength: 25,
                      onBlur: handleBlur("attributes.phoneNumber"),
                      placeholder: "(000) 000 0000",
                    }}
                    error={
                      touched.attributes?.phoneNumber &&
                      errors.attributes?.phoneNumber
                        ? errors.attributes?.phoneNumber
                        : undefined
                    }
                  />
                </Column>

                <Column span={12}>
                  <Checkbox
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
