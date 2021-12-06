import { createContext, useContext, useState } from "react"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"

interface ErrorModalContextT {
  openErrorModal: (
    modalHeader?: string,
    contactEmailDisplayed?: string,
    modalCloseButtonText?: string
  ) => void
  isErrorModalOpen: boolean
}

const ErrorModalContext = createContext<ErrorModalContextT>({
  openErrorModal: () => null,
  isErrorModalOpen: false,
})

export const ErrorModalProvider = ({ children }) => {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [headerText, setHeaderText] = useState("An error occurred")
  const [contactEmail, setContactEmail] = useState("consign@artsymail.com")
  const [closeText, setCloseText] = useState("Close")

  const openErrorModal = (
    modalHeader?: string,
    contactEmailDisplayed?: string,
    modalCloseButtonText?: string
  ) => {
    setIsErrorModalOpen(true)
    setHeaderText(modalHeader || headerText)
    setContactEmail(contactEmailDisplayed || contactEmail)
    setCloseText(modalCloseButtonText || closeText)
  }

  return (
    <ErrorModalContext.Provider
      value={{
        openErrorModal,
        isErrorModalOpen,
      }}
    >
      <ErrorModal
        show={isErrorModalOpen}
        headerText={headerText}
        contactEmail={contactEmail}
        closeText={closeText}
        onClose={() => setIsErrorModalOpen(false)}
      />
      {children}
    </ErrorModalContext.Provider>
  )
}

export const useErrorModal = () => useContext(ErrorModalContext)
