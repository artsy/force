/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkGrid_artist = {
    readonly artworks_connection: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkGrid_artworks">;
    } | null;
    readonly " $refType": "ArtworkGrid_artist";
};
export type ArtworkGrid_artist$data = ArtworkGrid_artist;
export type ArtworkGrid_artist$key = {
    readonly " $data"?: ArtworkGrid_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkGrid_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkGrid_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "artworks_connection",
      "name": "artworksConnection",
      "storageKey": "artworksConnection(first:4)",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 4
        }
      ],
      "concreteType": "ArtworkConnection",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "ArtworkGrid_artworks",
          "args": null
        }
      ]
    }
  ]
};
(node as any).hash = '2993b1c9335bd41e7d807b765cc2d6fd';
export default node;
