import { createContext, useContext, useState } from "react"

interface ConversationsContextProps {
  isConfirmModalVisible: boolean
  isCreatingOfferOrder: boolean
  showSelectEditionSetModal: (props: { isCreatingOfferOrder: boolean }) => void
  hideSelectEditionSetModal: () => void
}

const ConversationsContext = createContext<ConversationsContextProps>(({
  isConfirmModalVisible: false,
  isCreatingOfferOrder: false,
} as unknown) as ConversationsContextProps)

export const ConversationsProvider: React.FC = ({ children }) => {
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false)
  const [isCreatingOfferOrder, setCreatingOfferOrder] = useState(false)

  const showSelectEditionSetModal = ({ isCreatingOfferOrder }) => {
    setCreatingOfferOrder(isCreatingOfferOrder)
    setIsConfirmModalVisible(true)
  }
  const hideSelectEditionSetModal = () => setIsConfirmModalVisible(false)

  return (
    <ConversationsContext.Provider
      value={{
        isConfirmModalVisible,
        isCreatingOfferOrder,
        showSelectEditionSetModal,
        hideSelectEditionSetModal,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  )
}

export const useConversationsContext = () => {
  const context = useContext(ConversationsContext)

  if (!context) {
    throw new Error(
      "useConversationsContext must be used within a ConversationsProvider"
    )
  }

  return context
}
