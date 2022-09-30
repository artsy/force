/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Header_artworks = {
    readonly merchandisableArtists: ReadonlyArray<{
        readonly internalID: string;
        readonly name: string | null;
        readonly " $fragmentRefs": FragmentRefs<"EntityHeaderArtist_artist">;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"DefaultHeader_headerArtworks">;
    readonly " $refType": "Header_artworks";
};
export type Header_artworks$data = Header_artworks;
export type Header_artworks$key = {
    readonly " $data"?: Header_artworks$data | undefined;
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "EntityHeaderArtist_artist"
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
(node as any).hash = '69f824c3f2a20c931c30b8ec11d065e6';
export default node;
