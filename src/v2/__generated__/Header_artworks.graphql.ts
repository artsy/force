/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Header_artworks = {
    readonly merchandisableArtists: ReadonlyArray<{
        readonly slug: string;
        readonly internalID: string;
        readonly name: string | null;
        readonly image: {
            readonly resized: {
                readonly url: string;
            } | null;
        } | null;
        readonly birthday: string | null;
        readonly nationality: string | null;
        readonly " $fragmentRefs": FragmentRefs<"FollowArtistButton_artist">;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"DefaultHeader_headerArtworks">;
    readonly " $refType": "Header_artworks";
};
export type Header_artworks$data = Header_artworks;
export type Header_artworks$key = {
    readonly " $data"?: Header_artworks$data;
    readonly " $fragmentRefs": FragmentRefs<"Header_artworks">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Header_artworks",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "merchandisableArtists",
      "plural": true,
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
                  "value": 45
                },
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": "square"
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 45
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
                  "name": "url",
                  "storageKey": null
                }
              ],
              "storageKey": "resized(height:45,version:\"square\",width:45)"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "birthday",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "nationality",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FollowArtistButton_artist"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DefaultHeader_headerArtworks"
    }
  ],
  "type": "FilterArtworksConnection",
  "abstractKey": null
};
(node as any).hash = 'ee9a91cd2dac53afe39f913787441bc3';
export default node;
