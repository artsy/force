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
import { useInquiryContext_artwork$data } from "__generated__/useInquiryContext_artwork.graphql"
import { useInquiryContextQuery } from "__generated__/useInquiryContextQuery.graphql"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useSystemContext } from "System/useSystemContext"
import { Visited } from "Components/Inquiry/Visited"
import { logger } from "Components/Inquiry/util"
import { Location } from "Components/LocationAutocompleteInput"
import { Spinner } from "@artsy/palette"
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment"

export type Context = {
  askSpecialist: boolean
  collectorLevel?: number | null
  isLoggedIn: boolean
  location?: Location | null
  otherRelevantPositions?: string | null
  profession?: string | null
  requiresReload: boolean
  shareFollows: boolean
  artwork: useInquiryContext_artwork$data | null
}

export const DEFAULT_CONTEXT: Context = {
  askSpecialist: false,
  collectorLevel: null,
  isLoggedIn: false,
  location: null,
  otherRelevantPositions: null,
  profession: null,
  requiresReload: false,
  shareFollows: false,
  artwork: null,
}

export const AUTOMATED_MESSAGES = [
  "Hi, I’m interested in purchasing this work. Could you please provide more information about the piece?",
  "Hello, I'm interested in this artwork. Could you provide more details about it?",
  "Hi, I came across this piece and would love to learn more about it. Can you provide additional information?",
  "Hi there, I'm interested in buying this work. Could you please share some more information about it?",
  "Hello, I'm interested in this piece. Could you please provide me with more information about it?",
  "Hi, I would love to add this artwork to my collection. Could you please provide me with more details?",
  "Hi there, I'm interested in this piece. Could you please provide me with additional details?",
  "Hello, I'm interested in purchasing this artwork. Can you provide me with more information about it?",
  "Hi, I'm interested in this piece and would love to know more about it. Could you please provide additional information?",
  "Hi there, I'm interested in this piece and would like to learn more about it. Could you please provide additional details?",
  "Hello, I'm considering purchasing this artwork. Can you provide me with more information about the piece?",
  "Hi, I'm interested in this work and would love to know more about it. Could you please provide additional information?",
  "Hi there! Can you tell me more about this artwork? I'm very interested in it.",
  "Hello, this artwork caught my eye. Any chance you could provide me with more details about it?",
  "Hi, I'd love to learn more about this artwork! Could you tell me more about it?",
  "Hello! Could you give me some additional information about this artwork? I'm really interested in it.",
  "I'm very interested in this artwork. Could you please provide me with more details about it?",
  "This artwork is fascinating! Could you please share some additional information about it?",
  "Hi there! I'd like to know more about this piece. Could you tell me about it?",
  "I'm very interested in this artwork. Would you mind providing me with more information about it?",
  "I'd like to know more about this work. Could you share some additional information with me?",
  "Hello! This artwork is intriguing. Could you please provide me with more details about it?",
  "I'm very interested in this artwork. Can you give me more information about it?",
  "Hi there! This piece is captivating. Could you tell me more about it?",
  "I'm intrigued by this artwork. Could you please tell me more about it?",
  "Hello, I'm interested in learning more about this artwork. Could you provide me with additional details?",
  "Hi there! This artwork is stunning. Can you tell me more about it?",
  "I'm very interested in this artwork. Would you mind giving me more details about it?",
  "Hello! Could you please provide me with more details about this artwork? I'm quite interested in it.",
  "This artwork is incredible! Could you share some additional information with me about it?",
  "I'm interested in learning more about this piece. Can you tell me more about it?",
  "Hi there! This artwork is breathtaking. Could you please provide me with more information about it?",
  "Hello, I'm interested in this artwork and would love to know more about it.",
  "Hi, I collect art and was intrigued by this artwork. Can you provide additional information?",
  "Hello, I'm a collector and would like to inquire about this artwork. Could you please share more details?",
  "Hi, I'm very interested in this artwork and would appreciate more information about it.",
  "Hi there, I'm interested in this artwork and would like to know more about it. Can you provide further information?",
  "Hello, I'm a collector and would love to learn more about this artwork. Could you please share additional details?",
  "Hi, as someone who collects art, I was intrigued by this piece. Can you provide more information about it?",
  "Hi, I'm a collector and would like to know more about this artwork. Can you please provide additional information?",
]

const getAutomatedMessages = () => {
  return AUTOMATED_MESSAGES[
    Math.floor(Math.random() * AUTOMATED_MESSAGES.length)
  ]
}

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
  engine: new WorkflowEngine({ workflow: [] }),
  inquiry: { message: getAutomatedMessages() },
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
    message: getAutomatedMessages(),
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
  const setRelayEnvironment = useCallback(
    (updatedEnvironment: RelayModernEnvironment) => {
      relayEnvironment.current = updatedEnvironment
      return relayEnvironment
    },
    []
  )

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
  artwork: useInquiryContext_artwork$data | null
}

const InquiryContextContext: React.FC<InquiryContextContextProps> = ({
  me,
  artwork,
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
      artwork: artwork ?? null,
    })
  }, [me, artwork, setContext])

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
    artwork: graphql`
      fragment useInquiryContext_artwork on Artwork {
        artist {
          internalID
          name
          slug
        }
      }
    `,
  }
)

interface InquiryContextContextQueryRendererProps {
  artworkID: string
}

export const InquiryContextContextQueryRenderer: React.FC<InquiryContextContextQueryRendererProps> = ({
  children,
  artworkID,
}) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<useInquiryContextQuery>
      environment={relayEnvironment}
      placeholder={<Spinner color="white100" />}
      query={graphql`
        query useInquiryContextQuery($id: String!) {
          me {
            ...useInquiryContext_me
          }
          artwork(id: $id) {
            ...useInquiryContext_artwork
          }
        }
      `}
      variables={{ id: artworkID }}
      render={({ props, error }) => {
        if (error) {
          logger.error(error)
          return null
        }

        if (!props) {
          return <Spinner color="white100" />
        }

        return (
          <InquiryContextContextFragmentContainer
            me={props.me}
            artwork={props.artwork}
          >
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
