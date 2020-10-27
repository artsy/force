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
        text: "Closed",
        textColor: "white100",
        color: "black100",
        borderColor: "black100",
      }
    case "live":
      return distanceToClose
        ? {
            text: `${distanceToClose} left`,
            textColor: "black60",
            color: "white100",
            borderColor: "black5",
          }
        : null
    case "scheduled":
      return distanceToOpen
        ? {
            text: "Opening soon",
            textColor: "white100",
            color: "black100",
            borderColor: "black100",
          }
        : null
  }
}
