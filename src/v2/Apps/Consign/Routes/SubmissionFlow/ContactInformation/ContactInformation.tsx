import { Text, Button, useToasts } from "@artsy/palette"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"
import { useSystemContext, useTracking } from "v2/System"
import { useRouter } from "v2/System/Router/useRouter"
import { createOrUpdateConsignSubmission } from "../Utils/createOrUpdateConsignSubmission"
import { Form, Formik } from "formik"
import {
  ContactInformationForm,
  ContactInformationFormModel,
} from "./Components/ContactInformationForm"
import { createFragmentContainer, graphql } from "react-relay"
import { ContactInformation_me } from "v2/__generated__/ContactInformation_me.graphql"
import { ContactInformation_submission } from "v2/__generated__/ContactInformation_submission.graphql"
import {
  contactInformationValidationSchema,
  validate,
} from "../Utils/validation"
import { BackLink } from "v2/Components/Links/BackLink"
import { getENV } from "v2/Utils/getENV"
import { recaptcha, RecaptchaAction } from "v2/Utils/recaptcha"
import { ActionType } from "@artsy/cohesion"
import createLogger from "v2/Utils/logger"

const logger = createLogger("SubmissionFlow/ContactInformation.tsx")

const getContactInformationFormInitialValues = (
  me: ContactInformation_me
): ContactInformationFormModel => ({
  name: me?.name || "",
  email: me?.email || "",
  phone: {
    isValid: !!me?.phoneNumber?.isValid,
    national: me?.phoneNumber?.national ?? undefined,
    international: me?.phoneNumber?.international ?? undefined,
    regionCode: me?.phoneNumber?.regionCode ?? undefined,
  },
})

export interface ContactInformationProps {
  me: ContactInformation_me
  submission: ContactInformation_submission
}

export const ContactInformation: React.FC<ContactInformationProps> = ({
  me,
  submission,
}) => {
  const { trackEvent } = useTracking()
  const { router } = useRouter()
  const { sendToast } = useToasts()
  const { relayEnvironment, isLoggedIn } = useSystemContext()
  const initialValue = getContactInformationFormInitialValues(me)
  const initialErrors = validate(
    initialValue,
    contactInformationValidationSchema
  )

  const handleRecaptcha = (action: RecaptchaAction) =>
    new Promise(resolve => recaptcha(action, resolve))

  const handleSubmit = async ({
    name,
    email,
    phone,
  }: ContactInformationFormModel) => {
    if (!(await handleRecaptcha("submission_submit"))) return

    if (relayEnvironment && submission) {
      try {
        const submissionEmail = email.trim()

        await createOrUpdateConsignSubmission(relayEnvironment, {
          externalId: submission.externalId,
          userName: name.trim(),
          userEmail: submissionEmail,
          userPhone: phone.international,
          state: "SUBMITTED",
          sessionID: !isLoggedIn ? getENV("SESSION_ID") : undefined,
        })

        trackEvent({
          action: ActionType.consignmentSubmitted,
          submission_id: submission.externalId,
          user_id: me?.internalID,
          user_email: isLoggedIn && me?.email ? me.email : submissionEmail,
        })

        router.push(`/sell/submission/${submission?.externalId}/thank-you`)
      } catch (error) {
        logger.error("Submission error", error)

        sendToast({
          variant: "error",
          message: "An error occurred",
          description: "Please contact consign@artsymail.com",
        })

        return
      }
    }
  }

  return (
    <>
      <BackLink
        py={2}
        mb={6}
        width="min-content"
        to={`/sell/submission/${submission?.externalId}/upload-photos`}
      >
        Back
      </BackLink>

      <SubmissionStepper currentStep="Contact Information" />

      <Text mt={4} variant="lg-display">
        Let us know how to reach you
      </Text>
      <Text mt={1} variant="sm-display" color="black60">
        We will only use these details to contact you regarding your submission.
      </Text>

      <Formik<ContactInformationFormModel>
        validateOnMount
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={contactInformationValidationSchema}
        initialErrors={initialErrors}
        initialTouched={{}}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <ContactInformationForm my={6} me={me} />

            <Button
              data-testid="save-button"
              width={["100%", "auto"]}
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              type="submit"
            >
              Submit Artwork
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export const ContactInformationFragmentContainer = createFragmentContainer(
  ContactInformation,
  {
    submission: graphql`
      fragment ContactInformation_submission on ConsignmentSubmission {
        externalId
      }
    `,
    me: graphql`
      fragment ContactInformation_me on Me {
        internalID
        name
        email
        phone
        phoneNumber {
          isValid
          international: display(format: INTERNATIONAL)
          national: display(format: NATIONAL)
          regionCode
        }
      }
    `,
  }
)
