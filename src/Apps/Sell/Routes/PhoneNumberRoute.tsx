import { Join, PhoneInput, Spacer, Text } from "@artsy/palette"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { countries } from "Utils/countries"
import { PhoneNumberRoute_submission$key } from "__generated__/PhoneNumberRoute_submission.graphql"
import { PhoneNumberRoute_me$key } from "__generated__/PhoneNumberRoute_me.graphql"
import { Formik } from "formik"
import * as React from "react"
import { graphql, useFragment } from "react-relay"
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

  const initialValues: FormValues = {
    userPhone:
      me.phoneNumber?.display ??
      me.phoneNumber?.originalNumber ??
      submission.userPhone ??
      "",
    phoneNumberCountryCode: me.phoneNumber?.regionCode ?? "us",
  }

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount
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
              name="phoneNumber"
              onChange={handleChange}
              dropdownValue={values.phoneNumberCountryCode}
              inputValue={values.userPhone}
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
