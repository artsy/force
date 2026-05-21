import { geneToCollectionMap } from "Apps/Gene/Utils/geneToCollectionMap"
import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"
import type { NextFunction } from "express"
import type { RouteProps } from "System/Router/Route"

export function redirectGeneToCollection({
  req,
  res,
}: {
  req: ArtsyRequest
  res: ArtsyResponse
  next: NextFunction
  route: RouteProps
}) {
  const geneSlug: string = req.params.slug
  const collectionSlug: string = geneToCollectionMap[geneSlug]

  if (collectionSlug) {
    res.redirect(301, `/collection/${collectionSlug}`)
  }
}
