import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"

/**
 * Exposes specific dialog functions and hides internal context.
 */
export const useAuthDialog = () => {
  const { showAuthDialog, hideAuthDialog } = useAuthDialogContext()

  return { showAuthDialog, hideAuthDialog }
}
