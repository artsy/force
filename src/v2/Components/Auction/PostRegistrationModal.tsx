import { Box, Button, CheckCircleIcon, Modal, Serif } from "@artsy/palette"
import React, { useEffect, useState } from "react"

export type ContentKey =
  | "registrationConfirmed"
  | "registrationPending"
  | "registrationPendingUnverified"
  | "bidPending"

interface Props {
  onClose: () => void
  contentKey: ContentKey
}

type ModalContent = React.ComponentType<{ onClick: () => void }>

const BidPending: ModalContent = ({ onClick }) => {
  return (
    <>
      <RegistrationPendingHeader />
      <Serif my={3} size="3t">
        We're sorry, your bid could not be placed.
      </Serif>
      <ReviewingRegistrationContent />
      <ViewWorksButton onClick={onClick} />
    </>
  )
}

const RegistrationPending: ModalContent = ({ onClick }) => {
  return (
    <>
      <RegistrationPendingHeader />
      <ReviewingRegistrationContent />
      <ViewWorksButton onClick={onClick} />
    </>
  )
}

const RegistrationPendingUnverified: ModalContent = ({ onClick }) => {
  return (
    <>
      <RegistrationPendingHeader />
      <Serif my={3} size="3t">
        This auction requires Artsy to verify your identity before bidding.
        <br />
        <br />
        For details about identity verification, please see the{" "}
        <a target="_blank" href="/identity-verification-faq">
          FAQ
        </a>{" "}
        or contact verification@artsy.net.
        <br />
        <br />A link to complete identity verification has been sent to your
        email.
      </Serif>
      <ViewWorksButton onClick={onClick} />
    </>
  )
}

const RegistrationComplete: ModalContent = ({ onClick }) => {
  return (
    <>
      <Serif size="6">Registration complete</Serif>
      <CheckCircleIcon mt={2} height="28px" width="28px" fill="green100" />
      <Serif mt={2} mb={3} size="3t">
        Thank you for registering.
        <br />
        You’re now eligible to bid on lots in this sale.
      </Serif>
      <Button width="100%" onClick={onClick}>
        Start bidding
      </Button>
    </>
  )
}

const contentFor: { [key in ContentKey]: ModalContent } = {
  registrationConfirmed: RegistrationComplete,
  registrationPending: RegistrationPending,
  registrationPendingUnverified: RegistrationPendingUnverified,
  bidPending: BidPending,
}

export const PostRegistrationModal: React.FC<Props> = ({
  onClose,
  contentKey,
}) => {
  const [show, setShow] = useState(true)

  function closeModal() {
    setShow(false)
  }

  useEffect(() => {
    if (!show) {
      onClose()
    }
  }, [show])

  const Content = contentFor[contentKey]

  return (
    <Modal show={show} onClose={closeModal}>
      <Box pt={[3, 0]} textAlign="center">
        <Content onClick={closeModal} />
      </Box>
    </Modal>
  )
}

const ReviewingRegistrationContent = () => {
  return (
    <Serif my={3} size="3t">
      Artsy is reviewing your registration and you will receive an email when it
      has been confirmed. Please email specialist@artsy.net with any questions.
      <br />
      <br />
      In the meantime, you can still view works and watch lots you’re interested
      in.
    </Serif>
  )
}

const RegistrationPendingHeader = () => {
  return <Serif size="6">Registration pending</Serif>
}

const ViewWorksButton = props => {
  return (
    <Button width="100%" onClick={props.onClick}>
      View works in this sale
    </Button>
  )
}
