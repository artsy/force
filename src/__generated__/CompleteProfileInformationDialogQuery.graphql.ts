/**
 * @generated SignedSource<<62ef8b50384256db7fdcbebcc01d6b01>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CompleteProfileInformationDialogQuery$variables = Record<PropertyKey, never>;
export type CompleteProfileInformationDialogQuery$data = {
  readonly me: {
    readonly location: {
      readonly city: string | null | undefined;
      readonly country: string | null | undefined;
      readonly display: string | null | undefined;
      readonly state: string | null | undefined;
    } | null | undefined;
    readonly name: string | null | undefined;
    readonly otherRelevantPositions: string | null | undefined;
    readonly profession: string | null | undefined;
  } | null | undefined;
};
export type CompleteProfileInformationDialogQuery = {
  response: CompleteProfileInformationDialogQuery$data;
  variables: CompleteProfileInformationDialogQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "otherRelevantPositions",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "profession",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CompleteProfileInformationDialogQuery",
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
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "MyLocation",
            "kind": "LinkedField",
            "name": "location",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
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
    "name": "CompleteProfileInformationDialogQuery",
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
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "MyLocation",
            "kind": "LinkedField",
            "name": "location",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2aa8b3309ba1b5582432590e4d38f32d",
    "id": null,
    "metadata": {},
    "name": "CompleteProfileInformationDialogQuery",
    "operationKind": "query",
    "text": "query CompleteProfileInformationDialogQuery {\n  me {\n    name\n    otherRelevantPositions\n    profession\n    location {\n      display\n      city\n      state\n      country\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "bc208e09eb2461bb7a16e5727d149b83";

export default node;
