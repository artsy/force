import {
  Clickable,
  ClickableProps,
  CloseIcon,
  HeartFillIcon,
  HeartIcon,
} from "@artsy/palette"
import { useSaveArtwork } from "Components/Artwork/SaveButton/useSaveArtwork"
import { FC, MouseEvent, useState } from "react"

const BTN_WIDTH = 40
const BTN_HEIGHT = 40

// TODO: Re-evaluate necessity of this component
// Maybe just add a size prop to existing button
// Depends on how animations implementation goes
export const ArtQuizSaveButton: FC<
  { artwork: any; slug: string; stepForward: () => void } & ClickableProps
> = ({ artwork, slug, stepForward, ...rest }) => {
  const [isHovered, setIsHovered] = useState(false)

  const { handleSave } = useSaveArtwork({
    isSaved: false, // TODO: replace with value from artQuiz query response
    artwork: artwork,
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
  const handleClick = () => {}

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
