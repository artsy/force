import { UtilButton } from "Apps/Artwork/Components/ArtworkImageBrowser/UtilButton"
import HeartFillIcon from "@artsy/icons/HeartFillIcon"
import HeartStrokeIcon from "@artsy/icons/HeartStrokeIcon"
import type React from "react"
import type { FC } from "react"

interface SaveUtilButtonProps {
  isSaved: boolean
  onClick?: () => void
}

export const SaveUtilButton: FC<
  React.PropsWithChildren<SaveUtilButtonProps>
> = ({ isSaved, onClick }) => {
  return (
    <UtilButton
      name="heart"
      Icon={(isSaved ? UnsaveIcon : SaveIcon) as unknown as React.ReactNode}
      label={isSaved ? "Saved" : "Save"}
      longestLabel="Saved"
      onClick={onClick}
    />
  )
}

const SaveIcon = () => (
  <HeartStrokeIcon data-testid="save-icon" title="Save icon" />
)
const UnsaveIcon = () => (
  <HeartFillIcon data-testid="unsave-icon" title="Unsave icon" fill="blue100" />
)
