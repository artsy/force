/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistHeader_Test_QueryVariables = {};
export type ArtistHeader_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistHeader_artist">;
    } | null;
};
export type ArtistHeader_Test_Query = {
    readonly response: ArtistHeader_Test_QueryResponse;
    readonly variables: ArtistHeader_Test_QueryVariables;
};



/*
query ArtistHeader_Test_Query {
  artist(id: "example") {
    ...ArtistHeader_artist
    id
  }
}

fragment ArtistHeader_artist on Artist {
  ...FollowArtistButton_artist
  ...ArtistInsightPills_artist
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
  image {
    cropped(width: 100, height: 100) {
      src
      srcSet
    }
  }
  internalID
  slug
  name
  formattedNationalityAndBirthday
  counts {
    follows
    forSaleArtworks
  }
  biographyBlurb(format: HTML, partnerBio: false) {
    credit
    partnerID
    text
  }
}

fragment ArtistInsightPills_artist on Artist {
  insightsList: insights(kind: [ACTIVE_SECONDARY_MARKET]) {
    kind
    label
    entities
  }
  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    edges {
      node {
        priceRealized {
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

fragment FollowArtistButton_artist on Artist {
  id
  internalID
  name
  slug
  is_followed: isFollowed
  counts {
    follows
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
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v4 = [
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
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultPriceRealized"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
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
    "name": "ArtistHeader_Test_Query",
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
            "name": "ArtistHeader_artist"
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
    "name": "ArtistHeader_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
          (v2/*: any*/),
          {
            "alias": "is_followed",
            "args": null,
            "kind": "ScalarField",
            "name": "isFollowed",
            "storageKey": null
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
                "name": "follows",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "forSaleArtworks",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "insightsList",
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
            "selections": [
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
                "name": "label",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "entities",
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
                        "selections": (v4/*: any*/),
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
                      (v1/*: any*/),
                      {
                        "alias": "price_realized",
                        "args": null,
                        "concreteType": "AuctionResultPriceRealized",
                        "kind": "LinkedField",
                        "name": "priceRealized",
                        "plural": false,
                        "selections": (v4/*: any*/),
                        "storageKey": null
                      }
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
                              (v2/*: any*/),
                              (v1/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "partnersConnection(first:1,partnerCategory:[\"blue-chip\"])"
              }
            ],
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
                "storageKey": "cropped(height:100,width:100)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "formattedNationalityAndBirthday",
            "storageKey": null
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
                "kind": "ScalarField",
                "name": "credit",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "partnerID",
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
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "bd2aafe3aa37b2f1bea610dcacfd67a9",
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
        "artist.artistHighlights.partnersConnection.edges.id": (v5/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artist.artistHighlights.partnersConnection.edges.node.categories": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerCategory"
        },
        "artist.artistHighlights.partnersConnection.edges.node.categories.id": (v5/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node.categories.slug": (v5/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node.id": (v5/*: any*/),
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
        "artist.auctionResultsConnection.edges.node.id": (v5/*: any*/),
        "artist.auctionResultsConnection.edges.node.organization": (v6/*: any*/),
        "artist.auctionResultsConnection.edges.node.priceRealized": (v7/*: any*/),
        "artist.auctionResultsConnection.edges.node.priceRealized.display": (v6/*: any*/),
        "artist.auctionResultsConnection.edges.node.price_realized": (v7/*: any*/),
        "artist.auctionResultsConnection.edges.node.price_realized.display": (v6/*: any*/),
        "artist.auctionResultsConnection.edges.node.sale_date": (v6/*: any*/),
        "artist.biographyBlurb": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistBlurb"
        },
        "artist.biographyBlurb.credit": (v6/*: any*/),
        "artist.biographyBlurb.partnerID": (v6/*: any*/),
        "artist.biographyBlurb.text": (v6/*: any*/),
        "artist.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "artist.counts.follows": (v8/*: any*/),
        "artist.counts.forSaleArtworks": (v8/*: any*/),
        "artist.formattedNationalityAndBirthday": (v6/*: any*/),
        "artist.id": (v5/*: any*/),
        "artist.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artist.image.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "artist.image.cropped.src": (v9/*: any*/),
        "artist.image.cropped.srcSet": (v9/*: any*/),
        "artist.insightsList": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtistInsight"
        },
        "artist.insightsList.entities": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "String"
        },
        "artist.insightsList.kind": {
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
        "artist.insightsList.label": (v9/*: any*/),
        "artist.internalID": (v5/*: any*/),
        "artist.is_followed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "artist.name": (v6/*: any*/),
        "artist.slug": (v5/*: any*/)
      }
    },
    "name": "ArtistHeader_Test_Query",
    "operationKind": "query",
    "text": "query ArtistHeader_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistHeader_artist\n    id\n  }\n}\n\nfragment ArtistHeader_artist on Artist {\n  ...FollowArtistButton_artist\n  ...ArtistInsightPills_artist\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized: priceRealized {\n          display(format: \"0.0a\")\n        }\n        organization\n        sale_date: saleDate(format: \"YYYY\")\n        id\n      }\n    }\n  }\n  image {\n    cropped(width: 100, height: 100) {\n      src\n      srcSet\n    }\n  }\n  internalID\n  slug\n  name\n  formattedNationalityAndBirthday\n  counts {\n    follows\n    forSaleArtworks\n  }\n  biographyBlurb(format: HTML, partnerBio: false) {\n    credit\n    partnerID\n    text\n  }\n}\n\nfragment ArtistInsightPills_artist on Artist {\n  insightsList: insights(kind: [ACTIVE_SECONDARY_MARKET]) {\n    kind\n    label\n    entities\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        priceRealized {\n          display(format: \"0.0a\")\n        }\n        organization\n        sale_date: saleDate(format: \"YYYY\")\n        id\n      }\n    }\n  }\n  artistHighlights: highlights {\n    partnersConnection(first: 1, partnerCategory: [\"blue-chip\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n"
  }
};
})();
(node as any).hash = '488ad05ec853dc8831a05ff896bf0d3c';
export default node;
