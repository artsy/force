import { useRef, useState } from "react"
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
import { Aggregations } from "../ArtworkFilter/ArtworkFilterContext"
import { Metric } from "../ArtworkFilter/Utils/metrics"
import { useFeatureFlag } from "v2/System/useFeatureFlag"
import { extractPills } from "./Utils/extractPills"
import useDeepCompareEffect from "use-deep-compare-effect"

type AttributeEntity = {
  field: string
  value: any
}

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
  const attributesRef = useRef(attributes)
  const fetchPillsFromMetaphysics = useFeatureFlag(
    "force-fetch-alert-labels-from-metaphysics"
  )

  const fetchPillsByAttributes = async () => {
    if (!relayEnvironment) {
      return
    }

    console.log("[debug] 🚀 fetch pills")
    requestId.current += 1

    const currentRequestId = requestId.current
    let response: usePreviewPillsQueryResponse | undefined

    setIsFetching(true)

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
      console.log("[debug] ✅ request", currentRequestId, attributes)

      if (response) {
        const { previewSavedSearch } = response
        const labels = (previewSavedSearch?.labels ?? []) as LabelEntity[]
        const convertedPills = convertLabelsToPills(labels)
        const pillsByAttributes = getPillsByAttributes(
          convertedPills,
          attributesRef.current
        )

        setPills(pillsByAttributes)
      }

      setIsFetching(false)
    } else {
      console.log("[debug] ❌ request", currentRequestId, attributes)
    }
  }

  useDeepCompareEffect(() => {
    if (fetchPillsFromMetaphysics) {
      const prevAttributesCount = getAttributesCount(prevAttributes)
      const currentAttributesCount = getAttributesCount(attributes)

      attributesRef.current = attributes

      // If there are more criteria, then a new filter has been added
      if (currentAttributesCount >= prevAttributesCount) {
        fetchPillsByAttributes()
        return
      }

      // If there are fewer criteria, then some filter has been removed
      // and we have to remove corresponding pill
      const pillsByAttributes = getPillsByAttributes(pills, attributes)
      setPills(pillsByAttributes)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributes])

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

export const getAttributesCount = (attributes: SearchCriteriaAttributes) => {
  return Object.values(attributes).reduce((count, value) => {
    if (Array.isArray(value)) {
      return count + value.length
    }

    return count + 1
  }, 0)
}

export const convertAttributes = (attributes: SearchCriteriaAttributes) => {
  return Object.entries(attributes).reduce((acc, entity) => {
    const [field, value] = entity

    if (Array.isArray(value)) {
      const convertedEntities = value.map(v => ({ field, value: v }))

      return [...acc, ...convertedEntities]
    }

    return [...acc, { field, value }]
  }, []) as AttributeEntity[]
}

export const getPillsByAttributes = (
  pills: FilterPill[],
  attributes: SearchCriteriaAttributes
) => {
  const attributeEntities = convertAttributes(attributes)

  return pills.filter(pill => {
    return attributeEntities.find(entity => {
      const isEqualFields = entity.field === pill.field
      const isEqualValues = String(entity.value) === String(pill.value)

      return isEqualFields && isEqualValues
    })
  })
}
