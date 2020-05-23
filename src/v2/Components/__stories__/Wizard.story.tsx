import { storiesOf } from "@storybook/react"

import { BasicSlideshow, FormWizard } from "./WizardExamples"

storiesOf("Components/Wizard", module)
  .add("Basic", BasicSlideshow)
  .add("Form", FormWizard)
