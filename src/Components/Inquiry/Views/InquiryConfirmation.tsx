import { Clickable, Text } from "@artsy/palette"
import * as React from "react";
import { useEffect } from "react"
import { useInquiryContext } from "../Hooks/useInquiryContext"

export const InquiryConfirmation: React.FC = () => {
  const { next } = useInquiryContext()

  useEffect(() => {
    const timeout = setTimeout(next, 2500)

    return () => {
      clearTimeout(timeout)
    }
  }, [next])

  return (
    <Clickable onClick={next} width="100vw" height="100vh">
      <Text variant="xl" textAlign="center" my={4} px={2} color="white100">
        Your message has been sent
      </Text>
    </Clickable>
  )
}
