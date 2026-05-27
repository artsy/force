import { collectionToGeneMap } from "Apps/Collect/Utils/collectionToGeneMap"
import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"
import type { NextFunction } from "express"

export function redirectCollectionToGene(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction,
) {
  const collectionSlug: string = req.params.slug
  const geneSlug: string = collectionToGeneMap[collectionSlug]

  if (geneSlug) {
    const genePath = `/gene/${geneSlug}`
    res.redirect(301, genePath)
  } else {
    next()
  }
}
