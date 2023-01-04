import loadable from "@loadable/component"
import { RedirectException, RouteRenderArgs } from "found"
import { graphql } from "react-relay"
import { AppRouteConfig } from "System/Router/Route"
import { getENV } from "Utils/getENV"
import { getRedirect } from "./Routes/SubmissionFlow/Utils/redirects"

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
      /* webpackChunkName: "consignBundle" */ "./Routes/MarketingLanding/FAQApp"
    ),
  {
    resolveComponent: component => component.FAQApp,
  }
)

const SubmissionLayout = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/SubmissionFlow/SubmissionLayout"
    ),
  {
    resolveComponent: component => component.SubmissionLayout,
  }
)

const ArtworkDetailsFragmentContainer = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/SubmissionFlow/ArtworkDetails/ArtworkDetails"
    ),
  {
    resolveComponent: component => component.ArtworkDetailsFragmentContainer,
  }
)

const ArtworkDetails = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/SubmissionFlow/ArtworkDetails/ArtworkDetails"
    ),
  {
    resolveComponent: component => component.ArtworkDetails,
  }
)

const UploadPhotosFragmentContainer = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/SubmissionFlow/UploadPhotos/UploadPhotos"
    ),
  {
    resolveComponent: component => component.UploadPhotosFragmentContainer,
  }
)

const ContactInformation = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/SubmissionFlow/ContactInformation/ContactInformation"
    ),
  {
    resolveComponent: component =>
      component.ContactInformationFragmentContainer,
  }
)

const ThankYou = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/SubmissionFlow/ThankYou/ThankYou"
    ),
  {
    resolveComponent: component => component.ThankYou,
  }
)

const renderSubmissionFlowStep = ({ Component, props, match, resolving }) => {
  if (!(Component && props)) {
    return undefined
  }

  if (resolving) {
    const { submission } = props as any
    const redirectTo = getRedirect(props.router, match, submission)

    if (redirectTo) {
      throw new RedirectException(redirectTo)
    }
  }

  return <Component {...props} />
}

const prepareSubmissionFlowStepVariables = data => {
  let searchFields = { id: data.id, externalId: null }

  // This code is here to support externalId UUIDs in url
  // (i.e. /submissions/:id/something and :id is an UUID).
  // If :id in url is not a number - the code passes
  // externalId to metaphysics instead of id.
  const sequentialIdRegex = new RegExp(/^\d+$/)
  if (!sequentialIdRegex.test(data.id)) {
    searchFields.externalId = data.id
    searchFields.id = null
  }

  return {
    ...data,
    ...searchFields,
    sessionID: getENV("SESSION_ID"),
  }
}

const contactInformationQuery = graphql`
  query consignRoutes_contactInformationQuery(
    $id: ID
    $externalId: ID
    $sessionID: String
  ) {
    submission(id: $id, externalId: $externalId, sessionID: $sessionID) {
      ...ContactInformation_submission
      ...redirects_submission @relay(mask: false)
    }
    me {
      ...ContactInformation_me
    }
  }
`

const renderConsignmentInquiry = ({ Component, props }: RouteRenderArgs) => {
  if (!(Component && props)) {
    return undefined
  }
  return <Component {...props} />
}

export const consignRoutes: AppRouteConfig[] = [
  {
    path: "/sell",
    children: [
      {
        path: "/",
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
    path: "/consign",
    children: [
      {
        path: ":splat*",
        render: ({ match }) => {
          throw new RedirectException(
            `${match.location.pathname.replace("/consign", "/sell")}${
              match.location.search
            }`,
            301
          )
        },
      },
      {
        path: "/",
        render: ({ match }) => {
          throw new RedirectException("/sell", 301)
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
    path: "/sell/submission",
    getComponent: () => SubmissionLayout,
    onServerSideRender: ({ res }) => {
      res.redirect("/sell/submission/contact-information")
    },
    children: [
      {
        path: "artwork-details",
        layout: "ContainerOnly",
        getComponent: () => ArtworkDetails,
        onServerSideRender: ({ res }) => {
          res.redirect("/sell/submission")
        },
      },
      {
        path: "contact-information",
        layout: "ContainerOnly",
        getComponent: () => ContactInformation,
        onClientSideRender: () => {
          ContactInformation.preload()
        },
        query: contactInformationQuery,
        render: renderSubmissionFlowStep,
        prepareVariables: prepareSubmissionFlowStepVariables,
      },
      {
        path: ":id/artwork-details",
        layout: "ContainerOnly",
        getComponent: () => ArtworkDetailsFragmentContainer,
        onClientSideRender: () => {
          ArtworkDetailsFragmentContainer.preload()
        },
        query: graphql`
          query consignRoutes_artworkDetailsQuery(
            $id: ID
            $externalId: ID
            $sessionID: String
          ) {
            submission(
              id: $id
              externalId: $externalId
              sessionID: $sessionID
            ) {
              ...ArtworkDetails_submission
              ...redirects_submission @relay(mask: false)
            }
          }
        `,
        prepareVariables: prepareSubmissionFlowStepVariables,
        render: renderSubmissionFlowStep,
      },
      {
        path: ":id/upload-photos",
        layout: "ContainerOnly",
        getComponent: () => UploadPhotosFragmentContainer,
        onClientSideRender: () => {
          UploadPhotosFragmentContainer.preload()
        },
        query: graphql`
          query consignRoutes_uploadPhotosQuery(
            $id: ID
            $externalId: ID
            $sessionID: String
          ) {
            submission(
              id: $id
              externalId: $externalId
              sessionID: $sessionID
            ) {
              ...UploadPhotos_submission
              ...redirects_submission @relay(mask: false)
            }
          }
        `,
        prepareVariables: prepareSubmissionFlowStepVariables,
        render: renderSubmissionFlowStep,
      },
      {
        path: ":id/contact-information",
        layout: "ContainerOnly",
        getComponent: () => ContactInformation,
        onClientSideRender: () => {
          ContactInformation.preload()
        },
        query: contactInformationQuery,
        render: renderSubmissionFlowStep,
        prepareVariables: prepareSubmissionFlowStepVariables,
      },
      {
        path: ":id/thank-you",
        layout: "ContainerOnly",
        getComponent: () => ThankYou,
        onClientSideRender: () => {
          ThankYou.preload()
        },
      },
    ],
  },
]
