/**
 * @generated SignedSource<<c03a86d300f58a814773b780a47a02ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type consignFromCollectorProfileMyCollectionRoutes_contactInformationMeQuery$variables = Record<PropertyKey, never>;
export type consignFromCollectorProfileMyCollectionRoutes_contactInformationMeQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ContactInformation_me">;
  } | null | undefined;
};
export type consignFromCollectorProfileMyCollectionRoutes_contactInformationMeQuery = {
  response: consignFromCollectorProfileMyCollectionRoutes_contactInformationMeQuery$data;
  variables: consignFromCollectorProfileMyCollectionRoutes_contactInformationMeQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "consignFromCollectorProfileMyCollectionRoutes_contactInformationMeQuery",
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
            "name": "ContactInformation_me"
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
    "name": "consignFromCollectorProfileMyCollectionRoutes_contactInformationMeQuery",
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
    "cacheID": "554675241bff36ac7df3fa59f8fc93ad",
    "id": null,
    "metadata": {},
    "name": "consignFromCollectorProfileMyCollectionRoutes_contactInformationMeQuery",
    "operationKind": "query",
    "text": "query consignFromCollectorProfileMyCollectionRoutes_contactInformationMeQuery {\n  me {\n    ...ContactInformation_me\n    id\n  }\n}\n\nfragment ContactInformationForm_me on Me {\n  internalID\n  name\n  email\n  phone\n  phoneNumber {\n    regionCode\n  }\n}\n\nfragment ContactInformation_me on Me {\n  internalID\n  name\n  email\n  phone\n  phoneNumber {\n    regionCode\n  }\n  ...ContactInformationForm_me\n}\n"
  }
};

(node as any).hash = "32f7fb4c7aeffad486822a102d9f6e96";

export default node;
