/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSharePanel_artwork = {
    readonly href: string | null;
    readonly images: ReadonlyArray<{
        readonly url: string | null;
    } | null> | null;
    readonly artworkMeta: {
        readonly share: string | null;
    } | null;
    readonly " $refType": "ArtworkSharePanel_artwork";
};
export type ArtworkSharePanel_artwork$data = ArtworkSharePanel_artwork;
export type ArtworkSharePanel_artwork$key = {
    readonly " $data"?: ArtworkSharePanel_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSharePanel_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSharePanel_artwork",
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
      "name": "images",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "artworkMeta",
      "args": null,
      "concreteType": "ArtworkMeta",
      "kind": "LinkedField",
      "name": "meta",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "share",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork"
};
(node as any).hash = '1aa535d73c67f2bc420065b91e091f3c';
export default node;
