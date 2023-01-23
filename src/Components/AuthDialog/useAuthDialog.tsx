import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { ModalOptions } from "Components/Authentication/Types"
import { mediator } from "Server/mediator"
import { useFeatureFlag } from "System/useFeatureFlag"
import { openAuthModal } from "Utils/openAuthModal"

/**
 * Exposes specific dialog functions and hides internal context.
 */
export const __useAuthDialog__ = () => {
  const { showAuthDialog, hideAuthDialog } = useAuthDialogContext()

  return { showAuthDialog, hideAuthDialog }
}

const FEATURE_FLAG_NAME = "auth-dialog"

/**
 * Returns a function to show the auth dialog; accepting props for both
 * the new and legacy versions, and choosing which to use based on the
 * feature flag.
 */
export const useAuthDialog = () => {
  const isNewAuthDialogEnabled = useFeatureFlag(FEATURE_FLAG_NAME)

  const { showAuthDialog: _showAuthDialog } = __useAuthDialog__()

  // TODO: Remove legacy auth modal once new auth dialog is enabled
  const showAuthDialog = ({
    current,
    legacy,
  }: {
    current: Parameters<typeof _showAuthDialog>[0]
    legacy: ModalOptions
  }) => {
    if (isNewAuthDialogEnabled) {
      _showAuthDialog(current)
      return
    }

    openAuthModal(mediator, legacy)
  }

  return { showAuthDialog }
}

export type ShowAuthDialog = ReturnType<typeof useAuthDialog>["showAuthDialog"]

export interface InjectedAuthDialogProps {
  showAuthDialog: ShowAuthDialog
}

export const withAuthDialog = <T extends InjectedAuthDialogProps>(
  Component: React.ComponentType<T>
) => {
  return (props: Omit<T, "showAuthDialog">) => {
    const { showAuthDialog } = useAuthDialog()

    return <Component {...(props as T)} showAuthDialog={showAuthDialog} />
  }
}
