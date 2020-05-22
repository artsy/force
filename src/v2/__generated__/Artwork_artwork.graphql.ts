/* tslint:disable */

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
  "kind": "Fragment",
  "name": "Artwork_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
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
          "kind": "ScalarField",
          "alias": null,
          "name": "url",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "large"
            }
          ],
          "storageKey": "url(version:\"large\")"
        },
        {
          "kind": "ScalarField",
          "alias": "aspect_ratio",
          "name": "aspectRatio",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "Metadata_artwork",
      "args": null
    }
  ]
};
(node as any).hash = '9e25ccd07ef0c65a2e24af687648d6fd';
export default node;
