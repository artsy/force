import { Join, Message, PhoneInput, Spacer, Text } from "@artsy/palette"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { validatePhoneNumber } from "Components/PhoneNumberInput"
import { COUNTRY_CODES, countries } from "Utils/countries"
import { PhoneNumberRoute_me$key } from "__generated__/PhoneNumberRoute_me.graphql"
import { PhoneNumberRoute_submission$key } from "__generated__/PhoneNumberRoute_submission.graphql"
import { Formik } from "formik"
import { throttle } from "lodash"
import * as React from "react"
import { useEffect } from "react"
import { graphql, useFragment } from "react-relay"
import * as Yup from "yup"

const FRAGMENT = graphql`
  fragment PhoneNumberRoute_submission on ConsignmentSubmission {
    userPhoneNumber {
      display
      regionCode
    }
  }
`

const FRAGMENT_ME = graphql`
  fragment PhoneNumberRoute_me on Me {
    internalID
    phoneNumber {
      regionCode
      display(format: NATIONAL)
    }
  }
`

const Schema = Yup.object().shape({
  phoneNumber: Yup.string().trim(),
})

interface FormValues {
  userPhone: string
  phoneNumberRegionCode: string
}

interface PhoneNumberRouteProps {
  submission: PhoneNumberRoute_submission$key
  me: PhoneNumberRoute_me$key
}

export const PhoneNumberRoute: React.FC<PhoneNumberRouteProps> = props => {
  const submission = useFragment(FRAGMENT, props.submission)
  const me = useFragment(FRAGMENT_ME, props.me)

  const { actions } = useSellFlowContext()

  const initialValues: FormValues = {
    userPhone:
      submission.userPhoneNumber?.display ?? me.phoneNumber?.display ?? "",
    phoneNumberRegionCode:
      submission.userPhoneNumber?.regionCode ??
      me.phoneNumber?.regionCode ??
      "us",
  }

  const onSubmit = async (values: FormValues) => {
    const phoneNumberInternational = `+${
      COUNTRY_CODES[values.phoneNumberRegionCode.toLocaleUpperCase()]
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
      {({ handleChange, setFieldValue, values }) => {
        const [isPhoneNumberValid, setIsPhoneNumberValid] = React.useState(true)

        const validate = throttle(async () => {
          const isValid = await validatePhoneNumber({
            national: values.userPhone,
            regionCode: values.phoneNumberRegionCode,
          })

          setIsPhoneNumberValid(isValid)
        }, 500)

        useEffect(() => {
          validate()
        }, [values.userPhone, values.phoneNumberRegionCode])

        return (
          <SubmissionLayout>
            <SubmissionStepTitle>Add phone number</SubmissionStepTitle>

            <Join separator={<Spacer y={4} />}>
              <Text variant={["xs", "sm"]} textColor={["black60", "black100"]}>
                Add your number (optional) so an Artsy Advisor can contact you
                directly by phone.
              </Text>

              <PhoneInput
                options={countries}
                onSelect={option => {
                  setFieldValue("phoneNumberRegionCode", option.value)
                }}
                name="userPhone"
                onChange={handleChange}
                dropdownValue={values.phoneNumberRegionCode}
                defaultValue={values.userPhone}
                placeholder="(000) 000 0000"
                data-testid="phone-input"
                type="tel"
                // error={
                //   values.userPhone && !isPhoneNumberValid
                //     ? "Invalid phone number"
                //     : undefined
                // }
              />

              {values.userPhone && !isPhoneNumberValid && (
                <Message
                  variant="warning"
                  title="Please add a valid phone number."
                />
              )}
            </Join>
            <DevDebug />
          </SubmissionLayout>
        )
      }}
    </Formik>
  )
}
