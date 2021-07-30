import {
  Banner,
  Box,
  Button,
  Clickable,
  CloseIcon,
  DROP_SHADOW,
  Flex,
  Image,
  Input,
  ModalBase,
  Separator,
  Spacer,
  Spinner,
  Text,
  TextArea,
} from "@artsy/palette"
import { useSystemContext } from "v2/System"
import React from "react"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { ArtworkInquiryQuery } from "v2/__generated__/ArtworkInquiryQuery.graphql"
import { ArtworkInquiry_artwork } from "v2/__generated__/ArtworkInquiry_artwork.graphql"
import { useInquiryRequest } from "./useInquiryRequest"
import { wait } from "v2/Utils/wait"
import styled from "styled-components"
import { useEffect } from "react"

const defaultMessage =
  "Hi, I’m interested in purchasing this work. Could you please provide more information about the piece?"

enum Mode {
  Pending,
  Confirm,
  Sending,
  Error,
  Success,
}

type State = {
  message: string
  name?: string
  email?: string
}

interface ArtworkInquiryProps {
  artwork: ArtworkInquiry_artwork
  onClose(): void
}

const ArtworkInquiry: React.FC<ArtworkInquiryProps> = ({
  artwork,
  onClose,
}) => {
  const { user } = useSystemContext()

  const [state, setState] = useState<State>({ message: defaultMessage })
  const [mode, setMode] = useState<Mode>(Mode.Pending)

  const { submitInquiryRequest } = useInquiryRequest({
    input: {
      inquireableID: artwork.internalID,
      inquireableType: "Artwork",
      ...state,
    },
  })

  const handleTextAreaChange = ({ value }: { value: string }) => {
    if (mode === Mode.Confirm && value !== defaultMessage) {
      setMode(Mode.Pending)
    }

    setState(prevState => ({ ...prevState, message: value }))
  }

  const handleInputChange = (name: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()

    if (state.message === defaultMessage && mode !== Mode.Confirm) {
      setMode(Mode.Confirm)
      return
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
    <Box
      as="form"
      onSubmit={handleSubmit}
      position="relative"
      bg="white100"
      width={700}
      height="100%"
      p={2}
      style={{ boxShadow: DROP_SHADOW }}
    >
      <Text variant="lg" mr={4}>
        Send message to gallery
      </Text>

      <Clickable
        position="absolute"
        right={0}
        top={0}
        pt={2}
        px={1}
        mx={0.5}
        onClick={onClose}
        aria-label="Close"
      >
        <CloseIcon fill="black100" display="block" />
      </Clickable>

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
        defaultValue={defaultMessage}
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

const ArtworkInquiryFragmentContainer = createFragmentContainer(
  ArtworkInquiry,
  {
    artwork: graphql`
      fragment ArtworkInquiry_artwork on Artwork {
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

const ArtworkInquiryPlaceholder: React.FC = () => {
  return <Spinner color="white100" />
}

const Modal = styled(ModalBase)`
  transition: background-color 250ms;
`

export const ArtworkInquiryQueryRenderer = ({
  artworkID,
  onClose,
}: {
  artworkID: string
  onClose(): void
}) => {
  const { relayEnvironment } = useSystemContext()

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <Modal
      bg={isMounted ? "rgba(0, 0, 0, 0.8)" : "transparent"}
      onClose={onClose}
    >
      <SystemQueryRenderer<ArtworkInquiryQuery>
        environment={relayEnvironment!}
        variables={{ id: artworkID }}
        query={graphql`
          query ArtworkInquiryQuery($id: String!) {
            artwork(id: $id) {
              ...ArtworkInquiry_artwork
            }
          }
        `}
        placeholder={<ArtworkInquiryPlaceholder />}
        render={({ error, props }) => {
          if (error) {
            console.error(error)
            return null
          }

          if (!props || !props.artwork) {
            return <ArtworkInquiryPlaceholder />
          }

          return (
            <ArtworkInquiryFragmentContainer
              onClose={onClose}
              artwork={props.artwork}
            />
          )
        }}
      />
    </Modal>
  )
}

export const useArtworkInquiry = () => {
  const [isArtworkInquiryVisible, setIsArtworkInquiryVisible] = useState(false)

  const showArtworkInquiry = () => {
    setIsArtworkInquiryVisible(true)
  }

  const hideArtworkInquiry = () => {
    setIsArtworkInquiryVisible(false)
  }

  return {
    showArtworkInquiry,
    hideArtworkInquiry,
    isArtworkInquiryVisible,
  }
}
