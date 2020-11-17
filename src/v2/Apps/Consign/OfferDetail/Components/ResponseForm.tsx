import React, { useState } from "react"
import { Form, Formik, FormikProps } from "formik"
import {
  BorderedRadio,
  Button,
  Collapse,
  Input,
  LargeSelect,
  RadioGroup,
  Spacer,
  Text,
  TextArea,
} from "@artsy/palette"
import { useSystemContext } from "v2/Artsy"
import { CreateOfferResponse } from "../Operations/CreateOfferResponse"
import { ResponseForm_offer } from "v2/__generated__/ResponseForm_offer.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { CreateOfferResponseMutationInput } from "v2/__generated__/CreateOfferResponseMutation.graphql"

interface ResponseFormProps {
  offer: ResponseForm_offer
}

type ResponseFormValues = Pick<
  CreateOfferResponseMutationInput,
  "intendedState" | "phoneNumber" | "rejectionReason" | "comments"
>

const accepted = "ACCEPTED"
const rejected = "REJECTED"
const review = "REVIEW"

const ResponseForm: React.FC<ResponseFormProps> = ({ offer }) => {
  const { relayEnvironment } = useSystemContext()
  const [responded, setResponded] = useState(false)

  if (responded) {
    return <Text variant="title">Thank you! We'll be in touch soon.</Text>
  }

  return (
    <Formik<ResponseFormValues>
      initialValues={{
        intendedState: accepted,
        phoneNumber: "",
        rejectionReason: "Other",
      }}
      onSubmit={async (values: ResponseFormValues, actions) => {
        await CreateOfferResponse(relayEnvironment, offer.id, values)
        setResponded(true)
        actions.setSubmitting(false)
      }}
    >
      {formik => {
        const { handleChange, isSubmitting, values } = formik

        return (
          <Form>
            <RadioGroup
              onSelect={value => {
                handleChange(spoofChangeEvent("intendedState", value))
              }}
              defaultValue={accepted}
            >
              <BorderedRadio
                value={accepted}
                key={accepted}
                name="intendedState"
              >
                <Text variant="caption" mt={0.3}>
                  Yes, I would like to accept this offer. I have no additional
                  questions and would like to be introduced to the partner.
                </Text>
                <Collapse open={values.intendedState === accepted}>
                  <Text variant="small" color="black60">
                    By accepting this offer, you agree to be introduced to the
                    partner with the terms extended (this means the estimate,
                    commission and fees are non-negotiable) and that you will be
                    selling the work via consignment at auction.
                  </Text>
                </Collapse>
              </BorderedRadio>
              <BorderedRadio value={review} key={review} name="intendedState">
                <Text variant="caption" mt={0.3}>
                  Yes I am interested, but I have additional questions.
                </Text>
              </BorderedRadio>
              <BorderedRadio
                value={rejected}
                key={rejected}
                name="intendedState"
              >
                <Text variant="caption" mt={0.3}>
                  No, I am not interested in this offer.
                </Text>
              </BorderedRadio>
            </RadioGroup>
            <Collapse open={values.intendedState === review}>
              <ReviewFields {...formik} />
            </Collapse>
            <Collapse open={values.intendedState === rejected}>
              <RejectedFields {...formik} />
            </Collapse>

            <Button
              mt={2}
              loading={isSubmitting}
              disabled={isSubmitting}
              type="submit"
            >
              Respond to this offer
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

export const ResponseFormFragmentContainer = createFragmentContainer(
  ResponseForm,
  {
    offer: graphql`
      fragment ResponseForm_offer on ConsignmentOffer {
        id
      }
    `,
  }
)

/** Spoof a React.ChangeEvent because Formik expects change events in that shape. */
function spoofChangeEvent(field: string, value: any) {
  return {
    target: {
      name: field,
      value,
    },
    type: "change",
  }
}

const ReviewFields: React.FC<FormikProps<ResponseFormValues>> = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
}) => {
  return (
    <>
      <Spacer mb={2} />
      <Input
        type="tel"
        name="phoneNumber"
        title="Phone number"
        placeholder="Enter a phone number"
        value={values.phoneNumber}
        error={touched.phoneNumber && errors.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </>
  )
}

const RejectedFields: React.FC<FormikProps<ResponseFormValues>> = ({
  errors,
  handleChange,
  touched,
  values,
}) => {
  const rejectionOptions = [
    { text: "High commission", value: "High commission" },
    {
      text: "High shipping/marketing costs",
      value: "High shipping/marketing costs",
    },
    {
      text: "Inconvenient partner location",
      value: "Inconvenient partner location",
    },
    { text: "Lost interest", value: "Lost interest" },
    { text: "Low estimate", value: "Low estimate" },
    { text: "Took competing offer", value: "Took competing offer" },
    { text: "Other", value: "Other" },
  ]

  return (
    <>
      <Spacer mb={2} />
      <LargeSelect
        options={rejectionOptions}
        selected={values.rejectionReason}
        name="rejectionReason"
        title="Reason"
        error={touched.rejectionReason && errors.rejectionReason}
        onSelect={e => {
          const event = spoofChangeEvent("rejectionReason", e)
          handleChange(event)
        }}
      />
      <Collapse open={values.rejectionReason === "Low estimate"}>
        <TextArea
          name="comments"
          title="Price expectation"
          characterLimit={200}
          placeholder="Price expectation"
          onChange={e => {
            const event = spoofChangeEvent("comments", e.value)
            handleChange(event)
          }}
        />
      </Collapse>
      <Collapse open={values.rejectionReason === "Other"}></Collapse>
      <Collapse open={values.rejectionReason === "Other"}></Collapse>
      <Collapse open={values.rejectionReason === "Other"}></Collapse>
      <Collapse open={values.rejectionReason === "Other"}></Collapse>
    </>
  )
}
