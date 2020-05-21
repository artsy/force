import { storiesOf } from "@storybook/react"
import React from "react"
import { EmailPanel } from "../Email/EmailPanel"
import { InstantArticleEmailSignup } from "../Email/InstantArticleEmailSignup"

storiesOf("Publishing/Email", module)
  .add("Email Panel Signup", () => {
    return <EmailPanel signupUrl="#" />
  })
  .add("Instant Article Signup", () => {
    return <InstantArticleEmailSignup signupUrl="#" />
  })
