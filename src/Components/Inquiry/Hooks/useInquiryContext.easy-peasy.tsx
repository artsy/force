import { createContextStore, Action, action } from "easy-peasy"
import { Spinner } from "@artsy/palette"
import { Visited } from "Components/Inquiry/Visited"
import { useEngine } from "Components/Inquiry/config"
import { logger } from "Components/Inquiry/util"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { setAfterAuthAction } from "Utils/Hooks/useAuthIntent"
import { WorkflowEngine } from "Utils/WorkflowEngine"
import type { useInquiryContextQuery } from "__generated__/useInquiryContextQuery.graphql"
import type { useInquiryContext_me$data } from "__generated__/useInquiryContext_me.graphql"
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  createContext,
} from "react"
import * as React from "react"
import { type Environment, createFragmentContainer, graphql } from "react-relay"
import type { Environment as IEnvironment } from "react-relay"

export interface Context
  extends Omit<useInquiryContext_me$data, " $fragmentType"> {
  askSpecialist: boolean
  enableCreateAlert: boolean
  isLoggedIn: boolean
  requiresReload: boolean
  /** The ID of the inquiry after it's been sent */
  inquiryID?: string
}

export const DEFAULT_CONTEXT: Context = {
  internalID: "guest",
  askSpecialist: false,
  collectorLevel: null,
  enableCreateAlert: false,
  isLoggedIn: false,
  location: null,
  otherRelevantPositions: null,
  profession: null,
  requiresReload: false,
  userInterestsConnection: { totalCount: 0 },
  collectorProfile: { lastUpdatePromptAt: null },
}

export const DEFAULT_MESSAGE =
  "I'm interested in this piece and would like to learn more about it. Could you please provide additional details?"

export interface InquiryState {
  message: string
  /** Discarded once user signs up or logs in */
  email?: string
  /** Discarded once user signs up or logs in */
  name?: string
}

// Easy-peasy store model interface
interface InquiryStoreModel {
  // State
  inquiry: InquiryState

  // Actions
  setInquiry: Action<InquiryStoreModel, InquiryState>
  updateInquiry: Action<InquiryStoreModel, Partial<InquiryState>>
}

// Create the context store
export const InquiryStore = createContextStore<InquiryStoreModel>(
  runtimeModel => ({
    // State
    inquiry: runtimeModel?.inquiry || { message: DEFAULT_MESSAGE },

    // Actions
    setInquiry: action((state, payload) => {
      state.inquiry = payload
    }),

    updateInquiry: action((state, payload) => {
      state.inquiry = { ...state.inquiry, ...payload }
    }),
  }),
)

// Legacy context for complex state that doesn't fit easy-peasy pattern
const InquiryLegacyContext = createContext<{
  artworkID: string
  context: React.RefObject<Context>
  current: string
  engine: WorkflowEngine
  next(): void
  dispatchCreateAlert(): void
  onClose(): void
  relayEnvironment: React.RefObject<IEnvironment>
  setContext: (updatedContext: Partial<Context>) => React.RefObject<Context>
  setRelayEnvironment: (
    updatedEnvironment: Environment,
  ) => React.RefObject<Environment>
  View: React.FC
  visited: Visited
}>({
  artworkID: "",
  context: React.createRef<Context>(),
  current: "",
  engine: new WorkflowEngine({ workflow: [] }),
  next: () => {},
  dispatchCreateAlert: () => {},
  onClose: () => {},
  relayEnvironment: React.createRef<Environment>(),
  setContext: () => React.createRef<Context>(),
  setRelayEnvironment: () => React.createRef<Environment>(),
  View: () => <></>,
  visited: new Visited("empty"),
})

interface InquiryProviderProps {
  artworkID: string
  askSpecialist?: boolean
  enableCreateAlert?: boolean
  onClose(): void
}

export const InquiryProvider: React.FC<
  React.PropsWithChildren<InquiryProviderProps>
> = ({ artworkID, askSpecialist, children, enableCreateAlert, onClose }) => {
  /**
   * We store the data concerning the decisions inside of a ref instead of state.
   * The engine gets set as a ref and state would be stale otherwise. We don't use
   * this data to re-render any views; it's only used to make decisions between views.
   */
  const context = useRef<Context>({
    ...DEFAULT_CONTEXT,
    askSpecialist: !!askSpecialist,
    enableCreateAlert: !!enableCreateAlert,
  })

  // Mutate the decision context directly
  const setContext = useCallback((updatedContext: Partial<Context>) => {
    context.current = { ...context.current, ...updatedContext }
    return context
  }, [])

  const handleClose = () => {
    /**
     * We flip the `requiresReload` flag to `true` after either login or sign up.
     * We currently don't have the ability to fully login a user on the client-side.
     * The reload is what fully logs in the authenticated user.
     */
    if (context.current.requiresReload) {
      window.location.reload()
      return
    }

    onClose()
  }

  const { engine, current, next, View, visited } = useEngine({
    context,
    onDone: handleClose,
  })

  const dispatchCreateAlert = () => {
    // Set this "after auth action", even if we're authenticated, so that the
    // "Create Alert" modal is dispatched upon page reload.
    //
    // TODO: Support "Create Alert" modal dispatch via refactored context
    // provider so we don't need a full page reload when authenticated.

    setAfterAuthAction({
      action: "createAlert",
      kind: "artworks",
      objectId: artworkID,
    })

    window.location.reload()
  }

  const { relayEnvironment: defaultRelayEnvironment } = useSystemContext()

  const relayEnvironment = useRef(defaultRelayEnvironment)

  /**
   * In this flow we go from a logged out state to a logged in/signed up state
   * where we have to execute mutations like sending the inquiry, saving your
   * information, etc. We store the Relay environment in a ref then update it here.
   */
  const setRelayEnvironment = useCallback((updatedEnvironment: Environment) => {
    relayEnvironment.current = updatedEnvironment
    return relayEnvironment
  }, [])

  return (
    <InquiryStore.Provider>
      <InquiryLegacyContext.Provider
        value={{
          artworkID,
          context,
          current,
          engine,
          next,
          dispatchCreateAlert,
          onClose: handleClose,
          relayEnvironment,
          setContext,
          setRelayEnvironment,
          View,
          visited,
        }}
      >
        {children}
      </InquiryLegacyContext.Provider>
    </InquiryStore.Provider>
  )
}

interface InquiryContextContextProps {
  me: useInquiryContext_me$data | null | undefined
}

const InquiryContextContext: React.FC<
  React.PropsWithChildren<InquiryContextContextProps>
> = ({ me, children }) => {
  const { setContext } = useInquiryContext()

  useEffect(() => {
    setContext({ ...me, isLoggedIn: !!me })
  }, [me, setContext])

  return <>{children}</>
}

const InquiryContextContextFragmentContainer = createFragmentContainer(
  InquiryContextContext,
  {
    me: graphql`
      fragment useInquiryContext_me on Me {
        internalID
        collectorLevel
        location {
          city
          state
          postalCode
          country
        }
        otherRelevantPositions
        profession
        userInterestsConnection(interestType: ARTIST, first: 1) {
          totalCount
        }
        collectorProfile {
          lastUpdatePromptAt
        }
      }
    `,
  },
)

export const InquiryContextContextQueryRenderer: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<useInquiryContextQuery>
      environment={relayEnvironment}
      placeholder={<Spinner color="mono0" />}
      query={graphql`
        query useInquiryContextQuery {
          me {
            ...useInquiryContext_me
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          logger.error(error)
          return null
        }

        if (!props) {
          return <Spinner color="mono0" />
        }

        return (
          <InquiryContextContextFragmentContainer me={props.me}>
            {children}
          </InquiryContextContextFragmentContainer>
        )
      }}
    />
  )
}

// Backward compatible hook
export const useInquiryContext = () => {
  const legacyContext = useContext(InquiryLegacyContext)
  const inquiry = InquiryStore.useStoreState(state => state.inquiry)
  const { setInquiry } = InquiryStore.useStoreActions(actions => actions)

  return {
    ...legacyContext,
    inquiry,
    setInquiry,
  }
}

// Export original context name for migration compatibility
export const InquiryContext = InquiryStore
