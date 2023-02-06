import { FC } from "react"
import { GraphQLTaggedNode } from "react-relay"
import { ProgressiveOnboardingContextQuery$data } from "__generated__/ProgressiveOnboardingContextQuery.graphql"

export class ProgressiveOnboardingTip {
  key: string
  selector: string
  Component: FC
  delay: number
  node: HTMLElement | null
  condition: ({
    data,
  }: {
    data: ProgressiveOnboardingContextQuery$data
  }) => boolean
  fragment: GraphQLTaggedNode | null

  constructor({
    key,
    selector,
    Component,
    delay = 0,
    node = null,
    condition,
    fragment = null,
  }: {
    key: string
    selector: string
    Component: FC
    delay?: number
    node?: HTMLElement | null
    condition: ({
      data,
    }: {
      data: ProgressiveOnboardingContextQuery$data
    }) => boolean
    fragment?: GraphQLTaggedNode | null
  }) {
    this.key = key
    this.selector = selector
    this.Component = Component
    this.delay = delay
    this.node = node
    this.condition = condition
    this.fragment = fragment
  }

  dismiss() {
    __dismiss__(this.key)
  }

  isDismissed() {
    return isDismissed(this.key)
  }

  isVisible(data: ProgressiveOnboardingContextQuery$data) {
    return !this.isDismissed() && this.node && this.condition({ data })
  }
}

const LOCAL_STORAGE_KEY = "dismissedOnboardingTips"

// TODO:
// - Use Yup to validate and cast the data
export const __dismiss__ = (key: string) => {
  const item = localStorage.getItem(LOCAL_STORAGE_KEY)
  const dismissed = item ? JSON.parse(item) : []
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...dismissed, key]))
}

export const isDismissed = (key: string) => {
  const item = localStorage.getItem(LOCAL_STORAGE_KEY)
  const dismissed = item ? JSON.parse(item) : []
  return dismissed.includes(key)
}

export const reset = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY)
}
