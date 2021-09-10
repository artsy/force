import { Clickable, Text } from "@artsy/palette"
import React, { useEffect } from "react"
import { useInquiryContext } from "../Hooks/useInquiryContext"

export const InquiryDone: React.FC = () => {
  const { next, visited } = useInquiryContext()

  useEffect(() => {
    const timeout = setTimeout(next, 2500)

    return () => {
      clearTimeout(timeout)
    }
  }, [next])

  return (
    <Clickable onClick={next} width="100vw" height="100vh">
      <Text variant="xl" textAlign="center" my={4} color="white100">
        {visited.hasSeenThisSession("Confirmation")
          ? "Thank you for completing your profile"
          : "Your message has been sent"}
      </Text>
    </Clickable>
  )
}
