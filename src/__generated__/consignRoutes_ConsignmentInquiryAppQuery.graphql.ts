/**
 * @generated SignedSource<<9ddc1f79b460a79980524d79d064f3f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type consignRoutes_ConsignmentInquiryAppQuery$variables = {};
export type consignRoutes_ConsignmentInquiryAppQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ConsignmentInquiry_me">;
  } | null;
};
export type consignRoutes_ConsignmentInquiryAppQuery = {
  response: consignRoutes_ConsignmentInquiryAppQuery$data;
  variables: consignRoutes_ConsignmentInquiryAppQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "consignRoutes_ConsignmentInquiryAppQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ConsignmentInquiry_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "consignRoutes_ConsignmentInquiryAppQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "phone",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PhoneNumberType",
            "kind": "LinkedField",
            "name": "phoneNumber",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "regionCode",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "de916b33b30b90a07d6b32368ea123a2",
    "id": null,
    "metadata": {},
    "name": "consignRoutes_ConsignmentInquiryAppQuery",
    "operationKind": "query",
    "text": "query consignRoutes_ConsignmentInquiryAppQuery {\n  me {\n    ...ConsignmentInquiry_me\n    id\n  }\n}\n\nfragment ConsignmentInquiry_me on Me {\n  internalID\n  name\n  email\n  phone\n  phoneNumber {\n    regionCode\n  }\n}\n"
  }
};

(node as any).hash = "9a75cb2877c235814591a477f3e35b88";

export default node;
