import Yup from "yup"

Yup.addMethod(Yup.string, "present", function (message) {
  return this.test("test-present", message, value => {
    return this.trim().required(message).isValid(value)
  })
})

const address = Yup.object({
  name: Yup.string().present("Name is required"),
  addressLine1: Yup.string().present("Address is required"),
  country: Yup.string().present("Country is required"),
  city: Yup.string().present("City is required"),
  region: Yup.string().present("State is required"),
  postalCode: Yup.string().present("Postal code is required"),
  phoneNumber: Yup.string().present("Telephone is required"),
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
