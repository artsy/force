import { createContext, useContext, useState } from "react"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"

interface ErrorModalContextT {
  openErrorModal: (
    modalHeader?: string,
    contactEmailDisplayed?: string,
    modalCloseButtonText?: string
  ) => void
}

const ErrorModalContext = createContext<ErrorModalContextT>({
  openErrorModal: () => null,
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

  console.log("XX")

  return (
    <ErrorModalContext.Provider
      value={{
        openErrorModal,
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
