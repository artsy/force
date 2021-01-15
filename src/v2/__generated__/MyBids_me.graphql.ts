/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionsReserveStatus = "NoReserve" | "ReserveMet" | "ReserveNotMet" | "%future added value";
export type AuctionsSoldStatus = "ForSale" | "Passed" | "Sold" | "%future added value";
export type MyBids_me = {
    readonly name: string | null;
    readonly auctionsLotStandingConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly isHighestBidder: boolean;
                readonly lot: {
                    readonly saleId: string;
                    readonly soldStatus: AuctionsSoldStatus;
                    readonly internalID: string;
                    readonly bidCount: number;
                    readonly reserveStatus: AuctionsReserveStatus;
                    readonly askingPrice: {
                        readonly display: string | null;
                    } | null;
                    readonly sellingPrice: {
                        readonly display: string | null;
                    } | null;
                };
                readonly saleArtwork: {
                    readonly position: number | null;
                    readonly lotLabel: string | null;
                    readonly artwork: {
                        readonly artistNames: string | null;
                        readonly href: string | null;
                        readonly image: {
                            readonly cropped: {
                                readonly url: string;
                            } | null;
                        } | null;
                    } | null;
                    readonly sale: {
                        readonly internalID: string;
                        readonly liveStartAt: string | null;
                        readonly endAt: string | null;
                        readonly status: string | null;
                    } | null;
                } | null;
            };
        } | null> | null;
    };
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
  "name": "internalID",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyBids_me",
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
          "name": "first",
          "value": 25
        }
      ],
      "concreteType": "AuctionsLotStandingConnection",
      "kind": "LinkedField",
      "name": "auctionsLotStandingConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AuctionsLotStandingEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "AuctionsLotStanding",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
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
                  "concreteType": "AuctionsLotState",
                  "kind": "LinkedField",
                  "name": "lot",
                  "plural": false,
                  "selections": [
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
                      "kind": "ScalarField",
                      "name": "soldStatus",
                      "storageKey": null
                    },
                    (v0/*: any*/),
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
                      "kind": "ScalarField",
                      "name": "reserveStatus",
                      "storageKey": null
                    },
                    {
                      "alias": "askingPrice",
                      "args": null,
                      "concreteType": "Money",
                      "kind": "LinkedField",
                      "name": "onlineAskingPrice",
                      "plural": false,
                      "selections": (v1/*: any*/),
                      "storageKey": null
                    },
                    {
                      "alias": "sellingPrice",
                      "args": null,
                      "concreteType": "Money",
                      "kind": "LinkedField",
                      "name": "floorSellingPrice",
                      "plural": false,
                      "selections": (v1/*: any*/),
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
                  "name": "saleArtwork",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "position",
                      "storageKey": null
                    },
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
                                  "value": 70
                                },
                                {
                                  "kind": "Literal",
                                  "name": "width",
                                  "value": 70
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
                                  "name": "url",
                                  "storageKey": null
                                }
                              ],
                              "storageKey": "cropped(height:70,width:70)"
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
                      "concreteType": "Sale",
                      "kind": "LinkedField",
                      "name": "sale",
                      "plural": false,
                      "selections": [
                        (v0/*: any*/),
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
                          "name": "endAt",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "status",
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
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "auctionsLotStandingConnection(first:25)"
    }
  ],
  "type": "Me"
};
})();
(node as any).hash = '1e1a48bed995d23a79404e1b11e0c52c';
export default node;
