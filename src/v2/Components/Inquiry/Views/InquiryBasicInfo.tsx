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
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { useInquiryContext } from "../Hooks/useInquiryContext"
import { InquiryBasicInfo_artwork } from "v2/__generated__/InquiryBasicInfo_artwork.graphql"
import { InquiryBasicInfo_me } from "v2/__generated__/InquiryBasicInfo_me.graphql"
import { InquiryBasicInfoQuery } from "v2/__generated__/InquiryBasicInfoQuery.graphql"
import {
  Location,
  LocationAutocompleteInput,
  normalizePlace,
  Place,
} from "v2/Components/LocationAutocompleteInput"
import { useState } from "react"
import { useUpdateMyUserProfile } from "../Hooks/useUpdateMyUserProfile"
import { logger } from "../util"
import { compactObject } from "v2/Utils/compactObject"
import { useMode } from "v2/Utils/Hooks/useMode"

interface InquiryBasicInfoProps {
  artwork: InquiryBasicInfo_artwork
  me: InquiryBasicInfo_me | null
}

type Mode = "Pending" | "Loading" | "Success" | "Error"

const InquiryBasicInfo: React.FC<InquiryBasicInfoProps> = ({ artwork, me }) => {
  const { next, setContext, relayEnvironment } = useInquiryContext()

  const [mode, setMode] = useMode<Mode>("Pending")

  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile({
    relayEnvironment: relayEnvironment.current!,
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

  const handleSelect = (value: boolean) => {
    setState(prevState => ({ ...prevState, shareFollows: value }))
  }

  const handleInputChange = (name: "profession" | "phone") => (
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
      <Text variant="lg" mb={2} pr={2}>
        Tell {artwork.partner?.name ?? "us"} a little bit about yourself.
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
        title="Location"
        name="location"
        placeholder="Location"
        onChange={handleLocation}
        defaultValue={me?.location?.display ?? undefined}
        mb={1}
      />

      <Input
        title="Phone Number"
        name="phone"
        placeholder="Phone Number"
        type="tel"
        onChange={handleInputChange("phone")}
        defaultValue={me?.phone ?? undefined}
        mb={2}
      />

      <Checkbox onSelect={handleSelect} selected={state.shareFollows} mb={2}>
        Share followed artists, categories, and galleries
      </Checkbox>

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
    me: graphql`
      fragment InquiryBasicInfo_me on Me {
        location {
          display
        }
        phone
        profession
      }
    `,
  }
)

export const InquiryBasicInfoQueryRenderer: React.FC = () => {
  const { artworkID, relayEnvironment } = useInquiryContext()

  return (
    <SystemQueryRenderer<InquiryBasicInfoQuery>
      environment={relayEnvironment.current!}
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
