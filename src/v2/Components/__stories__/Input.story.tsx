import { storiesOf } from "@storybook/react"
import { unica } from "v2/Assets/Fonts"
import React from "react"
import styled from "styled-components"

import { Toggle } from "react-powerplug"
import Button from "../Buttons/Inverted"
import { Checkbox } from "../Checkbox"
import Input from "../Input"
import PasswordInput from "../PasswordInput"
import QuickInput from "../QuickInput"
import TextArea from "../TextArea"

const Title = styled.h1`
  ${unica("s40")};
`
const Subtitle = styled.h2`
  ${unica("s16", "regular")};
`

storiesOf("Components/Input", module)
  .add("Input", () => (
    <div style={{ padding: 10 }}>
      <Title>Input</Title>
      <Subtitle>Our default input style. Title is optional.</Subtitle>

      <section style={{ padding: 10 }}>
        <Input placeholder="Placeholder" title="Title" block />

        <Input placeholder="Placeholder" title="Title" value="Content" block />

        <Input title="Title" placeholder="Placeholder" block disabled />
      </section>
    </div>
  ))
  .add("Input with Description", () => (
    <div style={{ padding: 10 }}>
      <Title>Input with description</Title>
      <Subtitle>Used when greater context is needed beyond the title.</Subtitle>

      <section style={{ padding: 10 }}>
        <Input
          placeholder="Placeholder"
          title="Title"
          description="Short description"
          block
        />

        <Input
          placeholder="Placeholder"
          title="Title"
          description="Short description"
          value="Content"
          block
        />
      </section>
    </div>
  ))
  .add("Input with Error", () => (
    <Toggle initial>
      {({ on, toggle }) => (
        <div style={{ padding: 10 }}>
          <Title>Input with error</Title>
          <Subtitle>Our default input style. Title is optional.</Subtitle>

          <Button onClick={toggle}>Toggle errors</Button>

          <section style={{ padding: 10 }}>
            <Input
              placeholder="Placeholder"
              title="Title"
              error={on ? "There was a problem" : null}
              block
            />

            <Input
              placeholder="Placeholder"
              title="Title"
              description="Short description"
              error={on ? "There was a problem" : null}
              value="Content"
              block
            />
          </section>
        </div>
      )}
    </Toggle>
  ))
  .add("QuickInput", () => (
    <div style={{ padding: 10 }}>
      <Title>QuickInput</Title>
      <Subtitle>Used for short/simple forms</Subtitle>

      <div style={{ padding: 10 }}>
        <QuickInput
          placeholder="Enter your email address"
          label="Email"
          block
        />
      </div>
    </div>
  ))
  .add("QuickInput with Error", () => (
    <Toggle initial>
      {({ on, toggle }) => (
        <div style={{ padding: 10 }}>
          <Title>QuickInput with error</Title>
          <Subtitle>Used for short/simple forms</Subtitle>

          <Button onClick={toggle}>Toggle errors</Button>

          <section style={{ padding: 10 }}>
            <QuickInput
              placeholder="Placeholder"
              label="Title"
              error={on ? "There was a problem" : null}
              value="Content"
              block
            />
          </section>
        </div>
      )}
    </Toggle>
  ))
  .add("PasswordInput", () => (
    <div style={{ padding: 10 }}>
      <Title>PasswordInput</Title>
      <Subtitle>A specialized QuickInput for password entry</Subtitle>

      <div style={{ padding: 10 }}>
        <PasswordInput
          placeholder="Enter your password"
          label="Password"
          block
        />
        <PasswordInput
          placeholder="Enter your password"
          label="Password (with requirements)"
          block
          showPasswordMessage
        />
      </div>
    </div>
  ))
  .add("PasswordInput with Error", () => (
    <Toggle initial>
      {({ on, toggle }) => (
        <div style={{ padding: 10 }}>
          <Title>PasswordInput with error</Title>
          <Subtitle>A specialized QuickInput for password entry</Subtitle>

          <Button onClick={toggle}>Toggle errors</Button>

          <section style={{ padding: 10 }}>
            <PasswordInput
              placeholder="Placeholder"
              label="Password"
              error={on ? "There was a problem" : null}
              value="Content"
              block
            />

            <PasswordInput
              placeholder="Placeholder"
              label="Password (with requirements)"
              error={on ? "There was a problem" : null}
              value="Content"
              block
              showPasswordMessage
            />
          </section>
        </div>
      )}
    </Toggle>
  ))
  .add("Text Areas", () => (
    <div>
      <TextArea placeholder="Your Message" />
      <TextArea placeholder="Your Message" error />
      <TextArea placeholder="Your Message" disabled />
    </div>
  ))
  .add("Check Boxes", () => (
    <div>
      <div style={{ padding: 10 }}>
        <Checkbox>Remember me</Checkbox>
      </div>

      <div style={{ padding: 10 }}>
        <Checkbox checked>Remember me</Checkbox>
      </div>

      <div style={{ padding: 10 }}>
        <Checkbox error>Remember me</Checkbox>
      </div>

      <div style={{ padding: 10 }}>
        <Checkbox error checked>
          Remember me
        </Checkbox>
      </div>

      <div style={{ padding: 10 }}>
        <Checkbox disabled>Remember me</Checkbox>
      </div>

      <div style={{ padding: 10 }}>
        <Checkbox checked disabled>
          Remember me
        </Checkbox>
      </div>
    </div>
  ))
  .add("Form", () => (
    <div style={{ padding: 10 }}>
      <Input placeholder="First Name" block />
      <TextArea placeholder="Your Message" block />
    </div>
  ))
  .add("Form w/ Button", () => (
    <div style={{ padding: 10 }}>
      <Input placeholder="Email" block />
      <PasswordInput placeholder="Password" block />
      <Button block>Submit</Button>
    </div>
  ))
