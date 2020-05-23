/* tslint:disable */

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
  "kind": "Fragment",
  "name": "ArtworkSharePanel_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "images",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "url",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "artworkMeta",
      "name": "meta",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkMeta",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "share",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '1aa535d73c67f2bc420065b91e091f3c';
export default node;
