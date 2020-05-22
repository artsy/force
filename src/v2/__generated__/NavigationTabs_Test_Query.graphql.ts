/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NavigationTabs_Test_QueryVariables = {};
export type NavigationTabs_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"NavigationTabs_artist">;
    } | null;
};
export type NavigationTabs_Test_QueryRawResponse = {
    readonly artist: ({
        readonly slug: string;
        readonly statuses: ({
            readonly shows: boolean | null;
            readonly cv: boolean | null;
            readonly articles: boolean | null;
            readonly auctionLots: boolean | null;
            readonly artworks: boolean | null;
        }) | null;
        readonly counts: ({
            readonly forSaleArtworks: number | null;
        }) | null;
        readonly related: ({
            readonly genes: ({
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly slug: string;
                        readonly id: string | null;
                    }) | null;
                }) | null> | null;
            }) | null;
        }) | null;
        readonly highlights: ({
            readonly partnersConnection: ({
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly categories: ReadonlyArray<({
                            readonly slug: string;
                            readonly id: string | null;
                        }) | null> | null;
                        readonly id: string | null;
                    }) | null;
                    readonly id: string | null;
                }) | null> | null;
            }) | null;
        }) | null;
        readonly insights: ReadonlyArray<({
            readonly type: string | null;
        }) | null> | null;
        readonly biographyBlurb: ({
            readonly text: string | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type NavigationTabs_Test_Query = {
    readonly response: NavigationTabs_Test_QueryResponse;
    readonly variables: NavigationTabs_Test_QueryVariables;
    readonly rawResponse: NavigationTabs_Test_QueryRawResponse;
};



/*
query NavigationTabs_Test_Query {
  artist(id: "pablo-picasso") {
    ...NavigationTabs_artist
    id
  }
}

fragment NavigationTabs_artist on Artist {
  slug
  statuses {
    shows
    cv(minShowCount: 0)
    articles
    auctionLots
    artworks
  }
  counts {
    forSaleArtworks
  }
  related {
    genes {
      edges {
        node {
          slug
          id
        }
      }
    }
  }
  highlights {
    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          categories {
            slug
            id
          }
          id
        }
        id
      }
    }
  }
  insights {
    type
  }
  biographyBlurb(format: HTML, partnerBio: true) {
    text
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "pablo-picasso"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "NavigationTabs_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"pablo-picasso\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "NavigationTabs_artist",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "NavigationTabs_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"pablo-picasso\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "statuses",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistStatuses",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "shows",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "cv",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "minShowCount",
                    "value": 0
                  }
                ],
                "storageKey": "cv(minShowCount:0)"
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "articles",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "auctionLots",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "artworks",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "counts",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistCounts",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "forSaleArtworks",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "related",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistRelatedData",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "genes",
                "storageKey": null,
                "args": null,
                "concreteType": "GeneConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "GeneEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Gene",
                        "plural": false,
                        "selections": (v3/*: any*/)
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "highlights",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistHighlights",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "partnersConnection",
                "storageKey": "partnersConnection(displayOnPartnerProfile:true,first:10,partnerCategory:[\"blue-chip\",\"top-established\",\"top-emerging\"],representedBy:true)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "displayOnPartnerProfile",
                    "value": true
                  },
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 10
                  },
                  {
                    "kind": "Literal",
                    "name": "partnerCategory",
                    "value": [
                      "blue-chip",
                      "top-established",
                      "top-emerging"
                    ]
                  },
                  {
                    "kind": "Literal",
                    "name": "representedBy",
                    "value": true
                  }
                ],
                "concreteType": "PartnerArtistConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PartnerArtistEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Partner",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "categories",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "PartnerCategory",
                            "plural": true,
                            "selections": (v3/*: any*/)
                          },
                          (v2/*: any*/)
                        ]
                      },
                      (v2/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "insights",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistInsight",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "type",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "biographyBlurb",
            "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:true)",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              },
              {
                "kind": "Literal",
                "name": "partnerBio",
                "value": true
              }
            ],
            "concreteType": "ArtistBlurb",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "text",
                "args": null,
                "storageKey": null
              }
            ]
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "NavigationTabs_Test_Query",
    "id": null,
    "text": "query NavigationTabs_Test_Query {\n  artist(id: \"pablo-picasso\") {\n    ...NavigationTabs_artist\n    id\n  }\n}\n\nfragment NavigationTabs_artist on Artist {\n  slug\n  statuses {\n    shows\n    cv(minShowCount: 0)\n    articles\n    auctionLots\n    artworks\n  }\n  counts {\n    forSaleArtworks\n  }\n  related {\n    genes {\n      edges {\n        node {\n          slug\n          id\n        }\n      }\n    }\n  }\n  highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  insights {\n    type\n  }\n  biographyBlurb(format: HTML, partnerBio: true) {\n    text\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '69fd01c45ad1df3f4f5afc14102aefe5';
export default node;
