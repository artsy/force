/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistInsightPills_artist = {
    readonly insightsList: ReadonlyArray<{
        readonly type: string;
        readonly label: string;
        readonly entities: ReadonlyArray<string>;
    }>;
    readonly auctionResultsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly price_realized: {
                    readonly display: string | null;
                } | null;
                readonly organization: string | null;
                readonly sale_date: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly artistHighlights: {
        readonly partnersConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly categories: ReadonlyArray<{
                        readonly slug: string;
                    } | null> | null;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly " $refType": "ArtistInsightPills_artist";
};
export type ArtistInsightPills_artist$data = ArtistInsightPills_artist;
export type ArtistInsightPills_artist$key = {
    readonly " $data"?: ArtistInsightPills_artist$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtistInsightPills_artist">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistInsightPills_artist",
  "selections": [
    {
      "alias": "insightsList",
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
      "storageKey": "insights(kind:[\"ACTIVE_SECONDARY_MARKET\"])"
    },
    {
      "alias": null,
      "args": [
        (v0/*: any*/),
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
                }
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
      "selections": [
        {
          "alias": null,
          "args": [
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "partnerCategory",
              "value": [
                "blue-chip"
              ]
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
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "slug",
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
          "storageKey": "partnersConnection(first:1,partnerCategory:[\"blue-chip\"])"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();
(node as any).hash = 'a4a31b39f2ce6e68ea849c6bb1ff6c0b';
export default node;
