import * as Yup from "yup"

const address = Yup.object({
  name: Yup.string().required("Name is required"),
  country: Yup.string().required("Country is required"),
  addressLine1: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  region: Yup.string().required("Region is required"),
  postalCode: Yup.string().required("Postal Code is required"),
})

const phoneNumber = Yup.string().required("Phone Number is required")

const agreeToTerms = Yup.bool().oneOf(
  [true],
  "You must agree to the Conditions of Sale"
)
const creditCard = Yup.bool().oneOf([true], "")
const selectedBid = Yup.string().required()

export const registrationValidationSchema = Yup.object().shape({
  address,
  agreeToTerms,
  creditCard,
  phoneNumber,
})

export const confirmRegistrationValidationSchemas = {
  withPhoneValidation: Yup.object().shape({
    agreeToTerms,
    phoneNumber,
  }),
  withoutPhoneValidation: Yup.object().shape({
    agreeToTerms,
  }),
}

export const biddingValidationSchemas = {
  validationSchemaForRegisteredUsers: Yup.object().shape({
    selectedBid,
  }),
  validationSchemaForUnregisteredUsersWithCreditCard: Yup.object().shape({
    agreeToTerms,
    selectedBid,
  }),
  validationSchemaForUnregisteredUsersWithoutCreditCard: Yup.object().shape({
    agreeToTerms,
    address,
    creditCard,
    selectedBid,
  }),
}
