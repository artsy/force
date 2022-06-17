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
  ...ArtistGenes_artist
  ...ArtistInsightBadges_artist
  ...ArtistInsightAchievements_artist
  biographyBlurb(format: HTML, partnerBio: false) {
    partner {
      profile {
        href
        id
      }
      id
    }
    credit
    text
  }
  name
  related {
    genes {
      edges {
        node {
          id
        }
      }
    }
  }
  slug
}

fragment ArtistGenes_artist on Artist {
  related {
    genes {
      edges {
        node {
          href
          name
          id
        }
      }
    }
  }
}

fragment ArtistInsightAchievements_artist on Artist {
  slug
  insightsList: insights(kind: [SOLO_SHOW, GROUP_SHOW, COLLECTED, REVIEWED, BIENNIAL]) {
    type
    label
    entities
    kind
    description
  }
}

fragment ArtistInsightBadges_artist on Artist {
  insights(kind: [ACTIVE_SECONDARY_MARKET]) {
    type
    label
    entities
    kind
    description
  }
  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    edges {
      node {
        price_realized: priceRealized {
          display(format: "0.0a")
        }
        organization
        sale_date: saleDate(format: "YYYY")
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "type",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "label",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "entities",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "kind",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "description",
    "storageKey": null
  }
],
v5 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
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
  "nullable": true,
  "plural": false,
  "type": "Partner"
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
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": true,
  "type": "String"
},
v12 = {
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
v13 = {
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
            "args": null,
            "concreteType": "ArtistRelatedData",
            "kind": "LinkedField",
            "name": "related",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
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
                          (v2/*: any*/),
                          (v3/*: any*/)
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
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "kind",
                "value": [
                  "ACTIVE_SECONDARY_MARKET"
                ]
              }
            ],
            "concreteType": "ArtistInsight",
            "kind": "LinkedField",
            "name": "insights",
            "plural": true,
            "selections": (v4/*: any*/),
            "storageKey": "insights(kind:[\"ACTIVE_SECONDARY_MARKET\"])"
          },
          {
            "alias": null,
            "args": [
              (v5/*: any*/),
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
                        "alias": "price_realized",
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
                        "alias": "sale_date",
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
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
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
                  (v5/*: any*/),
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
                              (v6/*: any*/),
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "partnersConnection(first:1,partnerCategory:[\"blue-chip\"])"
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/),
          {
            "alias": "insightsList",
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
            "selections": (v4/*: any*/),
            "storageKey": "insights(kind:[\"SOLO_SHOW\",\"GROUP_SHOW\",\"COLLECTED\",\"REVIEWED\",\"BIENNIAL\"])"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              },
              {
                "kind": "Literal",
                "name": "partnerBio",
                "value": false
              }
            ],
            "concreteType": "ArtistBlurb",
            "kind": "LinkedField",
            "name": "biographyBlurb",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Partner",
                "kind": "LinkedField",
                "name": "partner",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Profile",
                    "kind": "LinkedField",
                    "name": "profile",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "credit",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              }
            ],
            "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:false)"
          },
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "94a519a6f864e32ac3966bb5d37cd895",
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
        "artist.artistHighlights.partnersConnection.edges.node": (v8/*: any*/),
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
        "artist.auctionResultsConnection.edges.node.price_realized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResultPriceRealized"
        },
        "artist.auctionResultsConnection.edges.node.price_realized.display": (v9/*: any*/),
        "artist.auctionResultsConnection.edges.node.sale_date": (v9/*: any*/),
        "artist.biographyBlurb": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistBlurb"
        },
        "artist.biographyBlurb.credit": (v9/*: any*/),
        "artist.biographyBlurb.partner": (v8/*: any*/),
        "artist.biographyBlurb.partner.id": (v7/*: any*/),
        "artist.biographyBlurb.partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "artist.biographyBlurb.partner.profile.href": (v9/*: any*/),
        "artist.biographyBlurb.partner.profile.id": (v7/*: any*/),
        "artist.biographyBlurb.text": (v9/*: any*/),
        "artist.id": (v7/*: any*/),
        "artist.insights": (v10/*: any*/),
        "artist.insights.description": (v9/*: any*/),
        "artist.insights.entities": (v11/*: any*/),
        "artist.insights.kind": (v12/*: any*/),
        "artist.insights.label": (v13/*: any*/),
        "artist.insights.type": (v13/*: any*/),
        "artist.insightsList": (v10/*: any*/),
        "artist.insightsList.description": (v9/*: any*/),
        "artist.insightsList.entities": (v11/*: any*/),
        "artist.insightsList.kind": (v12/*: any*/),
        "artist.insightsList.label": (v13/*: any*/),
        "artist.insightsList.type": (v13/*: any*/),
        "artist.name": (v9/*: any*/),
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
        "artist.related.genes.edges.node.href": (v9/*: any*/),
        "artist.related.genes.edges.node.id": (v7/*: any*/),
        "artist.related.genes.edges.node.name": (v9/*: any*/),
        "artist.slug": (v7/*: any*/)
      }
    },
    "name": "ArtistCareerHighlights_Test_Query",
    "operationKind": "query",
    "text": "query ArtistCareerHighlights_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistCareerHighlights_artist\n    id\n  }\n}\n\nfragment ArtistCareerHighlights_artist on Artist {\n  ...ArtistGenes_artist\n  ...ArtistInsightBadges_artist\n  ...ArtistInsightAchievements_artist\n  biographyBlurb(format: HTML, partnerBio: false) {\n    partner {\n      profile {\n        href\n        id\n      }\n      id\n    }\n    credit\n    text\n  }\n  name\n  related {\n    genes {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n  }\n  slug\n}\n\nfragment ArtistGenes_artist on Artist {\n  related {\n    genes {\n      edges {\n        node {\n          href\n          name\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment ArtistInsightAchievements_artist on Artist {\n  slug\n  insightsList: insights(kind: [SOLO_SHOW, GROUP_SHOW, COLLECTED, REVIEWED, BIENNIAL]) {\n    type\n    label\n    entities\n    kind\n    description\n  }\n}\n\nfragment ArtistInsightBadges_artist on Artist {\n  insights(kind: [ACTIVE_SECONDARY_MARKET]) {\n    type\n    label\n    entities\n    kind\n    description\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized: priceRealized {\n          display(format: \"0.0a\")\n        }\n        organization\n        sale_date: saleDate(format: \"YYYY\")\n        id\n      }\n    }\n  }\n  artistHighlights: highlights {\n    partnersConnection(first: 1, partnerCategory: [\"blue-chip\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ccf85f96655c4345a60f6ee08ea79f37';
export default node;
