import React, { createContext, useContext, useState } from "react"

export const DEFAULT_MESSAGE =
  "Hi, I’m interested in purchasing this work. Could you please provide more information about the piece?"

export enum Screen {
  Form,
  ExistingUser,
  Login,
  SignUp,
  ResetPassword,
}

export interface ArtworkInquiryState {
  message: string
  /** Discarded once user signs up or logs in */
  email?: string
  /** Discarded once user signs up or logs in */
  name?: string
}

const ArtworkInquiryContext = createContext<{
  currentScreen: Screen
  artworkID: string
  inquiry: ArtworkInquiryState
  navigateTo: React.Dispatch<React.SetStateAction<Screen>>
  onClose(): void
  setInquiry: React.Dispatch<React.SetStateAction<ArtworkInquiryState>>
}>({
  currentScreen: Screen.Form,
  artworkID: "",
  inquiry: { message: DEFAULT_MESSAGE },
  navigateTo: () => {},
  onClose: () => {},
  setInquiry: () => {},
})

export const ArtworkInquiryProvider: React.FC<{
  artworkID: string
  onClose(): void
}> = ({ children, artworkID, onClose }) => {
  const [currentScreen, navigateTo] = useState(Screen.Form)
  const [inquiry, setInquiry] = useState<ArtworkInquiryState>({
    message: DEFAULT_MESSAGE,
  })

  return (
    <ArtworkInquiryContext.Provider
      value={{
        artworkID,
        navigateTo,
        currentScreen,
        onClose,
        inquiry,
        setInquiry,
      }}
    >
      {children}
    </ArtworkInquiryContext.Provider>
  )
}

export const useArtworkInquiryContext = () => {
  return useContext(ArtworkInquiryContext)
}
