import { Match, Router } from "found"
import { isFunction } from "lodash"
import { graphql } from "react-relay"
import { redirects_submission$data } from "__generated__/redirects_submission.graphql"
import {
  getArtworkDetailsFormInitialValues,
  SubmissionType,
} from "../ArtworkDetails/Components/ArtworkDetailsForm"
import { getUploadPhotosFormInitialValues } from "../UploadPhotos/UploadPhotos"
import {
  artworkDetailsValidationSchema,
  uploadPhotosValidationSchema,
} from "./validation"

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

const checkArtworkDetailsFormValid = redirectToIf(
  id => `/sell/submission/${id}/artwork-details`,
  submission =>
    !artworkDetailsValidationSchema.isValidSync(
      getArtworkDetailsFormInitialValues({
        values: submission,
        type: SubmissionType.submission,
      })
    )
)

const checkUploadPhotosFormValid = redirectToIf(
  id => `/sell/submission/${id}/upload-photos`,
  submission =>
    !uploadPhotosValidationSchema.isValidSync(
      getUploadPhotosFormInitialValues(submission)
    )
)

export const redirects = {
  path: "/sell/submission",
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
