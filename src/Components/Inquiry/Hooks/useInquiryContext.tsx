import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import * as React from "react"
import { WorkflowEngine } from "Utils/WorkflowEngine"
import { useEngine } from "Components/Inquiry/config"
import { createFragmentContainer, graphql, Environment } from "react-relay"
import { useInquiryContext_me$data } from "__generated__/useInquiryContext_me.graphql"
import { useInquiryContextQuery } from "__generated__/useInquiryContextQuery.graphql"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Visited } from "Components/Inquiry/Visited"
import { logger } from "Components/Inquiry/util"
import { Location } from "Components/LocationAutocompleteInput"
import { Spinner } from "@artsy/palette"
import { Environment as IEnvironment } from "react-relay"
import { setAfterAuthAction } from "Utils/Hooks/useAuthIntent"

export type Context = {
  askSpecialist: boolean
  collectorLevel?: number | null
  enableCreateAlert: boolean
  isLoggedIn: boolean
  location?: Location | null
  otherRelevantPositions?: string | null
  profession?: string | null
  requiresReload: boolean
  shareFollows: boolean
}

export const DEFAULT_CONTEXT: Context = {
  askSpecialist: false,
  collectorLevel: null,
  enableCreateAlert: false,
  isLoggedIn: false,
  location: null,
  otherRelevantPositions: null,
  profession: null,
  requiresReload: false,
  shareFollows: false,
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

const InquiryContext = createContext<{
  artworkID: string
  context: React.RefObject<Context>
  current: string
  engine: WorkflowEngine
  inquiry: InquiryState
  next(): void
  dispatchCreateAlert(): void
  onClose(): void
  relayEnvironment: React.RefObject<IEnvironment>
  setContext: (updatedContext: Partial<Context>) => React.RefObject<Context>
  setInquiry: React.Dispatch<React.SetStateAction<InquiryState>>
  /** Set an updated Relay environment once the user is authenticated */
  setRelayEnvironment: (
    updatedEnvironment: Environment
  ) => React.RefObject<Environment>
  View: React.FC
  visited: Visited
}>({
  artworkID: "",
  context: React.createRef<Context>(),
  current: "",
  engine: new WorkflowEngine({ workflow: [] }),
  inquiry: { message: DEFAULT_MESSAGE },
  next: () => {},
  dispatchCreateAlert: () => {},
  onClose: () => {},
  relayEnvironment: React.createRef<Environment>(),
  setContext: () => React.createRef<Context>(),
  setInquiry: () => {},
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

export const InquiryProvider: React.FC<InquiryProviderProps> = ({
  artworkID,
  askSpecialist,
  children,
  enableCreateAlert,
  onClose,
}) => {
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

  const [inquiry, setInquiry] = useState<InquiryState>({
    message: DEFAULT_MESSAGE,
  })

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
    <InquiryContext.Provider
      value={{
        artworkID,
        context,
        current,
        engine,
        inquiry,
        next,
        dispatchCreateAlert,
        onClose: handleClose,
        relayEnvironment,
        setContext,
        setInquiry,
        setRelayEnvironment,
        View,
        visited,
      }}
    >
      {children}
    </InquiryContext.Provider>
  )
}

interface InquiryContextContextProps {
  me: useInquiryContext_me$data | null | undefined
}

const InquiryContextContext: React.FC<InquiryContextContextProps> = ({
  me,
  children,
}) => {
  const { setContext } = useInquiryContext()

  useEffect(() => {
    setContext({
      collectorLevel: me?.collectorLevel,
      isLoggedIn: !!me,
      location: !!me?.location?.city ? { city: me.location.city } : null,
      otherRelevantPositions: me?.otherRelevantPositions,
      profession: me?.profession,
      shareFollows: !!me?.shareFollows,
    })
  }, [me, setContext])

  return <>{children}</>
}

const InquiryContextContextFragmentContainer = createFragmentContainer(
  InquiryContextContext,
  {
    me: graphql`
      fragment useInquiryContext_me on Me {
        collectorLevel
        location {
          city
        }
        otherRelevantPositions
        profession
        shareFollows
      }
    `,
  }
)

export const InquiryContextContextQueryRenderer: React.FC = ({ children }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<useInquiryContextQuery>
      environment={relayEnvironment}
      placeholder={<Spinner color="white100" />}
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
          return <Spinner color="white100" />
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

export const useInquiryContext = () => {
  return useContext(InquiryContext)
}
