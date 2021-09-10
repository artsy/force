import {
  Box,
  Button,
  Input,
  Separator,
  Spacer,
  Text,
  TextArea,
} from "@artsy/palette"
import React, { useState } from "react"
import { useSystemContext } from "v2/System/useSystemContext"
import { wait } from "v2/Utils/wait"
import { useArtworkInquiryRequest } from "../Hooks/useArtworkInquiryRequest"
import { InquiryState, useInquiryContext } from "../Hooks/useInquiryContext"
import { logger } from "../util"

enum Mode {
  Pending,
  Sending,
  Error,
  Success,
}

export const InquirySpecialist: React.FC = () => {
  const { user } = useSystemContext()

  const { next, setInquiry, inquiry, artworkID } = useInquiryContext()

  const [mode, setMode] = useState<Mode>(Mode.Pending)

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

    setMode(Mode.Sending)

    try {
      await submitArtworkInquiryRequest({
        artworkID,
        message: inquiry.message,
        contactGallery: false,
      })
      setMode(Mode.Success)
      await wait(500)
      next()
    } catch (err) {
      logger.error(err)
      setMode(Mode.Error)
    }
  }

  const label = {
    [Mode.Pending]: "Send",
    [Mode.Sending]: "Send",
    [Mode.Success]: "Sent",
    [Mode.Error]: "Error",
  }[mode]

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Text variant="lg" mr={4}>
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
          <Text variant="md" my={2}>
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
            <a href="/privacy" target="_blank">
              Privacy Policy.
            </a>
          </Text>
        </>
      )}

      <Spacer mt={2} />

      <Button
        type="submit"
        display="block"
        width="100%"
        loading={mode === Mode.Sending}
        disabled={mode === Mode.Success}
      >
        {label}
      </Button>
    </Box>
  )
}
