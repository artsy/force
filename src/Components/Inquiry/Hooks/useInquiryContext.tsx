import { Spinner } from "@artsy/palette"
import { Visited } from "Components/Inquiry/Visited"
import { useEngine } from "Components/Inquiry/config"
import { logger } from "Components/Inquiry/util"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { setAfterAuthAction } from "Utils/Hooks/useAuthIntent"
import { WorkflowEngine } from "Utils/WorkflowEngine"
import type { InquiryQuestionInput } from "__generated__/useArtworkInquiryRequestMutation.graphql"
import type { useInquiryContextQuery } from "__generated__/useInquiryContextQuery.graphql"
import type { useInquiryContext_me$data } from "__generated__/useInquiryContext_me.graphql"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
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
  "Personalize your message and include details for the best response."

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
    updatedEnvironment: Environment,
  ) => React.RefObject<Environment>
  View: React.FC
  visited: Visited
  questions: InquiryQuestionInput[]
  addQuestion: (question: InquiryQuestionInput) => void
  addQuestionDetails: (question: InquiryQuestionInput) => void
  removeQuestion: (question: InquiryQuestionInput) => void
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
  questions: [],
  addQuestion: () => {},
  addQuestionDetails: () => {},
  removeQuestion: () => {},
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

  const [questions, setQuestions] = useState<InquiryQuestionInput[]>([])

  const addQuestion = (question: InquiryQuestionInput) => {
    setQuestions(prev => {
      if (prev.find(q => q.questionID === question.questionID)) {
        return prev
      }
      return [...prev, question]
    })
  }

  const addQuestionDetails = (question: InquiryQuestionInput) => {
    setQuestions(prev => {
      return prev.map(q =>
        q.questionID === question.questionID
          ? { ...q, details: question.details }
          : q,
      )
    })
  }

  const removeQuestion = (question: InquiryQuestionInput) => {
    setQuestions(prev => prev.filter(q => q.questionID !== question.questionID))
  }

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
        questions,
        addQuestion,
        addQuestionDetails,
        removeQuestion,
      }}
    >
      {children}
    </InquiryContext.Provider>
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

export const useInquiryContext = () => {
  return useContext(InquiryContext)
}
