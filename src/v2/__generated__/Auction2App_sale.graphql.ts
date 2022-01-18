/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Auction2App_sale = {
    readonly formattedStartDateTime: string | null;
    readonly href: string | null;
    readonly coverImage: {
        readonly cropped: {
            readonly src: string;
            readonly url: string;
        } | null;
    } | null;
    readonly internalID: string;
    readonly slug: string;
    readonly associatedSale: {
        readonly coverImage: {
            readonly cropped: {
                readonly url: string;
            } | null;
        } | null;
        readonly endAt: string | null;
        readonly href: string | null;
        readonly slug: string;
        readonly isClosed: boolean | null;
        readonly isLiveOpen: boolean | null;
        readonly isPreview: boolean | null;
        readonly liveStartAt: string | null;
        readonly name: string | null;
        readonly startAt: string | null;
    } | null;
    readonly status: string | null;
    readonly currency: string | null;
    readonly eligibleSaleArtworksCount: number | null;
    readonly endAt: string | null;
    readonly isAuction: boolean | null;
    readonly isClosed: boolean | null;
    readonly isLiveOpen: boolean | null;
    readonly isOpen: boolean | null;
    readonly liveStartAt: string | null;
    readonly name: string | null;
    readonly promotedSale: {
        readonly slug: string;
        readonly name: string | null;
        readonly saleArtworksConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly artwork: {
                        readonly slug: string;
                        readonly title: string | null;
                        readonly date: string | null;
                        readonly saleMessage: string | null;
                        readonly isInAuction: boolean | null;
                        readonly image: {
                            readonly placeholder: string | null;
                            readonly url: string | null;
                            readonly aspectRatio: number;
                        } | null;
                        readonly artists: ReadonlyArray<{
                            readonly slug: string;
                            readonly href: string | null;
                            readonly name: string | null;
                        } | null> | null;
                        readonly partner: {
                            readonly name: string | null;
                        } | null;
                        readonly href: string | null;
                        readonly isAcquireable: boolean | null;
                    } | null;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly registrationEndsAt: string | null;
    readonly requireIdentityVerification: boolean | null;
    readonly startAt: string | null;
    readonly symbol: string | null;
    readonly " $fragmentRefs": FragmentRefs<"Auction2Meta_sale" | "AuctionDetails_sale">;
    readonly " $refType": "Auction2App_sale";
};
export type Auction2App_sale$data = Auction2App_sale;
export type Auction2App_sale$key = {
    readonly " $data"?: Auction2App_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"Auction2App_sale">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
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
  "name": "isClosed",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isLiveOpen",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "liveStartAt",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Auction2App_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "formattedStartDateTime",
      "storageKey": null
    },
    (v0/*: any*/),
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
            },
            (v1/*: any*/)
          ],
          "storageKey": "cropped(height:600,version:\"wide\",width:1800)"
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
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "associatedSale",
      "plural": false,
      "selections": [
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
                  "value": 110
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 260
                }
              ],
              "concreteType": "CroppedImageUrl",
              "kind": "LinkedField",
              "name": "cropped",
              "plural": false,
              "selections": [
                (v1/*: any*/)
              ],
              "storageKey": "cropped(height:110,width:260)"
            }
          ],
          "storageKey": null
        },
        (v3/*: any*/),
        (v0/*: any*/),
        (v2/*: any*/),
        (v4/*: any*/),
        (v5/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isPreview",
          "storageKey": null
        },
        (v6/*: any*/),
        (v7/*: any*/),
        (v8/*: any*/)
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
      "name": "currency",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "eligibleSaleArtworksCount",
      "storageKey": null
    },
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isAuction",
      "storageKey": null
    },
    (v4/*: any*/),
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isOpen",
      "storageKey": null
    },
    (v6/*: any*/),
    (v7/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "promotedSale",
      "plural": false,
      "selections": [
        (v2/*: any*/),
        (v7/*: any*/),
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 25
            }
          ],
          "concreteType": "SaleArtworkConnection",
          "kind": "LinkedField",
          "name": "saleArtworksConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "SaleArtworkEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "SaleArtwork",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Artwork",
                      "kind": "LinkedField",
                      "name": "artwork",
                      "plural": false,
                      "selections": [
                        (v2/*: any*/),
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
                          "name": "isInAuction",
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
                              "args": null,
                              "kind": "ScalarField",
                              "name": "placeholder",
                              "storageKey": null
                            },
                            (v1/*: any*/),
                            {
                              "alias": null,
                              "args": null,
                              "kind": "ScalarField",
                              "name": "aspectRatio",
                              "storageKey": null
                            }
                          ],
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "Artist",
                          "kind": "LinkedField",
                          "name": "artists",
                          "plural": true,
                          "selections": [
                            (v2/*: any*/),
                            (v0/*: any*/),
                            (v7/*: any*/)
                          ],
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "Partner",
                          "kind": "LinkedField",
                          "name": "partner",
                          "plural": false,
                          "selections": [
                            (v7/*: any*/)
                          ],
                          "storageKey": null
                        },
                        (v0/*: any*/),
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "isAcquireable",
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
          "storageKey": "saleArtworksConnection(first:25)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "registrationEndsAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "requireIdentityVerification",
      "storageKey": null
    },
    (v8/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "symbol",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Auction2Meta_sale"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionDetails_sale"
    }
  ],
  "type": "Sale",
  "abstractKey": null
};
})();
(node as any).hash = 'eb2f7eef69db5d826c2f9569a753c653';
export default node;
