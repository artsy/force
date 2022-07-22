export const computeTitle = ({
  copy,
  intent,
  pageTitle,
}: {
  copy?: string
  intent?: string
  pageTitle?: string
}) => {
  if (copy) {
    return copy
  }

  let title

  switch (intent) {
    case "save artwork":
      title = `Sign up to ${intent}s`
      break
    case "follow partner":
      title = `Sign up to ${intent}s`
      break
    case "follow artist":
      title = "Sign up to follow artists"
      break
    default:
      title = pageTitle || `Sign up for Artsy`
      break
  }

  return title
}
