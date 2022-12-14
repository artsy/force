import { ActionType } from "@artsy/cohesion"
import {
  ArtsyLogoBlackIcon,
  Button,
  Flex,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import {
  ContactInformationFormFragmentContainer,
  ContactInformationFormModel,
} from "Apps/Consign/Routes/SubmissionFlow/ContactInformation/Components/ContactInformationForm"
import { useRequestPriceEstimate } from "Apps/MyCollection/Routes/PriceEstimate/Mutations/useRequestPriceEstimate"
import { BackLink } from "Components/Links/BackLink"
import { MetaTags } from "Components/MetaTags"
import { Form, Formik } from "formik"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { RouterLink } from "System/Router/RouterLink"
import { useRouter } from "System/Router/useRouter"
import { COUNTRY_CODES } from "Utils/countries"
import { PriceEstimateContactInformation_artwork$data } from "__generated__/PriceEstimateContactInformation_artwork.graphql"
import { PriceEstimateContactInformation_me$data } from "__generated__/PriceEstimateContactInformation_me.graphql"
import {
  contactInformationValidationSchema,
  validate,
} from "Apps/Consign/Routes/SubmissionFlow/Utils/validation"
import { useFeatureFlag } from "System/useFeatureFlag"

const getContactInformationFormInitialValues = (
  me: PriceEstimateContactInformation_me$data
): ContactInformationFormModel => ({
  name: me?.name || "",
  email: me?.email || "",
  phoneNumber:
    me?.phoneNumber?.national ||
    me?.phone ||
    me?.phoneNumber?.international ||
    "",
  phoneNumberCountryCode: me?.phoneNumber?.regionCode || "us",
})

export interface PriceEstimateContactInformationProps {
  artwork: PriceEstimateContactInformation_artwork$data
  me: PriceEstimateContactInformation_me$data
}

export const PriceEstimateContactInformation: React.FC<PriceEstimateContactInformationProps> = ({
  artwork,
  me,
}) => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")
  const { sendToast } = useToasts()
  const { router } = useRouter()
  const { trackEvent } = useTracking()
  const { submitMutation } = useRequestPriceEstimate()

  const initialValue = getContactInformationFormInitialValues(me)
  const initialErrors = validate(
    initialValue,
    contactInformationValidationSchema
  )

  const handleSubmit = async ({
    name,
    email,
    phoneNumber,
    phoneNumberCountryCode,
  }: ContactInformationFormModel) => {
    try {
      trackEvent({
        action: ActionType.sentRequestPriceEstimate,
        artwork_id: artwork.internalID,
        artwork_slug: artwork.slug,
        user_id: me?.internalID,
        user_email: me?.email,
      })

      const phoneNumberInternational = `+${
        COUNTRY_CODES[phoneNumberCountryCode.toLocaleUpperCase()]
      } ${phoneNumber.trim()}`

      await submitMutation({
        variables: {
          input: {
            artworkId: artwork.internalID,
            requesterEmail: email,
            requesterName: name,
            requesterPhoneNumber: phoneNumberInternational,
          },
        },
      })

      router.replace(
        isCollectorProfileEnabled
          ? `/collector-profile/my-collection/artwork/${artwork.internalID}`
          : `/my-collection/artwork/${artwork.internalID}`
      )
      router.push(
        isCollectorProfileEnabled
          ? `/collector-profile/my-collection/artwork/${artwork.internalID}/price-estimate/success`
          : `/my-collection/artwork/${artwork.internalID}/price-estimate/success`
      )
    } catch (error) {
      console.error(error)

      sendToast({
        variant: "error",
        message: "An error occurred",
        description: "Please contact sell@artsy.net",
      })
    }
  }

  return (
    <>
      <MetaTags title="Request a Price Estimate | Artsy" />

      <Flex mt={4}>
        <RouterLink
          to={
            isCollectorProfileEnabled
              ? "/collector-profile/my-collection"
              : "/my-collection"
          }
          display="block"
        >
          <ArtsyLogoBlackIcon display="block" />
        </RouterLink>
      </Flex>

      <AppContainer>
        <BackLink
          py={2}
          mb={4}
          width="min-content"
          to={
            isCollectorProfileEnabled
              ? `/collector-profile/my-collection/artwork/${artwork.internalID}`
              : `/my-collection/artwork/${artwork.internalID}`
          }
        >
          Back
        </BackLink>

        <Text mt={4} variant="lg-display">
          Let us know how to reach you
        </Text>

        <Spacer y={6} />

        <Formik<ContactInformationFormModel>
          validateOnMount
          initialValues={initialValue}
          onSubmit={handleSubmit}
          validationSchema={contactInformationValidationSchema}
          initialErrors={initialErrors}
          initialTouched={{}}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <ContactInformationFormFragmentContainer
                me={me}
                optionalPhoneNumber
              />

              <Spacer y={6} />

              <Text variant="xs" color="black60">
                By continuing, you agree to{" "}
                <RouterLink
                  color="black60"
                  to="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Artsy's Privacy Policy
                </RouterLink>
                .
              </Text>

              <Spacer y={2} />

              <Button
                data-testid="submit-button"
                width={["100%", "auto"]}
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
                type="submit"
              >
                Request a Price Estimate
              </Button>
            </Form>
          )}
        </Formik>
      </AppContainer>
    </>
  )
}

export const PriceEstimateContactInformationFragmentContainer = createFragmentContainer(
  PriceEstimateContactInformation,
  {
    me: graphql`
      fragment PriceEstimateContactInformation_me on Me {
        internalID
        name
        email
        phone
        phoneNumber {
          isValid
          international: display(format: INTERNATIONAL)
          national: display(format: NATIONAL)
          regionCode
        }
        ...ContactInformationForm_me
      }
    `,
    artwork: graphql`
      fragment PriceEstimateContactInformation_artwork on Artwork {
        internalID
        slug
      }
    `,
  }
)
