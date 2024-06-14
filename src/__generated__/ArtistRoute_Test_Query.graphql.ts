/**
 * @generated SignedSource<<035b91874930fc71e90d2c802e321f1f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistRoute_Test_Query$variables = Record<PropertyKey, never>;
export type ArtistRoute_Test_Query$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistRoute_submission" | "SubmissionRoute_submission">;
  } | null | undefined;
};
export type ArtistRoute_Test_Query$rawResponse = {
  readonly submission: {
    readonly artist: {
      readonly id: string;
      readonly internalID: string;
      readonly name: string | null | undefined;
      readonly targetSupply: {
        readonly isTargetSupply: boolean | null | undefined;
      };
    } | null | undefined;
    readonly externalId: string;
    readonly id: string;
    readonly internalID: string | null | undefined;
  } | null | undefined;
};
export type ArtistRoute_Test_Query = {
  rawResponse: ArtistRoute_Test_Query$rawResponse;
  response: ArtistRoute_Test_Query$data;
  variables: ArtistRoute_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "submission-id"
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
    "name": "ArtistRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SubmissionRoute_submission"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistRoute_submission"
          }
        ],
        "storageKey": "submission(id:\"submission-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistTargetSupply",
                "kind": "LinkedField",
                "name": "targetSupply",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isTargetSupply",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "submission(id:\"submission-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "9a4de83cc9a2be0661f8728708474f98",
    "id": null,
    "metadata": {},
    "name": "ArtistRoute_Test_Query",
    "operationKind": "query",
    "text": "query ArtistRoute_Test_Query {\n  submission(id: \"submission-id\") {\n    ...SubmissionRoute_submission\n    ...ArtistRoute_submission\n    id\n  }\n}\n\nfragment ArtistRoute_submission on ConsignmentSubmission {\n  internalID\n  artist {\n    internalID\n    targetSupply {\n      isTargetSupply\n    }\n    name\n    id\n  }\n}\n\nfragment SubmissionRoute_submission on ConsignmentSubmission {\n  internalID\n  externalId\n}\n"
  }
};
})();

(node as any).hash = "88fd30c654857c69dcd09df8073ec7d7";

export default node;
