import React, { useEffect, useState } from "react"
import { Modal } from "reaction/Components/Modal/Modal"
import { Sans, Theme } from "@artsy/palette"

export const ConfirmRegistrationModal = () => {
  const [showModal, setShowModal] = useState(true)
  const hideModal = () => {
    console.log("toot toot!")
    setShowModal(false)
  }
  useEffect(() => console.log("rendering modal"), [])
  return (
    <Theme>
      <Modal show={showModal} onClose={hideModal}>
        <Sans size="5t">You are a good boy</Sans>
      </Modal>
    </Theme>
  )
}
