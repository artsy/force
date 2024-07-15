import {
  Button,
  Input,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  useToasts,
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
} from "Components/LocationAutocompleteInput"
import { useUpdateMyUserProfile } from "Components/Inquiry/Hooks/useUpdateMyUserProfile"
import { logger } from "Components/Inquiry/util"
import { Form, Formik } from "formik"
import { ActionType, ContextModule, EditedUserProfile } from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"

interface InquiryBasicInfoProps {
  artwork: InquiryBasicInfo_artwork$data
  me: InquiryBasicInfo_me$data | null | undefined
}

const InquiryBasicInfo: React.FC<InquiryBasicInfoProps> = ({ artwork, me }) => {
  const { next, setContext, relayEnvironment } = useInquiryContext()

  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile({
    relayEnvironment: relayEnvironment.current as Environment,
  })

  const { sendToast } = useToasts()

  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()

  const handleSubmit = async (values: InquiryBasicInfoInput) => {
    try {
      const location = {
        city: values.location?.city || null,
        state: values.location?.state || null,
        country: values.location?.country || null,
        countryCode: values.location?.countryCode || null,
        postalCode: values.location?.postalCode || null,
      }

      const payload = {
        name: values.name,
        location,
        profession: values.profession,
        otherRelevantPositions: values.otherRelevantPositions,
      }

      setContext(payload)

      await submitUpdateMyUserProfile(payload)

      sendToast({ variant: "success", message: "Profile information saved." })

      const editedUserProfile: EditedUserProfile = {
        action: ActionType.editedUserProfile,
        context_screen: ContextModule.inquiry,
        context_screen_owner_type: contextPageOwnerType,
        platform: "web",
      }

      trackEvent(editedUserProfile)

      next()
    } catch (err) {
      logger.error(err)

      sendToast({ variant: "error", message: err.message })
    }
  }

  return (
    <Formik<InquiryBasicInfoInput>
      onSubmit={handleSubmit}
      initialValues={{
        name: me?.name ?? "",
        location: me?.location ?? {},
        profession: me?.profession ?? "",
        otherRelevantPositions: me?.otherRelevantPositions ?? "",
      }}
    >
      {({ values, setFieldValue, handleChange, handleBlur, isSubmitting }) => {
        return (
          <Stack as={Form} gap={4}>
            <Stack gap={2}>
              <Text variant="lg-display" pr={2}>
                Tell {artwork.partner?.name ?? "us"} a little bit about
                yourself.
              </Text>

              <Input
                title="Name"
                name="name"
                defaultValue={me?.name ?? ""}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <LocationAutocompleteInput
                title="Primary Location"
                name="location"
                placeholder="Location"
                maxLength={256}
                spellCheck={false}
                defaultValue={me?.location?.display ?? ""}
                onChange={place => {
                  setFieldValue("location", normalizePlace(place))
                }}
              />

              <Input
                title="Profession"
                name="profession"
                placeholder="Profession"
                value={values.profession}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Input
                title="Other relevant positions"
                name="otherRelevantPositions"
                placeholder="Memberships, institutions, positions"
                value={values.otherRelevantPositions}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Stack>

            <Button type="submit" width="100%" loading={isSubmitting}>
              Save & Continue
            </Button>
          </Stack>
        )
      }}
    </Formik>
  )
}

const InquiryBasicInfoPlaceholder: React.FC = () => {
  return (
    <Skeleton>
      <Stack gap={4}>
        <Stack gap={2}>
          <SkeletonText variant="lg-display">
            Tell Example Partner a little bit about yourself.
          </SkeletonText>

          <Input title="Name" disabled required />

          <Input title="Location" placeholder="Enter your city" disabled />

          <Input title="Profession" disabled />

          <Input title="Other relevant positions" disabled />
        </Stack>

        <Button width="100%" disabled />
      </Stack>
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
        name
        location {
          display
          city
          state
          country
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

interface InquiryBasicInfoInput {
  name: string
  location: Location
  profession: string
  otherRelevantPositions: string
}
