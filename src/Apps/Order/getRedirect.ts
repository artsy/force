export interface Redirect {
  path: string
  reason: string
}

export type RedirectPredicate<Arguments> = (args: Arguments) => Redirect | void

export interface RedirectRecord<Arguments> {
  path: string
  rules: Array<RedirectPredicate<Arguments>>
  children?: Array<RedirectRecord<Arguments>>
}

export const trimLeadingSlashes = (s: string) => s.replace(/^\/+/, "")

export function getRedirect<Arguments>(
  redirects: RedirectRecord<Arguments>,
  location: string,
  args: Arguments
): Redirect | null {
  const trimmedLocation = trimLeadingSlashes(location)

  for (const rule of redirects.rules) {
    const redirect = rule(args)
    if (redirect) {
      return redirect
    }
  }

  if (trimmedLocation.length > 0 && redirects.children) {
    // find most specific matching child (i.e. longest path match)
    const matchingChild = redirects.children
      .filter(child => trimmedLocation.startsWith(child.path))
      .sort((a, b) => a.path.split("/").length - b.path.split("/").length)
      .pop()
    if (matchingChild) {
      return getRedirect(
        matchingChild,
        trimmedLocation.slice(matchingChild.path.length),
        args
      )
    }
  }

  return null
}
