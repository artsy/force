import { uniqBy } from "lodash"
import { useState } from "react"
import { logger } from "../util"
import { useInquiryContext } from "./useInquiryContext"

type Option = { text: string; value: string }

export enum Mode {
  Pending = 0,
  Loading = 1,
  Success = 2,
  Error = 3,
}

export const useInquiryAffiliated = () => {
  const { next } = useInquiryContext()

  const [mode, setMode] = useState(Mode.Pending)
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

  const handleSave = async (save: (values: string[]) => Promise<unknown>) => {
    setMode(Mode.Loading)

    const values = selection.map(({ value }) => value)

    try {
      await save(values)
      setMode(Mode.Success)
      next()
    } catch (err) {
      logger.error(err)
      setMode(Mode.Error)
    }
  }

  return { handleSelect, handleRemove, handleSave, selection, mode }
}
