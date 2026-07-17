import PhotographIcon from "@artsy/icons/PhotographIcon"
import { Clickable } from "@artsy/palette"
import { type FC, type MouseEvent, useState } from "react"
import { SearchByImageModal } from "./SearchByImageModal"

export const SearchByImageButton: FC<React.PropsWithChildren<unknown>> = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    // Prevent opening the surrounding search input's overlay (mobile) when the
    // camera button is nested inside a clickable search field.
    event.stopPropagation()
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Clickable
        aria-label="Search by image"
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
