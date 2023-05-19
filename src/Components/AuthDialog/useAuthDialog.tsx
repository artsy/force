import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"

/**
 * Exposes specific dialog functions and hides internal context.
 */
export const useAuthDialog = () => {
  const { showAuthDialog, hideAuthDialog } = useAuthDialogContext()

  return { showAuthDialog, hideAuthDialog }
}

export type ShowAuthDialog = ReturnType<typeof useAuthDialog>["showAuthDialog"]

interface InjectedAuthDialogProps {
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
