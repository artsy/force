export interface RGB {
  r: number
  g: number
  b: number
}

export interface RGBA extends RGB {
  a: number
}

export const stringifyRgba = (color: RGBA): string => {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
}

export const compareColors = (color1: RGBA, color2: RGBA): boolean => {
  return (
    color1.r === color2.r &&
    color1.g === color2.g &&
    color1.b === color2.b &&
    color1.a === color2.a
  )
}

export const adjustAlpha = (color: RGBA, alpha: number): RGBA => {
  return { ...color, a: alpha }
}

export const hexToRgba = (value: string): RGBA => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value)

  if (!result) {
    throw new Error(`Invalid input ${value}`)
  }

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: 1,
  }
}

export const BLACK: RGBA = { r: 0, g: 0, b: 0, a: 1 }
export const WHITE: RGBA = { r: 255, g: 255, b: 255, a: 1 }

export const getContrastTIQ = ({ r, g, b, a }: RGBA): RGBA => {
  if (a === 0) return BLACK

  const yiq = (r * 299 + g * 587 + b * 114) / 1000

  return yiq >= 128 ? BLACK : WHITE
}

export const luminance = ({ r, g, b }: RGB): number => {
  const a = [r, g, b].map(v => {
    v /= 255

    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

export const getContrastRatio = (color1: RGBA, color2: RGBA): number => {
  const l1 = luminance(rgbaToRgb(color1, color2))
  const l2 = luminance(rgbaToRgb(color2, color1))

  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

export const rgbaToRgb = (color: RGBA, background: RGBA): RGB => {
  const alpha = color.a
  const inverseAlpha = 1 - alpha

  return {
    r: Math.round(color.r * alpha + background.r * inverseAlpha),
    g: Math.round(color.g * alpha + background.g * inverseAlpha),
    b: Math.round(color.b * alpha + background.b * inverseAlpha),
  }
}
