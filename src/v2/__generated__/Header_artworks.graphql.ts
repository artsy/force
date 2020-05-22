/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Header_artworks = {
    readonly merchandisableArtists: ReadonlyArray<{
        readonly slug: string;
        readonly internalID: string;
        readonly name: string | null;
        readonly image: {
            readonly resized: {
                readonly url: string | null;
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
  "kind": "Fragment",
  "name": "Header_artworks",
  "type": "FilterArtworksConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "merchandisableArtists",
      "storageKey": null,
      "args": null,
      "concreteType": "Artist",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "slug",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "internalID",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "image",
          "storageKey": null,
          "args": null,
          "concreteType": "Image",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "resized",
              "storageKey": "resized(height:45,version:\"square\",width:45)",
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
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "url",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "birthday",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "nationality",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "FollowArtistButton_artist",
          "args": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "DefaultHeader_headerArtworks",
      "args": null
    }
  ]
};
(node as any).hash = 'ee9a91cd2dac53afe39f913787441bc3';
export default node;
