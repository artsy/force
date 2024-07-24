import { ArtworkConditionEnumType } from "__generated__/useUpdateArtworkMutation.graphql"

// This type is here to make sure the condition options match the allowed values in the schema. We have to update the conditionOptions array whenever the ArtworkConditionEnumType changes.
type ConditionOption = {
  text: string
  value: Exclude<ArtworkConditionEnumType, "%future added value"> | ""
}

export const conditionOptions: ConditionOption[] = [
  { text: "Select Condition", value: "" },
  { text: "Excellent Condition", value: "EXCELLENT" },
  { text: "Fair Condition", value: "FAIR" },
  { text: "Good Condition", value: "GOOD" },
  { text: "Very Good Condition", value: "VERY_GOOD" },
]
