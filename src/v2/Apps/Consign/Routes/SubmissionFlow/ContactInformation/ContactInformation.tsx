import { Text, Button } from "@artsy/palette"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"
import { useSystemContext } from "v2/System"
import { openAuthModal } from "v2/Utils/openAuthModal"
import { ModalType } from "v2/Components/Authentication/Types"
import { ContextModule, Intent } from "@artsy/cohesion"
import { useRouter } from "v2/System/Router/useRouter"
import { createConsignSubmission } from "../Utils/createConsignSubmission"
import { Form, Formik } from "formik"
import {
  ContactInformationForm,
  ContactInformationFormModel,
} from "./Components/ContactInformationForm"
import { createFragmentContainer, graphql } from "react-relay"
import { ContactInformation_me } from "v2/__generated__/ContactInformation_me.graphql"
import { useSubmission } from "../Utils/useSubmission"
import { contactInformationValidationSchema } from "../Utils/validation"
import { BackLink } from "v2/Components/Links/BackLink"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import { useState } from "react"

export interface ContactInformationProps {
  me: ContactInformation_me
}

export const ContactInformation: React.FC<ContactInformationProps> = ({
  me,
}) => {
  const {
    router,
    match: {
      params: { id },
    },
  } = useRouter()
  const [isSubmissionApiError, setIsSubmissionApiError] = useState(false)
  const { mediator, isLoggedIn, relayEnvironment, user } = useSystemContext()
  const {
    submission,
    saveSubmission,
    submissionId,
    removeSubmission,
  } = useSubmission(id)
  const handleSubmit = async (values: ContactInformationFormModel) => {
    if (submission) {
      const contactInformationForm = {
        ...values,
        email: values.email.trim(),
      }

      submission.contactInformationForm = contactInformationForm
      saveSubmission(submission)
    }

    if (!isLoggedIn && mediator) {
      openAuthModal(mediator, {
        mode: ModalType.signup,
        intent: Intent.consign,
        contextModule: ContextModule.consignSubmissionFlow,
        redirectTo: `/consign/submission/${submissionId}/thank-you`,
        afterSignUpAction: {
          action: "save",
          kind: "submissions",
          objectId: submissionId,
        },
      })
    } else {
      if (relayEnvironment && submission) {
        try {
          await createConsignSubmission(relayEnvironment, submission, user?.id)
          removeSubmission()
          router.push(`/consign/submission/${submissionId}/thank-you`)
        } catch (error) {
          setIsSubmissionApiError(true)
        }
      }
    }
  }

  return (
    <>
      <BackLink
        py={2}
        mb={6}
        to={`/consign/submission/${submissionId}/upload-photos`}
      >
        Back
      </BackLink>

      <SubmissionStepper currentStep="Contact Information" />

      <Text mt={4} variant="lg">
        Let us know how to reach you
      </Text>
      <Text mt={1} variant="md" color="black60">
        We&#39;ll only use these details to share updates on your submission.
      </Text>

      <ErrorModal
        show={isSubmissionApiError}
        headerText="An error occurred"
        contactEmail="consign@artsymail.com"
        closeText="Close"
        onClose={() => setIsSubmissionApiError(false)}
      />

      <Formik<ContactInformationFormModel>
        initialValues={{
          name: me?.name || "",
          email: me?.email || "",
          phone: me?.phone || "",
        }}
        validateOnMount
        onSubmit={handleSubmit}
        validationSchema={contactInformationValidationSchema}
      >
        {({ isValid, isSubmitting }) => {
          return (
            <Form>
              <ContactInformationForm my={6} />

              <Button
                width={["100%", "auto"]}
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
                type="submit"
              >
                Submit Artwork
              </Button>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export const ContactInformationFragmentContainer = createFragmentContainer(
  ContactInformation,
  {
    me: graphql`
      fragment ContactInformation_me on Me {
        name
        email
        phone
      }
    `,
  }
)
