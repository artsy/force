import { Match, Router } from "found"
import { isFunction } from "lodash"
import { SubmissionModel } from "./useSubmission"
import {
  artworkDetailsValidationSchema,
  uploadPhotosValidationSchema,
} from "./validation"

export interface ValidationInformation {
  submission?: SubmissionModel
  submissionId?: string
}

const redirectToIf = (
  to: ((id?: string) => string) | string,
  predicate: (args: ValidationInformation) => boolean
) => (args: ValidationInformation) => {
  if (predicate(args)) {
    return isFunction(to) ? to(args.submissionId) : to
  }
}

const checkSubmissionExist = redirectToIf(
  "/consign/submission2/artwork-details",
  ({ submissionId, submission }) =>
    !submissionId || !submission || !submission.artworkDetailsForm
)

const checkArtworkDetailsFormValid = redirectToIf(
  id => `/consign/submission2/${id}/artwork-details`,
  ({ submission }) =>
    !artworkDetailsValidationSchema.isValidSync(submission?.artworkDetailsForm)
)

const checkUploadPhotosFormValid = redirectToIf(
  id => `/consign/submission2/${id}/upload-photos`,
  ({ submission }) =>
    !submission?.uploadPhotosForm ||
    !submission?.uploadPhotosForm.photos ||
    !uploadPhotosValidationSchema.isValidSync(submission?.uploadPhotosForm)
)

export const redirects = {
  path: "/consign/submission2",
  rules: [],
  children: [
    {
      path: "/artwork-details",
      rules: [],
    },
    {
      path: "/:id/artwork-details",
      rules: [checkSubmissionExist],
    },
    {
      path: "/:id/upload-photos",
      rules: [checkSubmissionExist, checkArtworkDetailsFormValid],
    },
    {
      path: "/:id/contact-information",
      rules: [
        checkSubmissionExist,
        checkArtworkDetailsFormValid,
        checkUploadPhotosFormValid,
      ],
    },
  ],
}

export function getRedirect(
  router: Router,
  match: Match,
  validationInfo: ValidationInformation
) {
  for (let [path, route] of getPaths(redirects, "")) {
    if (isActiveRoute(router, match, path)) {
      for (const rule of route.rules) {
        const redirectTo = rule(validationInfo)
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

// the generator that returns paths for each route
function* getPaths(node, path) {
  if (!node) return

  yield [path + node.path, node]

  if (node.children) {
    for (const n of node.children) {
      yield* getPaths(n, path + node.path)
    }
  }
}
