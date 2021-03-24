/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyBids_me = {
    readonly myBids: {
        readonly active: ReadonlyArray<{
            readonly sale: {
                readonly name: string | null;
                readonly slug: string;
                readonly liveStartAt: string | null;
                readonly endAt: string | null;
                readonly displayTimelyAt: string | null;
                readonly formattedStartDateTime: string | null;
                readonly requireIdentityVerification: boolean | null;
                readonly partner: {
                    readonly name: string | null;
                } | null;
                readonly coverImage: {
                    readonly resized: {
                        readonly src: string;
                        readonly srcSet: string;
                    } | null;
                } | null;
            } | null;
            readonly saleArtworks: ReadonlyArray<{
                readonly artwork: {
                    readonly artistNames: string | null;
                    readonly image: {
                        readonly resized: {
                            readonly src: string;
                            readonly srcSet: string;
                        } | null;
                    } | null;
                } | null;
                readonly slug: string;
                readonly position: number | null;
                readonly isHighestBidder: boolean | null;
                readonly isWatching: boolean | null;
                readonly highestBid: {
                    readonly amount: string | null;
                } | null;
                readonly estimate: string | null;
                readonly lot: {
                    readonly bidCount: number | null;
                    readonly floorSellingPrice: {
                        readonly display: string | null;
                    } | null;
                    readonly internalID: string | null;
                    readonly onlineAskingPrice: {
                        readonly display: string | null;
                    } | null;
                    readonly reserveStatus: string | null;
                    readonly saleId: string | null;
                    readonly sellingPrice: {
                        readonly display: string | null;
                    } | null;
                    readonly soldStatus: string | null;
                } | null;
            } | null> | null;
        } | null> | null;
        readonly closed: ReadonlyArray<{
            readonly sale: {
                readonly liveStartAt: string | null;
                readonly endAt: string | null;
                readonly requireIdentityVerification: boolean | null;
            } | null;
            readonly saleArtworks: ReadonlyArray<{
                readonly position: number | null;
                readonly lot: {
                    readonly bidCount: number | null;
                    readonly floorSellingPrice: {
                        readonly display: string | null;
                    } | null;
                    readonly internalID: string | null;
                    readonly onlineAskingPrice: {
                        readonly display: string | null;
                    } | null;
                    readonly reserveStatus: string | null;
                    readonly saleId: string | null;
                    readonly sellingPrice: {
                        readonly display: string | null;
                    } | null;
                    readonly soldStatus: string | null;
                } | null;
                readonly slug: string;
            } | null> | null;
        } | null> | null;
    } | null;
    readonly " $refType": "MyBids_me";
};
export type MyBids_me$data = MyBids_me;
export type MyBids_me$key = {
    readonly " $data"?: MyBids_me$data;
    readonly " $fragmentRefs": FragmentRefs<"MyBids_me">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
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
  "name": "liveStartAt",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "requireIdentityVerification",
  "storageKey": null
},
v5 = [
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
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "CausalityLotState",
  "kind": "LinkedField",
  "name": "lot",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bidCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "floorSellingPrice",
      "plural": false,
      "selections": (v7/*: any*/),
      "storageKey": null
    },
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
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "onlineAskingPrice",
      "plural": false,
      "selections": (v7/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reserveStatus",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "sellingPrice",
      "plural": false,
      "selections": (v7/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "soldStatus",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyBids_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MyBids",
      "kind": "LinkedField",
      "name": "myBids",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "MyBid",
          "kind": "LinkedField",
          "name": "active",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Sale",
              "kind": "LinkedField",
              "name": "sale",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                (v1/*: any*/),
                (v2/*: any*/),
                (v3/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "displayTimelyAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "formattedStartDateTime",
                  "storageKey": null
                },
                (v4/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Partner",
                  "kind": "LinkedField",
                  "name": "partner",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/)
                  ],
                  "storageKey": null
                },
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
                          "value": 100
                        },
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 300
                        }
                      ],
                      "concreteType": "ResizedImageUrl",
                      "kind": "LinkedField",
                      "name": "resized",
                      "plural": false,
                      "selections": (v5/*: any*/),
                      "storageKey": "resized(height:100,width:300)"
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "SaleArtwork",
              "kind": "LinkedField",
              "name": "saleArtworks",
              "plural": true,
              "selections": [
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
                      "name": "artistNames",
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
                              "value": 50
                            },
                            {
                              "kind": "Literal",
                              "name": "width",
                              "value": 50
                            }
                          ],
                          "concreteType": "ResizedImageUrl",
                          "kind": "LinkedField",
                          "name": "resized",
                          "plural": false,
                          "selections": (v5/*: any*/),
                          "storageKey": "resized(height:50,width:50)"
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                (v1/*: any*/),
                (v6/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isHighestBidder",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isWatching",
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
                      "name": "amount",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "estimate",
                  "storageKey": null
                },
                (v8/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "MyBid",
          "kind": "LinkedField",
          "name": "closed",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Sale",
              "kind": "LinkedField",
              "name": "sale",
              "plural": false,
              "selections": [
                (v2/*: any*/),
                (v3/*: any*/),
                (v4/*: any*/)
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "SaleArtwork",
              "kind": "LinkedField",
              "name": "saleArtworks",
              "plural": true,
              "selections": [
                (v6/*: any*/),
                (v8/*: any*/),
                (v1/*: any*/)
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
  "type": "Me"
};
})();
(node as any).hash = '13a136406aecdd0ca19ddbe07c5e16f8';
export default node;
