import {
  RenderOptions,
  render as originalRender,
  screen,
} from "@testing-library/react"
import {
  ArtworkFilterContextProps,
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { ReactElement } from "react"

/**
 * A test helper that can be used to render components that depend
 * on an enclosing `ArtworkFilterContext`.
 *
 * This returns a render function can wrap some provided UI in a
 * properly initialized `ArtworkFilterContextProvider`.
 *
 * Example:
 *
 * ```tsx
 * const myContext: Partial<ArtworkFilterContextProps> = {
 *   aggregations: [
 *     {
 *       slice: "ARTIST",
 *       counts: [
 *         { name: "Artist A", value: "artist-a", count: 42 },
 *         { name: "Artist B", value: "artist-b", count: 420 },
 *       ],
 *     },
 *   ],
 * }
 *
 * const render = createArtworkFilterTestRenderer(myContext)
 *
 * it("renders a list of options based on current aggregation", () => {
 *   render(<ArtistsFilter expanded />)
 *   expect(screen.getByText("Artist A")).toBeInTheDocument()
 *   expect(screen.getByText("Artist B")).toBeInTheDocument()
 * })
 * ```
 *
 * Use it with `currentArtworkFilterContext` if you want inspect
 * the current state of the context after some user interaction.
 *
 * @param {ArtworkFilterContextProps} artworkFilterContext - context props to initialize the `ArtworkFilterContextProvider`
 * @returns a render function that wraps its provided UI in an initialized `ArtworkFilterContextProvider`
 *
 * @see currentArtworkFilterContext
 */
export const createArtworkFilterTestRenderer = (
  artworkFilterContext: Partial<ArtworkFilterContextProps> = {}
) => {
  return (ui: ReactElement, options: RenderOptions = {}) =>
    originalRender(ui, {
      wrapper: ({ children }) => {
        return (
          <ArtworkFilterContextProvider {...artworkFilterContext}>
            <ClearAllButton />
            {children}
            <ArtworkFilterContextInspector />
          </ArtworkFilterContextProvider>
        )
      },
      ...options,
    })
}

/**
 * A test helper that can be used in conjunction with `createArtworkFilterTestRenderer`
 * in order to inspect the current state of the ArtworkFilterContext.
 *
 * Example:
 *
 * ```tsx
 * const myContext: Partial<ArtworkFilterContextProps> = {
 *   aggregations: [
 *     {
 *       slice: "ARTIST",
 *       counts: [
 *         { name: "Artist A", value: "artist-a", count: 42 },
 *         { name: "Artist B", value: "artist-b", count: 420 },
 *       ],
 *     },
 *   ],
 * }
 *
 * const render = createArtworkFilterTestRenderer(myContext)
 *
 * it("updates context on filter change", () => {
 *   render(<ArtistsFilter expanded />)
 *   expect(currentArtworkFilterContext().filters?.artistIDs).toEqual([])
 *
 *   userEvent.click(screen.getAllByRole("checkbox")[0])
 *   expect(currentArtworkFilterContext().filters?.artistIDs).toEqual(["artist-a"])
 * ```
 *
 * @returns An object representing the current state of the `ArtworkFilterContext`
 *
 * @see createArtworkFilterTestRenderer
 */
export const currentArtworkFilterContext = (): ArtworkFilterContextProps => {
  let contextInspector: HTMLElement
  try {
    contextInspector = screen.getByTestId("artwork-filter-context-inspector")
  } catch (error) {
    if (error.name === "TestingLibraryElementError")
      throw new Error(
        `The currentContext() helper function requires an <ArtworkFilterContextInspector /> to be mounted in the current DOM.`
      )
  }
  return JSON.parse(contextInspector!.textContent!)
}

/**
 * A component whose only job is to call `resetFilters` on the
 * `ArtworkFilterContext` when clicked.
 */

const ClearAllButton: React.FC = () => {
  const artworkFilterContext = useArtworkFilterContext()

  return (
    <button onClick={() => artworkFilterContext.resetFilters()}>
      Clear all
    </button>
  )
}

/**
 * A component that renders a pretty-printed version of the current state
 * of the `ArtworkFilterContext` into the DOM.
 *
 * (This allows us to use currentArtworkFilterContext() to inspect the
 * internal state of the ArtworkFilterContext, while still adhering to
 * Testing Library's philosophy of interacting only with
 * components that are visible to the user.)
 */

const ArtworkFilterContextInspector: React.FC = () => {
  const artworkFilterContext = useArtworkFilterContext()

  return (
    <aside data-testid="artwork-filter-context-inspector">
      {JSON.stringify(artworkFilterContext, null, 2)}
    </aside>
  )
}
