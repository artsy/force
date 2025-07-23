import {
  createContextStore,
  Action,
  action,
  Computed,
  computed,
} from "easy-peasy"
import { extractNodes } from "Utils/extractNodes"
import type {
  ConversationsContext_viewer$data,
  ConversationsContext_viewer$key,
} from "__generated__/ConversationsContext_viewer.graphql"
import { createContext, useContext } from "react"
import { graphql, useFragment } from "react-relay"

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

// Easy-peasy store model interface
interface ConversationsStoreModel {
  // State
  isConfirmModalVisible: boolean
  isCreatingOfferOrder: boolean
  partnerOfferMap: Record<string, PartnerOffer>

  // Computed
  findPartnerOffer: Computed<
    ConversationsStoreModel,
    (artworkID: string) => PartnerOffer | null
  >

  // Actions
  showSelectEditionSetModal: Action<
    ConversationsStoreModel,
    { isCreatingOfferOrder: boolean }
  >
  hideSelectEditionSetModal: Action<ConversationsStoreModel>
  setPartnerOfferMap: Action<
    ConversationsStoreModel,
    Record<string, PartnerOffer>
  >
}

// Create the context store
export const ConversationsStore = createContextStore<ConversationsStoreModel>(
  runtimeModel => ({
    // State
    isConfirmModalVisible: runtimeModel?.isConfirmModalVisible || false,
    isCreatingOfferOrder: runtimeModel?.isCreatingOfferOrder || false,
    partnerOfferMap: runtimeModel?.partnerOfferMap || {},

    // Computed
    findPartnerOffer: computed(
      [state => state.partnerOfferMap],
      partnerOfferMap => {
        return (artworkID: string): PartnerOffer | null => {
          return partnerOfferMap[artworkID] ?? null
        }
      },
    ),

    // Actions
    showSelectEditionSetModal: action((state, { isCreatingOfferOrder }) => {
      state.isCreatingOfferOrder = isCreatingOfferOrder
      state.isConfirmModalVisible = true
    }),

    hideSelectEditionSetModal: action(state => {
      state.isConfirmModalVisible = false
    }),

    setPartnerOfferMap: action((state, payload) => {
      state.partnerOfferMap = payload
    }),
  }),
)

interface ConversationsProviderProps {
  viewer: ConversationsContext_viewer$key
}

export const ConversationsProvider: React.FC<
  React.PropsWithChildren<ConversationsProviderProps>
> = ({ children, viewer }) => {
  const { me } = useFragment(VIEWER_FRAGMENT, viewer)

  const partnerOfferMap: Record<string, PartnerOffer> = extractNodes(
    me?.partnerOffersConnection,
  ).reduce((acc, offer) => {
    if (offer.artworkId) {
      acc[offer.artworkId] = offer
    }
    return acc
  }, {})

  return (
    <ConversationsStore.Provider
      runtimeModel={{
        isConfirmModalVisible: false,
        isCreatingOfferOrder: false,
        partnerOfferMap,
      }}
    >
      <ConversationsContextWrapper>{children}</ConversationsContextWrapper>
    </ConversationsStore.Provider>
  )
}

// Internal wrapper to provide backward compatible context
const ConversationsContextWrapper: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const state = ConversationsStore.useStoreState(state => state)
  const actions = ConversationsStore.useStoreActions(actions => actions)

  const contextValue: ConversationsContextProps = {
    isConfirmModalVisible: state.isConfirmModalVisible,
    isCreatingOfferOrder: state.isCreatingOfferOrder,
    findPartnerOffer: state.findPartnerOffer,
    showSelectEditionSetModal: actions.showSelectEditionSetModal,
    hideSelectEditionSetModal: actions.hideSelectEditionSetModal,
  }

  return (
    <ConversationsContext.Provider value={contextValue}>
      {children}
    </ConversationsContext.Provider>
  )
}

// Legacy context interface for backward compatibility
interface ConversationsContextProps {
  isConfirmModalVisible: boolean
  isCreatingOfferOrder: boolean
  findPartnerOffer: (artworkID: string) => PartnerOffer | null
  showSelectEditionSetModal: (props: { isCreatingOfferOrder: boolean }) => void
  hideSelectEditionSetModal: () => void
}

const ConversationsContext = createContext<ConversationsContextProps>({
  isConfirmModalVisible: false,
  isCreatingOfferOrder: false,
} as unknown as ConversationsContextProps)

// Backward compatible hook
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
