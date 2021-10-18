import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { MinimalNavBar } from "v2/Components/NavBar/MinimalNavBar"

export const SubmissionLayout: React.FC = ({ children }) => (
  <MinimalNavBar to="/consign">
    <AppContainer overflowX="hidden">
      <HorizontalPadding>{children}</HorizontalPadding>
    </AppContainer>
  </MinimalNavBar>
)
