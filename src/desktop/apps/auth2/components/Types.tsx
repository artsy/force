import { ModalType } from '@artsy/reaction/dist/Components/Authorization/Types'

export interface ModalOptions {
  mode: string
  signupIntent: string
}

export interface ModalProps {
  mode?: string
  onClose?: () => void
  onTypeChange: (type: ModalType, options?: ModalOptions) => void
}
