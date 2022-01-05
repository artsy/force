/* tslint:disable */
/* eslint-disable */

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

fragment UserActiveBids_me on Me {
  lotStandings {
    isLeadingBidder
    activeBid {
      id
    }
    saleArtwork {
      lotLabel
      highestBid {
        display
      }
      counts {
        bidderPositions
      }
      artwork {
        title
        href
        image {
          cropped(height: 100, width: 100) {
            src
            srcSet
          }
        }
        artist {
          name
          id
        }
        id
      }
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v2 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v3 = {
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
    "type": "Query"
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
            "alias": null,
            "args": null,
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
                "concreteType": "BidderPosition",
                "kind": "LinkedField",
                "name": "activeBid",
                "plural": false,
                "selections": [
                  (v0/*: any*/)
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lotLabel",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleArtworkHighestBid",
                    "kind": "LinkedField",
                    "name": "highestBid",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "display",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
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
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "artwork",
                    "plural": false,
                    "selections": [
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
                        "name": "href",
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
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artist",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          },
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v0/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "type": "Me",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.id": (v1/*: any*/),
        "me.lotStandings": {
          "type": "LotStanding",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.lotStandings.isLeadingBidder": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.activeBid": {
          "type": "BidderPosition",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.saleArtwork": {
          "type": "SaleArtwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.activeBid.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "me.lotStandings.saleArtwork.lotLabel": (v2/*: any*/),
        "me.lotStandings.saleArtwork.highestBid": {
          "type": "SaleArtworkHighestBid",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.saleArtwork.counts": {
          "type": "SaleArtworkCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.saleArtwork.artwork": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.saleArtwork.id": (v1/*: any*/),
        "me.lotStandings.saleArtwork.highestBid.display": (v2/*: any*/),
        "me.lotStandings.saleArtwork.counts.bidderPositions": {
          "type": "FormattedNumber",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.saleArtwork.artwork.title": (v2/*: any*/),
        "me.lotStandings.saleArtwork.artwork.href": (v2/*: any*/),
        "me.lotStandings.saleArtwork.artwork.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.saleArtwork.artwork.artist": {
          "type": "Artist",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.saleArtwork.artwork.id": (v1/*: any*/),
        "me.lotStandings.saleArtwork.artwork.image.cropped": {
          "type": "CroppedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.saleArtwork.artwork.artist.name": (v2/*: any*/),
        "me.lotStandings.saleArtwork.artwork.artist.id": (v1/*: any*/),
        "me.lotStandings.saleArtwork.artwork.image.cropped.src": (v3/*: any*/),
        "me.lotStandings.saleArtwork.artwork.image.cropped.srcSet": (v3/*: any*/)
      }
    },
    "name": "UserActiveBids_Test_Query",
    "operationKind": "query",
    "text": "query UserActiveBids_Test_Query {\n  me {\n    ...UserActiveBids_me\n    id\n  }\n}\n\nfragment UserActiveBids_me on Me {\n  lotStandings {\n    isLeadingBidder\n    activeBid {\n      id\n    }\n    saleArtwork {\n      lotLabel\n      highestBid {\n        display\n      }\n      counts {\n        bidderPositions\n      }\n      artwork {\n        title\n        href\n        image {\n          cropped(height: 100, width: 100) {\n            src\n            srcSet\n          }\n        }\n        artist {\n          name\n          id\n        }\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '9abf3e432254a11c9347732b6a4b1906';
export default node;
