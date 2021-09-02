import { uniqBy } from "lodash"
import { useState } from "react"
import { useInquiryContext } from "../InquiryContext"
import { useUpdateCollectorProfile } from "./useUpdateCollectorProfile"
import { logger } from "../util"
import { UpdateCollectorProfileInput } from "v2/__generated__/useUpdateCollectorProfileMutation.graphql"

type Option = { text: string; value: string }

export enum Mode {
  Pending,
  Loading,
  Success,
  Error,
}

export const useInquiryAffiliated = () => {
  const { next } = useInquiryContext()

  const [mode, setMode] = useState(Mode.Pending)

  const { submitUpdateCollectorProfile } = useUpdateCollectorProfile()

  const [selection, setSelection] = useState<Option[]>([])

  const handleSelect = (option: Option) => {
    setSelection(prevSelection => {
      return uniqBy([...prevSelection, option], ({ value }) => value)
    })
  }

  const handleRemove = (option: Option) => {
    setSelection(prevSelection =>
      prevSelection.filter(({ value }) => value !== option.value)
    )
  }

  const handleSave = async (input: UpdateCollectorProfileInput) => {
    setMode(Mode.Loading)

    try {
      await submitUpdateCollectorProfile(input)
      setMode(Mode.Success)
      next()
    } catch (err) {
      logger.error(err)
      setMode(Mode.Error)
    }
  }

  return { handleSelect, handleRemove, handleSave, selection, mode }
}
