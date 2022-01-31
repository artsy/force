/**
 * @generated SignedSource<<1420ad9c17bebfa3ade47762a0fcdb5f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SuggestedGenesQuery$variables = {};
export type SuggestedGenesQuery$data = {
  readonly highlights: {
    readonly suggested_genes: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"SuggestedGenes_suggested_genes">;
    } | null> | null;
  } | null;
};
export type SuggestedGenesQuery = {
  variables: SuggestedGenesQuery$variables;
  response: SuggestedGenesQuery$data;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SuggestedGenesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Highlights",
        "kind": "LinkedField",
        "name": "highlights",
        "plural": false,
        "selections": [
          {
            "alias": "suggested_genes",
            "args": null,
            "concreteType": "Gene",
            "kind": "LinkedField",
            "name": "broadCollectingGenes",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SuggestedGenes_suggested_genes"
              }
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SuggestedGenesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Highlights",
        "kind": "LinkedField",
        "name": "highlights",
        "plural": false,
        "selections": [
          {
            "alias": "suggested_genes",
            "args": null,
            "concreteType": "Gene",
            "kind": "LinkedField",
            "name": "broadCollectingGenes",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
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
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 100
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 100
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "url",
                        "storageKey": null
                      }
                    ],
                    "storageKey": "cropped(height:100,width:100)"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b8c2dc4b1cc9f1269a48bc9d2c8a5906",
    "id": null,
    "metadata": {},
    "name": "SuggestedGenesQuery",
    "operationKind": "query",
    "text": "query SuggestedGenesQuery {\n  highlights {\n    suggested_genes: broadCollectingGenes {\n      ...SuggestedGenes_suggested_genes\n      id\n    }\n  }\n}\n\nfragment SuggestedGenes_suggested_genes on Gene {\n  id\n  slug\n  internalID\n  name\n  image {\n    cropped(width: 100, height: 100) {\n      url\n    }\n  }\n}\n"
  }
};

(node as any).hash = "91f31587213209d9aee297d52ee8babb";

export default node;
