import {
  Box,
  Button,
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
import { SettingsEditProfileImageRefetchContainer } from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileImage/SettingsEditProfileImage"
import { useEditProfileTracking } from "Apps/Settings/Routes/EditProfile/Hooks/useEditProfileTracking"
import {
  LocationAutocompleteInput,
  normalizePlace,
  Place,
} from "Components/LocationAutocompleteInput"
import { Form, Formik } from "formik"
import { createFragmentContainer, graphql } from "react-relay"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import { SettingsEditProfileFields_me$data } from "__generated__/SettingsEditProfileFields_me.graphql"
import { EditableLocation } from "__generated__/useUpdateMyUserProfileMutation.graphql"
import { RouterLink } from "System/Components/RouterLink"
import { useVerifyID } from "Apps/Settings/Routes/EditProfile/Mutations/useVerifyID"
import { useVerifyEmail } from "Apps/Settings/Routes/EditProfile/Mutations/useVerifyEmail"
import createLogger from "Utils/logger"
import CheckmarkStrokeIcon from "@artsy/icons/CheckmarkStrokeIcon"
import CheckmarkFillIcon from "@artsy/icons/CheckmarkFillIcon"
import { useTracking } from "react-tracking"
import {
  ActionType,
  ClickedVerifyIdentity,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"

const logger = createLogger("SettingsEditProfileFields")

interface EditableLocationProps extends EditableLocation {
  display: string | null | undefined
}

export interface EditProfileFormModel {
  photo: File | null | undefined
  name: string
  displayLocation: { display: string | null | undefined }
  location: EditableLocationProps | null | undefined
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
  const { sendToast } = useToasts()
  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile()
  const { submitMutation: submitVerifyIDMutation } = useVerifyID()
  const { submitMutation: submitVerifyEmailMutation } = useVerifyEmail()
  const { editedUserProfile: trackEditProfile } = useEditProfileTracking()
  const { trackEvent } = useTracking()

  const clickedIdVerificationEvent: ClickedVerifyIdentity = {
    action: ActionType.clickedVerifyIdentity,
    context_module: ContextModule.collectorProfile,
    context_page_owner_type: OwnerType.editProfile,
    subject: "Clicked ID Verification Link",
  }

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

  const onSubmit = async (values: EditProfileFormModel) => {
    try {
      const location = {
        city: values.location?.city || null,
        state: values.location?.state || null,
        country: values.location?.country || null,
        countryCode: values.location?.countryCode || null,
      }

      const payload = {
        name: values.name,
        location,
        profession: values.profession,
        otherRelevantPositions: values.otherRelevantPositions,
        bio: values.bio,
      }

      await submitUpdateMyUserProfile(payload)

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
              <SettingsEditProfileImageRefetchContainer me={me} />

              <Input
                title="Name"
                placeholder="Name"
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
                onChange={place => {
                  setFieldValue("location", normalizePlace(place, false))
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
                    <CheckmarkFillIcon fill="green100" mr={0.5} />
                    <Text variant="sm-display">ID Verified</Text>
                  </Flex>
                </Box>
              ) : (
                <Flex alignItems="center">
                  <CheckmarkStrokeIcon fill="black60" mr={0.5} />
                  <Clickable
                    onClick={async () => {
                      trackEvent(clickedIdVerificationEvent)

                      try {
                        // no input, user is derived from the authenticated MP loader context
                        await submitVerifyIDMutation({
                          variables: { input: { initiatorID: me.internalID } },
                          rejectIf: res => {
                            return res.sendIdentityVerificationEmail
                              ?.confirmationOrError?.mutationError
                          },
                        })

                        sendToast({
                          variant: "success",
                          message: `ID verification link sent to ${me.email}.`,
                          ttl: 6000,
                        })
                      } catch (error) {
                        logger.error(error)

                        sendToast({
                          variant: "error",
                          message: "There was a problem",
                          description: error.message || "Something went wrong",
                        })
                      }
                    }}
                    textDecoration="underline"
                  >
                    <Text variant="sm-display">Verify Your ID</Text>
                  </Clickable>
                </Flex>
              )}
              <Text variant="sm" mt={1} color="black60">
                For details, see{" "}
                <RouterLink
                  inline
                  to="/identity-verification-faq"
                  target="_blank"
                >
                  FAQs
                </RouterLink>{" "}
                or contact{" "}
                <RouterLink inline to={"mailto:verification@artsy.net"}>
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
                  <CheckmarkFillIcon fill="green100" mr={0.5} />
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
                  <CheckmarkStrokeIcon fill="black60" mr={0.5} />
                  {canRequestEmailConfirmation ? (
                    <Clickable
                      onClick={async () => {
                        try {
                          // no input, user is derived from the authenticated MP loader context
                          await submitVerifyEmailMutation({
                            variables: { input: {} },
                            rejectIf: res => {
                              return res.sendConfirmationEmail
                                ?.confirmationOrError?.mutationError
                            },
                          })

                          sendToast({
                            variant: "success",
                            message: `Email verification link sent to ${me.email}.`,
                            ttl: 6000,
                          })
                        } catch (error) {
                          logger.error(error)

                          sendToast({
                            variant: "error",
                            message: "There was a problem",
                            description:
                              error.message || "Something went wrong",
                          })
                        }
                      }}
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
        internalID
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
