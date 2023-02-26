import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { Button, Spacer, Text, useToasts } from "@artsy/palette"
import { SubmissionStepper } from "Apps/Consign/Components/SubmissionStepper"
import { useSubmissionFlowSteps } from "Apps/Consign/Hooks/useSubmissionFlowSteps"
import { createOrUpdateConsignSubmission } from "Apps/Consign/Routes/SubmissionFlow/Utils/createOrUpdateConsignSubmission"
import {
  contactInformationValidationSchema,
  validate,
} from "Apps/Consign/Routes/SubmissionFlow/Utils/validation"
import { COUNTRY_CODES } from "Utils/countries"
import { Form, Formik } from "formik"
import { LocationDescriptor } from "found"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System/useSystemContext"
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
import { useFeatureFlag } from "System/useFeatureFlag"
import { TopContextBar } from "Components/TopContextBar"

const logger = createLogger("SubmissionFlow/ContactInformation.tsx")

const getContactInformationFormInitialValues = (
  me: ContactInformation_me$data
): ContactInformationFormModel => {
  const userRegionCode = me?.phoneNumber?.regionCode ?? ""
  const countryCode = COUNTRY_CODES[userRegionCode.toLocaleUpperCase()]
  let phoneNumber = me?.phone ?? ""

  if (countryCode) {
    phoneNumber = phoneNumber.replace(`+${countryCode}`, "")
  }
  return {
    name: me?.name || "",
    email: me?.email || "",
    phoneNumber,
    phoneNumberCountryCode: me?.phoneNumber?.regionCode || "us",
  }
}

export interface ContactInformationProps {
  me: ContactInformation_me$data
  submission: ContactInformation_submission$data | null
}

export const ContactInformation: React.FC<ContactInformationProps> = ({
  me,
  submission,
}) => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")
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
    phoneNumber,
    phoneNumberCountryCode,
  }: ContactInformationFormModel) => {
    if (!(await handleRecaptcha("submission_submit"))) return

    if (relayEnvironment) {
      try {
        const submissionEmail = email.trim()
        const phoneNumberInternational = `+${
          COUNTRY_CODES[phoneNumberCountryCode.toLocaleUpperCase()]
        } ${phoneNumber.trim()}`

        const submissionId = await createOrUpdateConsignSubmission(
          relayEnvironment,
          {
            externalId: submission?.externalId,
            artistID: isFirstStep ? "" : undefined,
            userName: name.trim(),
            userEmail: submissionEmail,
            userPhone: phoneNumberInternational,
            state: isLastStep ? "SUBMITTED" : "DRAFT",
            sessionID: !isLoggedIn ? getENV("SESSION_ID") : undefined,
            // myCollectionArtworkID is necessary in order to prevent duplication or mycollection artwork
            myCollectionArtworkID:
              artworkId && isFirstStep ? artworkId : undefined,
            // Source is necessary in order to link this to a mycollection artwork
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

        router.replace(
          artworkId
            ? isCollectorProfileEnabled
              ? "/collector-profile/my-collection"
              : "/settings/my-collection"
            : "/sell"
        )

        const consignPath = artworkId
          ? isCollectorProfileEnabled
            ? "/collector-profile/my-collection/submission"
            : "/my-collection/submission"
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
          description: "Please contact sell@artsy.net",
        })

        return
      }
    }
  }

  const deriveBackLinkTo = () => {
    const defaultBackLink = artworkId
      ? isCollectorProfileEnabled
        ? "/collector-profile/my-collection"
        : "/my-collection"
      : "/sell"

    let backTo = defaultBackLink
    if (isFirstStep && artworkId) {
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
      {isFirstStep && !artworkId ? (
        <TopContextBar
          displayBackArrow
          hideSeparator
          onClick={() => router.go(-1)}
          redirectTo="/sell"
        >
          Back
        </TopContextBar>
      ) : (
        <TopContextBar displayBackArrow hideSeparator href={backTo}>
          Back
        </TopContextBar>
      )}

      <Spacer y={6} />

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
          regionCode
        }
        ...ContactInformationForm_me
      }
    `,
  }
)
