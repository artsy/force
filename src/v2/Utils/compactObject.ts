/** Returns copy of the object sans keys with undefined or null values */
export const compactObject = <T extends object>(obj: T) => {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key]

    if (value === null || value === undefined) {
      return acc
    }

    return { ...acc, [key]: obj[key] }
  }, {} as { [Key in keyof T]?: NonNullable<T[Key]> })
}
