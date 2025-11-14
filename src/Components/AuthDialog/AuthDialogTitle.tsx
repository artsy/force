import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import CloseIcon from "@artsy/icons/CloseIcon"
import { Box, type BoxProps, Clickable, Stack, Text } from "@artsy/palette"
import type { FC } from "react"

interface AuthDialogTitleProps extends BoxProps {
  title: string
  onClose?: () => void
}

export const AuthDialogTitle: FC<
  React.PropsWithChildren<AuthDialogTitleProps>
> = ({ title, onClose, ...rest }) => {
  const {
    dispatch,
    state: { mode },
  } = useAuthDialogContext()
  return (
    <Stack gap={4} {...rest}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Clickable
          style={{
            ...(mode === "Welcome" ? { visibility: "hidden" } : {}),
          }}
          onClick={() => {
            dispatch({ type: "MODE", payload: { mode: "Welcome" } })
          }}
        >
          <ChevronLeftIcon />
        </Clickable>

        <ArtsyLogoIcon height={30} />

        <Clickable
          onClick={onClose}
          aria-label="Close"
          style={{
            ...(onClose ? {} : { visibility: "hidden" }),
          }}
        >
          <CloseIcon fill="currentColor" display="block" />
        </Clickable>
      </Box>

      <Text as="h1" variant="lg-display" lineClamp={6} hyphenate>
        {title}
      </Text>
    </Stack>
  )
}
