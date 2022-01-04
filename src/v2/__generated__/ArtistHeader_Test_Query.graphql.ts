/* tslint:disable */
/* eslint-disable */

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
  ...SelectedCareerAchievements_artist
  artistHighlights: highlights {
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
    cropped(width: 200, height: 200) {
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

fragment SelectedCareerAchievements_artist on Artist {
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
    label
    entities
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
  slug
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
v3 = [
  {
    "alias": null,
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
    "storageKey": "partnersConnection(displayOnPartnerProfile:true,first:10,partnerCategory:[\"blue-chip\",\"top-established\",\"top-emerging\"],representedBy:true)"
  }
],
v4 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v5 = {
  "type": "ArtistHighlights",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v6 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v7 = {
  "type": "PartnerArtistConnection",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v8 = {
  "type": "FormattedNumber",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v9 = {
  "type": "PartnerArtistEdge",
  "enumValues": null,
  "plural": true,
  "nullable": true
},
v10 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v11 = {
  "type": "Partner",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v12 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v13 = {
  "type": "PartnerCategory",
  "enumValues": null,
  "plural": true,
  "nullable": true
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
    "type": "Query"
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
            "alias": null,
            "args": null,
            "concreteType": "ArtistHighlights",
            "kind": "LinkedField",
            "name": "highlights",
            "plural": false,
            "selections": (v3/*: any*/),
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
              },
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
                      (v1/*: any*/)
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
            "selections": (v3/*: any*/),
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
                    "value": 200
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 200
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
                "storageKey": "cropped(height:200,width:200)"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "type": "Artist",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.id": (v4/*: any*/),
        "artist.artistHighlights": (v5/*: any*/),
        "artist.auctionResultsConnection": {
          "type": "AuctionResultConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.internalID": (v4/*: any*/),
        "artist.slug": (v4/*: any*/),
        "artist.name": (v6/*: any*/),
        "artist.formattedNationalityAndBirthday": (v6/*: any*/),
        "artist.counts": {
          "type": "ArtistCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.biographyBlurb": {
          "type": "ArtistBlurb",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.is_followed": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.highlights": (v5/*: any*/),
        "artist.insights": {
          "type": "ArtistInsight",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artist.artistHighlights.partnersConnection": (v7/*: any*/),
        "artist.auctionResultsConnection.edges": {
          "type": "AuctionResultEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artist.image.cropped": {
          "type": "CroppedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.counts.follows": (v8/*: any*/),
        "artist.counts.forSaleArtworks": (v8/*: any*/),
        "artist.biographyBlurb.credit": (v6/*: any*/),
        "artist.biographyBlurb.partnerID": (v6/*: any*/),
        "artist.biographyBlurb.text": (v6/*: any*/),
        "artist.highlights.partnersConnection": (v7/*: any*/),
        "artist.insights.type": (v6/*: any*/),
        "artist.insights.label": (v6/*: any*/),
        "artist.insights.entities": {
          "type": "String",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artist.artistHighlights.partnersConnection.edges": (v9/*: any*/),
        "artist.auctionResultsConnection.edges.node": {
          "type": "AuctionResult",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.image.cropped.src": (v10/*: any*/),
        "artist.image.cropped.srcSet": (v10/*: any*/),
        "artist.highlights.partnersConnection.edges": (v9/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node": (v11/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.id": (v12/*: any*/),
        "artist.auctionResultsConnection.edges.node.price_realized": {
          "type": "AuctionResultPriceRealized",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.auctionResultsConnection.edges.node.organization": (v6/*: any*/),
        "artist.auctionResultsConnection.edges.node.sale_date": (v6/*: any*/),
        "artist.auctionResultsConnection.edges.node.id": (v12/*: any*/),
        "artist.highlights.partnersConnection.edges.node": (v11/*: any*/),
        "artist.highlights.partnersConnection.edges.id": (v12/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node.categories": (v13/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node.id": (v12/*: any*/),
        "artist.auctionResultsConnection.edges.node.price_realized.display": (v6/*: any*/),
        "artist.highlights.partnersConnection.edges.node.categories": (v13/*: any*/),
        "artist.highlights.partnersConnection.edges.node.id": (v12/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node.categories.slug": (v4/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node.categories.id": (v12/*: any*/),
        "artist.highlights.partnersConnection.edges.node.categories.slug": (v4/*: any*/),
        "artist.highlights.partnersConnection.edges.node.categories.id": (v12/*: any*/)
      }
    },
    "name": "ArtistHeader_Test_Query",
    "operationKind": "query",
    "text": "query ArtistHeader_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistHeader_artist\n    id\n  }\n}\n\nfragment ArtistHeader_artist on Artist {\n  ...FollowArtistButton_artist\n  ...SelectedCareerAchievements_artist\n  artistHighlights: highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized: priceRealized {\n          display(format: \"0.0a\")\n        }\n        organization\n        sale_date: saleDate(format: \"YYYY\")\n        id\n      }\n    }\n  }\n  image {\n    cropped(width: 200, height: 200) {\n      src\n      srcSet\n    }\n  }\n  internalID\n  slug\n  name\n  formattedNationalityAndBirthday\n  counts {\n    follows\n    forSaleArtworks\n  }\n  biographyBlurb(format: HTML, partnerBio: false) {\n    credit\n    partnerID\n    text\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n\nfragment SelectedCareerAchievements_artist on Artist {\n  highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  insights {\n    type\n    label\n    entities\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized: priceRealized {\n          display(format: \"0.0a\")\n        }\n        organization\n        sale_date: saleDate(format: \"YYYY\")\n        id\n      }\n    }\n  }\n  slug\n}\n"
  }
};
})();
(node as any).hash = '488ad05ec853dc8831a05ff896bf0d3c';
export default node;
