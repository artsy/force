/* tslint:disable */
/* eslint-disable */

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
  ...SelectedCareerAchievements_artist
  ...ArtistConsignButton_artist
  ...ArtistGenes_artist
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

fragment ArtistConsignButton_artist on Artist {
  targetSupply {
    isInMicrofunnel
    isTargetSupply
  }
  internalID
  slug
  name
  href
  image {
    cropped(width: 50, height: 50) {
      src
      srcSet
    }
  }
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
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v5 = {
  "type": "ID",
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
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v8 = {
  "type": "Partner",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v9 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v10 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
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
    "type": "Query"
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
            "concreteType": "ArtistHighlights",
            "kind": "LinkedField",
            "name": "highlights",
            "plural": false,
            "selections": [
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
                              (v1/*: any*/),
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "partnersConnection(displayOnPartnerProfile:true,first:10,partnerCategory:[\"blue-chip\",\"top-established\",\"top-emerging\"],representedBy:true)"
              }
            ],
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
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "auctionResultsConnection(first:1,recordsTrusted:true,sort:\"PRICE_AND_DATE_DESC\")"
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistTargetSupply",
            "kind": "LinkedField",
            "name": "targetSupply",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isInMicrofunnel",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isTargetSupply",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          (v3/*: any*/),
          (v4/*: any*/),
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
                    "value": 50
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 50
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
                "storageKey": "cropped(height:50,width:50)"
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
                          (v4/*: any*/),
                          (v3/*: any*/),
                          (v2/*: any*/)
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
                      (v4/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
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
          (v2/*: any*/)
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
        "artist.id": (v5/*: any*/),
        "artist.biographyBlurb": {
          "type": "ArtistBlurb",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.name": (v6/*: any*/),
        "artist.related": {
          "type": "ArtistRelatedData",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.slug": (v7/*: any*/),
        "artist.highlights": {
          "type": "ArtistHighlights",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.insights": {
          "type": "ArtistInsight",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artist.auctionResultsConnection": {
          "type": "AuctionResultConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.targetSupply": {
          "type": "ArtistTargetSupply",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.internalID": (v7/*: any*/),
        "artist.href": (v6/*: any*/),
        "artist.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.biographyBlurb.partner": (v8/*: any*/),
        "artist.biographyBlurb.credit": (v6/*: any*/),
        "artist.biographyBlurb.text": (v6/*: any*/),
        "artist.related.genes": {
          "type": "GeneConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.highlights.partnersConnection": {
          "type": "PartnerArtistConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.insights.type": (v6/*: any*/),
        "artist.insights.label": (v6/*: any*/),
        "artist.insights.entities": {
          "type": "String",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artist.auctionResultsConnection.edges": {
          "type": "AuctionResultEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artist.targetSupply.isInMicrofunnel": (v9/*: any*/),
        "artist.targetSupply.isTargetSupply": (v9/*: any*/),
        "artist.image.cropped": {
          "type": "CroppedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.biographyBlurb.partner.profile": {
          "type": "Profile",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.biographyBlurb.partner.id": (v5/*: any*/),
        "artist.related.genes.edges": {
          "type": "GeneEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artist.highlights.partnersConnection.edges": {
          "type": "PartnerArtistEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artist.auctionResultsConnection.edges.node": {
          "type": "AuctionResult",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.image.cropped.src": (v10/*: any*/),
        "artist.image.cropped.srcSet": (v10/*: any*/),
        "artist.biographyBlurb.partner.profile.href": (v6/*: any*/),
        "artist.biographyBlurb.partner.profile.id": (v5/*: any*/),
        "artist.related.genes.edges.node": {
          "type": "Gene",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.highlights.partnersConnection.edges.node": (v8/*: any*/),
        "artist.highlights.partnersConnection.edges.id": (v5/*: any*/),
        "artist.auctionResultsConnection.edges.node.price_realized": {
          "type": "AuctionResultPriceRealized",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.auctionResultsConnection.edges.node.organization": (v6/*: any*/),
        "artist.auctionResultsConnection.edges.node.sale_date": (v6/*: any*/),
        "artist.auctionResultsConnection.edges.node.id": (v5/*: any*/),
        "artist.related.genes.edges.node.id": (v5/*: any*/),
        "artist.highlights.partnersConnection.edges.node.categories": {
          "type": "PartnerCategory",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artist.highlights.partnersConnection.edges.node.id": (v5/*: any*/),
        "artist.auctionResultsConnection.edges.node.price_realized.display": (v6/*: any*/),
        "artist.related.genes.edges.node.href": (v6/*: any*/),
        "artist.related.genes.edges.node.name": (v6/*: any*/),
        "artist.highlights.partnersConnection.edges.node.categories.slug": (v7/*: any*/),
        "artist.highlights.partnersConnection.edges.node.categories.id": (v5/*: any*/)
      }
    },
    "name": "ArtistCareerHighlights_Test_Query",
    "operationKind": "query",
    "text": "query ArtistCareerHighlights_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistCareerHighlights_artist\n    id\n  }\n}\n\nfragment ArtistCareerHighlights_artist on Artist {\n  ...SelectedCareerAchievements_artist\n  ...ArtistConsignButton_artist\n  ...ArtistGenes_artist\n  biographyBlurb(format: HTML, partnerBio: false) {\n    partner {\n      profile {\n        href\n        id\n      }\n      id\n    }\n    credit\n    text\n  }\n  name\n  related {\n    genes {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n  }\n  slug\n}\n\nfragment ArtistConsignButton_artist on Artist {\n  targetSupply {\n    isInMicrofunnel\n    isTargetSupply\n  }\n  internalID\n  slug\n  name\n  href\n  image {\n    cropped(width: 50, height: 50) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtistGenes_artist on Artist {\n  related {\n    genes {\n      edges {\n        node {\n          href\n          name\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment SelectedCareerAchievements_artist on Artist {\n  highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  insights {\n    type\n    label\n    entities\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized: priceRealized {\n          display(format: \"0.0a\")\n        }\n        organization\n        sale_date: saleDate(format: \"YYYY\")\n        id\n      }\n    }\n  }\n  slug\n}\n"
  }
};
})();
(node as any).hash = 'ccf85f96655c4345a60f6ee08ea79f37';
export default node;
