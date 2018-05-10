export type ModalType = 'login' | 'signup' | 'reset_password'

export interface ModalOptions {
  mode: string
  signupIntent: string
}

export interface ModalProps {
  mode?: string
  onClose?: () => void
  onTypeChange: (type: ModalType, options?: ModalOptions) => void
}
