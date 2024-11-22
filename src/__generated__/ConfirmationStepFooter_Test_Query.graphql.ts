/**
 * @generated SignedSource<<bf991125f1e9438c86449a5dbce1362b>>
 * @relayHash 8a741a905ebc4b68b45db51d0842ef13
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 8a741a905ebc4b68b45db51d0842ef13

import { ConcreteRequest, Query } from 'relay-runtime';
export type ConfirmationStepFooter_Test_Query$variables = {
  alertID: string;
};
export type ConfirmationStepFooter_Test_Query$data = {
  readonly me: {
    readonly alert: {
      readonly href: string | null | undefined;
    } | null | undefined;
    readonly internalID: string;
  } | null | undefined;
};
export type ConfirmationStepFooter_Test_Query = {
  response: ConfirmationStepFooter_Test_Query$data;
  variables: ConfirmationStepFooter_Test_Query$variables;
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
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ConfirmationStepFooter_Test_Query",
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
    "name": "ConfirmationStepFooter_Test_Query",
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
    "id": "8a741a905ebc4b68b45db51d0842ef13",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.alert": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Alert"
        },
        "me.alert.href": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "me.alert.id": (v5/*: any*/),
        "me.id": (v5/*: any*/),
        "me.internalID": (v5/*: any*/)
      }
    },
    "name": "ConfirmationStepFooter_Test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "21b36afdca2f02a481a7c0fa7ab74161";

export default node;
