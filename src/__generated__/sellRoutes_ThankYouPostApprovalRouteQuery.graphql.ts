/**
 * @generated SignedSource<<7aa06ca67c223427a8bd8022113b380a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type sellRoutes_ThankYouPostApprovalRouteQuery$variables = {
  id: string;
};
export type sellRoutes_ThankYouPostApprovalRouteQuery$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"ThankYouRoute_submission">;
  } | null | undefined;
};
export type sellRoutes_ThankYouPostApprovalRouteQuery = {
  response: sellRoutes_ThankYouPostApprovalRouteQuery$data;
  variables: sellRoutes_ThankYouPostApprovalRouteQuery$variables;
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
    "name": "sellRoutes_ThankYouPostApprovalRouteQuery",
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
    "name": "sellRoutes_ThankYouPostApprovalRouteQuery",
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
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "state",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "myCollectionArtworkID",
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
    "cacheID": "2eaca5d88c08f71716e207d13f229c4f",
    "id": null,
    "metadata": {},
    "name": "sellRoutes_ThankYouPostApprovalRouteQuery",
    "operationKind": "query",
    "text": "query sellRoutes_ThankYouPostApprovalRouteQuery(\n  $id: ID!\n) {\n  submission(id: $id) @principalField {\n    ...ThankYouRoute_submission\n    id\n  }\n}\n\nfragment ThankYouRoute_submission on ConsignmentSubmission {\n  internalID\n  state\n  myCollectionArtworkID\n}\n"
  }
};
})();

(node as any).hash = "e8a2f98c7a5871751e56de15964de5da";

export default node;
