/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionLotInfo_saleArtwork = {
    readonly counts: {
        readonly bidderPositions: number | null;
    } | null;
    readonly lotLabel: string | null;
    readonly currentBid: {
        readonly display: string | null;
    } | null;
    readonly formattedEndDateTime: string | null;
    readonly artwork: {
        readonly internalID: string;
        readonly date: string | null;
        readonly title: string | null;
        readonly image: {
            readonly resized: {
                readonly src: string;
                readonly srcSet: string;
                readonly width: number | null;
                readonly height: number | null;
            } | null;
        } | null;
        readonly imageUrl: string | null;
        readonly artistNames: string | null;
        readonly slug: string;
    } | null;
    readonly " $refType": "AuctionLotInfo_saleArtwork";
};
export type AuctionLotInfo_saleArtwork$data = AuctionLotInfo_saleArtwork;
export type AuctionLotInfo_saleArtwork$key = {
    readonly " $data"?: AuctionLotInfo_saleArtwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AuctionLotInfo_saleArtwork">;
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
(node as any).hash = '013371f8cc17dd7db45b7a1d66c61f11';
export default node;
