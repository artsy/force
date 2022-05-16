import {
  Banner,
  Box,
  Button,
  Flex,
  Image,
  Input,
  Separator,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
  TextArea,
} from "@artsy/palette"
import { useSystemContext } from "v2/System"
import * as React from "react"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { InquiryInquiry_artwork } from "v2/__generated__/InquiryInquiry_artwork.graphql"
import { InquiryInquiryQuery } from "v2/__generated__/InquiryInquiryQuery.graphql"
import { useArtworkInquiryRequest } from "../Hooks/useArtworkInquiryRequest"
import { wait } from "v2/Utils/wait"
import {
  useInquiryContext,
  DEFAULT_MESSAGE,
  InquiryState,
} from "../Hooks/useInquiryContext"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { logger } from "../util"

type Mode = "Pending" | "Confirm" | "Sending" | "Error" | "Success"

interface InquiryInquiryProps {
  artwork: InquiryInquiry_artwork
}

const InquiryInquiry: React.FC<InquiryInquiryProps> = ({ artwork }) => {
  const { user } = useSystemContext()

  const { next, setInquiry, inquiry, artworkID } = useInquiryContext()

  const [mode, setMode] = useState<Mode>("Pending")

  const { submitArtworkInquiryRequest } = useArtworkInquiryRequest()

  const handleTextAreaChange = ({ value }: { value: string }) => {
    if (mode === "Confirm" && value !== DEFAULT_MESSAGE) {
      setMode("Pending")
    }

    setInquiry(prevState => ({ ...prevState, message: value }))
  }

  const handleInputChange = (name: keyof InquiryState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInquiry(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()

    if (inquiry.message === DEFAULT_MESSAGE && mode !== "Confirm") {
      setMode("Confirm")
      return
    }

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
      })
      setMode("Success")
      await wait(500)
      next()
    } catch (err) {
      logger.error(err)
      setMode("Error")
    }
  }

  const label = {
    ["Pending"]: "Send",
    ["Confirm"]: "Send Anyway?",
    ["Sending"]: "Send",
    ["Success"]: "Sent",
    ["Error"]: "Error",
  }[mode]

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Text variant="lg-display" mr={4}>
        Send message to gallery
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

      <Text variant="sm-display" my={2}>
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
          <Text variant="sm-display">{artwork.artist?.name}</Text>

          <Text variant="sm-display">
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

      <Spacer mt={1} />

      {mode === "Confirm" && (
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
        loading={mode === "Sending"}
        disabled={mode === "Success"}
      >
        {label}
      </Button>
    </Box>
  )
}

const InquiryInquiryFragmentContainer = createFragmentContainer(
  InquiryInquiry,
  {
    artwork: graphql`
      fragment InquiryInquiry_artwork on Artwork {
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

export const InquiryInquiryPlaceholder: React.FC = () => {
  return (
    <Skeleton>
      <SkeletonText variant="lg-display" mr={4}>
        Send message to gallery
      </SkeletonText>

      <Separator my={2} />

      <SkeletonText variant="sm-display" my={2}>
        <Box display="inline-block" width={60}>
          From
        </Box>
        Example Example (example@example.com)
      </SkeletonText>

      <Separator my={2} />

      <SkeletonText variant="sm-display" my={2}>
        <Box display="inline-block" width={60}>
          To
        </Box>
        Example Partner
      </SkeletonText>

      <Separator my={2} />

      <Flex alignItems="center">
        <SkeletonBox width={60} height={45} />

        <Box ml={2}>
          <SkeletonText variant="sm-display">Artist Name</SkeletonText>

          <SkeletonText variant="sm-display">Artwork Title (0000)</SkeletonText>
        </Box>
      </Flex>

      <Separator my={2} />

      <SkeletonText variant="xs" textTransform="uppercase" mb={0.5}>
        Your message
      </SkeletonText>

      <SkeletonBox height={120} />

      <Spacer mt={2} />

      <SkeletonBox height={50} />
    </Skeleton>
  )
}

export const InquiryInquiryQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()
  const { artworkID } = useInquiryContext()

  return (
    <SystemQueryRenderer<InquiryInquiryQuery>
      environment={relayEnvironment}
      placeholder={<InquiryInquiryPlaceholder />}
      query={graphql`
        query InquiryInquiryQuery($id: String!) {
          artwork(id: $id) {
            ...InquiryInquiry_artwork
          }
        }
      `}
      variables={{ id: artworkID }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props || !props.artwork) {
          return <InquiryInquiryPlaceholder />
        }

        return <InquiryInquiryFragmentContainer artwork={props.artwork} />
      }}
    />
  )
}
