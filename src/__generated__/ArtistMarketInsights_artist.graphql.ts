/**
 * @generated SignedSource<<66a38350a22a1142e1d233484ddd7804>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistMarketInsights_artist$data = {
  readonly auctionResultsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly organization: string | null | undefined;
        readonly price_realized: {
          readonly display: string | null | undefined;
        } | null | undefined;
        readonly sale_date: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly collections: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly highlights: {
    readonly partnersConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly categories: ReadonlyArray<{
            readonly slug: string;
          } | null | undefined> | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArtistMarketInsights_artist";
};
export type ArtistMarketInsights_artist$key = {
  readonly " $data"?: ArtistMarketInsights_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistMarketInsights_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": [
        "blue-chip",
        "top-established",
        "top-emerging"
      ],
      "kind": "LocalArgument",
      "name": "partnerCategory"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistMarketInsights_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "collections",
      "storageKey": null
    },
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
              "kind": "Variable",
              "name": "partnerCategory",
              "variableName": "partnerCategory"
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

(node as any).hash = "de8439137b5b5c48594e4ade9203b026";

export default node;
