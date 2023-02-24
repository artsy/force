import {
  Box,
  Button,
  CheckCircleFillIcon,
  CheckCircleIcon,
  Clickable,
  Flex,
  Input,
  Join,
  Spacer,
  Text,
  TextArea,
  useToasts,
} from "@artsy/palette"
import { editProfileVerificationSchema } from "Apps/CollectorProfile/Utils/ValidationSchemas"
import {
  useHandleEmailVerification,
  useHandleIDVerification,
} from "Apps/Settings/Routes/EditProfile/helpers/useHandleVerification"
import {
  SettingsEditProfileImageFragmentContainer,
  SettingsEditProfileImageRef,
} from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileImage/SettingsEditProfileImage"
import { useEditProfileTracking } from "Apps/Settings/Routes/EditProfile/Hooks/useEditProfileTracking"
import {
  LocationAutocompleteInput,
  normalizePlace,
  Place,
} from "Components/LocationAutocompleteInput"
import {
  normalizePhoto,
  uploadPhotoToS3,
} from "Components/PhotoUpload/Utils/fileUtils"
import { Form, Formik } from "formik"
import { useEffect, useRef } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/useSystemContext"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import { SettingsEditProfileFields_me$data } from "__generated__/SettingsEditProfileFields_me.graphql"
import { EditableLocation } from "__generated__/useUpdateMyUserProfileMutation.graphql"
import { RouterLink } from "System/Router/RouterLink"

interface EditableLocationProps extends EditableLocation {
  display: string | null
}

export interface EditProfileFormModel {
  photo: File | null
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
  const imageContainerRef = useRef<SettingsEditProfileImageRef | null>(null)
  const { sendToast } = useToasts()
  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile()
  const { relayEnvironment } = useSystemContext()
  const { editedUserProfile: trackEditProfile } = useEditProfileTracking()

  const {
    showVerificationBanner: showVerificationBannerForID,
    handleVerification: handleIDVerification,
  } = useHandleIDVerification()

  const {
    showVerificationBanner: showVerificationBannerForEmail,
    handleVerification: handleEmailVerification,
  } = useHandleEmailVerification()

  useEffect(() => {
    if (!!showVerificationBannerForID) {
      sendToast({
        variant: "success",
        message: `ID verification link sent to ${me?.email ?? ""}.`,
      })
    }
    if (!!showVerificationBannerForEmail) {
      sendToast({
        variant: "success",
        message: `Email sent to ${me?.email ?? ""}`,
      })
    }
  }, [
    me.email,
    sendToast,
    showVerificationBannerForID,
    showVerificationBannerForEmail,
  ])

  const isEmailConfirmed = me?.isEmailConfirmed
  const isIdentityVerified = me?.isIdentityVerified
  const canRequestEmailConfirmation = me?.canRequestEmailConfirmation

  const initialValues: EditProfileFormModel = {
    name: me.name ?? "",
    displayLocation: { display: me.location?.display ?? null },
    location: me.location ?? null,
    profession: me.profession ?? "",
    otherRelevantPositions: me.otherRelevantPositions ?? "",
    bio: me.bio ?? "",
    photo: null,
  }

  const updateUserProfileImage = async (photo: File) => {
    try {
      const normalizedPhoto = normalizePhoto(photo)
      const iconUrl = await uploadPhotoToS3(
        relayEnvironment!,
        normalizedPhoto,
        () => {}
      )
      await submitUpdateMyUserProfile({ iconUrl })
    } catch (error) {
      console.error("Failed to update user profile image ", error)

      sendToast({
        variant: "error",
        message: "Failed to update profile image",
      })
    }
  }

  const onSubmit = async (values: EditProfileFormModel) => {
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
      if (values.photo) {
        await updateUserProfileImage(values.photo)

        if (imageContainerRef.current) {
          await imageContainerRef.current.storeImageLocally()
        }
      }

      trackEditProfile()

      sendToast({
        variant: "success",
        message: "Information updated successfully",
      })
    } catch (error) {
      console.error("Failed to update user profile ", error)

      sendToast({
        variant: "error",
        message: "There was a problem",
      })
    }
  }

  return (
    <>
      <Formik<EditProfileFormModel>
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={editProfileVerificationSchema}
        validateOnBlur
      >
        {({ values, isSubmitting, isValid, setFieldValue, handleChange }) => (
          <Form>
            <Join separator={<Spacer y={4} />}>
              <SettingsEditProfileImageFragmentContainer
                ref={imageContainerRef}
                me={me}
              />

              <Input
                title="Full name"
                placeholder="Full name"
                name="name"
                required
                maxLength={256}
                value={values.name}
                onChange={handleChange}
                data-testid="edit-profile-full-name-input"
              />

              <LocationAutocompleteInput
                title="Primary Location"
                placeholder="City name"
                name="location"
                maxLength={256}
                spellCheck={false}
                defaultValue={values.displayLocation.display ?? undefined}
                onSelect={(place?: Place) => {
                  setFieldValue("location", normalizePlace(place, false))
                }}
                onChange={() => {
                  setFieldValue("location", {})
                }}
              />

              <Input
                title="Profession"
                placeholder="Profession or job title"
                name="profession"
                maxLength={256}
                onChange={handleChange}
                value={values.profession}
                data-testid="edit-profile-profession-input"
              />

              <Input
                title="Other relevant positions"
                placeholder="Other relevant positions"
                name="otherRelevantPositions"
                maxLength={256}
                onChange={handleChange}
                value={values.otherRelevantPositions}
                data-testid="edit-profile-other-relevant-positions-input"
              />

              <TextArea
                title="About"
                placeholder="Add a brief bio, so galleries know which artists or genres you collect."
                name="bio"
                maxLength={150}
                onChange={({ value }) => {
                  setFieldValue("bio", value)
                }}
                value={values.bio}
                data-testid="edit-profile-about-input"
              />
            </Join>

            <Spacer y={[4, 6]} />

            {/* ID Verification */}
            <Box>
              {isIdentityVerified ? (
                <Box>
                  <Flex alignItems="center">
                    <CheckCircleFillIcon fill="green100" mr={0.5} />
                    <Text variant="sm-display">ID Verified</Text>
                  </Flex>
                </Box>
              ) : (
                <Flex alignItems="center">
                  <CheckCircleIcon fill="black60" mr={0.5} />
                  <Clickable
                    onClick={handleIDVerification}
                    textDecoration="underline"
                  >
                    <Text variant="sm-display">Verify Your ID</Text>
                  </Clickable>
                </Flex>
              )}
              <Text variant="sm" mt={1} color="black60">
                For details, see{" "}
                <a
                  href="https://www.artsy.net/identity-verification-faq"
                  target="_blank"
                >
                  FAQs
                </a>{" "}
                or contact{" "}
                <RouterLink to={"mailto:verification@artsy.net"}>
                  verification@artsy.net
                </RouterLink>
                .
              </Text>
            </Box>

            <Spacer y={[4, 6]} />

            {/* Email Verification */}
            {isEmailConfirmed ? (
              <Box>
                <Flex alignItems="center">
                  <CheckCircleFillIcon fill="green100" mr={0.5} />
                  <Text variant="sm-display">Email Address Verified</Text>
                </Flex>

                <Text variant="sm" mt={1} color="black60">
                  Secure your account and receive updates about your
                  transactions on Artsy.
                </Text>
              </Box>
            ) : (
              <Box>
                <Flex alignItems="center">
                  <CheckCircleIcon fill="black60" mr={0.5} />
                  {canRequestEmailConfirmation ? (
                    <Clickable
                      onClick={handleEmailVerification}
                      textDecoration="underline"
                    >
                      <Text variant="sm-display">Verify Your Email</Text>
                    </Clickable>
                  ) : (
                    <Text
                      style={{ textDecorationLine: "none" }}
                      color="black60"
                    >
                      Verify Your Email
                    </Text>
                  )}
                </Flex>
                <Text variant="sm" mt={1} color="black60">
                  Secure your account and receive updates about your
                  transactions on Artsy.
                </Text>
              </Box>
            )}

            <Button
              mt={6}
              px={4}
              width={["100%", "auto"]}
              data-testid="edit-profile-save-button"
              type="submit"
              size="large"
              variant="primaryBlack"
              loading={isSubmitting}
              disabled={!isValid}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export const SettingsEditProfileFieldsFragmentContainer = createFragmentContainer(
  SettingsEditProfileFields,
  {
    me: graphql`
      fragment SettingsEditProfileFields_me on Me {
        ...SettingsEditProfileImage_me
        name
        profession
        otherRelevantPositions
        bio
        location {
          display
          city
          state
          country
        }
        email
        isEmailConfirmed
        isIdentityVerified
        canRequestEmailConfirmation
      }
    `,
  }
)
