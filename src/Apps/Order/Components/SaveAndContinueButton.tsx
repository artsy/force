import { Button } from "@artsy/palette"
import { Media } from "Utils/Responsive"
import type { FC } from "react"

export const SaveAndContinueButton: FC<
  React.PropsWithChildren<{
    testId?: string
    onClick?: () => void
    media?: { [key: string]: string }
    loading?: boolean
    disabled?: boolean
    tabIndex?: number
  }>
> = ({
  testId,
  onClick,
  media,
  loading = false,
  disabled = false,
  tabIndex,
}) => {
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
            tabIndex={tabIndex}
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
          tabIndex={tabIndex}
        >
          Save and Continue
        </Button>
      )}
    </>
  )
}
