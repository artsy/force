import { compact } from "lodash"
import { ArtworkConditionEnumType } from "__generated__/useUpdateArtworkMutation.graphql"

type AcceptableValuesMapKey = Exclude<
  ArtworkConditionEnumType,
  "%future added value"
>

export type AcceptableConditionValue = AcceptableValuesMapKey

// By having this ACCEPTABLE_VALUES_MAP structure, we are forced to update this list
// whenever ArtworkConditionEnumType changes, because yarn tsc will fail

export const ACCEPTABLE_CONDITION_VALUES_MAP: Record<
  AcceptableValuesMapKey,
  AcceptableConditionValue
> = {
  EXCELLENT: "EXCELLENT",
  FAIR: "FAIR",
  GOOD: "GOOD",
  VERY_GOOD: "VERY_GOOD",
}

export const conditionOptions = [
  { text: "Select Condition", value: "" },
  { text: "Excellent Condition", value: "Excellent" },
  { text: "Fair Condition", value: "Fair" },
  { text: "Good Condition", value: "Good" },
  { text: "Very Good Condition", value: "Very Good" },
]

export const formatConditionValueForSubmission = (conditionValue: string) => {
  return conditionValue
    .split(/[^A-Za-z]/)
    .reduce((accumulator, current) => {
      if (current && current.trim()) {
        accumulator.push(current.toUpperCase())
      }
      return accumulator
    }, [] as string[])
    .join("_") as AcceptableConditionValue
}

export const acceptableConditionsForSubmission = () => {
  const conditions: ({
    text: string
    value: AcceptableValuesMapKey | ""
  } | null)[] = conditionOptions.map(condition => {
    const newVal = formatConditionValueForSubmission(condition.value)
    if (ACCEPTABLE_CONDITION_VALUES_MAP[newVal]) {
      return { text: condition.text, value: newVal }
    }
    return null
  })

  conditions.unshift({ text: "Select", value: "" })
  return compact(conditions)
}
