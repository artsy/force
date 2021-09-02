import React, { useState } from "react"
import { Inquiry } from "../Inquiry"

interface UseInquiry {
  artworkID: string
}

export const useInquiry = ({ artworkID }: UseInquiry) => {
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
        <Inquiry artworkID={artworkID} onClose={hideInquiry} />
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
