import { Button, Flex, Input, Spacer } from "@artsy/palette"
import type { AddressFormValues } from "Apps/Invoice/Components/AddressFormWithCreditCard"
import {
  AddressFormFields,
  addressFormFieldsValidator,
} from "Components/Address/AddressFormFields"
import type { Address } from "Components/Address/utils"
import { Formik, type FormikHelpers, type FormikValues } from "formik"
import { useState } from "react"
import * as yup from "yup"
export default {
  title: "Address/AddressFormFields",
  parameters: {
    layout: "fullscreen",
  },
}

interface ExampleFormValues extends AddressFormValues {
  address: Address
  phoneNumber?: string
  phoneNumberCountryCode?: string
  score: number
}

export const WithRichPhoneInput = () => {
  const [values, setValues] = useState<ExampleFormValues | null>(null)
  const validationSchema = yup.object().shape({
    ...addressFormFieldsValidator({ withPhoneNumber: true }),
    score: yup.number().required("Score is required"),
  })

  return (
    <Flex flexDirection={"column"} p={4} width={["100%", 600]}>
      <Formik<ExampleFormValues>
        validationSchema={validationSchema}
        initialValues={{
          address: {
            name: "",
            country: "",
            postalCode: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            region: "",
          },
          phoneNumber: "",
          score: 0,
        }}
        onSubmit={values => {
          setValues(values)
        }}
      >
        {({ handleSubmit }) => (
          <Flex flexDirection={"column"}>
            <AddressFormFields<ExampleFormValues> withPhoneNumber />
            <Spacer y={1} />
            <Input type="number" name="score" placeholder="Score" />
            <Spacer y={2} />
            <Button onClick={() => handleSubmit()} type="submit">
              Submit
            </Button>
          </Flex>
        )}
      </Formik>
      <Flex mt={4}>
        {values && <pre>Values: {JSON.stringify(values, null, 2)}</pre>}
      </Flex>
    </Flex>
  )
}
export const WithoutPhoneInput = () => {
  const [values, setValues] = useState<ExampleFormValues | null>(null)
  const validationSchema = yup.object().shape({
    ...addressFormFieldsValidator({ withLegacyPhoneInput: false }),
    score: yup.number().required("Score is required"),
  })

  return (
    <Flex flexDirection={"column"} p={4} width={["100%", 600]}>
      <Formik<ExampleFormValues>
        validationSchema={validationSchema}
        initialValues={{
          address: {
            name: "",
            country: "",
            postalCode: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            region: "",
            phoneNumber: "",
          },
          score: 0,
        }}
        onSubmit={values => {
          setValues(values)
        }}
      >
        {({ handleSubmit }) => (
          <Flex flexDirection={"column"}>
            <AddressFormFields<ExampleFormValues> />
            <Spacer y={1} />
            <Input type="number" name="score" placeholder="Score" />
            <Spacer y={2} />
            <Button onClick={() => handleSubmit()} type="submit">
              Submit
            </Button>
          </Flex>
        )}
      </Formik>
      <Flex mt={4}>
        {values && <pre>Values: {JSON.stringify(values, null, 2)}</pre>}
      </Flex>
    </Flex>
  )
}

export const WithLegacyPhoneInput = () => {
  const [values, setValues] = useState<ExampleFormValues | null>(null)
  const validationSchema = yup.object().shape({
    ...addressFormFieldsValidator({ withLegacyPhoneInput: true }),
    score: yup.number().required("Score is required"),
  })

  return (
    <Flex flexDirection={"column"} p={4} width={["100%", 600]}>
      <Formik<ExampleFormValues>
        validationSchema={validationSchema}
        initialValues={{
          address: {
            name: "",
            country: "",
            postalCode: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            region: "",
            phoneNumber: "",
          },
          score: 0,
        }}
        onSubmit={values => {
          setValues(values)
        }}
      >
        {({ handleSubmit }) => (
          <Flex flexDirection={"column"}>
            <AddressFormFields<ExampleFormValues> withLegacyPhoneInput />
            <Spacer y={1} />
            <Input type="number" name="score" placeholder="Score" />
            <Spacer y={2} />
            <Button onClick={() => handleSubmit()} type="submit">
              Submit
            </Button>
          </Flex>
        )}
      </Formik>
      <Flex mt={4}>
        {values && <pre>Values: {JSON.stringify(values, null, 2)}</pre>}
      </Flex>
    </Flex>
  )
}
