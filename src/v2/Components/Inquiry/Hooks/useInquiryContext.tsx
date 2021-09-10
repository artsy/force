import React, { createContext, useContext, useRef, useState } from "react"
import { Engine } from "../Engine"
import { useEngine } from "../config"
import { createFragmentContainer, graphql } from "react-relay"
import { useInquiryContext_me } from "v2/__generated__/useInquiryContext_me.graphql"
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
  location?: Location | null
  phone?: string | null
  profession?: string | null
  shareFollows: boolean
  isLoggedIn: boolean
}

export const DEFAULT_CONTEXT: Context = {
  askSpecialist: false,
  collectorLevel: null,
  location: null,
  phone: null,
  profession: null,
  shareFollows: false,
  isLoggedIn: false,
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
  setContext: (updatedContext: Partial<Context>) => React.RefObject<Context>
  setInquiry: React.Dispatch<React.SetStateAction<InquiryState>>
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
  setContext: () => React.createRef<Context>(),
  setInquiry: () => {},
  View: () => <></>,
  visited: new Visited("empty"),
})

interface InquiryProviderProps {
  artworkID: string
  askSpecialist?: boolean
  me: useInquiryContext_me | null
  onClose(): void
}

const InquiryProvider: React.FC<InquiryProviderProps> = ({
  artworkID,
  askSpecialist,
  children,
  me,
  onClose,
}) => {
  /**
   * We store the data concerning the decisions inside of a ref instead of state.
   * The engine gets set as a ref and state would be stale otherwise. We don't use
   * this data to re-render any views; it's only used to make decisions between views.
   */
  const context = useRef<Context>({
    askSpecialist: !!askSpecialist,
    collectorLevel: me?.collectorLevel,
    isLoggedIn: !!me,
    location: !!me?.location?.city ? { city: me.location.city } : null,
    phone: me?.phone,
    profession: me?.profession,
    shareFollows: !!me?.shareFollows,
  })

  // Mutate the decision context directly
  const setContext = (updatedContext: Partial<Context>) => {
    context.current = { ...context.current, ...updatedContext }
    return context
  }

  const [inquiry, setInquiry] = useState<InquiryState>({
    message: DEFAULT_MESSAGE,
  })

  const { engine, current, next, View, visited } = useEngine({
    context,
    onDone: onClose,
  })

  return (
    <InquiryContext.Provider
      value={{
        artworkID,
        context,
        current,
        engine,
        inquiry,
        visited,
        next,
        onClose,
        setContext,
        setInquiry,
        View,
      }}
    >
      {children}
    </InquiryContext.Provider>
  )
}

const InquiryProviderFragmentContainer = createFragmentContainer(
  InquiryProvider,
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

interface InquiryProviderQueryRendererProps {
  artworkID: string
  askSpecialist?: boolean
  onClose(): void
}

export const InquiryProviderQueryRenderer: React.FC<InquiryProviderQueryRendererProps> = ({
  artworkID,
  askSpecialist,
  children,
  onClose,
}) => {
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
          <InquiryProviderFragmentContainer
            artworkID={artworkID}
            askSpecialist={askSpecialist}
            me={props.me}
            onClose={onClose}
          >
            {children}
          </InquiryProviderFragmentContainer>
        )
      }}
    />
  )
}

export const useInquiryContext = () => {
  return useContext(InquiryContext)
}
