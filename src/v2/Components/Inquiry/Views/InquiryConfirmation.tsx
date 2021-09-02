import { Text } from "@artsy/palette"
import React from "react"
import { useEffect } from "react"
import { useInquiryContext } from "../InquiryContext"

export const InquiryConfirmation: React.FC = () => {
  const { next } = useInquiryContext()

  useEffect(() => {
    const timeout = setTimeout(next, 2500)

    return () => {
      clearTimeout(timeout)
    }
  }, [next])

  return (
    <>
      <Text variant="xl" textAlign="center" my={4}>
        Your message has been sent
      </Text>
    </>
  )
}
