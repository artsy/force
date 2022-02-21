import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import * as React from "react"
import { Engine } from "../Engine"
import { useEngine } from "../config"
import { createFragmentContainer, graphql, Environment } from "react-relay"
import { useInquiryContext_me$data } from "v2/__generated__/useInquiryContext_me.graphql"
import { useInquiryContextQuery } from "v2/__generated__/useInquiryContextQuery.graphql"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { useSystemContext } from "v2/System"
import { Visited } from "../Visited"
import { logger } from "../util"
import { Location } from "v2/Components/LocationAutocompleteInput"
import { Spinner } from "@artsy/palette"

export type Context = {
  askSpecialist: boolean
  collectorLevel?: number | null
  isLoggedIn: boolean
  location?: Location | null
  phone?: string | null
  profession?: string | null
  requiresReload: boolean
  shareFollows: boolean
}

export const DEFAULT_CONTEXT: Context = {
  askSpecialist: false,
  collectorLevel: null,
  isLoggedIn: false,
  location: null,
  phone: null,
  profession: null,
  requiresReload: false,
  shareFollows: false,
}

export const DEFAULT_MESSAGE =
  "Hi, I’m interested in purchasing this work. Could you please provide more information about the piece?"

export interface InquiryState {
  message: string
  /** Discarded once user signs up or logs in */
  email?: string
  /** Discarded once user signs up or logs in */
  name?: string
}

const emptyEngine = new Engine({
  workflow: [],
})

const InquiryContext = createContext<{
  artworkID: string
  context: React.RefObject<Context>
  current: string
  engine: typeof emptyEngine
  inquiry: InquiryState
  next(): void
  onClose(): void
  relayEnvironment: React.RefObject<Environment>
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
  engine: emptyEngine,
  inquiry: { message: DEFAULT_MESSAGE },
  next: () => {},
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
  onClose(): void
}

export const InquiryProvider: React.FC<InquiryProviderProps> = ({
  artworkID,
  askSpecialist,
  children,
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

  const { relayEnvironment: defaultRelayEnvironment } = useSystemContext()

  const relayEnvironment = useRef(defaultRelayEnvironment!)

  /**
   * In this flow we go from a logged out state to a logged in/signed up state
   * where we have to execute mutations like sending the inquiry, saving your
   * information, etc. We store the Relay environment in a ref then update it here.
   */
  const setRelayEnvironment = useCallback((updatedEnvironment: Environment) => {
    // @ts-ignore UPGRADE RELAY 13
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
  me: useInquiryContext_me$data | null
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
      phone: me?.phone,
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
        phone
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
