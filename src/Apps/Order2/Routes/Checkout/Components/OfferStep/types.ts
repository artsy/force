export interface OfferNoteValue {
  exceedsCharacterLimit: boolean
  value: string
}

export interface OfferFormProps {
  order: any // Will be typed with specific GraphQL fragment
  offerValue: number
  offerNoteValue: OfferNoteValue
  formIsDirty: boolean
  isSubmittingOffer: boolean
  onOfferValueChange: (value: number) => void
  onOfferNoteChange: (note: OfferNoteValue) => void
  onOfferInputFocus: () => void
  onSubmit: () => Promise<void>
}

export interface OfferFormComponentProps
  extends Omit<OfferFormProps, "onSubmit"> {
  onContinueButtonPressed: () => Promise<void>
}

export interface OfferSubmissionData {
  offerAmount: number
  offerNote: string
}
