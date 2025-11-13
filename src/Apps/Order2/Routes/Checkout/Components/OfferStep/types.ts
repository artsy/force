export interface OfferNoteValue {
  exceedsCharacterLimit: boolean
  value: string
}

export interface OfferFormProps {
  order: any
  onOfferOptionSelected: (value: number, description?: string) => void
  onCustomOfferBlur: (value: number | undefined) => void
}

export interface OfferSubmissionData {
  offerAmount: number
  offerNote: string
}
