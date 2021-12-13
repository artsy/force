import { Button } from "@artsy/palette"
import { mount } from "enzyme"

import { BackupSecondFactor } from ".."
import {
  AppEnabledWithBackupCodesQueryResponse,
  DisabledQueryResponse,
} from "../../../__tests__/fixtures"

describe("BackupSecondFactor", () => {
  let props
  const getWrapper = (passedProps = props) => {
    return mount(<BackupSecondFactor {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      me: AppEnabledWithBackupCodesQueryResponse.me,
    }
  })

  it("displays how many backup codes remain", () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).toContain("10 remaining")
  })

  it("displays show and regenerate buttons if backup codes exists", () => {
    const wrapper = getWrapper()

    expect(wrapper.find(Button).findWhere(c => c.text() === "Show").exists)
      .toBeTruthy

    expect(
      wrapper.find(Button).findWhere(c => c.text() === "Regenerate").exists
    ).toBeTruthy
  })

  it("displays setup button if backup codes do not exist", () => {
    const wrapper = getWrapper(DisabledQueryResponse)

    expect(wrapper.find(Button).findWhere(c => c.text() === "Setup").exists)
      .toBeFalsy
  })
})
