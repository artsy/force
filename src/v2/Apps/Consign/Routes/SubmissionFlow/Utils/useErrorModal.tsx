import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"

interface ErrorModalContextT {
  isErrorModalOpen: boolean
  setIsErrorModalOpen: Dispatch<SetStateAction<boolean>> | null
}

const ErrorModalContext = createContext<ErrorModalContextT>({
  isErrorModalOpen: false,
  setIsErrorModalOpen: null,
})

export const ErrorModalProvider = ({ children }) => {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [headerText, setHeaderText] = useState("An error occurred")
  const [contactEmail, setContactEmail] = useState("consign@artsymail.com")
  const [closeText, setCloseText] = useState("Close")

  const onClose = () => setIsErrorModalOpen(false)

  return (
    <ErrorModalContext.Provider
      value={{ isErrorModalOpen, setIsErrorModalOpen }}
    >
      <ErrorModal
        show={isErrorModalOpen}
        headerText={headerText}
        contactEmail={contactEmail}
        closeText={closeText}
        onClose={onClose}
      />
      {children}
    </ErrorModalContext.Provider>
  )
}

export const useErrorModal = () => useContext(ErrorModalContext)
