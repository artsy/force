import { Button, Checkbox, Flex, Spacer, Text } from "@artsy/palette"
import {
  AddressFormFields,
  addressFormFieldsValidator,
} from "Components/Address/AddressFormFields"
import { Formik, type FormikHelpers, type FormikValues } from "formik"
import type * as React from "react"
import * as yup from "yup"

interface Order2DeliveryFormProps {
  initialValues: FormikValues
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>,
  ) => void
}

const validationSchema = yup.object().shape({
  ...addressFormFieldsValidator({ withPhoneNumber: true }),
  saveAddress: yup.boolean(),
})

export const Order2DeliveryForm: React.FC<Order2DeliveryFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  return (
    <>
      <Text fontWeight="medium" color="mono100" variant="sm-display">
        Delivery address
      </Text>
      <Spacer y={2} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formikContext => (
          <Flex flexDirection={"column"} mb={2}>
            <AddressFormFields withPhoneNumber />
            <Spacer y={2} />
            <Checkbox
              onSelect={selected => {
                formikContext.setFieldValue("saveAddress", selected)
              }}
              selected={formikContext.values.saveAddress}
            >
              <Text variant="xs">Save shipping address for later use</Text>
            </Checkbox>
            <Spacer y={4} />
            <Button type="submit" onClick={() => formikContext.handleSubmit()}>
              See Shipping Methods
            </Button>
          </Flex>
        )}
      </Formik>
    </>
  )
}
