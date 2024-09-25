/**
 * @generated SignedSource<<fec72c28984bef87f4729188830b5d32>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type sellRoutes_FrameRouteQuery$variables = {
  id: string;
};
export type sellRoutes_FrameRouteQuery$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"FrameRoute_submission">;
  } | null | undefined;
};
export type sellRoutes_FrameRouteQuery = {
  response: sellRoutes_FrameRouteQuery$data;
  variables: sellRoutes_FrameRouteQuery$variables;
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
],
v2 = {
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
    "name": "sellRoutes_FrameRouteQuery",
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
            "name": "FrameRoute_submission"
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
    "name": "sellRoutes_FrameRouteQuery",
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
            "concreteType": "Artwork",
            "kind": "LinkedField",
            "name": "myCollectionArtwork",
            "plural": false,
            "selections": [
              {
                "alias": "artworkId",
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isFramed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "framedMetric",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "framedWidth",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "framedHeight",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "framedDepth",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2b7c563f86c3974de3dbeb773432f094",
    "id": null,
    "metadata": {},
    "name": "sellRoutes_FrameRouteQuery",
    "operationKind": "query",
    "text": "query sellRoutes_FrameRouteQuery(\n  $id: ID!\n) {\n  submission(id: $id) @principalField {\n    ...FrameRoute_submission\n    id\n  }\n}\n\nfragment FrameRoute_submission on ConsignmentSubmission {\n  myCollectionArtwork {\n    artworkId: internalID\n    isFramed\n    framedMetric\n    framedWidth\n    framedHeight\n    framedDepth\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "be8db85cb6ece23cc6d7b21082d10058";

export default node;
