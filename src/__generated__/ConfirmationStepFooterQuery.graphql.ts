/**
 * @generated SignedSource<<6ef090907a08ed6a9221b9189099c4f3>>
 * @relayHash 6f7de890dafe61637e98ce654ac10849
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 6f7de890dafe61637e98ce654ac10849

import { ConcreteRequest, Query } from 'relay-runtime';
export type ConfirmationStepFooterQuery$variables = {
  alertID: string;
};
export type ConfirmationStepFooterQuery$data = {
  readonly me: {
    readonly alert: {
      readonly href: string | null | undefined;
    } | null | undefined;
    readonly internalID: string;
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
    "name": "alertID"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "alertID"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "Alert",
            "kind": "LinkedField",
            "name": "alert",
            "plural": false,
            "selections": [
              (v3/*: any*/)
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
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "Alert",
            "kind": "LinkedField",
            "name": "alert",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "6f7de890dafe61637e98ce654ac10849",
    "metadata": {},
    "name": "ConfirmationStepFooterQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "3b3b724e619cd9b50a4b40b8aa862244";

export default node;
