import { storiesOf } from "@storybook/react"
import React from "react"

import Button, { ButtonState } from "../Buttons/Default"
import FacebookButton from "../Buttons/Facebook"
import GhostButton from "../Buttons/Ghost"
import InvertedButton from "../Buttons/Inverted"
import MultiStateButton, { MultiButtonState } from "../Buttons/MultiStateButton"
import TwitterButton from "../Buttons/Twitter"

storiesOf("Components/Buttons", module)
  .add("Default Button", () => {
    return (
      <div>
        <div>
          <Button>Button</Button>
          <Button disabled>Button</Button>
        </div>
        <div>
          <Button state={ButtonState.Success}>Button</Button>
          <Button state={ButtonState.Success} disabled>
            Button
          </Button>
        </div>
        <div>
          <Button state={ButtonState.Failure}>Button</Button>
          <Button state={ButtonState.Failure} disabled>
            Button
          </Button>
        </div>
      </div>
    )
  })
  .add("Inverted Button", () => {
    return (
      <div>
        <div>
          <InvertedButton>Inverted Button</InvertedButton>
          <InvertedButton disabled>Button</InvertedButton>
        </div>
      </div>
    )
  })
  .add("Ghost Button", () => {
    return (
      <div>
        <div>
          <GhostButton>Ghost Button</GhostButton>
          <GhostButton disabled>Button</GhostButton>
        </div>
      </div>
    )
  })
  .add("Block Button", () => {
    return <Button block>Block Button</Button>
  })
  .add("Facebook Button", () => {
    return (
      <div>
        <FacebookButton />

        <br />

        <FacebookButton>Continue with Facebook</FacebookButton>
      </div>
    )
  })
  .add("Twitter Button", () => {
    return <TwitterButton />
  })
  .add("Multi State Button", () => {
    return (
      <div>
        <div>
          <MultiStateButton>Button</MultiStateButton>
        </div>
        <div>
          <MultiStateButton state={MultiButtonState.Highlighted}>
            Button
          </MultiStateButton>
        </div>
        <div>
          <MultiStateButton disabled>Button</MultiStateButton>
        </div>
      </div>
    )
  })
