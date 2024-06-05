/**
 * @generated SignedSource<<9d32b1998c77ce9d6a59da57986c9bd9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type sellRoutes_ThankYouRouteQuery$variables = {
  id: string;
};
export type sellRoutes_ThankYouRouteQuery$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"ThankYouRoute_submission">;
  } | null | undefined;
};
export type sellRoutes_ThankYouRouteQuery = {
  response: sellRoutes_ThankYouRouteQuery$data;
  variables: sellRoutes_ThankYouRouteQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "sellRoutes_ThankYouRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ThankYouRoute_submission"
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
    "name": "sellRoutes_ThankYouRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "externalId",
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
    "cacheID": "b6e245faccc93153668986ba8d9f2726",
    "id": null,
    "metadata": {},
    "name": "sellRoutes_ThankYouRouteQuery",
    "operationKind": "query",
    "text": "query sellRoutes_ThankYouRouteQuery(\n  $id: ID!\n) {\n  submission(id: $id) @principalField {\n    ...ThankYouRoute_submission\n    id\n  }\n}\n\nfragment ThankYouRoute_submission on ConsignmentSubmission {\n  externalId\n}\n"
  }
};
})();

(node as any).hash = "1ee99eecd482885887ede24b0f8f936d";

export default node;
