import { Join, PhoneInput, Spacer, Text } from "@artsy/palette"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"
import { useFocusInput } from "Apps/Sell/Hooks/useFocusInput"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { validatePhoneNumber } from "Components/PhoneNumberInput"
import { COUNTRY_CODES, countries } from "Utils/countries"
import { PhoneNumberRoute_me$key } from "__generated__/PhoneNumberRoute_me.graphql"
import { PhoneNumberRoute_submission$key } from "__generated__/PhoneNumberRoute_submission.graphql"
import { Formik } from "formik"
import * as React from "react"
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
  userPhone: Yup.string().test({
    name: "phone-number-is-valid",
    message: "The phone number does not seem to be valid.",
    test: (national, context) => {
      // by default phine number is not required
      if (!national || !context.parent.userPhone) {
        return true
      }

      return validatePhoneNumber({
        national: national ? `${national}` : `${context.parent.userPhone}`,
        regionCode: `${context.parent.phoneNumberRegionCode}`,
      })
    },
  }),
})

interface FormValues {
  userPhone: string
  phoneNumberRegionCode: string
}

interface PhoneNumberRouteProps {
  submission: PhoneNumberRoute_submission$key
  me: PhoneNumberRoute_me$key
}

export const PhoneNumberRoute: React.FC<React.PropsWithChildren<
  PhoneNumberRouteProps
>> = props => {
  const submission = useFragment(FRAGMENT, props.submission)
  const me = useFragment(FRAGMENT_ME, props.me)

  const { actions } = useSellFlowContext()

  const focusedInputRef = useFocusInput()

  const initialValues: FormValues = {
    userPhone:
      submission.userPhoneNumber?.display ?? me?.phoneNumber?.display ?? "",
    phoneNumberRegionCode:
      submission.userPhoneNumber?.regionCode ??
      me?.phoneNumber?.regionCode ??
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
      {({ handleChange, setFieldValue, values, errors }) => {
        return (
          <SubmissionLayout>
            <SubmissionStepTitle>Add phone number</SubmissionStepTitle>

            <Join separator={<Spacer y={4} />}>
              <Text variant={["xs", "sm"]} textColor={["black60", "black100"]}>
                Add your number (optional) so an Artsy Advisor can contact you
                directly by phone.
              </Text>

              <PhoneInput
                ref={focusedInputRef}
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
                error={errors.userPhone}
              />
            </Join>

            <DevDebug />
          </SubmissionLayout>
        )
      }}
    </Formik>
  )
}
