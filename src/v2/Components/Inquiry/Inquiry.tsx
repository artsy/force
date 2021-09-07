import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { InquiryProvider } from "./Hooks/useInquiryContext"
import { InquiryDialog, InquiryBackdrop } from "./InquiryDialog"

interface InquiryProps {
  artworkID: string
  onClose(): void
}

export const Inquiry: React.FC<InquiryProps> = ({ artworkID, onClose }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <InquiryProvider artworkID={artworkID} onClose={onClose}>
      <InquiryBackdrop
        bg={isMounted ? "rgba(0, 0, 0, 0.8)" : "transparent"}
        onClose={onClose}
      >
        <InquiryDialog />
      </InquiryBackdrop>
    </InquiryProvider>
  )
}
