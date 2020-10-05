import { Box, Button, CheckCircleIcon, Modal, Text } from "@artsy/palette"
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
      <Text my={3}>We're sorry, your bid could not be placed.</Text>
      <ReviewingRegistrationContent />
      <Button width="100%" onClick={onClick}>
        View works in this sale
      </Button>
    </>
  )
}

const RegistrationPending: ModalContent = ({ onClick }) => {
  return (
    <>
      <RegistrationPendingHeader />
      <ReviewingRegistrationContent />
      <Button width="100%" onClick={onClick}>
        View works in this sale
      </Button>
    </>
  )
}

const RegistrationPendingUnverified: ModalContent = ({ onClick }) => {
  return (
    <>
      <RegistrationPendingHeader />
      <Text my={3}>
        This auction requires Artsy to verify your identity before bidding.
        <br />
        <br />
        For details about identity verification, please see the{" "}
        <a target="_blank" href="/identity-verification-faq">
          FAQ
        </a>{" "}
        or contact verification@artsy.net.
        <br />
        <br />
        To complete your registration and start bidding, please click the{" "}
        <strong>Verify identity</strong> button or follow the link sent to your
        email.
      </Text>
      <Button width="100%" onClick={onClick}>
        OK
      </Button>
    </>
  )
}

const RegistrationComplete: ModalContent = ({ onClick }) => {
  return (
    <>
      <Text variant="title">Registration complete</Text>
      <CheckCircleIcon mt={2} height="28px" width="28px" fill="green100" />
      <Text mt={2} mb={3} size="3t">
        Thank you for registering.
        <br />
        You’re now eligible to bid on lots in this sale.
      </Text>
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
  }, [show, onClose])

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
    <Text my={3}>
      Artsy is reviewing your registration and you will receive an email when it
      has been confirmed. Please email specialist@artsy.net with any questions.
      <br />
      <br />
      In the meantime, you can still view works and watch lots you’re interested
      in.
    </Text>
  )
}

const RegistrationPendingHeader = () => {
  return <Text variant="title">Registration pending</Text>
}
