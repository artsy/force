/**
 * @generated SignedSource<<24731c3050ebebcc6c486319fd2c1473>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionLotInfo_saleArtwork$data = {
  readonly artwork: {
    readonly artistNames: string | null;
    readonly date: string | null;
    readonly image: {
      readonly resized: {
        readonly height: number | null;
        readonly src: string;
        readonly srcSet: string;
        readonly width: number | null;
      } | null;
    } | null;
    readonly imageUrl: string | null;
    readonly internalID: string;
    readonly slug: string;
    readonly title: string | null;
  } | null;
  readonly counts: {
    readonly bidderPositions: any | null;
  } | null;
  readonly currentBid: {
    readonly display: string | null;
  } | null;
  readonly formattedEndDateTime: string | null;
  readonly lotLabel: string | null;
  readonly " $fragmentType": "AuctionLotInfo_saleArtwork";
};
export type AuctionLotInfo_saleArtwork$key = {
  readonly " $data"?: AuctionLotInfo_saleArtwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionLotInfo_saleArtwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": 100,
      "kind": "LocalArgument",
      "name": "imageHeight"
    },
    {
      "defaultValue": 100,
      "kind": "LocalArgument",
      "name": "imageWidth"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionLotInfo_saleArtwork",
  "selections": [
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
      "name": "lotLabel",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SaleArtworkCurrentBid",
      "kind": "LinkedField",
      "name": "currentBid",
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
      "kind": "ScalarField",
      "name": "formattedEndDateTime",
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
          "name": "internalID",
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
          "name": "title",
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
                  "kind": "Variable",
                  "name": "height",
                  "variableName": "imageHeight"
                },
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": "medium"
                },
                {
                  "kind": "Variable",
                  "name": "width",
                  "variableName": "imageWidth"
                }
              ],
              "concreteType": "ResizedImageUrl",
              "kind": "LinkedField",
              "name": "resized",
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "width",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "height",
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
          "args": null,
          "kind": "ScalarField",
          "name": "imageUrl",
          "storageKey": null
        },
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
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SaleArtwork",
  "abstractKey": null
};

(node as any).hash = "013371f8cc17dd7db45b7a1d66c61f11";

export default node;
