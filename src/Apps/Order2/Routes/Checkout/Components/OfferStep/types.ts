export interface OfferNoteValue {
  exceedsCharacterLimit: boolean
  value: string
}

export interface OfferFormProps {
  order: any
  offerValue: number
  formIsDirty: boolean
  onOfferValueChange: (value: number) => void
  onOfferOptionSelected: (value: number, description?: string) => void
}

export interface OfferSubmissionData {
  offerAmount: number
  offerNote: string
}
