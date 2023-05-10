import SearchIcon from "@artsy/icons/SearchIcon"
import { LabeledInput } from "@artsy/palette"
import { Overlay } from "./Overlay"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"

interface SearchBarProps {
  onClose: () => void
}

export const SearchBar: FC<SearchBarProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [overlayDisplayed, setOverlayDisplayed] = useState(false)

  const displayOverlay = () => {
    setOverlayDisplayed(true)
  }

  const handleOverlayClose = () => {
    setOverlayDisplayed(false)
    onClose()
  }

  return (
    <>
      {overlayDisplayed && <Overlay onClose={handleOverlayClose} />}

      <LabeledInput
        placeholder={t`navbar.searchArtsy`}
        label={<SearchIcon fill="black60" aria-hidden size={22} />}
        onClick={displayOverlay}
        height={40}
      />
    </>
  )
}
