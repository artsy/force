import { UtilButton } from "Apps/Artwork/Components/ArtworkImageBrowser/UtilButton"
import { FC } from "react"
import HeartStrokeIcon from "@artsy/icons/HeartStrokeIcon"
import HeartFillIcon from "@artsy/icons/HeartFillIcon"

interface SaveUtilButtonProps {
  isSaved: boolean
  onClick?: () => void
}

export const SaveUtilButton: FC<SaveUtilButtonProps> = ({
  isSaved,
  onClick,
}) => {
  return (
    <UtilButton
      name="heart"
      Icon={isSaved ? FilledIcon : HeartStrokeIcon}
      label={isSaved ? "Saved" : "Save"}
      longestLabel="Saved"
      onClick={onClick}
    />
  )
}

const FilledIcon = () => <HeartFillIcon title="Unsave icon" fill="blue100" />
