/**
 * @generated SignedSource<<f71985bc6883dc9e7ecf1ee861ea1fa7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsAuctionsLotStanding_lotStanding$data = {
  readonly isLeadingBidder: boolean | null | undefined;
  readonly saleArtwork: {
    readonly artwork: {
      readonly href: string | null | undefined;
      readonly image: {
        readonly cropped: {
          readonly src: string;
          readonly srcSet: string;
        } | null | undefined;
      } | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"Details_artwork">;
    } | null | undefined;
    readonly lotLabel: string | null | undefined;
    readonly sale: {
      readonly isClosed: boolean | null | undefined;
      readonly isLiveOpen: boolean | null | undefined;
      readonly slug: string;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "SettingsAuctionsLotStanding_lotStanding";
};
export type SettingsAuctionsLotStanding_lotStanding$key = {
  readonly " $data"?: SettingsAuctionsLotStanding_lotStanding$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsAuctionsLotStanding_lotStanding">;
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
              "name": "slug",
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "Details_artwork"
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

(node as any).hash = "2b6194438eeee34f5dc34b04a5a95b1d";

export default node;
