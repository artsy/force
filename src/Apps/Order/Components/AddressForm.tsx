import { Formik, FormikHelpers, Form } from "formik"
import * as Yup from "yup"
import { Button, Clickable, Checkbox, Flex, Spacer, Text } from "@artsy/palette"
import { useSystemContext } from "System/SystemContext"
import { SavedAddresses_me$data } from "__generated__/SavedAddresses_me.graphql"
import { UpdateUserAddressMutation$data } from "__generated__/UpdateUserAddressMutation.graphql"
import { CreateUserAddressMutation$data } from "__generated__/CreateUserAddressMutation.graphql"
import { updateUserAddress } from "Apps/Order/Mutations/UpdateUserAddress"
import { createUserAddress } from "Apps/Order/Mutations/CreateUserAddress"
import { updateUserDefaultAddress } from "Apps/Order/Mutations/UpdateUserDefaultAddress"
import {
  SavedAddressType,
  convertShippingAddressToMutationInput,
} from "Apps/Order/Utils/shippingUtils"
import { AddressModalFields } from "Components/Address/AddressModalFields"
import {
  PhoneNumberInput,
  validatePhoneNumber,
} from "Components/PhoneNumberInput"

export type FormikFormT = SavedAddressType & {
  phoneNumberCountryCode: string
}

export const INITIAL_ADDRESS = {
  name: "",
  country: "US",
  addressLine1: "",
  addressLine2: "",
  city: "",
  phoneNumber: "",
  phoneNumberCountryCode: "us",
  postalCode: "",
  region: "",
  isDefault: false,
}

const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  country: Yup.string().required("Country is required"),
  addressLine1: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  region: Yup.string().required("Region is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .test({
      name: "phone-number-is-valid",
      message: "Please enter a valid phone number",
      test: (national, context) => {
        return validatePhoneNumber({
          national: `${national}`,
          regionCode: `${context.parent.phoneNumberCountryCode}`,
        })
      },
    }),
  phoneNumberCountryCode: Yup.string().required(
    "Phone Number Country Code is required"
  ),
  isDefault: Yup.boolean().optional(),
})

interface AddressFormProps {
  me: SavedAddresses_me$data
  address?: SavedAddressType
  isCreateAddress: boolean
  onEditOrCreateAddressError: (arg: string) => void
  onEditOrCreateAddressSuccess: (
    address?: UpdateUserAddressMutation$data & CreateUserAddressMutation$data
  ) => void
  setShowDialog: (arg: boolean) => void
}

export const AddressForm: React.FC<AddressFormProps> = ({
  me,
  address,
  isCreateAddress,
  onEditOrCreateAddressError,
  onEditOrCreateAddressSuccess,
  setShowDialog,
}) => {
  const { relayEnvironment } = useSystemContext()
  if (!relayEnvironment) return null

  const getInitialFormValues = () => {
    if (!address) {
      return INITIAL_ADDRESS
    }

    return {
      ...address,
      phoneNumberCountryCode: address?.country?.toLowerCase() || "us",
    }
  }

  return (
    <Formik
      validateOnMount
      validationSchema={VALIDATION_SCHEMA}
      initialValues={getInitialFormValues()}
      onSubmit={(values: FormikFormT, actions: FormikHelpers<FormikFormT>) => {
        actions.setSubmitting(true)

        const handleError = (message: string) => {
          actions.setSubmitting(false)
          onEditOrCreateAddressError(message)
        }

        const handleSuccess = savedAddress => {
          actions.setSubmitting(false)
          // update default address only if isDefault changed or new
          // address marked ad default
          if (values?.isDefault && values?.isDefault !== address?.isDefault) {
            updateUserDefaultAddress(
              relayEnvironment,
              savedAddress?.createUserAddress?.userAddressOrErrors
                ?.internalID || address?.internalID,
              () => {
                onEditOrCreateAddressSuccess(savedAddress)
              },
              handleError
            )
          } else {
            onEditOrCreateAddressSuccess(savedAddress)
          }
        }

        const addressInput = convertShippingAddressToMutationInput(values)

        if (isCreateAddress) {
          createUserAddress(
            relayEnvironment,
            addressInput,
            handleSuccess,
            handleError,
            me
          )
        } else {
          if (address?.internalID) {
            updateUserAddress(
              relayEnvironment,
              address.internalID,
              addressInput,
              handleSuccess,
              handleError
            )
          }
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        isValid,
        isSubmitting,
        submitForm,
      }) => {
        return (
          <Form>
            <AddressModalFields />
            <Spacer y={2} />
            <PhoneNumberInput
              inputProps={{
                name: "phoneNumber",
                onBlur: handleBlur,
                onChange: handleChange,
                placeholder: "(000) 000 0000",
                value: values?.phoneNumber || "",
              }}
              selectProps={{
                name: "phoneNumberCountryCode",
                onBlur: handleBlur,
                selected: values?.phoneNumberCountryCode,
                onSelect: value => {
                  setFieldValue("phoneNumberCountryCode", value)
                },
              }}
              required
              error={touched.phoneNumber && errors.phoneNumber}
            />

            <Spacer y={2} />
            {(!address?.isDefault || isCreateAddress) && (
              <Checkbox
                onSelect={selected => {
                  setFieldValue("isDefault", selected)
                }}
                selected={values?.isDefault}
                data-test="setAsDefault"
              >
                Set as default
              </Checkbox>
            )}
            {!isCreateAddress && (
              <Flex mt={2} flexDirection="column" alignItems="center">
                <Clickable
                  data-test="deleteButton"
                  onClick={() => setShowDialog(true)}
                >
                  <Text variant="xs" color="red100">
                    Delete address
                  </Text>
                </Clickable>
              </Flex>
            )}
            <Button
              data-test="saveButton"
              onClick={submitForm}
              type="submit"
              variant="primaryBlack"
              loading={isSubmitting}
              disabled={!isValid}
              width="100%"
              mt={2}
            >
              Save
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}
