/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CreateBidderInput = {
    clientMutationId?: string | null;
    saleID: string;
};
export type useCreateBidderMutationVariables = {
    input: CreateBidderInput;
};
export type useCreateBidderMutationResponse = {
    readonly createBidder: {
        readonly bidder: {
            readonly internalID: string;
            readonly sale: {
                readonly " $fragmentRefs": FragmentRefs<"Auction2App_sale">;
            } | null;
        } | null;
    } | null;
};
export type useCreateBidderMutation = {
    readonly response: useCreateBidderMutationResponse;
    readonly variables: useCreateBidderMutationVariables;
};



/*
mutation useCreateBidderMutation(
  $input: CreateBidderInput!
) {
  createBidder(input: $input) {
    bidder {
      internalID
      sale {
        ...Auction2App_sale
        id
      }
      id
    }
  }
}

fragment Auction2App_sale on Sale {
  ...Auction2Meta_sale
  ...AuctionDetails_sale
  internalID
  coverImage {
    cropped(width: 1800, height: 600, version: "wide") {
      src
    }
  }
}

fragment Auction2Meta_sale on Sale {
  name
  description(format: HTML)
  slug
}

fragment AuctionDetails_sale on Sale {
  ...RegisterButton_sale
  ...AuctionInfoSidebar_sale
  name
  slug
  formattedStartDateTime
  liveStartAt
  startAt
  endAt
  description(format: HTML)
  href
}

fragment AuctionInfoSidebar_sale on Sale {
  liveStartAt
}

fragment RegisterButton_sale on Sale {
  bidder {
    qualifiedForBidding
    id
  }
  isAuction
  isClosed
  isLiveOpen
  isRegistrationClosed
  liveURLIfOpen
  requireIdentityVerification
  registrationStatus {
    internalID
    id
  }
  slug
  status
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateBidderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBidderPayload",
        "kind": "LinkedField",
        "name": "createBidder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Bidder",
            "kind": "LinkedField",
            "name": "bidder",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Sale",
                "kind": "LinkedField",
                "name": "sale",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "Auction2App_sale"
                  }
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useCreateBidderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBidderPayload",
        "kind": "LinkedField",
        "name": "createBidder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Bidder",
            "kind": "LinkedField",
            "name": "bidder",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "format",
                        "value": "HTML"
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": "description(format:\"HTML\")"
                  },
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
                    "concreteType": "Bidder",
                    "kind": "LinkedField",
                    "name": "bidder",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "qualifiedForBidding",
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
                    "name": "isAuction",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isClosed",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isLiveOpen",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isRegistrationClosed",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "liveURLIfOpen",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "requireIdentityVerification",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "kind": "LinkedField",
                    "name": "registrationStatus",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "status",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "liveStartAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "formattedStartDateTime",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "href",
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "coverImage",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 600
                          },
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": "wide"
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 1800
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
                          }
                        ],
                        "storageKey": "cropped(height:600,version:\"wide\",width:1800)"
                      }
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e556067421521dab092abfabba2e7697",
    "id": null,
    "metadata": {},
    "name": "useCreateBidderMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateBidderMutation(\n  $input: CreateBidderInput!\n) {\n  createBidder(input: $input) {\n    bidder {\n      internalID\n      sale {\n        ...Auction2App_sale\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment Auction2App_sale on Sale {\n  ...Auction2Meta_sale\n  ...AuctionDetails_sale\n  internalID\n  coverImage {\n    cropped(width: 1800, height: 600, version: \"wide\") {\n      src\n    }\n  }\n}\n\nfragment Auction2Meta_sale on Sale {\n  name\n  description(format: HTML)\n  slug\n}\n\nfragment AuctionDetails_sale on Sale {\n  ...RegisterButton_sale\n  ...AuctionInfoSidebar_sale\n  name\n  slug\n  formattedStartDateTime\n  liveStartAt\n  startAt\n  endAt\n  description(format: HTML)\n  href\n}\n\nfragment AuctionInfoSidebar_sale on Sale {\n  liveStartAt\n}\n\nfragment RegisterButton_sale on Sale {\n  bidder {\n    qualifiedForBidding\n    id\n  }\n  isAuction\n  isClosed\n  isLiveOpen\n  isRegistrationClosed\n  liveURLIfOpen\n  requireIdentityVerification\n  registrationStatus {\n    internalID\n    id\n  }\n  slug\n  status\n}\n"
  }
};
})();
(node as any).hash = '12ff76da7ccaf0f3b2c8da619c711c8a';
export default node;
