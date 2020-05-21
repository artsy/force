import { ReactWrapper } from "enzyme"
import { flushPromiseQueue } from "v2/DevTools"

export function expectOne<T>(component: ReactWrapper<T>): ReactWrapper<T> {
  if (component.length !== 1) {
    // put this behind an if statement to prevent messing up assertion numbers
    expect(component.length).toBe(1)
  }
  return component
}

export class RootTestPage {
  // these three properties get hydrated by createTestEnv
  readonly root: ReactWrapper

  async update() {
    await flushPromiseQueue()
    this.root.update()
  }

  // @ts-ignore
  find: ReactWrapper["find"] = (...args) => this.root.find(...args)
  text(): string {
    return this.root.text()
  }
}
