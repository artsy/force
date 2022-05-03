import * as yup from "yup"
import { email } from "v2/Components/Authentication/Validators"
import { FormikErrors, yupToFormErrors } from "formik"

export const artworkDetailsValidationSchema = yup.object().shape({
  artistId: yup
    .string()
    .required(
      "Please select an artist from the list. Other artists cannot be submitted due to limited demand."
    ),
  year: yup.string().required().trim(),
  title: yup.string().required().trim(),
  materials: yup.string().required().trim(),
  rarity: yup
    .string()
    .required()
    .test(
      "isDefault",
      "Rarity field not selected",
      rarity => rarity !== "default"
    ),
  editionNumber: yup.string().when("rarity", {
    is: "limited edition",
    then: yup.string().required().trim(),
  }),
  editionSize: yup.string().when("rarity", {
    is: "limited edition",
    then: yup.string().required().trim(),
  }),
  height: yup.string().required().trim(),
  width: yup.string().required().trim(),
  depth: yup
    .string()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value
    )
    .trim(),
  units: yup.string().required(),
  provenance: yup.string().required().trim(),
  location: yup
    .object()
    .shape({
      city: yup.string().trim().required("Please select a city from the list"),
      state: yup.string(),
      stateCode: yup.string(),
      postalCode: yup.string(),
      country: yup.string(),
      coordinates: yup.array(yup.number()),
    })
    .required(),
  postalCode: yup.string().when("location", {
    is: location =>
      location.countryCode &&
      Object.keys(postalCodeValidators).includes(
        location.countryCode.toUpperCase()
      ),
    then: yup.string().test("isPostalCodeValid", (postalCode, context) => {
      const validor =
        postalCodeValidators[context.parent.location.countryCode.toUpperCase()]

      const isNotEmpty = !!postalCode?.length
      const isMatchRegex = !!postalCode?.trim().match(validor.match)

      return (
        (isNotEmpty && isMatchRegex) ||
        context.createError({ message: validor.errorMessage })
      )
    }),
  }),
})

export const uploadPhotosValidationSchema = yup.object().shape({
  photos: yup
    .array()
    .min(1)
    .transform(fields => fields.filter(c => !c.errorMessage))
    .of(yup.object().test("photos", value => value.assetId)),
})

export const contactInformationValidationSchema = yup.object().shape({
  name: yup.string().label("Name").required().trim(),
  email: email.trim(),
  phone: yup
    .object()
    .label("Phone number")
    .required()
    .test(
      "phone-number",
      "Please enter a valid phone number.",
      value => value.isValid
    ),
})

export const validate = <T>(values: T, validationSchema: yup.AnySchema) => {
  let errors: FormikErrors<T> = {}

  try {
    validationSchema.validateSync(values, {
      abortEarly: false,
    })
  } catch (error) {
    errors = yupToFormErrors(error)
  }

  return errors
}

const defaultPostalCodeValidator = {
  match: /.*\S.*/,
  errorMessage: "Please enter a valid zip/postal code for your region",
}

export const postalCodeValidators = {
  US: {
    match: /^[0-9]{5}$/,
    errorMessage: "Please enter a 5-digit US zip code",
  },
  AT: defaultPostalCodeValidator, // Austria
  BE: defaultPostalCodeValidator, // Belgium
  CA: defaultPostalCodeValidator, // Canada
  CN: defaultPostalCodeValidator, // China
  HR: defaultPostalCodeValidator, // Croatia
  CY: defaultPostalCodeValidator, // Cyprus
  DK: defaultPostalCodeValidator, // Denmark
  EE: defaultPostalCodeValidator, // Estonia
  FI: defaultPostalCodeValidator, // Finland
  FR: defaultPostalCodeValidator, // France
  DE: defaultPostalCodeValidator, // Germany
  GR: defaultPostalCodeValidator, // Greece
  HU: defaultPostalCodeValidator, // Hungary
  IS: defaultPostalCodeValidator, // Iceland
  IL: defaultPostalCodeValidator, // Ireland
  IT: defaultPostalCodeValidator, // Italy
  JP: defaultPostalCodeValidator, // Japan
  LV: defaultPostalCodeValidator, // Latvia
  MC: defaultPostalCodeValidator, // Monaco
  NO: defaultPostalCodeValidator, // Norway
  PL: defaultPostalCodeValidator, // Poland
  PT: defaultPostalCodeValidator, // Portugal
  ES: defaultPostalCodeValidator, // Spain
  SE: defaultPostalCodeValidator, // Sweden
  CH: defaultPostalCodeValidator, // Switzerland
  GB: defaultPostalCodeValidator, // United Kingdom
  NL: defaultPostalCodeValidator, // Netherlands
}
