/**
 * @generated SignedSource<<5a990a552f23e6bfbc71fdb437a5899e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistWorksForSaleEmpty_artist$data = {
  readonly coverArtwork: {
    readonly image: {
      readonly aspectRatio: number;
      readonly url: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly " $fragmentType": "ArtistWorksForSaleEmpty_artist";
};
export type ArtistWorksForSaleEmpty_artist$key = {
  readonly " $data"?: ArtistWorksForSaleEmpty_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistWorksForSaleEmpty_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistWorksForSaleEmpty_artist",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artwork",
      "kind": "LinkedField",
      "name": "coverArtwork",
      "plural": false,
      "selections": [
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
                  "value": "x-large"
                }
              ],
              "kind": "ScalarField",
              "name": "url",
              "storageKey": "url(version:\"x-large\")"
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "aspectRatio",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "f578614cb1ce8ded5f0860b3b29c59a5";

export default node;
