import * as Yup from "yup"
import { initAddress, initAddressWithPhone } from "./initialValues"

function present(message: string) {
  return this.test("test-present", message, value => {
    return this.trim().required(message).isValid(value)
  })
}

Yup.addMethod(Yup.string, "present", present)

type YupStringWithExtension = typeof Yup.string & {
  present: typeof present
}

const yupStringWithExtension = () => {
  return (Yup.string() as unknown) as YupStringWithExtension
}

const yupStringWithCountryCondition = (message: string) => {
  return Yup.string().when("country", {
    is: country => ["US", "CA"].includes(country),
    then: yupStringWithExtension().present(message),
  })
}

const address = Yup.object({
  addressLine1: yupStringWithExtension().present("Address is required"),
  addressLine2: Yup.string(),
  addressLine3: Yup.string().nullable(),
  city: yupStringWithExtension().present("City is required"),
  country: yupStringWithExtension().present("Country is required"),
  name: yupStringWithExtension().present("Name is required"),
  postalCode: yupStringWithCountryCondition("Postal code is required"),
  region: yupStringWithCountryCondition("State is required"),
})
const addressWithPhone = address.clone().shape({
  phoneNumber: yupStringWithExtension()
    .present("Telephone is required")
    .matches(/[^a-z]+/, "Please enter a valid phone number"),
})
const agreeToTerms = Yup.bool().oneOf(
  [true],
  "You must agree to the Conditions of Sale"
)
const creditCard = Yup.string()
const selectedBid = Yup.string().required()

export const validationSchema = {
  address,
  addressWithPhone,
  agreeToTerms,
  creditCard,
  selectedBid,
}

export type BillingInfoFormKeys = keyof typeof validationSchema

export type BillingInfoFormValues = {
  [Key in BillingInfoFormKeys]: any
}

type AddressForm = {
  [key in BillingInfoFormKeys]: {
    formName: BillingInfoFormKeys
    initialValues?: unknown
    schema: Yup.AnySchema
  }
}

const addressForm: AddressForm = {
  address: {
    formName: "address",
    initialValues: initAddress,
    schema: validationSchema.address,
  },
  addressWithPhone: {
    formName: "address",
    initialValues: initAddressWithPhone,
    schema: validationSchema.addressWithPhone,
  },
  creditCard: {
    formName: "creditCard",
    schema: validationSchema.creditCard,
  },
  selectedBid: {
    formName: "selectedBid",
    schema: validationSchema.selectedBid,
  },
  agreeToTerms: {
    formName: "agreeToTerms",
    initialValues: false,
    schema: validationSchema.agreeToTerms,
  },
}

export function composeBillingInfoForm(
  keys: BillingInfoFormKeys[]
): {
  values: BillingInfoFormValues
  schema: Yup.AnyObjectSchema
} {
  const values = {} as BillingInfoFormValues
  const validations = {} as Record<BillingInfoFormKeys, Yup.AnySchema>

  keys.map(key => {
    const formName = addressForm[key].formName
    values[formName] = addressForm[key].initialValues
    validations[formName] = addressForm[key].schema
  })

  const schema = Yup.object(validations).pick(
    Object.keys(validations) as BillingInfoFormKeys[]
  )

  return {
    values,
    schema,
  }
}
