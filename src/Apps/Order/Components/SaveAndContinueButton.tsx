import { FC } from "react"
import { Button, Spacer } from "@artsy/palette"
import { Media } from "Utils/Responsive"

export const SaveAndContinueButton: FC<{
  onClick?: () => void
  media: { [key: string]: string }
  loading?: boolean
  disabled?: boolean
}> = ({ onClick, media, loading = false, disabled = false }) => (
  <>
    <Spacer mb={4} />
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
  </>
)
