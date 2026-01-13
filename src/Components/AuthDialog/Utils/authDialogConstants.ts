import { THEME } from "@artsy/palette"

export const MODAL_WIDTH = 900

export const COLUMN_WIDTH =
  MODAL_WIDTH / 2 - Number.parseInt(THEME.space["2"].replace("px", ""))
const IMAGE_HEIGHT = 2030

export const IMAGE = {
  width: MODAL_WIDTH,
  height: IMAGE_HEIGHT,
  src: "https://files.artsy.net/images/2x_Evergreen-Artist-Page-Sign-Up-Modal.jpg",
}

export const DEFAULT_IMAGES = [
  {
    width: COLUMN_WIDTH,
    height: IMAGE_HEIGHT,
    src: "https://files.artsy.net/images/signup-01-1765895830875.png",
  },
  {
    width: COLUMN_WIDTH,
    height: IMAGE_HEIGHT,
    src: "https://files.artsy.net/images/signup-02-1765895830877.png",
  },
  {
    width: COLUMN_WIDTH,
    height: IMAGE_HEIGHT,
    src: "https://files.artsy.net/images/signup-03-1765895830761.png",
  },
]
