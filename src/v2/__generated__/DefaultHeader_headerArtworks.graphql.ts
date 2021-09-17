/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DefaultHeader_headerArtworks = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly " $fragmentRefs": FragmentRefs<"DefaultHeaderArtwork_artwork">;
        } | null;
    } | null> | null;
    readonly " $refType": "DefaultHeader_headerArtworks";
};
export type DefaultHeader_headerArtworks$data = DefaultHeader_headerArtworks;
export type DefaultHeader_headerArtworks$key = {
    readonly " $data"?: DefaultHeader_headerArtworks$data;
    readonly " $fragmentRefs": FragmentRefs<"DefaultHeader_headerArtworks">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DefaultHeader_headerArtworks",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FilterArtworksEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "DefaultHeaderArtwork_artwork"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FilterArtworksConnection",
  "abstractKey": null
};
(node as any).hash = '0d8bb416e06dcc10ce68c99eba44bb99';
export default node;
