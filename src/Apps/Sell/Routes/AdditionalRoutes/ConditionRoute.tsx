import {
  Box,
  Clickable,
  Flex,
  Join,
  Select,
  Spacer,
  Text,
  TextArea,
} from "@artsy/palette"
import { ConditionRoute_submission$key } from "__generated__/ConditionRoute_submission.graphql"
import { ArtworkConditionEnumType } from "__generated__/useUpdateMyCollectionArtworkMutation.graphql"
import { ConditionInfoModal } from "Apps/Artwork/Components/ArtworkDetails/ConditionInfoModal"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { conditionOptions } from "Apps/Sell/Utils/conditionOptions"
import { ErrorPage } from "Components/ErrorPage"
import { Formik } from "formik"
import * as React from "react"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"
import * as Yup from "yup"

const FRAGMENT = graphql`
  fragment ConditionRoute_submission on ConsignmentSubmission {
    myCollectionArtwork {
      artworkId: internalID
      condition {
        value
      }
      conditionDescription {
        details
      }
    }
  }
`

const Schema = Yup.object().shape({
  condition: Yup.string().required().trim(),
  description: Yup.string().trim(),
})

interface FormValues {
  artworkId: string
  condition: string
  description: string
}

interface ConditionRouteProps {
  submission: ConditionRoute_submission$key
}

export const ConditionRoute: React.FC<ConditionRouteProps> = props => {
  const { actions } = useSellFlowContext()
  const submission = useFragment(FRAGMENT, props.submission)
  const artwork = submission.myCollectionArtwork

  const [
    isConditionDefinitionModalOpen,
    setIsConditionDefinitionModalOpen,
  ] = useState(false)

  if (!artwork) {
    return (
      <ErrorPage
        code="Something went wrong."
        message="The artwork could not be loaded. Please try again or contact support@artsy.net."
        m={4}
      />
    )
  }

  const onSubmit = async (values: FormValues) => {
    return await actions.updateMyCollectionArtwork({
      condition: values.condition as ArtworkConditionEnumType,
      conditionDescription: values.description,
      artworkId: artwork.artworkId,
    })
  }

  const initialValues: FormValues = {
    artworkId: artwork.artworkId,
    condition: artwork.condition?.value ?? "",
    description: artwork.conditionDescription?.details ?? "",
  }

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount
      validationSchema={Schema}
    >
      {({ handleChange, setFieldValue, values }) => (
        <SubmissionLayout>
          <SubmissionStepTitle>Condition</SubmissionStepTitle>

          <Join separator={<Spacer y={4} />}>
            <Text variant={["xs", "sm"]} color="black60">
              Please specify the{" "}
              <Clickable
                textDecoration="underline"
                onClick={() => setIsConditionDefinitionModalOpen(true)}
              >
                condition
              </Clickable>{" "}
              of the piece. Note that the seller is liable for providing an
              accurate description.
            </Text>

            <Box>
              <Flex justifyContent="flex-end" mb={-1}>
                <Clickable
                  onClick={() => setIsConditionDefinitionModalOpen(true)}
                  data-test-id="open-rarity-modal"
                  textDecoration="underline"
                >
                  <Text variant="xs" color="black60">
                    Condition Definition
                  </Text>
                </Clickable>
              </Flex>

              <Select
                title="Condition"
                name="condition"
                options={conditionOptions}
                selected={values.condition}
                onChange={handleChange}
                pt={1}
                data-testid="condition-input"
              />
            </Box>

            <TextArea
              title="Add Additional Condition Details (Optional)"
              name="description"
              defaultValue={values.description}
              onChange={({ value }) => {
                setFieldValue("description", value)
              }}
              maxLength={500}
              data-testid="description-input"
            />
          </Join>

          {!!isConditionDefinitionModalOpen && (
            <ConditionInfoModal
              onClose={() => setIsConditionDefinitionModalOpen(false)}
            />
          )}

          <DevDebug />
        </SubmissionLayout>
      )}
    </Formik>
  )
}
