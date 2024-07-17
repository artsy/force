import { ConditionRoute_submission$key } from "__generated__/ConditionRoute_submission.graphql"
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
// import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import * as React from "react"
import * as Yup from "yup"
import { useUpdateArtwork } from "Apps/MyCollection/Routes/EditArtwork/Mutations/useUpdateArtwork"
import { useMemo, useState } from "react"
import { acceptableConditionsForSubmission } from "Apps/Sell/Utils/acceptableConditionsForSubmission"
import { ArtworkConditionEnumType } from "__generated__/useUpdateArtworkMutation.graphql"
import { ConditionInfoModal } from "Apps/Artwork/Components/ArtworkDetails/ConditionInfoModal"

const FRAGMENT = graphql`
  fragment ConditionRoute_submission on ConsignmentSubmission {
    myCollectionArtwork {
      internalID
      condition {
        description
        displayText
        value
      }
    }
  }
`

const Schema = Yup.object().shape({
  condition: Yup.string().required().trim(),
  description: Yup.string().trim(),
})

interface FormValues {
  condition: string
  description: string
}

interface ConditionRouteProps {
  submission: ConditionRoute_submission$key
}

export const ConditionRoute: React.FC<ConditionRouteProps> = props => {
  const submission = useFragment(FRAGMENT, props.submission)
  // const { actions } = useSellFlowContext() // TODO: add a new action to update mycollection artwork
  const { submitMutation: updateArtwork } = useUpdateArtwork()
  const conditionOptions = useMemo(acceptableConditionsForSubmission, [])
  const [
    isConditionDefinitionModalOpen,
    setIsConditionDefinitionModalOpen,
  ] = useState(false)

  if (
    !submission.myCollectionArtwork ||
    !submission.myCollectionArtwork?.internalID
  ) {
    return null
  }

  const onSubmit = async (values: FormValues) => {
    if (!submission.myCollectionArtwork?.internalID) {
      return // ERROR
    }

    return updateArtwork({
      variables: {
        input: {
          condition: values.condition as ArtworkConditionEnumType,
          conditionDescription: values.description,
          artworkId: submission.myCollectionArtwork?.internalID,
        },
      },
    })
  }

  const initialValues: FormValues = {
    condition: submission?.myCollectionArtwork?.condition?.value ?? "",
    description: submission?.myCollectionArtwork?.condition?.description ?? "",
  }

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount
      validationSchema={Schema}
    >
      {({ handleChange, values }) => (
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
                data-testid="provenance-input"
              />
            </Box>

            <TextArea
              title="Add Additional Condition Details (Optional)"
              defaultValue={values.description}
              maxLength={500}
              name="description"
              onChange={handleChange}
              value={values.description}
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
