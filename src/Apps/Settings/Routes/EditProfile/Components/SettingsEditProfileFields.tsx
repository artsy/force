import {
  Box,
  Button,
  CheckCircleFillIcon,
  CheckCircleIcon,
  Flex,
  Input,
  Join,
  Spacer,
  Text,
} from "@artsy/palette"
import { editProfileVerificationSchema } from "Apps/Auction/Components/Form/Utils"
import { CollectorProfileHeaderAvatarFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/Components/CollectorProfileHeaderAvatar"
import {
  LocationAutocompleteInput,
  normalizePlace,
} from "Components/LocationAutocompleteInput"
import { useFormik } from "formik"
import { createFragmentContainer, graphql } from "react-relay"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import { SettingsEditProfileFields_me$data } from "__generated__/SettingsEditProfileFields_me.graphql"
import { EditableLocation } from "__generated__/useUpdateMyUserProfileMutation.graphql"

interface EditableLocationProps extends EditableLocation {
  display: string | null
}

interface EditProfileFormModel {
  photo: string
  name: string
  displayLocation: { display: string | null }
  location: EditableLocationProps | null
  profession: string
  otherRelevantPositions: string
  bio: string
}

interface SettingsEditProfileFieldsProps {
  me: SettingsEditProfileFields_me$data
}

const SettingsEditProfileFields: React.FC<SettingsEditProfileFieldsProps> = ({
  me,
}) => {
  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile()
  const { values, isSubmitting, handleSubmit, setFieldValue } = useFormik<
    EditProfileFormModel
  >({
    initialValues: {
      name: me.name ?? "",
      displayLocation: { display: me.location?.display ?? null },
      location: me.location ?? null,
      profession: me.profession ?? "",
      otherRelevantPositions: me.otherRelevantPositions ?? "",
      bio: me.bio ?? "",
      photo: me.icon?.url ?? "",
    },
    onSubmit: async values => {
      try {
        const newLocation = { ...values.location }
        delete newLocation.display
        const payload = {
          name: values.name,
          location: newLocation,
          profession: values.profession,
          otherRelevantPositions: values.otherRelevantPositions,
          bio: values.bio,
        }

        await submitUpdateMyUserProfile(payload)
      } catch (error) {
        console.error("Failed to update user profile ", error)
      }
    },
    validationSchema: editProfileVerificationSchema,
    validateOnBlur: true,
  })

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Join separator={<Spacer y={4} />}>
          <Flex alignItems="center">
            <CollectorProfileHeaderAvatarFragmentContainer me={me} />

            <Text>Choose an Image</Text>
          </Flex>

          <Input
            title="Full name"
            placeholder="Full name"
            name="full-name"
            required
            maxLength={256}
            value={values.name}
            onChange={({ target: { value } }) => {
              setFieldValue("name", value)
            }}
            data-testid="edit-profile-full-name-input"
          />

          <LocationAutocompleteInput
            title="Primary Location"
            placeholder="City name"
            name="location"
            maxLength={256}
            spellCheck={false}
            value={values.displayLocation.display ?? undefined}
            onChange={place => {
              setFieldValue("location", normalizePlace(place))
            }}
          />

          <Input
            title="Profession"
            placeholder="Profession or job title"
            name="profession"
            maxLength={256}
            onChange={({ target: { value } }) => {
              setFieldValue("profession", value)
            }}
            value={values.profession}
            data-testid="edit-profile-profession-input"
          />

          <Input
            title="Other relevant positions"
            placeholder="Other relevant positions"
            name="other-relevant-positions"
            maxLength={256}
            onChange={({ target: { value } }) => {
              setFieldValue("otherRelevantPositions", value)
            }}
            value={values.otherRelevantPositions}
            data-testid="edit-profile-other-relevant-positions-input"
          />

          <Input
            title="About"
            placeholder="Add a brief bio, so galleries know which artists or genres you collect."
            name="about"
            multiple
            maxLength={150}
            onChange={({ target: { value } }) => {
              setFieldValue("bio", value)
            }}
            value={values.bio}
            data-testid="edit-profile-about-input"
          />
        </Join>

        <Spacer y={[4, 6]} />

        <Box>
          <Flex alignItems="center">
            <CheckCircleIcon fill="black60" mr={0.5} />
            <Text variant="sm-display">Verify Your ID</Text>
          </Flex>

          <Text variant="sm" mt={1} color="black60">
            For details, see FAQs or contact verification@artsy.net
          </Text>
        </Box>

        <Spacer y={[4, 6]} />

        <Box>
          <Flex alignItems="center">
            <CheckCircleFillIcon fill="green100" mr={0.5} />
            <Text variant="sm-display">Email Address Verified</Text>
          </Flex>

          <Text variant="sm" mt={1} color="black60">
            For details, see FAQs or contact verification@artsy.net
          </Text>
        </Box>

        <Button
          mt={6}
          px={4}
          width={["100%", "auto"]}
          data-testid="edit-profile-save-button"
          type="submit"
          size="large"
          variant="primaryBlack"
          loading={isSubmitting}
        >
          Save
        </Button>
      </form>
    </>
  )
}

export const SettingsEditProfileFieldsFragmentContainer = createFragmentContainer(
  SettingsEditProfileFields,
  {
    me: graphql`
      fragment SettingsEditProfileFields_me on Me {
        ...CollectorProfileHeaderAvatar_me
        name
        profession
        otherRelevantPositions
        bio
        icon {
          url(version: "thumbnail")
        }
        location {
          display
          city
          state
          country
        }
        email
        emailConfirmed
        identityVerified
        canRequestEmailConfirmation
      }
    `,
  }
)
