import { HeartFillIcon, HeartIcon } from "@artsy/palette"
import { UtilButton } from "Apps/Artwork/Components/ArtworkImageBrowser/UtilButton"
import { FC } from "react"

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
      Icon={isSaved ? FilledIcon : HeartIcon}
      iconTitle={isSaved ? "Unsave icon" : "Save icon"}
      label={isSaved ? "Saved" : "Save"}
      longestLabel="Saved"
      onClick={onClick}
    />
  )
}

const FilledIcon = () => <HeartFillIcon fill="blue100" />
