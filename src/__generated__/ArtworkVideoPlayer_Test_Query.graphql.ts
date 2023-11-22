/**
 * @generated SignedSource<<95042893f768fde5be83344cd644c5e8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkVideoPlayer_Test_Query$variables = Record<PropertyKey, never>;
export type ArtworkVideoPlayer_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkVideoPlayer_artwork">;
  } | null | undefined;
};
export type ArtworkVideoPlayer_Test_Query = {
  response: ArtworkVideoPlayer_Test_Query$data;
  variables: ArtworkVideoPlayer_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
  }
],
v1 = {
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
    "name": "ArtworkVideoPlayer_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkVideoPlayer_artwork"
          }
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkVideoPlayer_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
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
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "includeAll",
                "value": false
              }
            ],
            "concreteType": null,
            "kind": "LinkedField",
            "name": "figures",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "playerUrl",
                    "storageKey": null
                  },
                  {
                    "alias": "videoWidth",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "width",
                    "storageKey": null
                  },
                  {
                    "alias": "videoHeight",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "height",
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ],
                "type": "Video",
                "abstractKey": null
              }
            ],
            "storageKey": "figures(includeAll:false)"
          },
          (v1/*: any*/)
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "bf1b7117bb2734c344098a8a3aa56a24",
    "id": null,
    "metadata": {},
    "name": "ArtworkVideoPlayer_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkVideoPlayer_Test_Query {\n  artwork(id: \"foo\") {\n    ...ArtworkVideoPlayer_artwork\n    id\n  }\n}\n\nfragment ArtworkVideoPlayer_artwork on Artwork {\n  internalID\n  slug\n  figures(includeAll: false) {\n    __typename\n    ... on Video {\n      __typename\n      playerUrl\n      videoWidth: width\n      videoHeight: height\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0756fde87c30a823d3524221d3c38bfe";

export default node;
