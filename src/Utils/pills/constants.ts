import { OptionItem } from "./types"

export const ONE_IN_TO_CM = 2.54

export const COLOR_OPTIONS: OptionItem[] = [
  { value: "red", displayName: "Red" },
  { value: "orange", displayName: "Orange" },
  { value: "yellow", displayName: "Yellow" },
  { value: "green", displayName: "Green" },
  { value: "blue", displayName: "Blue" },
  { value: "purple", displayName: "Purple" },
  { value: "black-and-white", displayName: "Black and White" },
  { value: "brown", displayName: "Brown" },
  { value: "gray", displayName: "Gray" },
  { value: "pink", displayName: "Pink" },
]

export const SIZE_OPTIONS_IN_INCHES: OptionItem[] = [
  { displayName: "Small (under 16in)", value: "SMALL" },
  { displayName: "Medium (16in – 40in)", value: "MEDIUM" },
  { displayName: "Large (over 40in)", value: "LARGE" },
]

export const SIZE_OPTIONS_IN_CENTIMETERS: OptionItem[] = [
  { displayName: "Small (under 40cm)", value: "SMALL" },
  { displayName: "Medium (40 – 100cm)", value: "MEDIUM" },
  { displayName: "Large (over 100cm)", value: "LARGE" },
]

export const ATTRIBUTION_OPTIONS: OptionItem[] = [
  {
    displayName: "Unique",
    value: "unique",
  },
  {
    displayName: "Limited Edition",
    value: "limited edition",
  },
  {
    displayName: "Open Edition",
    value: "open edition",
  },
  {
    displayName: "Unknown Edition",
    value: "unknown edition",
  },
]

export const WAYS_TO_BUY_OPTIONS: OptionItem[] = [
  {
    displayName: "Buy Now",
    value: "acquireable",
  },
  {
    displayName: "Make Offer",
    value: "offerable",
  },
  {
    displayName: "Bid",
    value: "atAuction",
  },
  {
    displayName: "Inquire",
    value: "inquireableOnly",
  },
]
