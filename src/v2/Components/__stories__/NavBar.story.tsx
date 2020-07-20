import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { Box } from "@artsy/palette"
import { SystemContextProvider } from "v2/Artsy"
import { NavBar } from "v2/Components/NavBar"
import * as Menus from "v2/Components/NavBar/Menus"

const NavBarArea = props => {
  return (
    <SystemContextProvider {...props}>
      <Box mx={1} position="fixed" top={0} left={-10} width="100%">
        <NavBar />
      </Box>
    </SystemContextProvider>
  )
}

storiesOf("Components/NavBar", module)
  .add("Logged out", () => {
    return (
      <Container>
        <NavBarArea user={null} />
        <PageCopy />
      </Container>
    )
  })

  .add("Logged in", () => {
    return (
      <Container>
        <NavBarArea user={{ email: "somebody@example.com" }} />
        <PageCopy />
      </Container>
    )
  })

  .add(
    "Mobile",
    () => {
      return (
        <Container>
          <NavBarArea />
          <PageCopy />
        </Container>
      )
    },
    {
      viewport: {
        defaultViewport: "iphonex",
      },
    }
  )

  .add(
    "Tablet",
    () => {
      return (
        <Container>
          <NavBarArea />
          <PageCopy />
        </Container>
      )
    },
    {
      viewport: {
        defaultViewport: "ipad",
      },
    }
  )

storiesOf("Components/NavBar/Menus", module)
  .add("MoreNavMenu", () => {
    return <Menus.MoreNavMenu />
  })
  .add("NotificationsMenu", () => {
    return <Menus.NotificationsMenu />
  })
  .add("UserMenu", () => {
    return <Menus.UserMenu />
  })
  .add("MobileNavMenu", () => {
    return <Menus.MobileNavMenu isOpen onClose={() => {}} />
  })

const Container = ({ children }) => {
  return <Box width="100%">{children}</Box>
}

const PageCopy = () => {
  return (
    <Box mx={1} mt={80}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non nibh
        quis ex imperdiet tristique eu non nisl. Nullam dignissim ex vel
        malesuada tristique. Nullam leo urna, eleifend eu porttitor ut,
        fringilla non nibh. Etiam id suscipit felis, vitae lacinia orci. Sed
        sagittis scelerisque imperdiet. Sed tempus nulla in nunc malesuada,
        feugiat hendrerit dui ornare. Sed pharetra erat orci, ac molestie turpis
        tincidunt non. Ut sit amet lorem at lectus molestie hendrerit. Maecenas
        a risus vel nibh lobortis bibendum. Fusce facilisis mauris a ex
        suscipit, in pretium leo aliquam. Donec vitae malesuada metus.
        Pellentesque odio lacus, imperdiet vel tincidunt dignissim, porttitor
        vel dui. Proin lacus mauris, tincidunt ac risus ac, consectetur
        tincidunt lorem.
      </p>
      <p>
        Nulla facilisi. Maecenas bibendum libero et massa euismod suscipit ut ac
        justo. Vestibulum et ex vel neque ultrices porttitor ultricies id lacus.
        Integer eget nisl consequat, auctor urna vitae, blandit ante. Sed
        tincidunt pulvinar enim, non elementum nunc vehicula in. Fusce fermentum
        mattis nunc pulvinar venenatis. Quisque imperdiet ex ac tellus
        pellentesque, sed faucibus elit vestibulum. Curabitur et nisl ac massa
        convallis blandit. Maecenas vitae feugiat ex. Morbi at arcu at arcu
        congue varius eget in nisi. Aliquam tempor varius dui ut luctus.
      </p>
      <p>
        Donec at lacus finibus tortor facilisis vestibulum vitae quis enim.
        Proin blandit interdum aliquam. Ut tempus orci ut magna dictum, vitae
        vulputate sem varius. Praesent at porttitor leo. Aliquam efficitur
        tincidunt tincidunt. In auctor purus porta suscipit mattis. Aliquam ante
        tellus, cursus quis augue at, commodo pulvinar ipsum. Aliquam erat
        volutpat. Praesent nec laoreet tortor, ut congue metus. Nam vitae velit
        nec erat egestas imperdiet. Vestibulum quam dolor, tempus a neque id,
        fermentum ultricies tortor.
      </p>
      <p>
        Maecenas aliquam massa non porttitor venenatis. Mauris a ante dictum
        lorem eleifend pharetra. Integer maximus non nisi sit amet aliquet. Sed
        consequat lacinia blandit. Aliquam ut maximus diam. Vivamus id eleifend
        orci, at feugiat libero. Aenean volutpat, ex vel semper tincidunt, magna
        est lobortis neque, quis cursus est velit sit amet diam. Curabitur in
        elementum nisi. Etiam quis dui magna. Integer ornare elementum nunc sit
        amet rutrum. Maecenas nisi mauris, gravida sit amet ipsum nec, rutrum
        laoreet neque. Praesent nec pellentesque tortor. Cras pharetra ante
        ullamcorper aliquet vehicula. Donec gravida in ante rutrum pellentesque.
      </p>
      <p>
        Mauris viverra finibus neque. Etiam ac est massa. Pellentesque blandit
        id ligula quis consectetur. Nunc posuere tempor velit, non semper turpis
        cursus id. Donec sed vulputate mi, eu gravida nisi. Aenean sit amet
        malesuada quam. Nulla et est laoreet, malesuada justo in, lacinia
        tellus. In mattis euismod mattis.
      </p>
    </Box>
  )
}
