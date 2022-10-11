import { ActionType } from "@artsy/cohesion"
import {
  ArtsyLogoBlackIcon,
  Button,
  Flex,
  FullBleed,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import {
  ContactInformationFormFragmentContainer,
  ContactInformationFormModel,
} from "Apps/Consign/Routes/SubmissionFlow/ContactInformation/Components/ContactInformationForm"
import {
  contactInformationValidationSchema,
  validate,
} from "Apps/Consign/Routes/SubmissionFlow/Utils/validation"
import { useRequestPriceEstimate } from "Apps/MyCollection/Routes/PriceEstimate/Mutations/useRequestPriceEstimate"
import { BackLink } from "Components/Links/BackLink"
import { MetaTags } from "Components/MetaTags"
import { Form, Formik } from "formik"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { RouterLink } from "System/Router/RouterLink"
import { useRouter } from "System/Router/useRouter"
import { PriceEstimateContactInformation_artwork$data } from "__generated__/PriceEstimateContactInformation_artwork.graphql"
import { PriceEstimateContactInformation_me$data } from "__generated__/PriceEstimateContactInformation_me.graphql"

const getContactInformationFormInitialValues = (
  me: PriceEstimateContactInformation_me$data
): ContactInformationFormModel => ({
  name: me?.name || "",
  email: me?.email || "",
  phone: {
    isValid: !!me?.phoneNumber?.isValid,
    national: me?.phoneNumber?.national ?? undefined,
    international: me?.phoneNumber?.international ?? undefined,
    regionCode: me?.phoneNumber?.regionCode ?? undefined,
  },
})

export interface PriceEstimateContactInformationProps {
  artwork: PriceEstimateContactInformation_artwork$data
  me: PriceEstimateContactInformation_me$data
}

export const PriceEstimateContactInformation: React.FC<PriceEstimateContactInformationProps> = ({
  artwork,
  me,
}) => {
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
    phone,
  }: ContactInformationFormModel) => {
    try {
      trackEvent({
        action: ActionType.sentRequestPriceEstimate,
        artwork_id: artwork.internalID,
        artwork_slug: artwork.slug,
        user_id: me?.internalID,
        user_email: me?.email,
      })

      await submitMutation({
        variables: {
          input: {
            artworkId: artwork.internalID,
            requesterEmail: email,
            requesterName: name,
            requesterPhoneNumber: phone.international,
          },
        },
      })

      router.push(`/my-collection/artwork/${artwork.internalID}`)
    } catch (error) {
      console.error(error)

      sendToast({
        variant: "error",
        message: "An error occurred",
        description: "Please contact sell@artsymail.com",
      })

      return
    }
  }

  return (
    <>
      <MetaTags title="Request a Price Estimate | Artsy" />

      <Flex my={4}>
        <RouterLink to="/my-collection" display="block">
          <ArtsyLogoBlackIcon display="block" />
        </RouterLink>
      </Flex>

      <FullBleed border="1px solid" borderColor="black10" />

      <AppContainer>
        <BackLink
          py={2}
          mb={4}
          width="min-content"
          to={`/my-collection/artwork/${artwork.internalID}`}
        >
          Back
        </BackLink>

        <Text mt={4} variant="lg-display">
          Let us know how to reach you
        </Text>
        <Text mt={1} mb={6} variant="sm-display" color="black60">
          We wil only use these details to contact you about this price
          estimate.
        </Text>

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
              <ContactInformationFormFragmentContainer me={me} />

              <Spacer my={6} />

              <Button
                data-testid="submit-button"
                width={["100%", "auto"]}
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
                type="submit"
              >
                Requst a Price Estimate
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
