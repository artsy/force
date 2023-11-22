/**
 * @generated SignedSource<<90a182fdc0dda75ab179de42fb6a1066>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairCollection_Query$variables = {
  slug: string;
};
export type FairCollection_Query$data = {
  readonly marketingCollection: {
    readonly " $fragmentSpreads": FragmentRefs<"FairCollection_collection">;
  } | null | undefined;
};
export type FairCollection_Query$rawResponse = {
  readonly marketingCollection: {
    readonly artworks: {
      readonly counts: {
        readonly total: any | null | undefined;
      } | null | undefined;
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly image: {
            readonly url: string | null | undefined;
          } | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
      readonly id: string;
    } | null | undefined;
    readonly id: string;
    readonly slug: string;
    readonly title: string;
  } | null | undefined;
};
export type FairCollection_Query = {
  rawResponse: FairCollection_Query$rawResponse;
  response: FairCollection_Query$data;
  variables: FairCollection_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FairCollection_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairCollection_collection"
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
    "name": "FairCollection_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollection",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
            "name": "title",
            "storageKey": null
          },
          {
            "alias": "artworks",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 3
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
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
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
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
                                "name": "version",
                                "value": "larger"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:\"larger\")"
                          }
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": "artworksConnection(first:3)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5e865ed859305a24d9624c2a9e29ee26",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "marketingCollection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MarketingCollection"
        },
        "marketingCollection.artworks": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksConnection"
        },
        "marketingCollection.artworks.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksCounts"
        },
        "marketingCollection.artworks.counts.total": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "marketingCollection.artworks.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FilterArtworksEdge"
        },
        "marketingCollection.artworks.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "marketingCollection.artworks.edges.node.id": (v3/*: any*/),
        "marketingCollection.artworks.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "marketingCollection.artworks.edges.node.image.url": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "marketingCollection.artworks.id": (v3/*: any*/),
        "marketingCollection.id": (v3/*: any*/),
        "marketingCollection.slug": (v4/*: any*/),
        "marketingCollection.title": (v4/*: any*/)
      }
    },
    "name": "FairCollection_Query",
    "operationKind": "query",
    "text": "query FairCollection_Query(\n  $slug: String!\n) {\n  marketingCollection(slug: $slug) {\n    ...FairCollection_collection\n    id\n  }\n}\n\nfragment FairCollection_collection on MarketingCollection {\n  id\n  slug\n  title\n  artworks: artworksConnection(first: 3) {\n    counts {\n      total\n    }\n    edges {\n      node {\n        image {\n          url(version: \"larger\")\n        }\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "fbce895b61391f46b1a84c74a2734ad9";

export default node;
