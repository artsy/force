import React, { createContext } from "react"
import { Engine } from "../Engine"
import { useEngine } from "../config"
import { useContext } from "react"
import { useState } from "react"

export const DEFAULT_MESSAGE =
  "Hi, I’m interested in purchasing this work. Could you please provide more information about the piece?"

export interface InquiryState {
  message: string
  /** Discarded once user signs up or logs in */
  email?: string
  /** Discarded once user signs up or logs in */
  name?: string
}

const emptyEngine = new Engine({ context: {}, workflow: [] })

const InquiryContext = createContext<{
  artworkID: string
  current: string
  engine: typeof emptyEngine
  inquiry: InquiryState
  next(): void
  onClose(): void
  setInquiry: React.Dispatch<React.SetStateAction<InquiryState>>
  View: React.FC
}>({
  artworkID: "",
  current: "",
  engine: emptyEngine,
  inquiry: { message: DEFAULT_MESSAGE },
  next: () => {},
  onClose: () => {},
  setInquiry: () => {},
  View: () => <></>,
})

interface InquiryProviderProps {
  artworkID: string
  onClose(): void
}

export const InquiryProvider: React.FC<InquiryProviderProps> = ({
  artworkID,
  onClose,
  children,
}) => {
  const { engine, current, next, View } = useEngine()

  const [inquiry, setInquiry] = useState<InquiryState>({
    message: DEFAULT_MESSAGE,
  })

  return (
    <InquiryContext.Provider
      value={{
        artworkID,
        engine,
        current,
        inquiry,
        next,
        onClose,
        setInquiry,
        View,
      }}
    >
      {children}
    </InquiryContext.Provider>
  )
}

export const useInquiryContext = () => {
  return useContext(InquiryContext)
}
