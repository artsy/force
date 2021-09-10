import Cookies from "cookies-js"
import { uniq } from "lodash"

export class Visited {
  name: string

  expires = 31536000

  /** Steps logged this session; does not save to Cookie */
  session: string[] = []

  constructor(name: string) {
    this.name = name
  }

  get(): string[] {
    return JSON.parse(Cookies.get(this.name) || "[]")
  }

  set(value: string[]) {
    Cookies.set(this.name, JSON.stringify(value), { expires: this.expires })
  }

  reset() {
    this.set([])
  }

  log(step: string) {
    // Log to session
    this.session = uniq([...this.session, step])
    // Log to cookie
    this.set(uniq([...this.get(), step]))
  }

  hasSeen(...steps: string[]) {
    const xs = this.get()
    return steps.every(step => xs.includes(step))
  }

  hasSeenThisSession(...steps: string[]) {
    const xs = this.session
    return steps.every(step => xs.includes(step))
  }
}
