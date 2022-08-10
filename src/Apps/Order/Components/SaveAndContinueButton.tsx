import { FC } from "react"
import { Button } from "@artsy/palette"
import { Media } from "Utils/Responsive"

export const SaveAndContinueButton: FC<{
  onClick?: () => void
  media?: { [key: string]: string }
  loading?: boolean
  disabled?: boolean
}> = ({ onClick, media, loading = false, disabled = false }) => {
  return (
    <>
      {media ? (
        <Media {...media}>
          <Button
            onClick={onClick}
            variant="primaryBlack"
            width={["100%", "50%"]}
            loading={loading}
            disabled={disabled}
          >
            Save and Continue
          </Button>
        </Media>
      ) : (
        <Button
          onClick={onClick}
          variant="primaryBlack"
          width={["100%", "50%"]}
          loading={loading}
          disabled={disabled}
        >
          Save and Continue
        </Button>
      )}
    </>
  )
}
