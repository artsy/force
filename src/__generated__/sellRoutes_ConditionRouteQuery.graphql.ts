/**
 * @generated SignedSource<<4370b2f921c910f0ddc69da41faf40c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type sellRoutes_ConditionRouteQuery$variables = {
  id: string;
};
export type sellRoutes_ConditionRouteQuery$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"ConditionRoute_submission">;
  } | null | undefined;
};
export type sellRoutes_ConditionRouteQuery = {
  response: sellRoutes_ConditionRouteQuery$data;
  variables: sellRoutes_ConditionRouteQuery$variables;
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
    "name": "sellRoutes_ConditionRouteQuery",
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
            "name": "ConditionRoute_submission"
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
    "name": "sellRoutes_ConditionRouteQuery",
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
                "concreteType": "ArtworkCondition",
                "kind": "LinkedField",
                "name": "condition",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "value",
                    "storageKey": null
                  }
                ],
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
    "cacheID": "934716095b02c4dea6f7ec41e25c7d33",
    "id": null,
    "metadata": {},
    "name": "sellRoutes_ConditionRouteQuery",
    "operationKind": "query",
    "text": "query sellRoutes_ConditionRouteQuery(\n  $id: ID!\n) {\n  submission(id: $id) @principalField {\n    ...ConditionRoute_submission\n    id\n  }\n}\n\nfragment ConditionRoute_submission on ConsignmentSubmission {\n  myCollectionArtwork {\n    artworkId: internalID\n    condition {\n      description\n      value\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "9e25fd90cb20a5a94f8ffacceacd114d";

export default node;
