/**
 * @generated SignedSource<<15836856100377f1ca6cc4936e8a180a>>
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
    readonly internalID: string;
    readonly savedSearch: {
      readonly href: string;
    } | null | undefined;
  } | null | undefined;
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
  "name": "internalID",
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
    "cacheID": "6861f60956c2f6c1431a5ce45ac0efeb",
    "id": null,
    "metadata": {},
    "name": "ConfirmationStepFooterQuery",
    "operationKind": "query",
    "text": "query ConfirmationStepFooterQuery(\n  $searchCriteriaId: ID!\n) {\n  me {\n    internalID\n    savedSearch(id: $searchCriteriaId) {\n      href\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "6ba6f21d75ca480342f28f2ce551833d";

export default node;
