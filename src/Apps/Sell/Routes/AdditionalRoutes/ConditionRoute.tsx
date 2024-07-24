import { ConditionRoute_submission$key } from "__generated__/ConditionRoute_submission.graphql"
import { ArtworkConditionEnumType } from "__generated__/useUpdateMyCollectionArtworkMutation.graphql"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { Formik } from "formik"
import { graphql, useFragment } from "react-relay"
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
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import * as React from "react"
import * as Yup from "yup"
import { useState } from "react"
import { conditionOptions } from "Apps/Sell/Utils/conditionOptions"
import { ConditionInfoModal } from "Apps/Artwork/Components/ArtworkDetails/ConditionInfoModal"

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
  const submission = useFragment(FRAGMENT, props.submission)
  const artwork = submission.myCollectionArtwork
  const { actions } = useSellFlowContext()

  const [
    isConditionDefinitionModalOpen,
    setIsConditionDefinitionModalOpen,
  ] = useState(false)

  if (!artwork) return null

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
              <Flex justifyContent="flex-end">
                <Clickable
                  onClick={() => setIsConditionDefinitionModalOpen(true)}
                  data-test-id="open-rarity-modal"
                >
                  <Text variant="xs" color="black60">
                    <u>Condition Definition</u>
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
