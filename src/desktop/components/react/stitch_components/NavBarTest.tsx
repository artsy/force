import React from "react"
import styled from "styled-components"
import { NavBarTest as ReactionNavBar } from "reaction/Components/NavBarTest"
import { data as sd } from "sharify"

import {
  SystemContextProvider,
  SystemContextProps,
} from "@artsy/reaction/dist/Artsy"
import { StagingBanner } from "./StagingBanner"

const mediator = require("desktop/lib/mediator.coffee")

const NavBarContainer = styled.div`
  z-index: 990;
  width: 100%;
  top: 0;
  left: 0;

  /* FIXME: Overwrite main force navbar style. Once main bar is totally removed
     and no longer controlled by an ENV var we can remove this. */
  border-bottom: none !important;
`

interface NavBarProps {
  user: SystemContextProps["user"]
  notificationCount: number
  searchQuery?: string
}

export const NavBarTest: React.FC<NavBarProps> = ({
  notificationCount,
  searchQuery,
  user,
}) => {
  const showStagingBanner = sd.APPLICATION_NAME === "force-staging"

  return (
    <SystemContextProvider
      mediator={mediator}
      notificationCount={notificationCount}
      searchQuery={searchQuery}
      user={user}
    >
      <NavBarContainer id="main-layout-header">
        {showStagingBanner && <StagingBanner />}
        <ReactionNavBar />
      </NavBarContainer>
    </SystemContextProvider>
  )
}
