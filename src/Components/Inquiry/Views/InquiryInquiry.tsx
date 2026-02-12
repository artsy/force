import InfoIcon from "@artsy/icons/InfoIcon"
import {
  Box,
  Button,
  Expandable,
  Flex,
  Image,
  Join,
  Separator,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
  TextArea,
} from "@artsy/palette"
import { useVariant } from "@unleash/proxy-client-react"
import { InquiryQuestionsList } from "Components/Inquiry/Components/InquiryQuestionsList"
import { useArtworkInquiryRequest } from "Components/Inquiry/Hooks/useArtworkInquiryRequest"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { logger } from "Components/Inquiry/util"
import { RouterLink } from "System/Components/RouterLink"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useTrackFeatureVariantOnMount } from "System/Hooks/useTrackFeatureVariant"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { wait } from "Utils/wait"
import type { InquiryInquiryQuery } from "__generated__/InquiryInquiryQuery.graphql"
import type { InquiryInquiry_artwork$data } from "__generated__/InquiryInquiry_artwork.graphql"
import type * as React from "react"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useArtworkDimensions } from "Apps/Artwork/useArtworkDimensions"

const INQUIRY_CHECKBOXES_FLAG = "emerald_inquiry-checkboxes-on-web"

type Mode = "Pending" | "Sending" | "Error" | "Success"

interface InquiryInquiryProps {
  artwork: InquiryInquiry_artwork$data
}

const InquiryInquiry: React.FC<
  React.PropsWithChildren<InquiryInquiryProps>
> = ({ artwork }) => {
  const { user } = useSystemContext()

  const { next, setInquiry, inquiry, artworkID, setContext, questions } =
    useInquiryContext()

  const [mode, setMode] = useState<Mode>("Pending")

  const { submitArtworkInquiryRequest } = useArtworkInquiryRequest()

  const variant = useVariant(INQUIRY_CHECKBOXES_FLAG)
  const enableCheckboxes = variant.name === "experiment"

  useTrackFeatureVariantOnMount({
    experimentName: INQUIRY_CHECKBOXES_FLAG,
    variantName: variant.name,
  })

  const handleTextAreaChange = ({ value }: { value: string }) => {
    setInquiry(prevState => ({ ...prevState, message: value }))
  }

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
      const res = await submitArtworkInquiryRequest({
        artworkID,
        message: inquiry.message,
      })

      setContext({
        inquiryID: res.submitInquiryRequestMutation?.inquiryRequest?.internalID,
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
    ["Sending"]: "Send",
    ["Success"]: "Sent",
    ["Error"]: "Error",
  }[mode]

  const showErrorMessage =
    enableCheckboxes &&
    questions?.length === 0 &&
    inquiry.message.trim().length === 0

  const { dimensionsLabel } = useArtworkDimensions(artwork.dimensions)

  const artworkDetailItems = [
    { label: "Price", value: artwork.saleMessage },
    { label: "Medium", value: artwork.category },
    { label: "Materials", value: artwork.medium },
    { label: "Classification", value: artwork.attributionClass?.name },
    { label: "Dimensions", value: dimensionsLabel },
    { label: "Signature", value: artwork.signatureInfo?.details },
    { label: "Frame", value: artwork.framed?.details },
    {
      label: "Certificate of Authenticity",
      value: artwork.certificateOfAuthenticity?.details,
    },
  ].filter(item => item.value != null && item.value !== "")

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Text variant="lg-display" mr={4}>
        Send message to gallery
      </Text>

      <Separator my={2} />
      {user && (
        <>
          <Text variant="sm-display" my={2}>
            <Box display="inline-block" width={60} color="mono60">
              From
            </Box>
            {user.name}
          </Text>

          <Separator my={2} />

          <Text variant="sm-display" my={2}>
            <Box display="inline-block" width={60} color="mono60">
              To
            </Box>

            {artwork.partner?.name}
          </Text>
          <Separator my={2} />
        </>
      )}

      {/* Desktop */}
      <Flex alignItems="center" display={["none", "flex"]}>
        <Image
          src={artwork.image?.resized?.src}
          srcSet={artwork.image?.resized?.srcSet}
          width={artwork.image?.resized?.width}
          height={artwork.image?.resized?.height}
          alt=""
          lazyLoad
        />

        <Box flex={1} ml={2}>
          <Text variant="sm-display">{artwork.artist?.name}</Text>

          <Text variant="sm-display" color="mono60">
            {artwork.title} ({artwork.date})
          </Text>

          <Text variant="sm-display" color="mono60" fontStyle="italic">
            {artwork.partner?.name}
          </Text>
        </Box>
      </Flex>

      {/* Mobile */}
      {/* Margin top and bottom below are needed to offset Expandable's spacing */}
      <Box display={["block", "none"]} mt={-2} mb={-1}>
        <Expandable
          label={
            <Flex alignItems="center">
              <Image
                src={artwork.image?.resized?.src}
                srcSet={artwork.image?.resized?.srcSet}
                width={artwork.image?.resized?.width}
                height={artwork.image?.resized?.height}
                alt=""
                lazyLoad
              />

              <Box flex={1} ml={1} overflow="hidden">
                {/* overflowEllipsis is not working properly within the Expandable label, that's why lineClamp is being used here */}
                <Text variant="sm-display" lineClamp={1}>
                  {artwork.artist?.name}
                </Text>
                <Text variant="sm-display" color="mono60" lineClamp={1}>
                  {artwork.title} ({artwork.date})
                </Text>
                <Text
                  variant="sm-display"
                  color="mono60"
                  fontStyle="italic"
                  lineClamp={1}
                >
                  {artwork.partner?.name}
                </Text>
              </Box>
            </Flex>
          }
          borderColor="transparent"
        >
          {artworkDetailItems.length > 0 && (
            <>
              <Spacer y={2} />
              <Join separator={<Spacer y={1} />}>
                {artworkDetailItems.map(({ label, value }) => (
                  <Flex key={label}>
                    <Text
                      variant="xs"
                      color="mono60"
                      width={100}
                      flexShrink={0}
                      mr={2}
                    >
                      {label}
                    </Text>
                    <Text variant="xs">{value}</Text>
                  </Flex>
                ))}
              </Join>
              <Spacer y={2} />
            </>
          )}
        </Expandable>
      </Box>

      <Separator my={2} />

      {enableCheckboxes && (
        <InquiryQuestionsList inquiryQuestions={artwork.inquiryQuestions} />
      )}

      <Text variant="sm">
        Personalize your message and include details for the best response.
      </Text>

      <Spacer y={2} />

      <TextArea
        placeholder="Provide the gallery with some details about your interest in this work."
        title="Your message"
        defaultValue={inquiry.message}
        onChange={handleTextAreaChange}
        error={
          showErrorMessage &&
          "Please enter a message or select at least one option."
        }
        required={!enableCheckboxes}
      />

      <Spacer y={1} />

      <Text variant="xs" display="flex" gap={0.5} color="mono60">
        <InfoIcon flexShrink={0} />
        <div>
          By clicking send, we will share your profile with{" "}
          {artwork.partner?.name}. Update your profile at any time in{" "}
          <RouterLink
            inline
            to="/settings/edit-profile"
            target="_blank"
            color="mono100"
          >
            Settings.
          </RouterLink>
        </div>
      </Text>

      <Spacer y={2} />

      <Button
        type="submit"
        display="block"
        width="100%"
        loading={mode === "Sending"}
        disabled={mode === "Success" || showErrorMessage}
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
        saleMessage
        category
        medium
        attributionClass {
          name
        }
        framed {
          label
          details
        }
        signatureInfo {
          label
          details
        }
        certificateOfAuthenticity {
          label
          details
        }
        dimensions {
          in
          cm
        }
        artist(shallow: true) {
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
        inquiryQuestions {
          internalID
          question
        }
      }
    `,
  },
)

export const InquiryInquiryPlaceholder: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <Skeleton>
      <SkeletonText variant="lg-display" mr={4}>
        Send message to gallery
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

      <SkeletonText variant="xs" mb={0.5}>
        Your message
      </SkeletonText>

      <SkeletonBox height={120} />

      <Spacer y={2} />

      <SkeletonBox height={50} />
    </Skeleton>
  )
}

export const InquiryInquiryQueryRenderer: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
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
