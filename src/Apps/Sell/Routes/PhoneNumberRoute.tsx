import { compact } from "lodash"
import { countries } from "Utils/countries"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { Formik } from "formik"
import { graphql, useFragment } from "react-relay"
import { Join, PhoneInput, Spacer, Text } from "@artsy/palette"
import { PhoneNumberRoute_me$key } from "__generated__/PhoneNumberRoute_me.graphql"
import { PhoneNumberRoute_submission$key } from "__generated__/PhoneNumberRoute_submission.graphql"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import * as React from "react"
import * as Yup from "yup"

const FRAGMENT = graphql`
  fragment PhoneNumberRoute_submission on ConsignmentSubmission {
    userPhone
  }
`

const FRAGMENT_ME = graphql`
  fragment PhoneNumberRoute_me on Me {
    internalID
    phoneNumber {
      countryCode
      regionCode
      display(format: NATIONAL)
      originalNumber
    }
  }
`

const Schema = Yup.object().shape({
  phoneNumber: Yup.string().trim(),
})

interface FormValues {
  userPhone: string
  phoneNumberCountryCode: string
}

interface PhoneNumberRouteProps {
  submission: PhoneNumberRoute_submission$key
  me: PhoneNumberRoute_me$key
}

// TODO: rename userPhone to phoneNumber
export const PhoneNumberRoute: React.FC<PhoneNumberRouteProps> = props => {
  const submission = useFragment(FRAGMENT, props.submission)
  const me = useFragment(FRAGMENT_ME, props.me)

  const { actions } = useSellFlowContext()

  const onSubmit = async (values: FormValues) => {
    let countryObject = countries.find(
      item => item.value === values.phoneNumberCountryCode
    )

    const phoneNumberInternational = `+${
      countryObject?.countryCode
    } ${values.userPhone.trim()}`

    const updatedValues = {
      userPhone: phoneNumberInternational,
    }

    return actions.updateSubmission(updatedValues)
  }

  // parse the phone number saved with the submission
  const {
    countryCode1: submissionCountryCode,
    phoneNumber: submissionPhoneNumber,
  } = cleanUserPhoneNumber(submission.userPhone ?? "")

  // parse the phone number originalNumber phone number
  const {
    countryCode1: meCountryCode,
    phoneNumber: myPhoneNumber,
  } = cleanUserPhoneNumber(me.phoneNumber?.originalNumber ?? "")

  const initialValues: FormValues = {
    userPhone:
      submissionPhoneNumber ?? me.phoneNumber?.display ?? myPhoneNumber ?? "",
    phoneNumberCountryCode:
      submissionCountryCode ??
      me.phoneNumber?.regionCode ??
      meCountryCode ??
      "us",
  }

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount // use the same validation as on app
      validationSchema={Schema}
    >
      {({ handleChange, values, setFieldValue }) => (
        <SubmissionLayout>
          <Text variant="xl" mb={2}>
            Add phone number
          </Text>

          <Join separator={<Spacer y={4} />}>
            <Text variant="sm-display">
              Add your number (optional) so an Artsy Advisor can contact you
              directly by phone.
            </Text>

            <PhoneInput
              options={countries}
              onSelect={option => {
                setFieldValue("phoneNumberCountryCode", option.value)
              }}
              name="userPhone"
              onChange={handleChange}
              dropdownValue={values.phoneNumberCountryCode}
              defaultValue={values.userPhone}
              // inputValue={values.userPhone}
              placeholder="(000) 000 0000"
              data-testid="phone-input"
            />
          </Join>
          <DevDebug />
        </SubmissionLayout>
      )}
    </Formik>
  )
}

export function cleanUserPhoneNumber(value: string) {
  let countryCode1 = getCountryIso2FromPhoneNumber(value) ?? ""

  let phoneNumber = value.replace(/[^+\d]/g, "").trim()

  const dialCode = countries.find(c => c.value === countryCode1)?.countryCode
  if (dialCode && phoneNumber.startsWith("+" + dialCode)) {
    phoneNumber = phoneNumber.slice(dialCode.length + 1).trim()
  }

  return { countryCode1, phoneNumber }
}

export function getCountryIso2FromPhoneNumber(phoneNumber: string) {
  if (!phoneNumber.startsWith("+")) {
    return null
  }
  // replace non-digits
  phoneNumber = phoneNumber.slice(1).replace(/\D/g, "")

  const possibles = compact(
    countries.map(c => {
      if (!phoneNumber.startsWith(c.countryCode)) {
        return null
      }

      // TODO: add check for area codes
      /*        if (c.areaCodes) {
        const rest = phoneNumber.slice(c.countryCode.length)

        // if no area codes, skip
        if (!c.areaCodes.some((code) => rest.startsWith(code))) {
          return null
        }

        // increase specificity by 100 if area code is present
        return { code: c.value, specificity: 100 + c.countryCode.length }
      } */

      return { code: c.value, specificity: c.countryCode.length }
    })
  )

  // find best match
  const best = possibles
    .sort((a, b) => {
      return a.specificity - b.specificity
    })
    .pop()

  return best?.code
}
