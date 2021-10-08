export function formatFileSize(size: number): string {
  const sizeInMB = (size / (1000 * 1000)).toFixed(2)

  return `${sizeInMB} MB`
}
