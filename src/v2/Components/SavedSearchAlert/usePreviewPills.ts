import { useEffect, useRef, useState } from "react"
import { graphql, fetchQuery } from "relay-runtime"
import { useSystemContext } from "v2/System"
import {
  FilterPill,
  SavedSearchEntity,
  SearchCriteriaAttributes,
} from "./types"
import {
  usePreviewPillsQuery,
  usePreviewPillsQueryResponse,
  PreviewSavedSearchAttributes,
} from "v2/__generated__/usePreviewPillsQuery.graphql"
import { convertLabelsToPills, LabelEntity } from "./Utils/convertLabelsToPills"
import { usePrevious } from "v2/Utils/Hooks/usePrevious"
import { differenceWith, isEqual } from "lodash"
import { Aggregations } from "../ArtworkFilter/ArtworkFilterContext"
import { Metric } from "../ArtworkFilter/Utils/metrics"
import { useFeatureFlag } from "v2/System/useFeatureFlag"
import { extractPills } from "./Utils/extractPills"

type AttributeEntity = [string, string]

// TODO: Remove when "force-fetch-alert-labels-from-metaphysics" feature flag is released
interface Options {
  entity?: SavedSearchEntity | undefined
  aggregations?: Aggregations | undefined
  metric?: Metric | undefined
}

const PREVIEW_PILLS_QUERY = graphql`
  query usePreviewPillsQuery($attributes: PreviewSavedSearchAttributes) {
    previewSavedSearch(attributes: $attributes) {
      labels {
        field
        displayValue
        value
      }
    }
  }
`

export const usePreviewPills = (
  attributes: SearchCriteriaAttributes,
  options: Options
) => {
  const [pills, setPills] = useState<FilterPill[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const { relayEnvironment } = useSystemContext()
  const prevAttributes = usePrevious(attributes)
  const requestId = useRef(0)
  const currentAttributesCount = getAttributesCount(attributes)
  const fetchPillsFromMetaphysics = useFeatureFlag(
    "force-fetch-alert-labels-from-metaphysics"
  )

  const fetchPillsByAttributes = async () => {
    if (!relayEnvironment) {
      return
    }

    const currentRequestId = requestId.current
    let response: usePreviewPillsQueryResponse | undefined

    try {
      response = await fetchQuery<usePreviewPillsQuery>(
        relayEnvironment,
        PREVIEW_PILLS_QUERY,
        {
          attributes: attributes as PreviewSavedSearchAttributes,
        }
      )
    } catch (error) {
      console.log("[debug] error", error)
    }

    if (currentRequestId === requestId.current) {
      if (response) {
        const { previewSavedSearch } = response
        const labels = (previewSavedSearch?.labels ?? []) as LabelEntity[]
        const convertedPills = convertLabelsToPills(labels)

        setPills(convertedPills)
      }

      setIsFetching(false)
    }
  }

  const removePillByAttributeEntity = (entity: AttributeEntity) => {
    const [field, value] = entity

    const updatedPills = pills.filter(pill => {
      if (field === pill.field && value === pill.value) {
        return false
      }

      return true
    })

    setPills(updatedPills)
  }

  useEffect(() => {
    if (fetchPillsFromMetaphysics) {
      const prevAttributesCount = getAttributesCount(prevAttributes)

      requestId.current += 1

      // If there are more criteria, then a new filter has been added
      if (currentAttributesCount >= prevAttributesCount) {
        fetchPillsByAttributes()
        return
      }

      // If there are fewer criteria, then some filter has been removed
      // and we have to remove corresponding pill
      const prev = convertAttributes(prevAttributes)
      const current = convertAttributes(attributes)
      const removed = differenceWith(prev, current, isEqual)

      removePillByAttributeEntity(removed[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAttributesCount, fetchPillsFromMetaphysics])

  const result = {
    pills,
    isFetching,
  }

  if (!fetchPillsFromMetaphysics) {
    result.pills = extractPills({
      criteria: attributes,
      aggregations: options.aggregations,
      entity: options.entity,
      metric: options.metric,
    })
  }

  return result
}

const getAttributesCount = (attributes: SearchCriteriaAttributes) => {
  return Object.values(attributes).reduce((count, value) => {
    if (Array.isArray(value)) {
      return count + value.length
    }

    return count + 1
  }, 0)
}

const convertAttributes = (attributes: SearchCriteriaAttributes) => {
  return Object.entries(attributes).reduce((acc, entity) => {
    const [key, value] = entity

    if (Array.isArray(value)) {
      const convertedItems = value.map(v => [key, v])

      return [...acc, ...convertedItems]
    }

    return [...acc, [key, value]]
  }, []) as AttributeEntity[]
}
