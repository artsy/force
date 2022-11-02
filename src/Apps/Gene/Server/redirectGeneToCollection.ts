import { geneToCollectionMap } from "Apps/Gene/Utils/geneToCollectionMap"

export function redirectGeneToCollection({ req, res }) {
  const geneSlug: string = req.params.slug
  const collectionSlug: string = geneToCollectionMap[geneSlug]

  if (collectionSlug) {
    const collectionPath = `/collection/${collectionSlug}`
    res.redirect(301, collectionPath)
  }
}
