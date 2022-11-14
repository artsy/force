import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { Button, Text, useToasts } from "@artsy/palette"
import {
  SubmissionStepper,
  useSubmissionFlowSteps,
} from "Apps/Consign/Components/SubmissionStepper"
import { createOrUpdateConsignSubmission } from "Apps/Consign/Routes/SubmissionFlow/Utils/createOrUpdateConsignSubmission"
import {
  contactInformationValidationSchema,
  validate,
} from "Apps/Consign/Routes/SubmissionFlow/Utils/validation"
import { BackLink } from "Components/Links/BackLink"
import { Form, Formik } from "formik"
import { LocationDescriptor } from "found"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System"
import { useRouter } from "System/Router/useRouter"
import { getENV } from "Utils/getENV"
import createLogger from "Utils/logger"
import { recaptcha, RecaptchaAction } from "Utils/recaptcha"
import { ContactInformation_me$data } from "__generated__/ContactInformation_me.graphql"
import { ContactInformation_submission$data } from "__generated__/ContactInformation_submission.graphql"
import {
  ContactInformationFormFragmentContainer,
  ContactInformationFormModel,
} from "./Components/ContactInformationForm"

const logger = createLogger("SubmissionFlow/ContactInformation.tsx")

const getContactInformationFormInitialValues = (
  me: ContactInformation_me$data
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
  me: ContactInformation_me$data
  submission: ContactInformation_submission$data | null
}

export const ContactInformation: React.FC<ContactInformationProps> = ({
  me,
  submission,
}) => {
  const { trackEvent } = useTracking()
  const { router, match } = useRouter()
  const { sendToast } = useToasts()
  const { relayEnvironment, isLoggedIn } = useSystemContext()
  const initialValue = getContactInformationFormInitialValues(me)
  const initialErrors = validate(
    initialValue,
    contactInformationValidationSchema
  )
  const artworkId = match.params.artworkId

  const steps = useSubmissionFlowSteps()
  const stepIndex = Math.max(
    [...steps].indexOf("Contact Information"),
    [...steps].indexOf("Contact")
  )
  const isLastStep = stepIndex === steps.length - 1
  const isFirstStep = stepIndex === 0

  const handleRecaptcha = (action: RecaptchaAction) =>
    new Promise(resolve => recaptcha(action, resolve))

  const handleSubmit = async ({
    name,
    email,
    phone,
  }: ContactInformationFormModel) => {
    if (!(await handleRecaptcha("submission_submit"))) return

    if (relayEnvironment) {
      try {
        const submissionEmail = email.trim()

        const submissionId = await createOrUpdateConsignSubmission(
          relayEnvironment,
          {
            externalId: submission?.externalId,
            artistID: stepIndex === 0 ? "" : undefined,
            userName: name.trim(),
            userEmail: submissionEmail,
            userPhone: phone.international,
            state: isLastStep ? "SUBMITTED" : "DRAFT",
            sessionID: !isLoggedIn ? getENV("SESSION_ID") : undefined,
            myCollectionArtworkID:
              artworkId && isFirstStep ? artworkId : undefined,
            source: isFirstStep && artworkId ? "MY_COLLECTION" : undefined,
          }
        )

        if (isLastStep) {
          trackEvent({
            action: ActionType.consignmentSubmitted,
            submission_id: submission?.externalId,
            user_id: me?.internalID,
            user_email: isLoggedIn && me?.email ? me.email : submissionEmail,
          })
        }

        trackEvent({
          action: ActionType.contactInformationCompleted,
          context_owner_type: OwnerType.consignmentFlow,
          context_module: ContextModule.contactInformation,
          submission_id: submissionId,
          user_id: me?.internalID,
          user_email: submissionEmail ?? me?.email,
        })

        router.replace(artworkId ? "/settings/my-collection" : "/sell")

        const consignPath = artworkId
          ? "/my-collection/submission"
          : "/sell/submission"

        const nextStepIndex = isLastStep ? null : stepIndex + 1
        let nextRoute: LocationDescriptor = consignPath
        if (nextStepIndex !== null) {
          let nextStep = steps[nextStepIndex]
          if (nextStep === "Artwork" || nextStep === "Artwork Details") {
            nextRoute = `${consignPath}/${submissionId}/artwork-details`
          } else if (nextStep === "Photos" || nextStep === "Upload Photos") {
            nextRoute = `${consignPath}/${submissionId}/upload-photos`
          }
        }

        if (nextRoute === consignPath) {
          // there is no next step to go to. Prepare to go to thank you screen
          nextRoute = `${nextRoute}/${submissionId}/thank-you`
        }

        if (artworkId) {
          // artworkId should ever only be present for `/my-collection/submission` consign path
          nextRoute = nextRoute + "/" + artworkId
        }

        router.push(nextRoute)
      } catch (error) {
        logger.error("Submission error", error)

        sendToast({
          variant: "error",
          message: "An error occurred",
          description: "Please contact sell@artsymail.com",
        })

        return
      }
    }
  }

  const deriveBackLinkTo = () => {
    const defaultBackLink = artworkId ? `/my-collection` : "/sell"
    let backTo = defaultBackLink
    if (stepIndex === 0 && artworkId) {
      return backTo + `/artwork/${artworkId}`
    }
    let prevStep = ""
    if (stepIndex > 0) {
      switch (steps[stepIndex - 1]) {
        case "Artwork":
        case "Artwork Details":
          prevStep = "artwork-details"
          break
        case "Upload Photos":
        case "Photos":
          prevStep = "upload-photos"
          break
        default:
          break
      }
      if (submission) {
        backTo = backTo + `/submission/${submission.externalId}`
      }
    }
    backTo = prevStep ? backTo + `/${prevStep}` : backTo
    if (artworkId) {
      backTo = backTo + `/${artworkId}`
    }
    return backTo
  }

  const backTo = deriveBackLinkTo()

  return (
    <>
      <BackLink py={2} mb={6} width="min-content" to={backTo}>
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
            <ContactInformationFormFragmentContainer my={6} me={me} />

            <Button
              data-testid="save-button"
              width={["100%", "auto"]}
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              type="submit"
            >
              {isLastStep ? "Submit Artwork" : "Save and Continue"}
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
        ...ContactInformationForm_me
      }
    `,
  }
)
