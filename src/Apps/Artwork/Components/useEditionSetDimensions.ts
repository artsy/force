import { useSelectedEditionSetContext } from "Apps/Artwork/Components/SelectedEditionSetContext"

interface ArtworkDimensions {
  in: string | null | undefined
  cm: string | null | undefined
}

interface UseEditionSetDimensionsArgs {
  editionSets?: ReadonlyArray<
    | {
        readonly dimensions?: ArtworkDimensions | null
        readonly framedDimensions?: ArtworkDimensions | null
      }
    | null
    | undefined
  > | null
  dimensions?: ArtworkDimensions | null
  framedDimensions?: ArtworkDimensions | null
}

/**
 * Determines which dimensions to use based on edition set selection.
 * Priority: selectedEditionSet > singleEditionSet > artwork dimensions
 */
export const useEditionSetDimensions = ({
  editionSets,
  dimensions,
  framedDimensions,
}: UseEditionSetDimensionsArgs) => {
  const { selectedEditionSet } = useSelectedEditionSetContext()

  // Check if there's a single edition set (for immediate availability on first render)
  const singleEditionSet =
    editionSets && editionSets.length === 1 ? editionSets[0] : null

  // Use selectedEditionSet if available, otherwise fall back to singleEditionSet
  const editionSetToUse = selectedEditionSet || singleEditionSet

  return {
    dimensions: editionSetToUse?.dimensions || dimensions,
    framedDimensions: editionSetToUse?.framedDimensions || framedDimensions,
  }
}
