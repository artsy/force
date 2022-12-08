import { Text, Checkbox, Join, Spacer } from "@artsy/palette"
import { INITIAL_VALUES } from "Components/AuthDialog/Views/AuthDialogSignUp"
import { useFormikContext } from "formik"
import { FC } from "react"

interface AuthTermsCheckboxesProps {
  isAutomaticallySubscribed: boolean
}

export const AuthTermsCheckboxes: FC<AuthTermsCheckboxesProps> = ({
  isAutomaticallySubscribed,
}) => {
  const { values, setFieldValue, touched, errors } = useFormikContext<
    typeof INITIAL_VALUES
  >()

  if (!isAutomaticallySubscribed) {
    return (
      <Checkbox
        selected={values.accepted_terms_of_service}
        onSelect={selected => {
          setFieldValue("agreed_to_receive_emails", selected)
          setFieldValue("accepted_terms_of_service", selected)
        }}
        data-test="agreeToTerms"
        data-testid="agreeToTerms"
        error={
          !!(
            touched.accepted_terms_of_service &&
            errors.accepted_terms_of_service
          )
        }
      >
        <Text variant="xs">
          I agree to the{" "}
          <a href="https://www.artsy.net/terms" target="_blank">
            Terms of Use
          </a>
          {", "}
          <a href="https://www.artsy.net/privacy" target="_blank">
            Privacy Policy
          </a>
          , and{" "}
          <a href="https://www.artsy.net/conditions-of-sale" target="_blank">
            Conditions of Sale
          </a>{" "}
          and to receiving emails from Artsy.
        </Text>
      </Checkbox>
    )
  }

  return (
    <Join separator={<Spacer y={1} />}>
      <Checkbox
        selected={values.accepted_terms_of_service}
        onSelect={selected => {
          setFieldValue("accepted_terms_of_service", selected)
        }}
        data-test="agreeToTerms"
        data-testid="agreeToTerms"
        error={
          !!(
            touched.accepted_terms_of_service &&
            errors.accepted_terms_of_service
          )
        }
      >
        <Text variant="xs">
          By checking this box, you consent to our{" "}
          <a href="https://www.artsy.net/terms" target="_blank">
            Terms of Use
          </a>
          {", "}
          <a href="https://www.artsy.net/privacy" target="_blank">
            Privacy Policy
          </a>
          , and{" "}
          <a href="https://www.artsy.net/conditions-of-sale" target="_blank">
            Conditions of Sale
          </a>
          .
        </Text>
      </Checkbox>

      <Checkbox
        selected={values.agreed_to_receive_emails}
        onSelect={selected => {
          setFieldValue("agreed_to_receive_emails", selected)
        }}
      >
        <Text variant="xs">
          Dive deeper into the art market with Artsy emails. Subscribe to hear
          about our products, services, editorials, and other promotional
          content. Unsubscribe at any time.
        </Text>
      </Checkbox>
    </Join>
  )
}
