import { useState } from "react"
import * as React from "react"
import { Form, Formik } from "formik"
import { BorderedRadio, Button, RadioGroup, Text } from "@artsy/palette"
import { useSystemContext } from "v2/System"
import { CreateOfferResponse } from "../Operations/CreateOfferResponse"
import { ResponseForm_offer$data } from "v2/__generated__/ResponseForm_offer.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { CreateOfferResponseMutationInput } from "v2/__generated__/CreateOfferResponseMutation.graphql"

interface ResponseFormProps {
  offer: ResponseForm_offer$data
}

type ResponseFormValues = Pick<
  CreateOfferResponseMutationInput,
  "intendedState"
>

const ResponseForm: React.FC<ResponseFormProps> = ({ offer }) => {
  const { relayEnvironment } = useSystemContext()
  const [responded, setResponded] = useState(false)

  if (responded) {
    return <Text variant="title">Thank you! We'll be in touch soon.</Text>
  }

  return (
    <Formik
      initialValues={{
        intendedState: "ACCEPTED",
      }}
      onSubmit={async (values: ResponseFormValues, actions) => {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        await CreateOfferResponse(relayEnvironment, offer.id, values)
        setResponded(true)
        actions.setSubmitting(false)
      }}
    >
      {({ isSubmitting, values, handleChange }) => {
        return (
          <Form>
            <RadioGroup
              onSelect={value => {
                // Fake a React.ChangeEvent so Formik picks the change up.
                handleChange({
                  target: {
                    name: "intendedState",
                    value,
                  },
                  type: "change",
                })
              }}
              defaultValue="ACCEPTED"
            >
              <BorderedRadio
                value="ACCEPTED"
                key="ACCEPTED"
                name="intendedState"
              >
                <Text variant="caption" mt={0.3}>
                  Yes, I would like to accept this offer. I have no additional
                  questions and would like to be introduced to the partner.
                </Text>
                <Text variant="small" color="black60">
                  By accepting this offer, you agree to be introduced to the
                  partner with the terms extended (this means the estimate,
                  commission and fees are non-negotiable) and that you will be
                  selling the work via consignment at auction.
                </Text>
              </BorderedRadio>
              <BorderedRadio value="REVIEW" key="REVIEW" name="intendedState">
                <Text variant="caption" mt={0.3}>
                  Yes I am interested, but I have additional questions.
                </Text>
              </BorderedRadio>
              <BorderedRadio
                value="REJECTED"
                key="REJECTED"
                name="intendedState"
              >
                <Text variant="caption" mt={0.3}>
                  No, I am not interested in this offer.
                </Text>
              </BorderedRadio>
            </RadioGroup>
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
