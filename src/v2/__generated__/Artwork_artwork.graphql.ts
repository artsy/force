/**
 * @generated SignedSource<<5375d45de041fb4251abe8a57e8fe4b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Artwork_artwork$data = {
  readonly slug: string;
  readonly image: {
    readonly url: string | null;
    readonly aspect_ratio: number;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"Metadata_artwork">;
  readonly " $fragmentType": "Artwork_artwork";
};
export type Artwork_artwork$key = {
  readonly " $data"?: Artwork_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"Artwork_artwork">;
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
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "9e25ccd07ef0c65a2e24af687648d6fd";

export default node;
