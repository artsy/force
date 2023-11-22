import {
  Banner,
  Box,
  Button,
  Input,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { Environment, createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { InquiryBasicInfo_artwork$data } from "__generated__/InquiryBasicInfo_artwork.graphql"
import { InquiryBasicInfo_me$data } from "__generated__/InquiryBasicInfo_me.graphql"
import { InquiryBasicInfoQuery } from "__generated__/InquiryBasicInfoQuery.graphql"
import {
  Location,
  LocationAutocompleteInput,
  normalizePlace,
  Place,
} from "Components/LocationAutocompleteInput"
import { useState } from "react"
import { useUpdateMyUserProfile } from "Components/Inquiry/Hooks/useUpdateMyUserProfile"
import { logger } from "Components/Inquiry/util"
import { compactObject } from "Utils/compactObject"
import { useMode } from "Utils/Hooks/useMode"

interface InquiryBasicInfoProps {
  artwork: InquiryBasicInfo_artwork$data
  me: InquiryBasicInfo_me$data | null | undefined
}

type Mode = "Pending" | "Loading" | "Success" | "Error"

const InquiryBasicInfo: React.FC<InquiryBasicInfoProps> = ({ artwork, me }) => {
  const { next, setContext, relayEnvironment } = useInquiryContext()

  const [mode, setMode] = useMode<Mode>("Pending")

  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile({
    relayEnvironment: relayEnvironment.current as Environment,
  })

  const [state, setState] = useState<{
    profession: string | null
    location: Location | null
    phone: string | null
    shareFollows: boolean
  }>({
    profession: null,
    location: null,
    phone: null,
    shareFollows: true,
  })

  const handleLocation = (place: Place) => {
    setState(prevState => ({ ...prevState, location: normalizePlace(place) }))
  }

  const handleInputChange = (name: "profession" | "otherRelevantPositions") => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()

    setMode("Loading")

    const input = compactObject(state)

    setContext(input)

    try {
      await submitUpdateMyUserProfile(input)
      setMode("Success")
      next()
    } catch (err) {
      logger.error(err)
      setMode("Error")
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Text variant="lg-display" pr={2}>
        Tell {artwork.partner?.name ?? "us"} a little bit about yourself.
      </Text>

      <Text variant="xs" mb={2} color="black60">
        Galleries are more likely to respond to collectors who share their
        profile.
      </Text>

      {mode === "Error" && (
        <Banner variant="error" dismissable my={2}>
          Something went wrong. Please try again.
        </Banner>
      )}

      <Input
        title="Profession"
        name="profession"
        placeholder="Profession"
        onChange={handleInputChange("profession")}
        defaultValue={me?.profession ?? undefined}
        mb={1}
      />

      <LocationAutocompleteInput
        title="Primary Location"
        name="location"
        placeholder="Location"
        onChange={handleLocation}
        defaultValue={me?.location?.display ?? undefined}
        mb={1}
      />

      <Input
        title="Other relevant positions"
        name="otherRelevantPositions"
        placeholder="Memberships, institutions, positions"
        onChange={handleInputChange("otherRelevantPositions")}
        defaultValue={me?.otherRelevantPositions ?? undefined}
        mb={2}
      />

      <Button
        type="submit"
        width="100%"
        loading={mode === "Loading"}
        disabled={mode === "Success"}
      >
        Next
      </Button>
    </Box>
  )
}

const InquiryBasicInfoPlaceholder: React.FC = () => {
  return (
    <Skeleton>
      <SkeletonText variant="lg-display">
        Tell Example Partner a little bit about yourself.
      </SkeletonText>

      <SkeletonText variant="xs" mb={2}>
        Galleries are more likely to respond to collectors who share their
        profile.
      </SkeletonText>

      <SkeletonText variant="xs" mb={0.5}>
        Profession
      </SkeletonText>

      <SkeletonBox height={50} mb={1} />

      <SkeletonText variant="xs" mb={0.5}>
        Location
      </SkeletonText>

      <SkeletonBox height={50} mb={1} />

      <SkeletonText variant="xs" mb={0.5}>
        Phone Number
      </SkeletonText>

      <SkeletonBox height={50} mb={2} />

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
    me: graphql`
      fragment InquiryBasicInfo_me on Me {
        location {
          display
        }
        otherRelevantPositions
        profession
      }
    `,
  }
)

export const InquiryBasicInfoQueryRenderer: React.FC = () => {
  const { artworkID, relayEnvironment } = useInquiryContext()

  return (
    <SystemQueryRenderer<InquiryBasicInfoQuery>
      environment={relayEnvironment.current as Environment}
      placeholder={<InquiryBasicInfoPlaceholder />}
      query={graphql`
        query InquiryBasicInfoQuery($id: String!) {
          artwork(id: $id) {
            ...InquiryBasicInfo_artwork
          }
          me {
            ...InquiryBasicInfo_me
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

        return (
          <InquiryBasicInfoFragmentContainer
            artwork={props.artwork}
            me={props.me}
          />
        )
      }}
    />
  )
}
