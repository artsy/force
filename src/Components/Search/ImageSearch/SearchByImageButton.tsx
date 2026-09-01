import PhotographIcon from "@artsy/icons/PhotographIcon"
import { Clickable } from "@artsy/palette"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { type FC, type MouseEvent, useState } from "react"
import { ARTSY_LENS_WEB_FLAG } from "./constants"
import { SearchByImageModal } from "./SearchByImageModal"

export const SearchByImageButton: FC<React.PropsWithChildren<unknown>> = () => {
  const { featureFlags } = useSystemContext()
  const [isOpen, setIsOpen] = useState(false)

  const isArtsyLensEnabled =
    featureFlags?.isEnabled(ARTSY_LENS_WEB_FLAG) ?? false

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    // Prevent opening the surrounding search input's overlay (mobile) when the
    // camera button is nested inside a clickable search field.
    event.stopPropagation()
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isArtsyLensEnabled) {
    return null
  }

  return (
    <>
      <Clickable
        aria-label="Search by image with Artsy Lens"
        onClick={handleOpen}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <PhotographIcon fill="mono60" width={22} height={22} />
      </Clickable>

      {isOpen && <SearchByImageModal onClose={handleClose} />}
    </>
  )
}
