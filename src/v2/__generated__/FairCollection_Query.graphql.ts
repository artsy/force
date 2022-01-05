/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairCollection_QueryVariables = {
    slug: string;
};
export type FairCollection_QueryResponse = {
    readonly marketingCollection: {
        readonly " $fragmentRefs": FragmentRefs<"FairCollection_collection">;
    } | null;
};
export type FairCollection_QueryRawResponse = {
    readonly marketingCollection: ({
        readonly id: string;
        readonly slug: string;
        readonly title: string;
        readonly artworks: ({
            readonly counts: ({
                readonly total: number | null;
            }) | null;
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly image: ({
                        readonly url: string | null;
                    }) | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
            readonly id: string | null;
        }) | null;
    }) | null;
};
export type FairCollection_Query = {
    readonly response: FairCollection_QueryResponse;
    readonly variables: FairCollection_QueryVariables;
    readonly rawResponse: FairCollection_QueryRawResponse;
};



/*
query FairCollection_Query(
  $slug: String!
) {
  marketingCollection(slug: $slug) {
    ...FairCollection_collection
    id
  }
}

fragment FairCollection_collection on MarketingCollection {
  id
  slug
  title
  artworks: artworksConnection(first: 3) {
    counts {
      total
    }
    edges {
      node {
        image {
          url(version: "larger")
        }
        id
      }
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug",
    "type": "String!"
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
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v4 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
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
    "type": "Query"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "marketingCollection": {
          "type": "MarketingCollection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "marketingCollection.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "marketingCollection.slug": (v3/*: any*/),
        "marketingCollection.title": (v3/*: any*/),
        "marketingCollection.artworks": {
          "type": "FilterArtworksConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "marketingCollection.artworks.counts": {
          "type": "FilterArtworksCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "marketingCollection.artworks.edges": {
          "type": "FilterArtworksEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "marketingCollection.artworks.id": (v4/*: any*/),
        "marketingCollection.artworks.counts.total": {
          "type": "FormattedNumber",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "marketingCollection.artworks.edges.node": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "marketingCollection.artworks.edges.node.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "marketingCollection.artworks.edges.node.id": (v4/*: any*/),
        "marketingCollection.artworks.edges.node.image.url": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        }
      }
    },
    "name": "FairCollection_Query",
    "operationKind": "query",
    "text": "query FairCollection_Query(\n  $slug: String!\n) {\n  marketingCollection(slug: $slug) {\n    ...FairCollection_collection\n    id\n  }\n}\n\nfragment FairCollection_collection on MarketingCollection {\n  id\n  slug\n  title\n  artworks: artworksConnection(first: 3) {\n    counts {\n      total\n    }\n    edges {\n      node {\n        image {\n          url(version: \"larger\")\n        }\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'fbce895b61391f46b1a84c74a2734ad9';
export default node;
