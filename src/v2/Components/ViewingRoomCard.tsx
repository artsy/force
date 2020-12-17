import { CardTagProps } from "@artsy/palette"

// TODO:
// Palette should export a `CardTag` component that has codified states,
// rather than having to compute a set of styles.
// TODO:
// Gravity should just return the text that should be displayed in a GraphQL field.
export const getTagProps = (
  status: string,
  distanceToOpen: string | null,
  distanceToClose: string | null
): CardTagProps | null => {
  switch (status) {
    case "closed":
      return {
        borderColor: "black100",
        color: "black100",
        text: "Closed",
        textColor: "white100",
      }
    case "live":
      return distanceToClose
        ? {
            borderColor: "black5",
            color: "white100",
            text: `${distanceToClose} left`,
            textColor: "black60",
          }
        : null
    case "scheduled":
      return distanceToOpen
        ? {
            borderColor: "black100",
            color: "black100",
            text: "Opening soon",
            textColor: "white100",
          }
        : null
  }
}
