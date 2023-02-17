/**
 * @generated SignedSource<<bc558c01f608de60a3638baf0c059cca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectListsForArtworkHeader_artwork$data = {
  readonly date: string | null;
  readonly image: {
    readonly url: string | null;
  } | null;
  readonly title: string | null;
  readonly " $fragmentType": "SelectListsForArtworkHeader_artwork";
};
export type SelectListsForArtworkHeader_artwork$key = {
  readonly " $data"?: SelectListsForArtworkHeader_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"SelectListsForArtworkHeader_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SelectListsForArtworkHeader_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
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
              "value": "square"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"square\")"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "744d7c0c031c743fd9d21218542c94ef";

export default node;
