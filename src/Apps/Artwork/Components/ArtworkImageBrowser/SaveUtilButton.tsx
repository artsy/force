import { UtilButton } from "Apps/Artwork/Components/ArtworkImageBrowser/UtilButton"
import React, { FC } from "react"
import HeartStrokeIcon from "@artsy/icons/HeartStrokeIcon"
import HeartFillIcon from "@artsy/icons/HeartFillIcon"

interface SaveUtilButtonProps {
  isSaved: boolean
  onClick?: () => void
}

export const SaveUtilButton: FC<React.PropsWithChildren<
  SaveUtilButtonProps
>> = ({ isSaved, onClick }) => {
  return (
    <UtilButton
      name="heart"
      Icon={((isSaved ? UnsaveIcon : SaveIcon) as unknown) as React.ReactNode}
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
