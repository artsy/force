import { mount } from "enzyme"

export const fill = (
  wrapper: ReturnType<typeof mount>,
  name: string,
  value: string
) => {
  let input = wrapper.find(`input[name="${name}"]`)

  if (input.length === 0) {
    input = wrapper.find(`textarea[name="${name}"]`)
  }

  ;(input.getDOMNode() as HTMLInputElement).value = value
  input.simulate("change")
}
