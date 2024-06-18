import {
  Box,
  Button,
  Input,
  Separator,
  Spacer,
  Text,
  TextArea,
  useToasts,
} from "@artsy/palette"
import * as React from "react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { wait } from "Utils/wait"
import { useArtworkInquiryRequest } from "Components/Inquiry/Hooks/useArtworkInquiryRequest"
import {
  InquiryState,
  useInquiryContext,
} from "Components/Inquiry/Hooks/useInquiryContext"
import { logger } from "Components/Inquiry/util"
import { useMode } from "Utils/Hooks/useMode"
import { RouterLink } from "System/Components/RouterLink"

type Mode = "Pending" | "Sending" | "Error" | "Success"

export const InquirySpecialist: React.FC = () => {
  const { user } = useSystemContext()
  const { sendToast } = useToasts()

  const { next, setInquiry, inquiry, artworkID } = useInquiryContext()

  const [mode, setMode] = useMode<Mode>("Pending")

  const handleTextAreaChange = ({ value }: { value: string }) => {
    setInquiry(prevState => ({ ...prevState, message: value }))
  }

  const handleInputChange = (name: keyof InquiryState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInquiry(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const { submitArtworkInquiryRequest } = useArtworkInquiryRequest()

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()

    // If the user is logged out we just go to the next view which should
    // be the authentication step. The inquiry gets sent after login or sign up.
    if (!user) {
      next()
      return
    }

    setMode("Sending")

    try {
      await submitArtworkInquiryRequest({
        artworkID,
        message: inquiry.message,
        contactGallery: false,
      })
      setMode("Success")
      await wait(500)
      sendToast({
        variant: "success",
        message: "Your message has been sent",
      })
      next()
    } catch (err) {
      logger.error(err)
      setMode("Error")
    }
  }

  const label = {
    ["Pending"]: "Send",
    ["Sending"]: "Send",
    ["Success"]: "Sent",
    ["Error"]: "Error",
  }[mode]

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Text variant="lg-display" mr={4}>
        Send message to Artsy
      </Text>

      <Separator my={2} />

      <Text variant="sm">
        An Artsy Specialist is available to answer your questions and help you
        collect through Artsy.
      </Text>

      <Separator my={2} />

      {user && (
        <>
          <Text variant="sm-display" my={2}>
            <Box display="inline-block" width={60} color="black60">
              From
            </Box>
            {user.name} ({user.email})
          </Text>

          <Separator my={2} />
        </>
      )}

      <TextArea
        name="message"
        placeholder="Leave your comments"
        title="Your message"
        onChange={handleTextAreaChange}
        required
      />

      {!user && (
        <>
          <Input
            name="name"
            title="Your name"
            placeholder="Your full name"
            onChange={handleInputChange("name")}
            required
            my={1}
          />

          <Input
            name="email"
            title="Your email"
            placeholder="Your email address"
            onChange={handleInputChange("email")}
            type="email"
            required
            my={1}
          />

          <Text variant="xs">
            By clicking send, you accept our{" "}
            <RouterLink inline to="/privacy" target="_blank">
              Privacy Policy.
            </RouterLink>
          </Text>
        </>
      )}

      <Spacer y={2} />

      <Button
        type="submit"
        display="block"
        width="100%"
        loading={mode === "Sending"}
        disabled={mode === "Success"}
      >
        {label}
      </Button>
    </Box>
  )
}
