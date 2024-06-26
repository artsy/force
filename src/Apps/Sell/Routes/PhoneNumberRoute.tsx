import { countries } from "Utils/countries"
import { cleanUserPhoneNumber } from "Apps/Sell/Utils/cleanUserPhoneNumber"
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

  // parse the phone number saved with the submission
  const {
    countryCode: submissionCountryCode,
    phoneNumber: submissionPhoneNumber,
  } = cleanUserPhoneNumber(submission.userPhone ?? "")

  // parse the phone number originalNumber phone number
  const {
    countryCode: meCountryCode,
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

  const onSubmit = async (values: FormValues) => {
    let country = countries.find(c => c.value === values.phoneNumberCountryCode)

    const phoneNumberInternational = `+${
      country?.countryCode
    } ${values.userPhone.trim()}`

    const updatedValues = {
      userPhone: phoneNumberInternational,
    }

    return actions.updateSubmission(updatedValues)
  }

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount
      validationSchema={Schema}
    >
      {({ handleChange, setFieldValue, values }) => (
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
