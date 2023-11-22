/**
 * @generated SignedSource<<9c419a22239930caa4728e6badd2883e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviouslySoldOnArtsyRail_tests_Query$variables = Record<PropertyKey, never>;
export type PreviouslySoldOnArtsyRail_tests_Query$data = {
  readonly recentlySoldArtworks: {
    readonly " $fragmentSpreads": FragmentRefs<"PreviouslySoldOnArtsyRail_recentlySoldArtworks">;
  } | null | undefined;
};
export type PreviouslySoldOnArtsyRail_tests_Query = {
  response: PreviouslySoldOnArtsyRail_tests_Query$data;
  variables: PreviouslySoldOnArtsyRail_tests_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PreviouslySoldOnArtsyRail_tests_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RecentlySoldArtworkTypeConnection",
        "kind": "LinkedField",
        "name": "recentlySoldArtworks",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PreviouslySoldOnArtsyRail_recentlySoldArtworks"
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
    "name": "PreviouslySoldOnArtsyRail_tests_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RecentlySoldArtworkTypeConnection",
        "kind": "LinkedField",
        "name": "recentlySoldArtworks",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "RecentlySoldArtworkTypeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "RecentlySoldArtworkType",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "artwork",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "date",
                        "storageKey": null
                      },
                      {
                        "alias": "cultural_maker",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "culturalMaker",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "shallow",
                            "value": true
                          }
                        ],
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v1/*: any*/),
                          (v0/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          }
                        ],
                        "storageKey": "artists(shallow:true)"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistNames",
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
                            "alias": "src",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": [
                                  "larger",
                                  "large"
                                ]
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:[\"larger\",\"large\"])"
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "width",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "height",
                            "storageKey": null
                          }
                        ],
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
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "lowEstimate",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "highEstimate",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "priceRealized",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "RecenltySoldArtworkPerformance",
                    "kind": "LinkedField",
                    "name": "performance",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "mid",
                        "storageKey": null
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2fff7aff28347f7d980f5566fcad39d0",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "recentlySoldArtworks": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "RecentlySoldArtworkTypeConnection"
        },
        "recentlySoldArtworks.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "RecentlySoldArtworkTypeEdge"
        },
        "recentlySoldArtworks.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "RecentlySoldArtworkType"
        },
        "recentlySoldArtworks.edges.node.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "recentlySoldArtworks.edges.node.artwork.artistNames": (v3/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "recentlySoldArtworks.edges.node.artwork.artists.href": (v3/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.artists.id": (v4/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.artists.name": (v3/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.cultural_maker": (v3/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.date": (v3/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.href": (v3/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.id": (v4/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "recentlySoldArtworks.edges.node.artwork.image.height": (v5/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.image.src": (v3/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.image.width": (v5/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.internalID": (v4/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.slug": (v4/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.title": (v3/*: any*/),
        "recentlySoldArtworks.edges.node.highEstimate": (v6/*: any*/),
        "recentlySoldArtworks.edges.node.highEstimate.display": (v3/*: any*/),
        "recentlySoldArtworks.edges.node.lowEstimate": (v6/*: any*/),
        "recentlySoldArtworks.edges.node.lowEstimate.display": (v3/*: any*/),
        "recentlySoldArtworks.edges.node.performance": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "RecenltySoldArtworkPerformance"
        },
        "recentlySoldArtworks.edges.node.performance.mid": (v3/*: any*/),
        "recentlySoldArtworks.edges.node.priceRealized": (v6/*: any*/),
        "recentlySoldArtworks.edges.node.priceRealized.display": (v3/*: any*/)
      }
    },
    "name": "PreviouslySoldOnArtsyRail_tests_Query",
    "operationKind": "query",
    "text": "query PreviouslySoldOnArtsyRail_tests_Query {\n  recentlySoldArtworks {\n    ...PreviouslySoldOnArtsyRail_recentlySoldArtworks\n  }\n}\n\nfragment PreviouslySoldOnArtsyRail_recentlySoldArtworks on RecentlySoldArtworkTypeConnection {\n  edges {\n    node {\n      artwork {\n        ...SoldArtwork_artwork\n        slug\n        internalID\n        id\n      }\n      lowEstimate {\n        display\n      }\n      highEstimate {\n        display\n      }\n      priceRealized {\n        display\n      }\n      performance {\n        mid\n      }\n    }\n  }\n}\n\nfragment SoldArtworkDetails_artwork on Artwork {\n  href\n  title\n  date\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n}\n\nfragment SoldArtwork_artwork on Artwork {\n  ...SoldArtworkDetails_artwork\n  title\n  href\n  artistNames\n  image {\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n  }\n}\n"
  }
};
})();

(node as any).hash = "ae99a4ffdd968ef0d4fd5cc2c26aad3c";

export default node;
