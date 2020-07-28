export class PermanentRedirectException extends Error {
  pathname: string

  constructor(pathname: string) {
    super()
    this.pathname = pathname
  }
}
