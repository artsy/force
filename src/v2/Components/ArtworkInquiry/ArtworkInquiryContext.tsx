import React, { createContext } from "react"
import { useContext } from "react"
import { useState } from "react"

export const DEFAULT_MESSAGE =
  "Hi, I’m interested in purchasing this work. Could you please provide more information about the piece?"

export enum Screen {
  Form,
  Login,
  SignUp,
  Forgot,
}

export interface ArtworkInquiryState {
  message: string
  email?: string
  name?: string
}

const ArtworkInquiryContext = createContext<{
  currentScreen: Screen
  inquiry: ArtworkInquiryState
  navigateTo: React.Dispatch<React.SetStateAction<Screen>>
  onClose(): void
  setInquiry: React.Dispatch<React.SetStateAction<ArtworkInquiryState>>
}>({
  currentScreen: Screen.Form,
  inquiry: { message: DEFAULT_MESSAGE },
  navigateTo: () => {},
  onClose: () => {},
  setInquiry: () => {},
})

export const ArtworkInquiryProvider: React.FC<{ onClose(): void }> = ({
  children,
  onClose,
}) => {
  const [currentScreen, navigateTo] = useState(Screen.Form)
  const [inquiry, setInquiry] = useState<ArtworkInquiryState>({
    message: DEFAULT_MESSAGE,
  })

  return (
    <ArtworkInquiryContext.Provider
      value={{ navigateTo, currentScreen, onClose, inquiry, setInquiry }}
    >
      {children}
    </ArtworkInquiryContext.Provider>
  )
}

export const useArtworkInquiryContext = () => {
  return useContext(ArtworkInquiryContext)
}
