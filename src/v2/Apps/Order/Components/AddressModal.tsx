import React from "react"
import { Button, Input, Modal, Spacer } from "@artsy/palette"
import {
  convertShippingAddressForExchange,
  convertShippingAddressToMutationInput,
  SavedAddressType,
} from "../Utils/shippingAddressUtils"
import { FormikProps, useFormik } from "formik"
import {
  removeEmptyKeys,
  validateAddress,
  validatePhoneNumber,
} from "../Utils/formValidators"
import { CountrySelect } from "v2/Components/CountrySelect"
import { graphql } from "react-relay"
import { AddressModalMutation } from "v2/__generated__/AddressModalMutation.graphql"
import { CommitMutation } from "../Utils/commitMutation"

interface Props {
  show: boolean
  closeModal: () => void
  address: SavedAddressType
  commitMutation: CommitMutation
  onSuccess: (address) => void
  onError: (message: string) => void
}

const saveAddress = async (
  commitMutation: CommitMutation,
  userAddressID: string,
  values: any,
  closeModal: () => void,
  onSuccess: (address) => void,
  onError: (message: string) => void
) => {
  const useArtrubutes = convertShippingAddressToMutationInput(values)

  const result = await commitMutation<AddressModalMutation>({
    variables: {
      input: {
        userAddressID: userAddressID,
        attributes: useArtrubutes,
      },
    },
    mutation: graphql`
      mutation AddressModalMutation($input: UpdateUserAddressInput!) {
        updateUserAddress(input: $input) {
          userAddressOrErrors {
            ... on UserAddress {
              id
              internalID
              name
              addressLine1
              addressLine2
              isDefault
              phoneNumber
              city
              region
              postalCode
              country
            }
            ... on Errors {
              errors {
                code
                message
              }
            }
          }
        }
      }
    `,
  })
  const errors = result.updateUserAddress.userAddressOrErrors.errors
  if (errors) {
    onError(errors.map(error => error.message).join(", "))
  } else {
    const address = convertShippingAddressForExchange(
      result.updateUserAddress.userAddressOrErrors
    )
    onSuccess(address)
  }
  closeModal()
}

const validateor = (values: any) => {
  const validationResult = validateAddress(values)
  const phoneValidation = validatePhoneNumber(values.phoneNumber)
  const errors = Object.assign({}, validationResult.errors, {
    phoneNumber: phoneValidation.error,
  })
  const errorsTrimmed = removeEmptyKeys(errors)
  return errorsTrimmed
}

export const AddressModal: React.FC<Props> = ({
  show,
  closeModal,
  address,
  commitMutation,
  onSuccess,
  onError,
}) => {
  const formik: FormikProps<SavedAddressType> = useFormik({
    initialValues: address,
    validate: validateor,
    onSubmit: values => {
      saveAddress(
        commitMutation,
        address.internalID,
        values,
        closeModal,
        onSuccess,
        onError
      )
    },
  })
  return (
    <Modal title="Edit address" show={show} onClose={closeModal}>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="name"
          title="Full Name"
          onChange={formik.handleChange}
          error={formik.errors.name}
          value={formik.values.name}
        />
        <Spacer mb={1} />
        <Input
          name="postalCode"
          title="Postal Code"
          onChange={formik.handleChange}
          error={formik.errors.postalCode}
          value={formik.values.postalCode}
        />
        <Spacer mb={1} />
        <Input
          title="Address Line 1"
          name="addressLine1"
          onChange={formik.handleChange}
          error={formik.errors.addressLine1}
          value={formik.values.addressLine1}
        />
        <Spacer mb={1} />
        <Input
          title="Address Line 2"
          name="addressLine2"
          onChange={formik.handleChange}
          error={formik.errors.addressLine2}
          value={formik.values.addressLine2}
        />
        <Spacer mb={1} />
        <Input
          title="City"
          name="city"
          onChange={formik.handleChange}
          error={formik.errors.city}
          value={formik.values.city}
        />
        <Spacer mb={1} />
        <Input
          title="Region"
          name="region"
          onChange={formik.handleChange}
          error={formik.errors.region}
          value={formik.values.region}
        />
        <Spacer mb={1} />
        <CountrySelect
          selected={formik.values.country}
          onSelect={countryCode => {
            formik.setFieldValue("country", countryCode)
          }}
          error={formik.errors.country}
        />
        <Spacer mb={1} />
        <Input
          title="Phone number"
          name="phoneNumber"
          type="tel"
          onChange={formik.handleChange}
          error={formik.errors.phoneNumber}
          value={formik.values.phoneNumber}
        />
        <Button
          type="submit"
          size="large"
          loading={formik.isSubmitting}
          disabled={Object.keys(formik.errors).length > 0}
          width="100%"
          mt={2}
        >
          Save changes
        </Button>
      </form>
    </Modal>
  )
}
