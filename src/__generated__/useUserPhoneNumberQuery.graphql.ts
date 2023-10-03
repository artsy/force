/**
 * @generated SignedSource<<0decb71fd825b7084aae11651253ff08>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type useUserPhoneNumberQuery$variables = {};
export type useUserPhoneNumberQuery$data = {
  readonly me: {
    readonly phone: string | null;
    readonly phoneNumber: {
      readonly regionCode: string | null;
    } | null;
  } | null;
};
export type useUserPhoneNumberQuery = {
  response: useUserPhoneNumberQuery$data;
  variables: useUserPhoneNumberQuery$variables;
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
    "name": "useUserPhoneNumberQuery",
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
    "name": "useUserPhoneNumberQuery",
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
    "cacheID": "9117eab76f23015a33645a1531de8a22",
    "id": null,
    "metadata": {},
    "name": "useUserPhoneNumberQuery",
    "operationKind": "query",
    "text": "query useUserPhoneNumberQuery {\n  me {\n    phoneNumber {\n      regionCode\n    }\n    phone\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "2cabf51beaa691d4d1d18ccbca7d75ea";

export default node;
