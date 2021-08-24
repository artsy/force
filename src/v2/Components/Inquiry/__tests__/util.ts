import { mount } from "enzyme"

export const fill = (
  wrapper: ReturnType<typeof mount>,
  name: string,
  value: string
) => {
  const input = wrapper.find(`input[name="${name}"]`)
  ;(input.getDOMNode() as HTMLInputElement).value = value
  input.simulate("change")
}
