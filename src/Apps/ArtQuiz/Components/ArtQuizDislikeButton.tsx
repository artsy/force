import { Clickable, ClickableProps, CloseIcon } from "@artsy/palette"
import { FC } from "react"
import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { ArtQuizDislikeButtonMutation } from "Apps/ArtQuiz/__generated__/ArtQuizDislikeButtonMutation.graphql"

interface ArtQuizDislikeButtonProps extends ClickableProps {
  slug: string
}
// TODO: Add animation
export const ArtQuizDislikeButton: FC<ArtQuizDislikeButtonProps> = ({
  slug,
  ...rest
}) => {
  const { submitMutation } = useMutation<ArtQuizDislikeButtonMutation>({
    mutation: graphql`
      mutation ArtQuizDislikeButtonMutation($artworkID: String!) {
        dislikeArtwork(input: { artworkID: $artworkID, remove: false }) {
          artwork {
            isDisliked
            id
          }
        }
      }
    `,
  })

  const handleClick = slug => {
    try {
      submitMutation({
        variables: {
          artworkID: slug,
        },
      })
    } catch (err) {
      // what kind of error handling to do here?
    }
  }

  return (
    <Clickable
      display="flex"
      p={0.5}
      onClick={() => {
        handleClick(slug)
      }}
      alignItems="center"
      {...rest}
    >
      <CloseIcon height={40} width={40} />
    </Clickable>
  )
}
