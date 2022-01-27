/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsAuctionsLotStanding_lotStanding = {
    readonly isLeadingBidder: boolean | null;
    readonly saleArtwork: {
        readonly lotLabel: string | null;
        readonly sale: {
            readonly isClosed: boolean | null;
        } | null;
        readonly artwork: {
            readonly href: string | null;
            readonly image: {
                readonly cropped: {
                    readonly src: string;
                    readonly srcSet: string;
                } | null;
            } | null;
            readonly " $fragmentRefs": FragmentRefs<"Details_artwork">;
        } | null;
    } | null;
    readonly " $refType": "SettingsAuctionsLotStanding_lotStanding";
};
export type SettingsAuctionsLotStanding_lotStanding$data = SettingsAuctionsLotStanding_lotStanding;
export type SettingsAuctionsLotStanding_lotStanding$key = {
    readonly " $data"?: SettingsAuctionsLotStanding_lotStanding$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsAuctionsLotStanding_lotStanding">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsAuctionsLotStanding_lotStanding",
  "selections": [
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
          "name": "lotLabel",
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
                      "value": 100
                    },
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 100
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
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "srcSet",
                      "storageKey": null
                    }
                  ],
                  "storageKey": "cropped(height:100,width:100)"
                }
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Details_artwork"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "LotStanding",
  "abstractKey": null
};
(node as any).hash = 'a7f0f63cb1451e8d704b21be1a14f99f';
export default node;
