/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistSellWithArtsy_artist = {
    readonly internalID: string;
    readonly slug: string;
    readonly href: string | null;
    readonly targetSupply: {
        readonly isInMicrofunnel: boolean | null;
    } | null;
    readonly image: {
        readonly cropped: {
            readonly src: string;
            readonly srcSet: string;
            readonly width: number;
            readonly height: number;
        } | null;
    } | null;
    readonly " $refType": "ArtistSellWithArtsy_artist";
};
export type ArtistSellWithArtsy_artist$data = ArtistSellWithArtsy_artist;
export type ArtistSellWithArtsy_artist$key = {
    readonly " $data"?: ArtistSellWithArtsy_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSellWithArtsy_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistSellWithArtsy_artist",
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
      "name": "slug",
      "storageKey": null
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
      "concreteType": "ArtistTargetSupply",
      "kind": "LinkedField",
      "name": "targetSupply",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isInMicrofunnel",
          "storageKey": null
        }
      ],
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
              "value": 360
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 2560
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
          "storageKey": "cropped(height:360,width:2560)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
(node as any).hash = '8ab5358bba88c949daa0fd74b5968ecd';
export default node;
