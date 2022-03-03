/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserActiveBids_Test_QueryVariables = {};
export type UserActiveBids_Test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"UserActiveBids_me">;
    } | null;
};
export type UserActiveBids_Test_Query = {
    readonly response: UserActiveBids_Test_QueryResponse;
    readonly variables: UserActiveBids_Test_QueryVariables;
};



/*
query UserActiveBids_Test_Query {
  me {
    ...UserActiveBids_me
    id
  }
}

fragment Details_artwork on Artwork {
  href
  title
  date
  saleMessage
  culturalMaker
  artists(shallow: true) {
    id
    href
    name
  }
  collectingInstitution
  partner(shallow: true) {
    name
    href
    id
  }
  sale {
    isAuction
    isClosed
    id
  }
  saleArtwork {
    lotLabel
    counts {
      bidderPositions
    }
    highestBid {
      display
    }
    openingBid {
      display
    }
    id
  }
}

fragment SettingsAuctionsLotStanding_lotStanding on LotStanding {
  isLeadingBidder
  saleArtwork {
    lotLabel
    sale {
      isClosed
      id
    }
    artwork {
      ...Details_artwork
      href
      image {
        cropped(height: 100, width: 100) {
          src
          srcSet
        }
      }
      id
    }
    id
  }
}

fragment UserActiveBids_me on Me {
  activeLotStandings: lotStandings(live: true) {
    ...SettingsAuctionsLotStanding_lotStanding
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotLabel",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isClosed",
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
  "name": "href",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
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
  "plural": false,
  "type": "ID"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Sale"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserActiveBids_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserActiveBids_me"
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
    "name": "UserActiveBids_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": "activeLotStandings",
            "args": [
              {
                "kind": "Literal",
                "name": "live",
                "value": true
              }
            ],
            "concreteType": "LotStanding",
            "kind": "LinkedField",
            "name": "lotStandings",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isLeadingBidder",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtwork",
                "kind": "LinkedField",
                "name": "saleArtwork",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Sale",
                    "kind": "LinkedField",
                    "name": "sale",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "artwork",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
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
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "saleMessage",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "culturalMaker",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v4/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": "artists(shallow:true)"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "collectingInstitution",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v4/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          (v3/*: any*/),
                          (v2/*: any*/)
                        ],
                        "storageKey": "partner(shallow:true)"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Sale",
                        "kind": "LinkedField",
                        "name": "sale",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isAuction",
                            "storageKey": null
                          },
                          (v1/*: any*/),
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "SaleArtwork",
                        "kind": "LinkedField",
                        "name": "saleArtwork",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "SaleArtworkCounts",
                            "kind": "LinkedField",
                            "name": "counts",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "bidderPositions",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "SaleArtworkHighestBid",
                            "kind": "LinkedField",
                            "name": "highestBid",
                            "plural": false,
                            "selections": (v6/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "SaleArtworkOpeningBid",
                            "kind": "LinkedField",
                            "name": "openingBid",
                            "plural": false,
                            "selections": (v6/*: any*/),
                            "storageKey": null
                          },
                          (v2/*: any*/)
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
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "lotStandings(live:true)"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a279d51c4ff3e8d6e96142d6f68cb386",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.activeLotStandings": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LotStanding"
        },
        "me.activeLotStandings.isLeadingBidder": (v7/*: any*/),
        "me.activeLotStandings.saleArtwork": (v8/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "me.activeLotStandings.saleArtwork.artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "me.activeLotStandings.saleArtwork.artwork.artists.href": (v9/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.artists.id": (v10/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.artists.name": (v9/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.collectingInstitution": (v9/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.culturalMaker": (v9/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.date": (v9/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.href": (v9/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.id": (v10/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "me.activeLotStandings.saleArtwork.artwork.image.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "me.activeLotStandings.saleArtwork.artwork.image.cropped.src": (v11/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.image.cropped.srcSet": (v11/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "me.activeLotStandings.saleArtwork.artwork.partner.href": (v9/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.partner.id": (v10/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.partner.name": (v9/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale": (v12/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale.id": (v10/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale.isAuction": (v7/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale.isClosed": (v7/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.saleArtwork": (v8/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.saleArtwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "me.activeLotStandings.saleArtwork.artwork.saleArtwork.counts.bidderPositions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "me.activeLotStandings.saleArtwork.artwork.saleArtwork.highestBid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "me.activeLotStandings.saleArtwork.artwork.saleArtwork.highestBid.display": (v9/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.saleArtwork.id": (v10/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.saleArtwork.lotLabel": (v9/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.saleArtwork.openingBid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "me.activeLotStandings.saleArtwork.artwork.saleArtwork.openingBid.display": (v9/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.saleMessage": (v9/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.title": (v9/*: any*/),
        "me.activeLotStandings.saleArtwork.id": (v10/*: any*/),
        "me.activeLotStandings.saleArtwork.lotLabel": (v9/*: any*/),
        "me.activeLotStandings.saleArtwork.sale": (v12/*: any*/),
        "me.activeLotStandings.saleArtwork.sale.id": (v10/*: any*/),
        "me.activeLotStandings.saleArtwork.sale.isClosed": (v7/*: any*/),
        "me.id": (v10/*: any*/)
      }
    },
    "name": "UserActiveBids_Test_Query",
    "operationKind": "query",
    "text": "query UserActiveBids_Test_Query {\n  me {\n    ...UserActiveBids_me\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  saleMessage\n  culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    isAuction\n    isClosed\n    id\n  }\n  saleArtwork {\n    lotLabel\n    counts {\n      bidderPositions\n    }\n    highestBid {\n      display\n    }\n    openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment SettingsAuctionsLotStanding_lotStanding on LotStanding {\n  isLeadingBidder\n  saleArtwork {\n    lotLabel\n    sale {\n      isClosed\n      id\n    }\n    artwork {\n      ...Details_artwork\n      href\n      image {\n        cropped(height: 100, width: 100) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment UserActiveBids_me on Me {\n  activeLotStandings: lotStandings(live: true) {\n    ...SettingsAuctionsLotStanding_lotStanding\n  }\n}\n"
  }
};
})();
(node as any).hash = '9abf3e432254a11c9347732b6a4b1906';
export default node;
