/**
 * @generated SignedSource<<4171eaad131646937f6a8019f193676f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistOverview_Test_Query$variables = Record<PropertyKey, never>;
export type ArtistOverview_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistOverview_artist">;
  } | null | undefined;
};
export type ArtistOverview_Test_Query = {
  response: ArtistOverview_Test_Query$data;
  variables: ArtistOverview_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  }
],
v4 = {
  "kind": "Literal",
  "name": "first",
  "value": 0
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistOverview_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistOverview_artist"
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistOverview_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
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
            "alias": null,
            "args": null,
            "concreteType": "ArtistInsight",
            "kind": "LinkedField",
            "name": "insights",
            "plural": true,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "ArticleConnection",
            "kind": "LinkedField",
            "name": "articlesConnection",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": "articlesConnection(first:1)"
          },
          {
            "alias": null,
            "args": [
              (v4/*: any*/)
            ],
            "concreteType": "ArtistSeriesConnection",
            "kind": "LinkedField",
            "name": "artistSeriesConnection",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": "artistSeriesConnection(first:0)"
          },
          {
            "alias": null,
            "args": [
              (v4/*: any*/),
              {
                "kind": "Literal",
                "name": "status",
                "value": "running"
              }
            ],
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": "showsConnection(first:0,status:\"running\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistCounts",
            "kind": "LinkedField",
            "name": "counts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "relatedArtists",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistRelatedData",
            "kind": "LinkedField",
            "name": "related",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v2/*: any*/),
                "concreteType": "GeneConnection",
                "kind": "LinkedField",
                "name": "genes",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "GeneEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Gene",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "genes(first:1)"
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "19376c70d67a32b06bbfbdb91d0156d0",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artist.articlesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleConnection"
        },
        "artist.articlesConnection.totalCount": (v6/*: any*/),
        "artist.artistSeriesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistSeriesConnection"
        },
        "artist.artistSeriesConnection.totalCount": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "artist.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "artist.counts.relatedArtists": (v6/*: any*/),
        "artist.href": (v7/*: any*/),
        "artist.id": (v8/*: any*/),
        "artist.insights": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtistInsight"
        },
        "artist.insights.__typename": (v9/*: any*/),
        "artist.internalID": (v8/*: any*/),
        "artist.name": (v7/*: any*/),
        "artist.related": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistRelatedData"
        },
        "artist.related.genes": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "GeneConnection"
        },
        "artist.related.genes.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "GeneEdge"
        },
        "artist.related.genes.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "artist.related.genes.edges.node.__typename": (v9/*: any*/),
        "artist.related.genes.edges.node.id": (v8/*: any*/),
        "artist.showsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ShowConnection"
        },
        "artist.showsConnection.totalCount": (v6/*: any*/)
      }
    },
    "name": "ArtistOverview_Test_Query",
    "operationKind": "query",
    "text": "query ArtistOverview_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistOverview_artist\n    id\n  }\n}\n\nfragment ArtistOverview_artist on Artist {\n  internalID\n  href\n  name\n  insights {\n    __typename\n  }\n  articlesConnection(first: 1) {\n    totalCount\n  }\n  artistSeriesConnection(first: 0) {\n    totalCount\n  }\n  showsConnection(first: 0, status: \"running\") {\n    totalCount\n  }\n  counts {\n    relatedArtists\n  }\n  related {\n    genes(first: 1) {\n      edges {\n        node {\n          __typename\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7f1fce185738c92829ec2902d2211a17";

export default node;
