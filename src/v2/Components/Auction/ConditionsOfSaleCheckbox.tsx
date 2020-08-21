import { Checkbox, CheckboxProps } from "@artsy/palette/dist/elements/Checkbox"
import { Link } from "@artsy/palette/dist/elements/Link"
import { Serif } from "@artsy/palette/dist/elements/Typography"
import React from "react"
import { data as sd } from "sharify"

export const ConditionsOfSaleCheckbox: React.FC<CheckboxProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <Checkbox selected={selected} onSelect={onSelect}>
      <Serif display="inline" color="black60" size="3t" ml={0.5}>
        {"Agree to "}
        <Serif display="inline" color="black100" size="3t">
          <Link
            color="black100"
            href={`${sd.APP_URL}/conditions-of-sale`}
            target="_blank"
          >
            Conditions of Sale
          </Link>
        </Serif>
      </Serif>
    </Checkbox>
  )
}
