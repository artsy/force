import { Match, Router } from "found"
import { isFunction } from "lodash"
import { graphql } from "react-relay"
import { redirects_submission$data } from "__generated__/redirects_submission.graphql"

const redirectToIf = (
  to: ((id?: string) => string) | string,
  predicate: (args: redirects_submission$data) => boolean
) => (args: redirects_submission$data) => {
  if (predicate(args)) {
    return isFunction(to) ? to(args?.externalId) : to
  }
}

const checkSubmissionExist = redirectToIf(
  "/sell/submission/artwork-details",
  submission => !submission || !submission.externalId
)

export const redirects = {
  path: "/sell/submission",
  rules: [],
  children: [
    {
      path: "/:id/artwork-details",
      rules: [checkSubmissionExist],
    },
    {
      path: "/:id/upload-photos",
      rules: [checkSubmissionExist],
    },
  ],
}

export function getRedirect(
  router: Router,
  match: Match,
  submission: redirects_submission$data
) {
  for (let [path, route] of getPaths(redirects, "")) {
    if (isActiveRoute(router, match, path)) {
      for (const rule of route.rules) {
        const redirectTo = rule(submission)
        if (redirectTo) {
          return redirectTo
        }
      }
    }
  }
}

const isActiveRoute = (router: Router, match: Match, path: string) => {
  try {
    const formattedPath = router.matcher.format(path, match.params)
    const toLocation = router.createLocation(formattedPath)

    return router.isActive(match, toLocation, { exact: false })
  } catch {
    return false
  }
}

function getPaths(node, path) {
  let result = [[path + node.path, node]]

  if (node.children) {
    const subPaths = node.children.flatMap(n => getPaths(n, path + node.path))
    return result.concat(subPaths)
  }

  return result
}

graphql`
  fragment redirects_submission on ConsignmentSubmission {
    ...ArtworkDetails_submission @relay(mask: false)
    ...UploadPhotos_submission @relay(mask: false)
  }
`
