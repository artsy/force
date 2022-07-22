/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistInsightKind = "ACTIVE_SECONDARY_MARKET" | "BIENNIAL" | "COLLECTED" | "GROUP_SHOW" | "REVIEWED" | "SOLO_SHOW" | "%future added value";
export type ArtistInsightBadges_artist = {
    readonly insights: ReadonlyArray<{
        readonly kind: ArtistInsightKind | null;
        readonly label: string;
        readonly description: string | null;
    }>;
    readonly auctionResultsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly priceRealized: {
                    readonly display: string | null;
                } | null;
                readonly organization: string | null;
                readonly saleDate: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ArtistInsightBadges_artist";
};
export type ArtistInsightBadges_artist$data = ArtistInsightBadges_artist;
export type ArtistInsightBadges_artist$key = {
    readonly " $data"?: ArtistInsightBadges_artist$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtistInsightBadges_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistInsightBadges_artist",
  "selections": [
    {
      "alias": null,
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
          "name": "description",
          "storageKey": null
        }
      ],
      "storageKey": "insights(kind:[\"ACTIVE_SECONDARY_MARKET\"])"
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
                  "alias": null,
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
                  "alias": null,
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
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "auctionResultsConnection(first:1,recordsTrusted:true,sort:\"PRICE_AND_DATE_DESC\")"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
(node as any).hash = '258fbc5cb3d2d2d4fa524b446338ea9b';
export default node;
