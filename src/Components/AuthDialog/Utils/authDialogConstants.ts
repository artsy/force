import { THEME } from "@artsy/palette"
import { resized } from "Utils/resized"

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
    title: "Welcome to Artsy",
    subtitle: "The world's largest online art marketplace",
  },
  {
    width: COLUMN_WIDTH,
    height: IMAGE_HEIGHT,
    src: "https://files.artsy.net/images/signup-02-1765895830877.png",
    title: "Welcome to Artsy",
    subtitle: "Get personalized recommendations that match your taste",
  },
  {
    width: COLUMN_WIDTH,
    height: IMAGE_HEIGHT,
    src: "https://files.artsy.net/images/signup-03-1765895830761.png",
    title: "Welcome to Artsy",
    subtitle: "Discover and buy art you love",
  },
]

export const GALLERY_IMAGE = {
  width: MODAL_WIDTH,
  height: IMAGE_HEIGHT,
  src: "https://files.artsy.net/images/signup-gallery.png",
}

export const getResizedAuthDialogImages = () =>
  DEFAULT_IMAGES.map(image => ({
    ...resized(image.src, { width: image.width, quality: 80 }),
    title: image.title,
    subtitle: image.subtitle,
  }))

export const getResizedAuthDialogImagePlaceholder = () =>
  resized(DEFAULT_IMAGES[0].src, { width: COLUMN_WIDTH, quality: 1 })

export const getResizedAuthDialogGalleryImagePlaceholder = () =>
  resized(GALLERY_IMAGE.src, { width: GALLERY_IMAGE.width, quality: 1 })

export const getResizedAuthDialogGalleryImage = () =>
  resized(GALLERY_IMAGE.src, { width: GALLERY_IMAGE.width, quality: 80 })

export const getResizedAuthDialogSEOImage = () =>
  resized(DEFAULT_IMAGES[0].src, {
    width: DEFAULT_IMAGES[0].width,
    quality: 80,
  })
