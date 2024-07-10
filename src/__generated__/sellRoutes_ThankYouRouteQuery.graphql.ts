/**
 * @generated SignedSource<<d5b556bef87de45a47d5c9c11196c3e9>>
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
  sessionID: string;
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sessionID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "sessionID",
    "variableName": "sessionID"
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
    "cacheID": "deb7a6269f27444d8865a03de3bed1d2",
    "id": null,
    "metadata": {},
    "name": "sellRoutes_ThankYouRouteQuery",
    "operationKind": "query",
    "text": "query sellRoutes_ThankYouRouteQuery(\n  $id: ID!\n  $sessionID: String!\n) {\n  submission(id: $id, sessionID: $sessionID) @principalField {\n    ...ThankYouRoute_submission\n    id\n  }\n}\n\nfragment ThankYouRoute_submission on ConsignmentSubmission {\n  internalID\n  state\n  myCollectionArtworkID\n}\n"
  }
};
})();

(node as any).hash = "18cf4f5a7225d4844d5e67d5fd0e9c4b";

export default node;
