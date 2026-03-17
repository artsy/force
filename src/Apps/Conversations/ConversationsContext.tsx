import { extractNodes } from "Utils/extractNodes"
import type {
  ConversationsContext_viewer$data,
  ConversationsContext_viewer$key,
} from "__generated__/ConversationsContext_viewer.graphql"
import { createContext, useContext, useState } from "react"
import { graphql, useFragment } from "react-relay"

interface ConversationsContextProps {
  isConfirmModalVisible: boolean
  isCreatingOfferOrder: boolean
  selectedEditionSetId: string | null
  setSelectedEditionSetId: (editionSetId: string | null) => void
  findPartnerOffer: (artworkID: string) => PartnerOffer | null
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

interface ConversationsProviderProps {
  viewer: ConversationsContext_viewer$key
}

type PartnerOffer = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<
          ConversationsContext_viewer$data["me"]
        >["partnerOffersConnection"]
      >["edges"]
    >[number]
  >["node"]
>

export const ConversationsProvider: React.FC<
  React.PropsWithChildren<ConversationsProviderProps>
> = ({ children, viewer }) => {
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false)
  const [isCreatingOfferOrder, setCreatingOfferOrder] = useState(false)
  const [selectedEditionSetId, setSelectedEditionSetId] = useState<
    string | null
  >(null)
  const { me } = useFragment(VIEWER_FRAGMENT, viewer)

  const partnerOfferMap: Record<string, PartnerOffer> = extractNodes(
    me?.partnerOffersConnection,
  ).reduce((acc, offer) => {
    if (offer.artworkId) {
      acc[offer.artworkId] = offer
    }
    return acc
  }, {})

  const findPartnerOffer = (artworkID: string): PartnerOffer | null =>
    partnerOfferMap[artworkID] ?? null

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
        findPartnerOffer,
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

const VIEWER_FRAGMENT = graphql`
  fragment ConversationsContext_viewer on Viewer {
    me {
      partnerOffersConnection(first: 100) {
        edges {
          node {
            artworkId
            endAt
            internalID
            isAvailable
            note
            priceWithDiscount {
              display
            }
          }
        }
      }
    }
  }
`
