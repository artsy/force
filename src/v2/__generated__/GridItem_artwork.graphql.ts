/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GridItem_artwork = {
    readonly internalID: string;
    readonly title: string | null;
    readonly image_title: string | null;
    readonly image: {
        readonly placeholder: string | null;
        readonly url: string | null;
        readonly aspect_ratio: number;
    } | null;
    readonly href: string | null;
    readonly " $fragmentRefs": FragmentRefs<"Metadata_artwork" | "Save_artwork" | "Badge_artwork">;
    readonly " $refType": "GridItem_artwork";
};
export type GridItem_artwork$data = GridItem_artwork;
export type GridItem_artwork$key = {
    readonly " $data"?: GridItem_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"GridItem_artwork">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "GridItem_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "image_title",
      "name": "imageTitle",
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
          "name": "placeholder",
          "args": null,
          "storageKey": null
        },
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
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Metadata_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Save_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Badge_artwork",
      "args": null
    }
  ]
};
(node as any).hash = '3615b2a178c8219ced926a8e2da0673b';
export default node;
