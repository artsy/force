/**
 * @generated SignedSource<<f496527e860cc8bdd24162571e6cde0c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Auction2App_me$data = {
  readonly internalID: string;
  readonly hasCreditCards: boolean | null;
  readonly identityVerified: boolean | null;
  readonly pendingIdentityVerification: {
    readonly internalID: string;
  } | null;
  readonly bidders: ReadonlyArray<{
    readonly qualifiedForBidding: boolean | null;
  } | null> | null;
  readonly lotStandings: ReadonlyArray<{
    readonly activeBid: {
      readonly internalID: string;
    } | null;
    readonly isLeadingBidder: boolean | null;
    readonly saleArtwork: {
      readonly slug: string;
      readonly lotLabel: string | null;
      readonly reserveStatus: string | null;
      readonly counts: {
        readonly bidderPositions: Int | null;
      } | null;
      readonly saleID: string | null;
      readonly highestBid: {
        readonly display: string | null;
      } | null;
      readonly sale: {
        readonly liveStartAt: string | null;
        readonly endAt: string | null;
        readonly isLiveOpen: boolean | null;
        readonly isClosed: boolean | null;
      } | null;
      readonly artwork: {
        readonly href: string | null;
        readonly title: string | null;
        readonly date: string | null;
        readonly image: {
          readonly url: string | null;
        } | null;
        readonly artist: {
          readonly name: string | null;
        } | null;
      } | null;
    } | null;
  } | null> | null;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionDetails_me">;
  readonly " $fragmentType": "Auction2App_me";
};
export type Auction2App_me$key = {
  readonly " $data"?: Auction2App_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"Auction2App_me">;
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
  (v0/*: any*/)
],
v2 = {
  "kind": "Variable",
  "name": "saleID",
  "variableName": "slug"
};
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "slug"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Auction2App_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionDetails_me"
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasCreditCards",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "identityVerified",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "IdentityVerification",
      "kind": "LinkedField",
      "name": "pendingIdentityVerification",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        (v2/*: any*/)
      ],
      "concreteType": "Bidder",
      "kind": "LinkedField",
      "name": "bidders",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "qualifiedForBidding",
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
          "name": "live",
          "value": true
        },
        (v2/*: any*/)
      ],
      "concreteType": "LotStanding",
      "kind": "LinkedField",
      "name": "lotStandings",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "BidderPosition",
          "kind": "LinkedField",
          "name": "activeBid",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
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
              "kind": "ScalarField",
              "name": "lotLabel",
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
              "kind": "ScalarField",
              "name": "saleID",
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
              "concreteType": "Sale",
              "kind": "LinkedField",
              "name": "sale",
              "plural": false,
              "selections": [
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
                  "name": "isLiveOpen",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isClosed",
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
                  "name": "href",
                  "storageKey": null
                },
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
                          "name": "version",
                          "value": "square"
                        }
                      ],
                      "kind": "ScalarField",
                      "name": "url",
                      "storageKey": "url(version:\"square\")"
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
  "type": "Me",
  "abstractKey": null
};
})();

(node as any).hash = "751f54cbe42e37407c5d7e980200e3fb";

export default node;
