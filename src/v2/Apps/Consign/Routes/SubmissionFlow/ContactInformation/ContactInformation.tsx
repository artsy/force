import React, { FC } from "react"
import { Box, Button } from "@artsy/palette"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"
import { useSystemContext } from "v2/System"
import { openAuthModal } from "v2/Utils/openAuthModal"
import { ModalType } from "v2/Components/Authentication/Types"
import { ContextModule, Intent } from "@artsy/cohesion"
import { useRouter } from "v2/System/Router/useRouter"
import { createConsignSubmission } from "../Utils/createConsignSubmission"

export const ContactInformation: FC = () => {
  const {
    router,
    match: {
      params: { id },
    },
  } = useRouter()
  const { mediator, isLoggedIn, relayEnvironment } = useSystemContext()

  const handleSubmit = async () => {
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
      <Box mt={50}>Contact Information step</Box>
      <Button onClick={handleSubmit}>Submit Artwork</Button>
    </>
  )
}
