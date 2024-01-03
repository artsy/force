import { useEffect, useState } from "react"
import * as React from "react"
import {
  Button,
  Clickable,
  Checkbox,
  Flex,
  Input,
  ModalDialog,
  Spacer,
  Text,
  Banner,
  GridColumns,
  Column,
} from "@artsy/palette"

import { Form, useFormikContext } from "formik"
import { AddressModalFields } from "Components/Address/AddressModalFields"

import {
  FulfillmentValues,
  ShipValues,
  addressWithFallbackValues,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import createLogger from "Utils/logger"
import { useDeleteSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useDeleteSavedAddress"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { usePrevious } from "Utils/Hooks/usePrevious"
import { CountrySelect } from "Components/CountrySelect"

export interface AddressModalProps {
  closeModal: () => void
  onSuccess: (addressID: string) => void
}

export const AddressModal: React.FC<AddressModalProps> = ({ closeModal }) => {
  const logger = createLogger("AddressModal2.tsx")
  const shippingContext = useShippingContext()
  const formikContext = useFormikContext<ShipValues>()
  const { touched, errors, values } = formikContext

  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

  const deleteSavedAddress = useDeleteSavedAddress().submitMutation

  const addressModalAction = shippingContext.state.addressModalAction

  const previousAddressModalAction = usePrevious(addressModalAction)
  useEffect(() => {
    if (
      !addressModalAction ||
      previousAddressModalAction === addressModalAction
    ) {
      return
    }
    if (addressModalAction?.type === "edit") {
      formikContext.setFieldValue("attributes", {
        ...addressWithFallbackValues(
          shippingContext.meData.addressList.find(
            a => a.internalID === addressModalAction.addressID
          )
        ),
      })
    } else {
      formikContext.setFieldValue("attributes", addressWithFallbackValues({}))
    }
  }, [
    addressModalAction,
    formikContext,
    previousAddressModalAction,
    shippingContext.meData.addressList,
  ])

  if (!addressModalAction) {
    return null
  }

  const savedAddress =
    (addressModalAction.type === "edit" &&
      shippingContext.meData.addressList.find(
        a => a.internalID === addressModalAction.addressID
      )) ||
    undefined

  const handleDeleteAddress = async () => {
    if (addressModalAction?.type === "edit") {
      try {
        shippingContext.actions.setIsPerformingOperation(true)
        setShowDeleteDialog(false)
        closeModal()
        await deleteSavedAddress({
          variables: { input: { userAddressID: addressModalAction.addressID } },
        })
      } catch (error) {
        logger.error(error)
      } finally {
        shippingContext.actions.setIsPerformingOperation(false)
      }
    }
  }

  const title =
    addressModalAction.type === "create" ? "Add address" : "Edit address"

  const handleModalClose = () => {
    closeModal()
    formikContext.setStatus({
      ...formikContext.status,
      gravityAddressError: null,
    })
  }

  return (
    <>
      <ModalDialog title={title} onClose={handleModalClose} width={900}>
        <Form data-testid="AddressModal">
          {formikContext.status.gravityAddressError && (
            <Banner my={2} data-testid="form-banner-error" variant="error">
              {formikContext.status.gravityAddressError}
            </Banner>
          )}

          <GridColumns mt={[1, 2]}>
            <Column span={12}>
              <Input
                title="Full name"
                placeholder="Full name"
                id="name"
                name="attributes.name"
                type="text"
                onChange={formikContext.handleChange}
                onBlur={formikContext.handleBlur}
                error={
                  formikContext.touched.attributes?.name &&
                  formikContext.errors.attributes?.name
                }
                value={values.attributes.name || undefined}
              />
            </Column>
            <Column span={12}>
              <CountrySelect
                title="Country"
                selected={values.attributes.country}
                onSelect={countryCode => {
                  formikContext.setFieldValue("attributes.country", countryCode)
                }}
                error={
                  touched.attributes?.country && errors.attributes?.country
                }
              />
            </Column>
            <Column span={12}>
              <Input
                title="Address Line 1"
                placeholder="Street address"
                name="attributes.addressLine1"
                onChange={formikContext.handleChange}
                onBlur={formikContext.handleBlur}
                error={
                  touched.attributes?.addressLine1 &&
                  errors.attributes?.addressLine1
                }
                value={values.attributes.addressLine1}
              />
            </Column>
            <Column span={12}>
              <Input
                title="Address Line 2"
                placeholder="Apt, floor, suite, etc. (optional)"
                name="attributes.addressLine2"
                onChange={formikContext.handleChange}
                onBlur={formikContext.handleBlur}
                error={
                  touched.attributes?.addressLine2 &&
                  errors.attributes?.addressLine2
                }
                value={values.attributes.addressLine2}
              />
            </Column>
            <Column span={12}>
              <Input
                title="City"
                placeholder="City"
                name="attributes.city"
                onChange={formikContext.handleChange}
                onBlur={formikContext.handleBlur}
                error={touched.attributes?.city && errors.attributes?.city}
                value={values.attributes.city}
              />
            </Column>
            <Column span={6}>
              <Input
                title="State, province, or region"
                placeholder="State, province, or region"
                name="attributes.region"
                onChange={formikContext.handleChange}
                onBlur={formikContext.handleBlur}
                error={touched.attributes?.region && errors.attributes?.region}
                value={values.attributes.region}
              />
            </Column>
            <Column span={6}>
              <Input
                title="Postal Code"
                placeholder="ZIP/Postal code"
                name="attributes.postalCode"
                onChange={formikContext.handleChange}
                onBlur={formikContext.handleBlur}
                error={
                  touched.attributes?.postalCode &&
                  errors.attributes?.postalCode
                }
                value={values.attributes.postalCode}
              />
            </Column>
          </GridColumns>

          <Spacer y={2} />

          <Input
            title="Phone number"
            description="Required for shipping logistics"
            placeholder="Add phone number"
            name="attributes.phoneNumber"
            type="tel"
            onChange={formikContext.handleChange}
            onBlur={formikContext.handleBlur}
            error={
              formikContext.touched?.attributes?.phoneNumber &&
              formikContext.errors?.attributes?.phoneNumber
            }
            value={formikContext.values.attributes.phoneNumber || ""}
            data-testid="phoneInputWithoutValidationFlag"
          />

          <Spacer y={2} />

          {!savedAddress?.isDefault && (
            <Checkbox
              onSelect={selected => {
                formikContext.setFieldValue(
                  "meta.setAddressAsDefault",
                  selected
                )
              }}
              selected={formikContext.values.meta.setAddressAsDefault}
              data-testid="setAsDefault"
            >
              Set as default
            </Checkbox>
          )}

          {addressModalAction.type === "edit" && (
            <Flex mt={2} flexDirection="column" alignItems="center">
              <Clickable
                data-testid="deleteButton"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Text variant="xs" color="red100">
                  Delete address
                </Text>
              </Clickable>
            </Flex>
          )}

          <Button
            data-testid="saveButton"
            type="submit"
            variant="primaryBlack"
            loading={formikContext.isSubmitting || undefined}
            disabled={Object.keys(formikContext.errors).length > 0}
            width="100%"
            mt={2}
          >
            Save
          </Button>
        </Form>
      </ModalDialog>

      {showDeleteDialog && (
        <ModalDialog
          data-testid="deleteAddressDialog"
          title="Delete address?"
          onClose={() => setShowDeleteDialog(false)}
          width="350px"
        >
          <Text variant="xs">
            This will remove this address from your saved addressess.
          </Text>

          <Spacer y={2} />

          <Flex justifyContent="flex-end">
            <Button
              variant="secondaryNeutral"
              size="small"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>

            <Spacer x={1} />

            <Button size="small" onClick={handleDeleteAddress}>
              Delete
            </Button>
          </Flex>
        </ModalDialog>
      )}
    </>
  )
}
