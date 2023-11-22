/**
 * @generated SignedSource<<700aa65e5a435796723dd68613ca1ecd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EntityHeaderGeneStoryQuery$variables = {
  id: string;
};
export type EntityHeaderGeneStoryQuery$data = {
  readonly gene: {
    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderGene_gene">;
  } | null | undefined;
};
export type EntityHeaderGeneStoryQuery = {
  response: EntityHeaderGeneStoryQuery$data;
  variables: EntityHeaderGeneStoryQuery$variables;
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
    "name": "EntityHeaderGeneStoryQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EntityHeaderGene_gene"
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
    "name": "EntityHeaderGeneStoryQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
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
            "name": "href",
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
            "alias": "avatar",
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
                    "value": 45
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "big_and_tall",
                      "tall"
                    ]
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 45
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
                    "name": "src",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "srcSet",
                    "storageKey": null
                  }
                ],
                "storageKey": "cropped(height:45,version:[\"big_and_tall\",\"tall\"],width:45)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "filterArtworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "total",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": "filterArtworksConnection(first:1)"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "85950cb0e2b64569fe90a62dcf601e15",
    "id": null,
    "metadata": {},
    "name": "EntityHeaderGeneStoryQuery",
    "operationKind": "query",
    "text": "query EntityHeaderGeneStoryQuery(\n  $id: String!\n) {\n  gene(id: $id) {\n    ...EntityHeaderGene_gene\n    id\n  }\n}\n\nfragment EntityHeaderGene_gene on Gene {\n  internalID\n  href\n  name\n  avatar: image {\n    cropped(width: 45, height: 45, version: [\"big_and_tall\", \"tall\"]) {\n      src\n      srcSet\n    }\n  }\n  filterArtworksConnection(first: 1) {\n    counts {\n      total\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "7e9ecbfe74212e88f0c22eb76b43d2b1";

export default node;
