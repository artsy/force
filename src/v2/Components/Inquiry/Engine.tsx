export type Branch = { [key: string]: Workflow }
export type Workflow = (string | { [event: string]: Branch })[]
export type Conditions<T> = Record<string, (context: T) => boolean>

export class Engine<T extends {}> {
  workflow: Workflow
  conditions: Conditions<T>
  context: T
  moves = 0
  index = 0

  constructor({
    workflow,
    conditions = {},
    context,
  }: {
    workflow: Workflow
    conditions?: Conditions<T>
    context: T
  }) {
    this.workflow = workflow
    this.conditions = conditions
    this.context = context
  }

  current(): string {
    const current = this.workflow[this.index]

    if (typeof current === "string") {
      return current
    }

    const [key, outcomes] = this.split(current)
    const rest = this.workflow.slice(this.index + 1)
    const decision = this.decide(key)
    const workflow = [...(outcomes[String(decision)] ?? []), ...(rest ?? [])]

    this.workflow = workflow
    this.index = 0

    return this.current()
  }

  split(leaf: Workflow[number]) {
    return [Object.keys(leaf)[0], Object.values(leaf)[0]]
  }

  decide(key: string) {
    return this.conditions[key](this.context)
  }

  next() {
    this.moves = this.moves + 1

    if (!this.isEnd()) {
      this.index = this.index + 1
    }

    const current = this.current()

    return current
  }

  total() {
    const offset = this.moves - this.index
    return this.workflow.length + offset
  }

  position() {
    return this.moves + 1
  }

  isEnd() {
    return this.index === this.end()
  }

  end() {
    return this.workflow.length - 1
  }
}
