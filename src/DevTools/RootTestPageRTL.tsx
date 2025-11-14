import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import type { RenderResult } from "@testing-library/react"
import { screen, waitFor } from "@testing-library/react"

export class RootTestPageRTL {
  readonly root: RenderResult

  constructor(renderResult: RenderResult) {
    this.root = renderResult
  }

  async update() {
    await flushPromiseQueue()
  }

  find(selector: string) {
    return screen.queryByTestId(selector) || screen.queryByText(selector)
  }

  findByRole(role: string, options?: any) {
    return screen.queryByRole(role, options)
  }

  findByText(text: string | RegExp, options?: any) {
    return screen.queryByText(text, options)
  }

  findAllByRole(role: string, options?: any) {
    return screen.queryAllByRole(role, options)
  }

  findAllByText(text: string | RegExp, options?: any) {
    return screen.queryAllByText(text, options)
  }

  async waitForElement(callback: () => HTMLElement | null) {
    return waitFor(callback)
  }

  text(): string {
    return this.root.container.textContent || ""
  }

  html(): string {
    return this.root.container.innerHTML
  }
}
