import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { Button, Spacer, Text, useToasts } from "@artsy/palette"
import { COUNTRY_CODES } from "Utils/countries"
import { Form, Formik } from "formik"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System"
import { useRouter } from "System/Router/useRouter"
import createLogger from "Utils/logger"
import { recaptcha, RecaptchaAction } from "Utils/recaptcha"
import {
  ConsignmentInquiryForm,
  ConsignmentInquiryFormModel,
} from "Apps/Consign/Routes/ConsignmentInquiry/Components/ConsignmentInquiryForm"
import { SentConsignmentInquiry } from "@artsy/cohesion/dist/Schema/Events/Consignments"
import { ConsignmentInquiry_me$data } from "__generated__/ConsignmentInquiry_me.graphql"
import { createConsignmentInquiry } from "Apps/Consign/Routes/ConsignmentInquiry/utils/createConsignmentInquiry"
import {
  consignmentInquiryValidationSchema,
  validate,
} from "Apps/Consign/Routes/ConsignmentInquiry/utils/validation"
import { CreateConsignmentInquiryMutationInput } from "__generated__/createConsignmentInquiryMutation.graphql"

const logger = createLogger("ConsignmentInquiry/ConsignmentInquiry.tsx")

const getContactInformationFormInitialValues = (
  me: ConsignmentInquiry_me$data
): ConsignmentInquiryFormModel => ({
  name: me?.name || "",
  email: me?.email || "",
  phoneNumber:
    me?.phoneNumber?.national ||
    me?.phone ||
    me?.phoneNumber?.international ||
    "",
  phoneNumberCountryCode: me?.phoneNumber?.regionCode || "us",
  message: "",
})

export interface ConsignmentInquiryProps {
  me: ConsignmentInquiry_me$data
}

export const ConsignmentInquiry: React.FC<ConsignmentInquiryProps> = ({
  me,
}) => {
  const { trackEvent } = useTracking()
  const { router } = useRouter()
  const { sendToast } = useToasts()
  const { relayEnvironment } = useSystemContext()
  const initialValue = getContactInformationFormInitialValues(me)
  const initialErrors = validate(
    initialValue,
    consignmentInquiryValidationSchema
  )

  const handleRecaptcha = (action: RecaptchaAction) =>
    new Promise(resolve => recaptcha(action, resolve))

  const handleSubmit = async ({
    name,
    email,
    phoneNumber,
    phoneNumberCountryCode,
    message,
  }: ConsignmentInquiryFormModel) => {
    if (!(await handleRecaptcha("consignment_inquiry"))) {
      return
    }

    let phoneNumberInternational: string | undefined = undefined
    if (phoneNumber.trim().length) {
      phoneNumberInternational = `+${
        COUNTRY_CODES[phoneNumberCountryCode.toLocaleUpperCase()]
      } ${phoneNumber.trim()}`
    }

    const input: CreateConsignmentInquiryMutationInput = {
      email,
      message,
      name,
      phoneNumber: phoneNumberInternational,
      userId: me?.internalID,
    }

    if (relayEnvironment) {
      try {
        const consignmentInquiryId = await createConsignmentInquiry(
          relayEnvironment,
          input
        )
        if (consignmentInquiryId) {
          trackEvent(tracks.sentConsignmentInquiry(consignmentInquiryId))
          router.replace("/sell/inquiry")
          router.push("/sell/inquiry/sent")
        }
      } catch (error) {
        console.log("Consignment Inquiry Error", error)
        logger.error("Consignment Inquiry Error", error)
        sendToast({
          variant: "error",
          message: `Error: ${error}`,
          description: "Please contact sell@artsy.net",
        })
      }
    }
  }

  return (
    <>
      <Text mt={4} variant="lg-display">
        Contact a specialist
      </Text>
      <Spacer y={4} />
      <Formik<ConsignmentInquiryFormModel>
        validateOnMount
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={consignmentInquiryValidationSchema}
        initialErrors={initialErrors}
        initialTouched={{}}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <ConsignmentInquiryForm />
            <Spacer y={2} />
            <Button
              data-testid="consignment-inquiry-send-button"
              width={["50%", "33%"]}
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              type="submit"
            >
              Send
            </Button>
            <Spacer y={4} />
          </Form>
        )}
      </Formik>
    </>
  )
}

export const ConsignmentInquiryFragmentContainer = createFragmentContainer(
  ConsignmentInquiry,
  {
    me: graphql`
      fragment ConsignmentInquiry_me on Me {
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
      }
    `,
  }
)

const tracks = {
  sentConsignmentInquiry: (
    consignmentInquiryId: number
  ): SentConsignmentInquiry => ({
    action: ActionType.sentConsignmentInquiry,
    context_module: ContextModule.consignmentInquiryForm,
    context_screen_owner_type: OwnerType.consignmentInquiry,
    context_screen: OwnerType.consignmentInquiry,
    consignment_inquiry_id: consignmentInquiryId,
  }),
}
