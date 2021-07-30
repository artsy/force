import {
  Banner,
  Box,
  Button,
  Flex,
  Image,
  Input,
  Separator,
  Spacer,
  Text,
  TextArea,
} from "@artsy/palette"
import { useSystemContext } from "v2/System"
import React from "react"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkInquiryForm_artwork } from "v2/__generated__/ArtworkInquiryForm_artwork.graphql"
import { useInquiryRequest } from "./useInquiryRequest"
import { wait } from "v2/Utils/wait"
import {
  useArtworkInquiryContext,
  DEFAULT_MESSAGE,
  Screen,
  ArtworkInquiryState,
} from "./ArtworkInquiryContext"

enum Mode {
  Pending,
  Confirm,
  Sending,
  Error,
  Success,
}

interface ArtworkInquiryFormProps {
  artwork: ArtworkInquiryForm_artwork
}

const ArtworkInquiryForm: React.FC<ArtworkInquiryFormProps> = ({ artwork }) => {
  const { user } = useSystemContext()

  const {
    onClose,
    navigateTo,
    setInquiry,
    inquiry,
  } = useArtworkInquiryContext()

  const [mode, setMode] = useState<Mode>(Mode.Pending)

  const { submitInquiryRequest } = useInquiryRequest({
    input: {
      inquireableID: artwork.internalID,
      inquireableType: "Artwork",
      ...inquiry,
    },
  })

  const handleTextAreaChange = ({ value }: { value: string }) => {
    if (mode === Mode.Confirm && value !== DEFAULT_MESSAGE) {
      setMode(Mode.Pending)
    }

    setInquiry(prevState => ({ ...prevState, message: value }))
  }

  const handleInputChange = (name: keyof ArtworkInquiryState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInquiry(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()

    if (inquiry.message === DEFAULT_MESSAGE && mode !== Mode.Confirm) {
      setMode(Mode.Confirm)
      return
    }

    if (!user) {
      navigateTo(Screen.SignUp)
    }

    setMode(Mode.Sending)

    try {
      await submitInquiryRequest()
      setMode(Mode.Success)
      await wait(5000)
      onClose()
    } catch (err) {
      console.error(err)
      setMode(Mode.Error)
    }
  }

  const label = {
    [Mode.Pending]: "Send",
    [Mode.Confirm]: "Send Anyway?",
    [Mode.Sending]: "Send",
    [Mode.Success]: "Success",
    [Mode.Error]: "Error",
  }[mode]

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Text variant="lg" mr={4}>
        Send message to gallery
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

      <Text variant="md" my={2}>
        <Box display="inline-block" width={60} color="black60">
          To
        </Box>

        {artwork.partner?.name}
      </Text>

      <Separator my={2} />

      <Flex alignItems="center">
        <Image
          src={artwork.image?.resized?.src}
          srcSet={artwork.image?.resized?.srcSet}
          width={artwork.image?.resized?.width}
          height={artwork.image?.resized?.height}
          alt=""
          lazyLoad
        />

        <Box ml={2}>
          <Text variant="md">{artwork.artist?.name}</Text>

          <Text variant="md">
            {artwork.title} ({artwork.date})
          </Text>
        </Box>
      </Flex>

      <Separator my={2} />

      <TextArea
        placeholder="Provide the gallery with some details about your interest in this work."
        title="Your message"
        defaultValue={DEFAULT_MESSAGE}
        onChange={handleTextAreaChange}
        required
      />

      {!user && (
        <>
          <Input
            title="Your name"
            placeholder="Your full name"
            onChange={handleInputChange("name")}
            required
            my={1}
          />

          <Input
            title="Your email"
            placeholder="Your email address"
            onChange={handleInputChange("name")}
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

      <Spacer mt={1} />

      {mode === Mode.Success && (
        <Banner variant="success">Your Message Has Been Sent</Banner>
      )}

      {mode === Mode.Confirm && (
        <Banner variant="defaultLight">
          We recommend personalizing your message to get a faster answer from
          the gallery.
        </Banner>
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

export const ArtworkInquiryFormFragmentContainer = createFragmentContainer(
  ArtworkInquiryForm,
  {
    artwork: graphql`
      fragment ArtworkInquiryForm_artwork on Artwork {
        internalID
        title
        date
        artist {
          name
        }
        partner {
          name
        }
        image {
          resized(width: 60, height: 45) {
            height
            width
            src
            srcSet
          }
        }
      }
    `,
  }
)
