import React, { useState } from "react"
import { Inquiry } from "./Inquiry"

interface UseInquiry {
  artworkID: string
  askSpecialist?: boolean
}

export const useInquiry = ({ artworkID, askSpecialist }: UseInquiry) => {
  const [isInquiryVisible, setIsInquiryVisible] = useState(false)

  const showInquiry = () => {
    setIsInquiryVisible(true)
  }

  const hideInquiry = () => {
    setIsInquiryVisible(false)
  }

  const inquiryQuestionnaire = (
    <>
      {isInquiryVisible && (
        <Inquiry
          artworkID={artworkID}
          onClose={hideInquiry}
          askSpecialist={askSpecialist}
        />
      )}
    </>
  )

  return {
    showInquiry,
    hideInquiry,
    isInquiryVisible,
    inquiryQuestionnaire,
  }
}
