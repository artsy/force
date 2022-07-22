export interface ApiError {
  code: string
  message: string
  data?: { [key: string]: any }
}
