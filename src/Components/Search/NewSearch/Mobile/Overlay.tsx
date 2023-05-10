import SearchIcon from "@artsy/icons/SearchIcon"
import { Box, LabeledInput } from "@artsy/palette"
import { FC, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { OverlayBase } from "./OverlayBase"

interface OverlayProps {
  onClose: () => void
}

export const Overlay: FC<OverlayProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <OverlayBase onClose={onClose}>
      <Box mt={-15}>
        <LabeledInput
          ref={inputRef}
          placeholder={t`navbar.searchArtsy`}
          label={<SearchIcon fill="black60" aria-hidden mr={-10} size={18} />}
        />
      </Box>
    </OverlayBase>
  )
}
