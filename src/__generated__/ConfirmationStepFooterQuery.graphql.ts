/**
 * @generated SignedSource<<4fca1fcc7ed3e31a49a8c7e9319bf95e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ConfirmationStepFooterQuery$variables = {
  searchCriteriaId: string;
};
export type ConfirmationStepFooterQuery$data = {
  readonly me: {
    readonly email: string | null;
    readonly savedSearch: {
      readonly href: string;
    } | null;
  } | null;
};
export type ConfirmationStepFooterQuery = {
  response: ConfirmationStepFooterQuery$data;
  variables: ConfirmationStepFooterQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "searchCriteriaId"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "id",
      "variableName": "searchCriteriaId"
    }
  ],
  "concreteType": "SearchCriteria",
  "kind": "LinkedField",
  "name": "savedSearch",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ConfirmationStepFooterQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConfirmationStepFooterQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
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
    "cacheID": "3d37f93d64711cf5d65cccf5ed56c8a8",
    "id": null,
    "metadata": {},
    "name": "ConfirmationStepFooterQuery",
    "operationKind": "query",
    "text": "query ConfirmationStepFooterQuery(\n  $searchCriteriaId: ID!\n) {\n  me {\n    email\n    savedSearch(id: $searchCriteriaId) {\n      href\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "b7709b060fe5d722f74c72fb570f1cb3";

export default node;
