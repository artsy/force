import loadable from "@loadable/component"
import { RouteRenderArgs } from "found"
import { graphql } from "react-relay"
import { RouteProps } from "System/Router/Route"

const ConsignmentInquiryApp = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/ConsignmentInquiry/ConsignmentInquiry"
    ),
  {
    resolveComponent: component =>
      component.ConsignmentInquiryFragmentContainer,
  }
)
const ConsignmentInquiryConfirmationApp = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/ConsignmentInquiry/ConsignmentInquiryConfirmation"
    ),
  {
    resolveComponent: component => component.ConsignmentInquiryConfirmation,
  }
)

const ConsignmentInquiryContainer = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/ConsignmentInquiry/ConsignmentInquiryContainer"
    ),
  {
    resolveComponent: component => component.ConsignmentInquiryContainer,
  }
)

const MarketingLandingApp = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/MarketingLanding/MarketingLandingApp"
    ),
  {
    resolveComponent: component => component.MarketingLandingApp,
  }
)

const FAQApp = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/SubmissionFlow/FAQ/FAQApp"
    ),
  {
    resolveComponent: component => component.FAQApp,
  }
)

const renderConsignmentInquiry = ({ Component, props }: RouteRenderArgs) => {
  if (!(Component && props)) {
    return undefined
  }
  return <Component {...props} />
}

export const consignRoutes: RouteProps[] = [
  {
    path: "/sell",
    children: [
      {
        path: "/",
        layout: "FullBleed",
        getComponent: () => MarketingLandingApp,
        onClientSideRender: () => {
          MarketingLandingApp.preload()
        },
      },
      {
        path: "faq",
        layout: "NavOnly",
        getComponent: () => FAQApp,
        onClientSideRender: () => {
          FAQApp.preload()
        },
      },
    ],
  },
  {
    path: "/sell/inquiry",
    getComponent: () => ConsignmentInquiryContainer,
    children: [
      {
        path: "/",
        getComponent: () => ConsignmentInquiryApp,
        layout: "ContainerOnly",
        onClientSideRender: () => {
          ConsignmentInquiryApp.preload()
        },
        query: graphql`
          query consignRoutes_ConsignmentInquiryAppQuery {
            me {
              ...ConsignmentInquiry_me
            }
            viewer {
              ...ConsignmentInquiry_viewer
            }
          }
        `,
        render: renderConsignmentInquiry,
      },
      {
        path: "sent",
        layout: "ContainerOnly",
        getComponent: () => ConsignmentInquiryConfirmationApp,
        onClientSideRender: () => {
          ConsignmentInquiryConfirmationApp.preload()
        },
      },
    ],
  },
  {
    path: "/sell/inquiry/:recipientEmail?",
    getComponent: () => ConsignmentInquiryContainer,
    children: [
      {
        path: "/",
        getComponent: () => ConsignmentInquiryApp,
        layout: "ContainerOnly",
        onClientSideRender: () => {
          ConsignmentInquiryApp.preload()
        },
        query: graphql`
          query consignRoutes_ConsignmentInquiryWithRecipientEmailAppQuery {
            me {
              ...ConsignmentInquiry_me
            }
            viewer {
              ...ConsignmentInquiry_viewer
            }
          }
        `,
        render: renderConsignmentInquiry,
      },
      {
        path: "sent",
        layout: "ContainerOnly",
        getComponent: () => ConsignmentInquiryConfirmationApp,
        onClientSideRender: () => {
          ConsignmentInquiryConfirmationApp.preload()
        },
      },
    ],
  },
]
