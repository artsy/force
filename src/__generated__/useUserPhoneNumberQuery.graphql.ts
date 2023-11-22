/**
 * @generated SignedSource<<65fb09c624c5dea843933c89ab60e4dc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type useUserPhoneNumberQuery$variables = Record<PropertyKey, never>;
export type useUserPhoneNumberQuery$data = {
  readonly me: {
    readonly phoneNumber: {
      readonly display: string | null | undefined;
      readonly originalNumber: string | null | undefined;
      readonly regionCode: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
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
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "NATIONAL"
        }
      ],
      "kind": "ScalarField",
      "name": "display",
      "storageKey": "display(format:\"NATIONAL\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "originalNumber",
      "storageKey": null
    }
  ],
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
          (v0/*: any*/)
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
    "cacheID": "362cfcd4148434d763b27e9bf7a3da32",
    "id": null,
    "metadata": {},
    "name": "useUserPhoneNumberQuery",
    "operationKind": "query",
    "text": "query useUserPhoneNumberQuery {\n  me {\n    phoneNumber {\n      regionCode\n      display(format: NATIONAL)\n      originalNumber\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "63ecd80243873a9e6b2db42c98268e7e";

export default node;
