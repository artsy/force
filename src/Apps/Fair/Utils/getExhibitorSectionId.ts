export const getExhibitorSectionId = (letter: string) => {
  const prefix = "jump--section-"

  if (letter === "#") {
    return `${prefix}special-characters-or-numeric`
  }

  return `${prefix}${letter}`
}
