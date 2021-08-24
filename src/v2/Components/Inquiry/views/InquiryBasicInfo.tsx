import {
  Banner,
  Box,
  Button,
  Checkbox,
  Input,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { useInquiryContext } from "../InquiryContext"
import { InquiryBasicInfo_artwork } from "v2/__generated__/InquiryBasicInfo_artwork.graphql"
import { InquiryBasicInfoQuery } from "v2/__generated__/InquiryBasicInfoQuery.graphql"
import { useSystemContext } from "v2/System"
import {
  Location,
  LocationAutocompleteInput,
  normalizePlace,
  Place,
} from "v2/Components/LocationAutocompleteInput"
import { useState } from "react"
import { useUpdateMyUserProfile } from "../useUpdateMyUserProfile"
import { logger } from "../util"

enum Mode {
  Pending,
  Loading,
  Success,
  Error,
}

interface InquiryBasicInfoProps {
  artwork: InquiryBasicInfo_artwork
}

const InquiryBasicInfo: React.FC<InquiryBasicInfoProps> = ({ artwork }) => {
  const { next } = useInquiryContext()
  const [mode, setMode] = useState(Mode.Pending)
  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile()

  const [state, setState] = useState<{
    profession: string | null
    location: Location | null
    phoneNumber: string | null
    shareFollows: boolean
  }>({
    profession: null,
    location: null,
    phoneNumber: null,
    shareFollows: false,
  })

  const handleLocation = (place: Place) => {
    setState(prevState => ({ ...prevState, location: normalizePlace(place) }))
  }

  const handleSelect = (value: boolean) => {
    setState(prevState => ({ ...prevState, shareFollows: value }))
  }

  const handleInputChange = (name: "profession" | "phoneNumber") => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()

    setMode(Mode.Loading)

    try {
      await submitUpdateMyUserProfile({ phone: state.phoneNumber })
      setMode(Mode.Success)
      next()
    } catch (err) {
      logger.error(err)
      setMode(Mode.Error)
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Text variant="lg" mb={2}>
        Tell {artwork.partner?.name ?? "us"} a little bit about yourself.
      </Text>

      {mode === Mode.Error && (
        <Banner variant="error" dismissable my={2}>
          Something went wrong. Please try again.
        </Banner>
      )}

      <Input
        title="Profession"
        name="profession"
        placeholder="Profession"
        onChange={handleInputChange("profession")}
        mb={1}
      />

      <LocationAutocompleteInput
        title="Location"
        name="location"
        placeholder="Location"
        onChange={handleLocation}
        mb={1}
      />

      <Input
        title="Phone Number"
        name="phoneNumber"
        placeholder="Phone Number"
        type="tel"
        onChange={handleInputChange("phoneNumber")}
        mb={2}
      />

      <Checkbox onSelect={handleSelect} selected={state.shareFollows} mb={2}>
        Share followed artists, categories, and galleries
      </Checkbox>

      <Button
        type="submit"
        width="100%"
        loading={mode === Mode.Loading}
        disabled={mode === Mode.Success}
      >
        Next
      </Button>
    </Box>
  )
}

const InquiryBasicInfoPlaceholder: React.FC = () => {
  return (
    <Skeleton>
      <SkeletonText variant="lg" mb={2}>
        Tell Example Partner a little bit about yourself.
      </SkeletonText>

      <SkeletonText variant="xs" textTransform="uppercase" mb={0.5}>
        Profession
      </SkeletonText>

      <SkeletonBox height={50} mb={1} />

      <SkeletonText variant="xs" textTransform="uppercase" mb={0.5}>
        Location
      </SkeletonText>

      <SkeletonBox height={50} mb={1} />

      <SkeletonText variant="xs" textTransform="uppercase" mb={0.5}>
        Phone Number
      </SkeletonText>

      <SkeletonBox height={50} mb={2} />

      <SkeletonText variant="sm" mb={2}>
        Share followed artists, categories, and galleries
      </SkeletonText>

      <SkeletonBox height={50} />
    </Skeleton>
  )
}

export const InquiryBasicInfoFragmentContainer = createFragmentContainer(
  InquiryBasicInfo,
  {
    artwork: graphql`
      fragment InquiryBasicInfo_artwork on Artwork {
        partner {
          name
        }
      }
    `,
  }
)

export const InquiryBasicInfoQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()
  const { artworkID } = useInquiryContext()

  return (
    <SystemQueryRenderer<InquiryBasicInfoQuery>
      environment={relayEnvironment}
      placeholder={<InquiryBasicInfoPlaceholder />}
      query={graphql`
        query InquiryBasicInfoQuery($id: String!) {
          artwork(id: $id) {
            ...InquiryBasicInfo_artwork
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
          return <InquiryBasicInfoPlaceholder />
        }

        return <InquiryBasicInfoFragmentContainer artwork={props.artwork} />
      }}
    />
  )
}
