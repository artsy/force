import * as Yup from "yup"

Yup.addMethod(Yup.string, "present", function (message) {
  return this.test("test-present", message, value => {
    return this.trim().required(message).isValid(value)
  })
})

const address = Yup.object({
  // @ts-ignore
  addressLine1: Yup.string().present("Address is required"),
  // @ts-ignore
  city: Yup.string().present("City is required"),
  // @ts-ignore
  country: Yup.string().present("Country is required"),
  // @ts-ignore
  name: Yup.string().present("Name is required"),
  // @ts-ignore
  phoneNumber: Yup.string().present("Telephone is required"),
  // @ts-ignore
  postalCode: Yup.string().present("Postal code is required"),
  // @ts-ignore
  region: Yup.string().present("State is required"),
})

const agreeToTerms = Yup.bool().oneOf(
  [true],
  "You must agree to the Conditions of Sale"
)

const selectedBid = Yup.string().required()

// `Namespace` is a better way to organize these schemas, but using class and
// static for now as a workaround..
export class Registration {
  static validationSchema = Yup.object().shape({
    address,
    agreeToTerms,
  })
}

export class Bidding {
  static validationSchemaForRegisteredUsers = Yup.object().shape({
    selectedBid,
  })

  static validationSchemaForUnregisteredUsersWithCreditCard = Yup.object().shape(
    {
      agreeToTerms,
      selectedBid,
    }
  )

  static validationSchemaForUnregisteredUsersWithoutCreditCard = Yup.object().shape(
    {
      address,
      agreeToTerms,
      selectedBid,
    }
  )
}
