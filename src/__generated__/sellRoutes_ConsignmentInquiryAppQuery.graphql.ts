/**
 * @generated SignedSource<<8cd176b6ced815ad4be9b985d4a96089>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type sellRoutes_ConsignmentInquiryAppQuery$variables = Record<
  PropertyKey,
  never
>
export type sellRoutes_ConsignmentInquiryAppQuery$data = {
  readonly me:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"ConsignmentInquiry_me">
      }
    | null
    | undefined
  readonly viewer:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"ConsignmentInquiry_viewer">
      }
    | null
    | undefined
}
export type sellRoutes_ConsignmentInquiryAppQuery = {
  response: sellRoutes_ConsignmentInquiryAppQuery$data
  variables: sellRoutes_ConsignmentInquiryAppQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "email",
      storageKey: null,
    },
    v1 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "sellRoutes_ConsignmentInquiryAppQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "Me",
          kind: "LinkedField",
          name: "me",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "ConsignmentInquiry_me",
            },
          ],
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          concreteType: "Viewer",
          kind: "LinkedField",
          name: "viewer",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "ConsignmentInquiry_viewer",
            },
          ],
          storageKey: null,
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "sellRoutes_ConsignmentInquiryAppQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "Me",
          kind: "LinkedField",
          name: "me",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "internalID",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "name",
              storageKey: null,
            },
            v0 /*: any*/,
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "phone",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "PhoneNumberType",
              kind: "LinkedField",
              name: "phoneNumber",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "regionCode",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            v1 /*: any*/,
          ],
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          concreteType: "Viewer",
          kind: "LinkedField",
          name: "viewer",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: "StaticContent",
              kind: "LinkedField",
              name: "staticContent",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "SpecialistBio",
                  kind: "LinkedField",
                  name: "specialistBios",
                  plural: true,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "firstName",
                      storageKey: null,
                    },
                    v0 /*: any*/,
                  ],
                  storageKey: null,
                },
                v1 /*: any*/,
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "e63b5ffe5fbc5819d728b53bc39e869f",
      id: null,
      metadata: {},
      name: "sellRoutes_ConsignmentInquiryAppQuery",
      operationKind: "query",
      text: "query sellRoutes_ConsignmentInquiryAppQuery {\n  me {\n    ...ConsignmentInquiry_me\n    id\n  }\n  viewer {\n    ...ConsignmentInquiry_viewer\n  }\n}\n\nfragment ConsignmentInquiry_me on Me {\n  internalID\n  name\n  email\n  phone\n  phoneNumber {\n    regionCode\n  }\n}\n\nfragment ConsignmentInquiry_viewer on Viewer {\n  staticContent {\n    specialistBios {\n      firstName\n      email\n    }\n    id\n  }\n}\n",
    },
  }
})()
;(node as any).hash = "88f118e72acd74baf4526788944c5c4e"

export default node
