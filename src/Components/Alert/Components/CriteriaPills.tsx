import { Pill } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SearchCriteriaAttributeKeys } from "Components/SavedSearchAlert/types"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"

interface CriteriaPillsProps {
  editable?: boolean
}

export const CriteriaPills: FC<CriteriaPillsProps> = ({ editable = true }) => {
  const { state, dispatch } = useAlertContext()

  return (
    <>
      {state.preview.labels.map(label => {
        if (!label) return null

        const key = `filter-label-${label?.field}-${label?.value}`

        if (!editable || label?.field === "artistIDs") {
          return (
            <Pill key={key} variant="filter" disabled>
              {label?.displayValue}
            </Pill>
          )
        }

        return (
          <Pill
            key={key}
            variant="filter"
            selected
            onClick={() =>
              dispatch({
                type: "REMOVE_CRITERIA_ATTRIBUTE_VALUE",
                payload: {
                  key: label?.field as SearchCriteriaAttributeKeys,
                  value: label?.value as string,
                },
              })
            }
          >
            {label?.displayValue}
          </Pill>
        )
      })}
    </>
  )
}

export const CriteriaPillsFragmentContainer = createFragmentContainer(
  CriteriaPills,
  {
    previewSavedSearch: graphql`
      fragment CriteriaPills_previewSavedSearch on PreviewSavedSearch {
        labels {
          displayValue
          field
          value
        }
      }
    `,
  }
)
