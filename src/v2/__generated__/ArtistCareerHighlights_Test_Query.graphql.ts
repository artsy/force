/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistCareerHighlights_Test_QueryVariables = {};
export type ArtistCareerHighlights_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistCareerHighlights_artist">;
    } | null;
};
export type ArtistCareerHighlights_Test_Query = {
    readonly response: ArtistCareerHighlights_Test_QueryResponse;
    readonly variables: ArtistCareerHighlights_Test_QueryVariables;
};



/*
query ArtistCareerHighlights_Test_Query {
  artist(id: "example") {
    ...ArtistCareerHighlights_artist
    id
  }
}

fragment ArtistCareerHighlights_artist on Artist {
  ...ArtistInsightBadges_artist
  ...ArtistInsightAchievements_artist
  insightAchievements: insights(kind: [SOLO_SHOW, GROUP_SHOW, COLLECTED, REVIEWED, BIENNIAL]) {
    __typename
  }
  insightBadges: insights(kind: [ACTIVE_SECONDARY_MARKET]) {
    __typename
  }
  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    totalCount
  }
  artistHighlights: highlights {
    partnersConnection(first: 1, partnerCategory: ["blue-chip"]) {
      edges {
        node {
          __typename
          id
        }
        id
      }
    }
  }
}

fragment ArtistInsightAchievements_artist on Artist {
  slug
  insightAchievements: insights(kind: [SOLO_SHOW, GROUP_SHOW, COLLECTED, REVIEWED, BIENNIAL]) {
    label
    entities
  }
}

fragment ArtistInsightBadges_artist on Artist {
  insights(kind: [ACTIVE_SECONDARY_MARKET]) {
    kind
    label
    description
  }
  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    edges {
      node {
        priceRealized {
          display(format: "0.0a")
        }
        organization
        saleDate(format: "YYYY")
        id
      }
    }
  }
  artistHighlights: highlights {
    partnersConnection(first: 1, partnerCategory: ["blue-chip"]) {
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
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "kind",
    "value": [
      "ACTIVE_SECONDARY_MARKET"
    ]
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v3 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": true,
  "type": "ArtistInsight"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistCareerHighlights_Test_Query",
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
            "name": "ArtistCareerHighlights_artist"
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
    "name": "ArtistCareerHighlights_Test_Query",
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
            "args": (v1/*: any*/),
            "concreteType": "ArtistInsight",
            "kind": "LinkedField",
            "name": "insights",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "kind",
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              }
            ],
            "storageKey": "insights(kind:[\"ACTIVE_SECONDARY_MARKET\"])"
          },
          {
            "alias": null,
            "args": [
              (v3/*: any*/),
              {
                "kind": "Literal",
                "name": "recordsTrusted",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "PRICE_AND_DATE_DESC"
              }
            ],
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "auctionResultsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AuctionResultEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AuctionResult",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AuctionResultPriceRealized",
                        "kind": "LinkedField",
                        "name": "priceRealized",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "format",
                                "value": "0.0a"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "display",
                            "storageKey": "display(format:\"0.0a\")"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "organization",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "YYYY"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "saleDate",
                        "storageKey": "saleDate(format:\"YYYY\")"
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalCount",
                "storageKey": null
              }
            ],
            "storageKey": "auctionResultsConnection(first:1,recordsTrusted:true,sort:\"PRICE_AND_DATE_DESC\")"
          },
          {
            "alias": "artistHighlights",
            "args": null,
            "concreteType": "ArtistHighlights",
            "kind": "LinkedField",
            "name": "highlights",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  (v3/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "partnerCategory",
                    "value": [
                      "blue-chip"
                    ]
                  }
                ],
                "concreteType": "PartnerArtistConnection",
                "kind": "LinkedField",
                "name": "partnersConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PartnerArtistEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PartnerCategory",
                            "kind": "LinkedField",
                            "name": "categories",
                            "plural": true,
                            "selections": [
                              (v5/*: any*/),
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v4/*: any*/),
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "partnersConnection(first:1,partnerCategory:[\"blue-chip\"])"
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          {
            "alias": "insightAchievements",
            "args": [
              {
                "kind": "Literal",
                "name": "kind",
                "value": [
                  "SOLO_SHOW",
                  "GROUP_SHOW",
                  "COLLECTED",
                  "REVIEWED",
                  "BIENNIAL"
                ]
              }
            ],
            "concreteType": "ArtistInsight",
            "kind": "LinkedField",
            "name": "insights",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "entities",
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": "insights(kind:[\"SOLO_SHOW\",\"GROUP_SHOW\",\"COLLECTED\",\"REVIEWED\",\"BIENNIAL\"])"
          },
          {
            "alias": "insightBadges",
            "args": (v1/*: any*/),
            "concreteType": "ArtistInsight",
            "kind": "LinkedField",
            "name": "insights",
            "plural": true,
            "selections": [
              (v6/*: any*/)
            ],
            "storageKey": "insights(kind:[\"ACTIVE_SECONDARY_MARKET\"])"
          },
          (v4/*: any*/)
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "d173c20abc53a267eb7fd381d4fcc338",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artist.artistHighlights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistHighlights"
        },
        "artist.artistHighlights.partnersConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerArtistConnection"
        },
        "artist.artistHighlights.partnersConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerArtistEdge"
        },
        "artist.artistHighlights.partnersConnection.edges.id": (v7/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artist.artistHighlights.partnersConnection.edges.node.__typename": (v8/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node.categories": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerCategory"
        },
        "artist.artistHighlights.partnersConnection.edges.node.categories.id": (v7/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node.categories.slug": (v7/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node.id": (v7/*: any*/),
        "artist.auctionResultsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResultConnection"
        },
        "artist.auctionResultsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "AuctionResultEdge"
        },
        "artist.auctionResultsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResult"
        },
        "artist.auctionResultsConnection.edges.node.id": (v7/*: any*/),
        "artist.auctionResultsConnection.edges.node.organization": (v9/*: any*/),
        "artist.auctionResultsConnection.edges.node.priceRealized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResultPriceRealized"
        },
        "artist.auctionResultsConnection.edges.node.priceRealized.display": (v9/*: any*/),
        "artist.auctionResultsConnection.edges.node.saleDate": (v9/*: any*/),
        "artist.auctionResultsConnection.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "artist.id": (v7/*: any*/),
        "artist.insightAchievements": (v10/*: any*/),
        "artist.insightAchievements.__typename": (v8/*: any*/),
        "artist.insightAchievements.entities": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "String"
        },
        "artist.insightAchievements.label": (v8/*: any*/),
        "artist.insightBadges": (v10/*: any*/),
        "artist.insightBadges.__typename": (v8/*: any*/),
        "artist.insights": (v10/*: any*/),
        "artist.insights.description": (v9/*: any*/),
        "artist.insights.kind": {
          "enumValues": [
            "ACTIVE_SECONDARY_MARKET",
            "BIENNIAL",
            "COLLECTED",
            "GROUP_SHOW",
            "REVIEWED",
            "SOLO_SHOW"
          ],
          "nullable": true,
          "plural": false,
          "type": "ArtistInsightKind"
        },
        "artist.insights.label": (v8/*: any*/),
        "artist.slug": (v7/*: any*/)
      }
    },
    "name": "ArtistCareerHighlights_Test_Query",
    "operationKind": "query",
    "text": "query ArtistCareerHighlights_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistCareerHighlights_artist\n    id\n  }\n}\n\nfragment ArtistCareerHighlights_artist on Artist {\n  ...ArtistInsightBadges_artist\n  ...ArtistInsightAchievements_artist\n  insightAchievements: insights(kind: [SOLO_SHOW, GROUP_SHOW, COLLECTED, REVIEWED, BIENNIAL]) {\n    __typename\n  }\n  insightBadges: insights(kind: [ACTIVE_SECONDARY_MARKET]) {\n    __typename\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    totalCount\n  }\n  artistHighlights: highlights {\n    partnersConnection(first: 1, partnerCategory: [\"blue-chip\"]) {\n      edges {\n        node {\n          __typename\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistInsightAchievements_artist on Artist {\n  slug\n  insightAchievements: insights(kind: [SOLO_SHOW, GROUP_SHOW, COLLECTED, REVIEWED, BIENNIAL]) {\n    label\n    entities\n  }\n}\n\nfragment ArtistInsightBadges_artist on Artist {\n  insights(kind: [ACTIVE_SECONDARY_MARKET]) {\n    kind\n    label\n    description\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        priceRealized {\n          display(format: \"0.0a\")\n        }\n        organization\n        saleDate(format: \"YYYY\")\n        id\n      }\n    }\n  }\n  artistHighlights: highlights {\n    partnersConnection(first: 1, partnerCategory: [\"blue-chip\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ccf85f96655c4345a60f6ee08ea79f37';
export default node;
