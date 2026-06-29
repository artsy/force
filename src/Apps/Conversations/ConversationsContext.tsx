import { createContext, useContext, useState } from "react"

interface ConversationsContextProps {
  isConfirmModalVisible: boolean
  isCreatingOfferOrder: boolean
  selectedEditionSetId: string | null
  setSelectedEditionSetId: (editionSetId: string | null) => void
  showSelectEditionSetModal: (props: {
    isCreatingOfferOrder: boolean
    defaultEditionSetId?: string | null
  }) => void
  hideSelectEditionSetModal: () => void
}

const ConversationsContext = createContext<ConversationsContextProps>({
  isConfirmModalVisible: false,
  isCreatingOfferOrder: false,
} as unknown as ConversationsContextProps)

export const ConversationsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false)
  const [isCreatingOfferOrder, setCreatingOfferOrder] = useState(false)
  const [selectedEditionSetId, setSelectedEditionSetId] = useState<
    string | null
  >(null)

  const showSelectEditionSetModal = ({
    isCreatingOfferOrder,
    defaultEditionSetId,
  }: {
    isCreatingOfferOrder: boolean
    defaultEditionSetId?: string | null
  }) => {
    setCreatingOfferOrder(isCreatingOfferOrder)
    if (defaultEditionSetId) {
      setSelectedEditionSetId(defaultEditionSetId)
    }
    setIsConfirmModalVisible(true)
  }
  const hideSelectEditionSetModal = () => {
    setIsConfirmModalVisible(false)
    setSelectedEditionSetId(null)
  }

  return (
    <ConversationsContext.Provider
      value={{
        isConfirmModalVisible,
        isCreatingOfferOrder,
        selectedEditionSetId,
        setSelectedEditionSetId,
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
      "useConversationsContext must be used within a ConversationsProvider",
    )
  }

  return context
}
