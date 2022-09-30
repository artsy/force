import {
  Clickable,
  ClickableProps,
  CloseIcon,
  HeartFillIcon,
  HeartIcon,
} from "@artsy/palette"
import { useArtQuizContext } from "Apps/ArtQuiz/ArtQuizContext"
import { useSaveArtwork } from "Components/Artwork/SaveButton/useSaveArtwork"
import { FC, MouseEvent, useState } from "react"

const BTN_WIDTH = 40
const BTN_HEIGHT = 40

// TODO: Re-evaluate necessity of this component
// Maybe just add a size prop to existing button
// Depends on how animations implementation goes
export const ArtQuizSaveButton: FC<{ slug: string } & ClickableProps> = ({
  slug,
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const { currentArtwork, stepForward } = useArtQuizContext()

  const { handleSave } = useSaveArtwork({
    isSaved: false, // TODO: replace with value from artQuiz query response
    artwork: currentArtwork,
    contextModule: "artQuiz" as any, // TODO: Update viable context modules to include artQuiz
    onSave: () => {
      // TODO: add tracking
      stepForward()
    },
  })

  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    handleSave()
  }

  return (
    <Clickable
      display="flex"
      p={0.5}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      alignItems="center"
      {...rest}
    >
      {isHovered ? (
        <HeartFillIcon height={BTN_HEIGHT} width={BTN_WIDTH} />
      ) : (
        <HeartIcon height={BTN_HEIGHT} width={BTN_WIDTH} />
      )}
    </Clickable>
  )
}

// TODO: Add mutation and animation
// Ask lois about possibility of a bold version of this icon
export const ArtQuizDislikeButton: FC<ClickableProps> = ({ ...rest }) => {
  const { stepBackward } = useArtQuizContext()
  const handleClick = () => {
    stepBackward()
  }

  return (
    <Clickable
      display="flex"
      p={0.5}
      onClick={handleClick}
      alignItems="center"
      {...rest}
    >
      <CloseIcon height={BTN_HEIGHT} width={BTN_WIDTH} />
    </Clickable>
  )
}
