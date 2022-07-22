export type Medium =
  | "painting"
  | "photography"
  | "sculpture"
  | "prints"
  | "work-on-paper"
  | "drawing"
  | "design"
  | "installation"
  | "film-slash-video"
  | "jewelry"
  | "performance-art"
  | "reproduction"
  | "ephemera-or-merchandise"

export type Color =
  | "black-and-white"
  | "blue"
  | "gray"
  | "green"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "yellow"

interface Props {
  medium: Medium | undefined
  color: Color | undefined
}

export function getMetadata({ medium, color }: Props) {
  let title = ""
  let description = ""

  if (medium) {
    switch (medium) {
      case "painting":
        title = "Paintings"
        description = "250,000 paintings"
        break
      case "photography":
        title = "Photography"
        description = "140,000 photographs"
        break
      case "sculpture":
        title = "Sculptures"
        description = "90,000 sculptures"
        break
      case "prints":
        title = "Prints"
        description = "75,000 prints"
        break
      case "work-on-paper":
        title = "Works on Paper"
        description = "80,000 works on paper"
        break
      case "drawing":
        title = "Drawings"
        description = "32,000 drawings"
        break
      case "design":
        title = "Design Works"
        description = "16,000 design works"
        break
      case "installation":
        title = "Installations"
        description = "13,000 installations"
        break
      case "film-slash-video":
        title = "Films & Videos"
        description = "4,000 Films & Videos works"
        break
      case "jewelry":
        title = "Jewelry"
        description = "3,000 pieces of jewelry"
        break
      case "performance-art":
        title = "Performance Art Works"
        description = "3,000 performance art works"
        break
      case "reproduction":
        title = "Reproduction"
        description = "3,000 reproductions"
        break
      case "ephemera-or-merchandise":
        title = "Ephemera or Merchandise"
        description = "5,000 ephemera or merchandise"
        break
      default:
        null
    }

    if (title && description) {
      return {
        title: `${title} - For Sale on Artsy`,
        breadcrumbTitle: title,
        description: `Buy, bid, and inquire on over ${description} on Artsy, the world’s largest online marketplace for art and design.`,
      }
    }
  }

  if (color) {
    switch (color) {
      case "black-and-white":
        title = "Black and White Art"
        break
      case "green":
        title = "Green Art"
        break
      case "gray":
        title = "Gray Art"
        break
      case "blue":
        title = "Blue Art"
        break
      case "orange":
        title = "Orange Art"
        break
      case "pink":
        title = "Pink Art"
        break
      case "red":
        title = "Red Art"
        break
      case "purple":
        title = "Purple Art"
        break
      case "yellow":
        title = "Yellow Art"
        break
      default:
        null
    }

    if (title) {
      const fullTitle = `${title} - For Sale on Artsy`
      return {
        title: fullTitle,
        breadcrumbTitle: title,
        description: `Discover and buy ${title.toLowerCase()} by the world's leading artists on Artsy.`,
      }
    }
  }

  // Fallback if not medium or color, or values are invalid
  return {
    title: "Collect | Artsy",
    breadcrumbTitle: "Collect",
    description:
      "Find artworks by subject matter, style/technique, movement, price, and gallery/institution.",
  }
}
