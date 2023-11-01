import { Pill } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { SearchCriteriaAttributeKeys } from "Components/SavedSearchAlert/types"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { useDebouncedValue } from "Utils/Hooks/useDebounce"
import { useSystemContext } from "System/SystemContext"

import { CriteriaPillsQuery } from "__generated__/CriteriaPillsQuery.graphql"
import { CriteriaPills_previewSavedSearch$data } from "__generated__/CriteriaPills_previewSavedSearch.graphql"

interface CriteriaPillsQueryRendererProps {
  editable?: boolean
}

export const CriteriaPillsQueryRenderer: FC<CriteriaPillsQueryRendererProps> = ({
  editable = true,
}) => {
  const { relayEnvironment } = useSystemContext()
  const { state } = useAlertContext()

  const { debouncedValue: criteriaState } = useDebouncedValue({
    value: state.criteria,
    delay: 200,
  })

  return (
    <SystemQueryRenderer<CriteriaPillsQuery>
      environment={relayEnvironment}
      query={graphql`
        query CriteriaPillsQuery($attributes: PreviewSavedSearchAttributes) {
          viewer {
            previewSavedSearch(attributes: $attributes) {
              ...CriteriaPills_previewSavedSearch
            }
          }
        }
      `}
      variables={{ attributes: criteriaState }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
        }

        return (
          <CriteriaPillsFragmentContainer
            previewSavedSearch={props?.viewer?.previewSavedSearch ?? null}
            editable={editable}
          />
        )
      }}
    />
  )
}

interface CriteriaPillsProps {
  previewSavedSearch: CriteriaPills_previewSavedSearch$data | null
  editable: boolean
}

const CriteriaPills: FC<CriteriaPillsProps> = ({
  previewSavedSearch,
  editable,
}) => {
  const labels = previewSavedSearch?.labels ?? []
  const { dispatch } = useAlertContext()

  return (
    <>
      {labels.map(label => {
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
