import * as React from "react";
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
import * as yup from "yup"
import { email } from "v2/Components/Authentication/Validators"
import { getSubmission, saveSubmission } from "../Utils/submissionUtils"

export const contactInformationValidationSchema = yup.object().shape({
  name: yup.string().label("Name").required(),
  email,
  phone: yup.string().label("Phone number").required(),
})

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
  const { mediator, isLoggedIn, relayEnvironment } = useSystemContext()

  const handleSubmit = async (values: ContactInformationFormModel) => {
    const submission = getSubmission(id)

    if (submission) {
      submission.contactInformationForm = values

      saveSubmission(id, submission)
    }

    if (!isLoggedIn && mediator) {
      openAuthModal(mediator, {
        mode: ModalType.signup,
        intent: Intent.consign,
        contextModule: ContextModule.consignSubmissionFlow,
        redirectTo: `/consign/submission2/${id}/thank-you`,
        afterSignUpAction: {
          action: "save",
          kind: "submissions",
          objectId: id,
        },
      })
    } else {
      if (relayEnvironment) {
        await createConsignSubmission(relayEnvironment, id)
        router.push(`/consign/submission2/${id}/thank-you`)
      }
    }
  }

  return (
    <>
      <SubmissionStepper currentStep="Contact Information" />

      <Text mt={4} variant="lg">
        Let us know how to reach you
      </Text>
      <Text mt={1} variant="md" color="black60">
        We&#39;ll only use these details to share updates on your submission.
      </Text>

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
