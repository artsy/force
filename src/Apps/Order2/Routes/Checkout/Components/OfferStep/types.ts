export interface OfferNoteValue {
  exceedsCharacterLimit: boolean
  value: string
}

export interface OfferFormProps {
  order: any
  offerValue: number
  offerNoteValue: OfferNoteValue
  formIsDirty: boolean
  isSubmittingOffer: boolean
  onOfferValueChange: (value: number) => void
  onOfferOptionSelected: (value: number, description?: string) => void
  onOfferNoteChange: (note: OfferNoteValue) => void
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
