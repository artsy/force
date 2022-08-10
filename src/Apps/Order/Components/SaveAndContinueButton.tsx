import { FC } from "react"
import { Button } from "@artsy/palette"
import { Media } from "Utils/Responsive"

export const SaveAndContinueButton: FC<{
  testId?: string
  onClick?: () => void
  media?: { [key: string]: string }
  loading?: boolean
  disabled?: boolean
}> = ({ testId, onClick, media, loading = false, disabled = false }) => {
  return (
    <>
      {media ? (
        <Media {...media}>
          <Button
            data-test={testId}
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
          data-test={testId}
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
