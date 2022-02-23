import * as Yup from "yup"

declare module "yup" {
  interface StringSchema {
    present: (message: string) => Yup.BooleanSchema
  }
}

Yup.addMethod(Yup.string, "present", function (message) {
  return this.test("test-present", message, value => {
    return this.trim().required(message).isValid(value)
  })
})

const address = Yup.object({
  addressLine1: Yup.string().present("Address is required"),
  city: Yup.string().present("City is required"),
  country: Yup.string().present("Country is required"),
  name: Yup.string().present("Name is required"),
  phoneNumber: Yup.string().present("Telephone is required"),
  postalCode: Yup.string().present("Postal code is required"),
  region: Yup.string().present("State is required"),
})

const agreeToTerms = Yup.bool().oneOf(
  [true],
  "You must agree to the Conditions of Sale"
)

const selectedBid = Yup.string().required()

export const confirmRegistrationValidationSchema = Yup.object().shape({
  agreeToTerms,
})

export const registrationValidationSchema = Yup.object().shape({
  address,
  agreeToTerms,
})

export const biddingValidationSchemas = {
  validationSchemaForRegisteredUsers: Yup.object().shape({
    selectedBid,
  }),
  validationSchemaForUnregisteredUsersWithCreditCard: Yup.object().shape({
    agreeToTerms,
    selectedBid,
  }),
  validationSchemaForUnregisteredUsersWithoutCreditCard: Yup.object().shape({
    address,
    agreeToTerms,
    selectedBid,
  }),
}
