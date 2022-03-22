/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistsArtistCard_artist = {
    readonly href: string | null;
    readonly image: {
        readonly thumb: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtistEntityHeader_artist">;
    readonly " $refType": "ArtistsArtistCard_artist";
};
export type ArtistsArtistCard_artist$data = ArtistsArtistCard_artist;
export type ArtistsArtistCard_artist$key = {
    readonly " $data"?: ArtistsArtistCard_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistsArtistCard_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistsArtistCard_artist",
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
          "alias": "thumb",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 334
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 445
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
          "storageKey": "cropped(height:334,width:445)"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistEntityHeader_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
(node as any).hash = '3683b530810db6874ae377504ebf68f1';
export default node;
