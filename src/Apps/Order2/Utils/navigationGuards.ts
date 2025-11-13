export const preventHardReload = (e: BeforeUnloadEvent) => {
  e.preventDefault()
  e.returnValue = ""
}

export const handleBackNavigation = () => {
  window.history.pushState(null, "", window.location.pathname)

  const userConfirmedExit = window.confirm(
    "Are you sure you want to leave? Your changes will not be saved."
  )

  if (userConfirmedExit) {
    window.history.go(-2)
  }
}
