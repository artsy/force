/**
 * Hackathon demo only: hardcoded map of artwork slug to a hosted 3D Gaussian
 * Splat asset URL (`.ply` or `.splat`, see `Artwork3DViewer`). There is no
 * Metaphysics schema field for this yet — see scratch.3DGS.md for the full
 * context and post-hackathon follow-ups.
 *
 * Raw `.ply` scans (e.g. Luma AI exports) are often hundreds of MB. To keep
 * demo assets under ~80MB: load into SuperSplat (https://superspl.at/convert),
 * decimate the splat count (~30% kept has worked well in practice), and
 * export as Standard `.ply`. Note SuperSplat's `.compressed.ply` and `.sog`
 * export formats are NOT supported by the installed `gsplat` version — stick
 * to Standard `.ply` or `.splat`.
 */
export const DEMO_SPLATS: Record<string, string> = {
  "jon-allured-mask":
    "https://s3.amazonaws.com/artsy-vanity-files-staging/other/mask.ply",
  "chris-wolston-plant-chair":
    "https://s3.amazonaws.com/artsy-vanity-files-staging/other/chair-smaller-sphere-float-cc.ply",
}

export const has3DAsset = (slug: string): boolean => {
  return slug in DEMO_SPLATS
}

export const get3DAssetUrl = (slug: string): string | null => {
  return DEMO_SPLATS[slug] ?? null
}
