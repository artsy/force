const MAX_DIMENSION = 160
const QUALITY = 0.7

// Returns undefined when the browser can't decode the file (e.g. HEIC outside Safari).
export const createImageThumbnail = async (
  file: File,
): Promise<string | undefined> => {
  if (typeof createImageBitmap === "undefined") return undefined
  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(
      1,
      MAX_DIMENSION / Math.max(bitmap.width, bitmap.height),
    )
    const canvas = document.createElement("canvas")
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    const context = canvas.getContext("2d")
    if (!context) return undefined
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    bitmap.close()
    return canvas.toDataURL("image/jpeg", QUALITY)
  } catch {
    return undefined
  }
}
