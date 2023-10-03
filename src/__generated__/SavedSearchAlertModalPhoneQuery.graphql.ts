/**
 * @generated SignedSource<<3a658861e1818608404680a4a83c30f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SavedSearchAlertModalPhoneQuery$variables = {};
export type SavedSearchAlertModalPhoneQuery$data = {
  readonly me: {
    readonly phone: string | null;
    readonly phoneNumber: {
      readonly regionCode: string | null;
    } | null;
  } | null;
};
export type SavedSearchAlertModalPhoneQuery = {
  response: SavedSearchAlertModalPhoneQuery$data;
  variables: SavedSearchAlertModalPhoneQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "phone",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SavedSearchAlertModalPhoneQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
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
    "name": "SavedSearchAlertModalPhoneQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
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
    "cacheID": "0f6d5f6c25e0b5784f7127af790654f8",
    "id": null,
    "metadata": {},
    "name": "SavedSearchAlertModalPhoneQuery",
    "operationKind": "query",
    "text": "query SavedSearchAlertModalPhoneQuery {\n  me {\n    phoneNumber {\n      regionCode\n    }\n    phone\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "15e2a755dcfdd22b8935e3cbc14ed38e";

export default node;
