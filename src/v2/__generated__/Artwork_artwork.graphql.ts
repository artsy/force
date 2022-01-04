/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Artwork_artwork = {
    readonly slug: string;
    readonly image: {
        readonly url: string | null;
        readonly aspect_ratio: number;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"Metadata_artwork">;
    readonly " $refType": "Artwork_artwork";
};
export type Artwork_artwork$data = Artwork_artwork;
export type Artwork_artwork$key = {
    readonly " $data"?: Artwork_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"Artwork_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Artwork_artwork",
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
              "value": "large"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"large\")"
        },
        {
          "alias": "aspect_ratio",
          "args": null,
          "kind": "ScalarField",
          "name": "aspectRatio",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Metadata_artwork"
    }
  ],
  "type": "Artwork"
};
(node as any).hash = '9e25ccd07ef0c65a2e24af687648d6fd';
export default node;
